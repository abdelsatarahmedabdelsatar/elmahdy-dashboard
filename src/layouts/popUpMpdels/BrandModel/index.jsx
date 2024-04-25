import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Input,
} from "@mui/material";
import PropTypes from "prop-types";
import axiosInstance from "axiosConfig/instance";
import ImageUpload from "components/MDImageUpload";
import MDSpinner from "components/MDSpinner/MDSpinner";

const BrandsModel = ({ open, onClose, refresh, setRefresh, editedBrand }) => {
  const [name, setName] = useState(Object.keys(editedBrand).length != 0 ? editedBrand.name : "");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const handleAddBrand = () => {
    setLoader(true);
    if (Object.keys(editedBrand).length != 0) {
      axiosInstance
        .put(
          "api/v1/brand/" + editedBrand._id,
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
          "api/v1/brand",
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
        {Object.keys(editedBrand).length != 0 ? "edit brand" : "add new brand"}
      </DialogTitle>
      <DialogContent>
        <ImageUpload setImage={setImage} imagePath={editedBrand?.image} />

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
        <Button
          disabled={loader}
          onClick={handleAddBrand}
          style={{ backgroundColor: "#43F", color: "#FFF" }}
        >
          {loader ? (
            <MDSpinner color="white" />
          ) : Object.keys(editedBrand).length != 0 ? (
            "edit brand"
          ) : (
            "add brand"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

BrandsModel.defaultProps = {
  open: false,
  onClose: true,
  refresh: false,
  setRefresh: undefined,
  editedBrand: {},
};

BrandsModel.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.any,
  refresh: PropTypes.bool,
  setRefresh: PropTypes.func,
  editedBrand: PropTypes.object,
};

export default BrandsModel;
