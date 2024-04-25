import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import axiosInstance from "axiosConfig/instance";
import ImageUpload from "components/MDImageUpload";
import MDSpinner from "components/MDSpinner/MDSpinner";

const CategoryModel = ({ open, onClose, refresh, setRefresh, editedCategory }) => {
  const [name, setName] = useState(
    Object.keys(editedCategory).length != 0 ? editedCategory.name : ""
  );
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const handleAddCategory = () => {
    setLoader(true);
    if (Object.keys(editedCategory).length != 0) {
      axiosInstance
        .put(
          "api/v1/category/" + editedCategory._id,
          {
            name: name,
            image: image,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          setLoader(false);
          setError("");
          onClose();
          setRefresh(!refresh);
          setImage({});
          setName("");
        })
        .catch((err) => {
          setLoader(false);
          setError(err.response.data.errors[0].msg);
        });
    } else {
      axiosInstance
        .post(
          "api/v1/category",
          {
            name: name,
            image: image,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          setError("");
          setLoader(false);
          setRefresh(!refresh);
          onClose();
          setImage({});
          setName("");
        })
        .catch((err) => {
          setLoader(false);
          setError(err.response.data.errors[0].msg);
        });
    }
  };

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>
        {" "}
        {Object.keys(editedCategory).length != 0 ? "edit category" : "add new category"}
      </DialogTitle>
      <DialogContent>
        <ImageUpload setImage={setImage} />

        <TextField
          autoFocus
          margin="dense"
          label="name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <p style={{ color: "red", display: "flex", justifyContent: "center", fontSize: "15px" }}>
        {error}
      </p>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddCategory} style={{ backgroundColor: "#43F", color: "#FFF" }}>
          {loader ? (
            <MDSpinner color="white" />
          ) : Object.keys(editedCategory).length != 0 ? (
            "edit category"
          ) : (
            "add category"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CategoryModel.defaultProps = {
  open: false,
  onClose: true,
  refresh: false,
  setRefresh: undefined,
  editedCategory: {},
};

CategoryModel.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.any,
  refresh: PropTypes.bool,
  setRefresh: PropTypes.func,
  editedCategory: PropTypes.object,
};

export default CategoryModel;
