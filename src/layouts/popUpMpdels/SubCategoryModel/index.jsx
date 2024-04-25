import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Input,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import axiosInstance from "axiosConfig/instance";
import InputLabel from "@mui/material/InputLabel";
import MDSpinner from "components/MDSpinner/MDSpinner";

const SubCategoryModel = ({ open, onClose, refresh, setRefresh, editedSubCategory }) => {
  const [name, setName] = useState(
    Object.keys(editedSubCategory).length != 0 ? editedSubCategory.name : ""
  );
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const cleanUp = () => {
    setName("");
    setCategories([]);
    setCategoryId("");
  };
  useEffect(() => {
    axiosInstance
      .get("api/v1/category", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setCategories(res.data.data.data);
      });

    return () => {
      cleanUp();
    };
  }, []);

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
  };

  const handleAddSubCategory = () => {
    setLoader(true);
    if (Object.keys(editedSubCategory).length != 0) {
      axiosInstance
        .put(
          "api/v1/subCategory/" + editedSubCategory._id,
          {
            name: name,
            category: categoryId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          setLoader(false);
          setError("");
          onClose();
          setRefresh(!refresh);
          setCategoryId("");
          setName("");
        })
        .catch((err) => {
          setLoader(false);
          setError(err.response.data.errors[0].msg);
        });
    } else {
      axiosInstance
        .post(
          "api/v1/subCategory",
          {
            name: name,
            category: categoryId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          setLoader(false);
          setError("");
          setRefresh(!refresh);
          onClose();
          setCategoryId("");
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
        {Object.keys(editedSubCategory).length != 0 ? "edit sub category" : "add new sub category"}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Grid item xs={12} style={{ marginTop: "20px" }} sm={6} md={4} lg={2}>
          <Grid container>
            <InputLabel style={{ margin: "5px" }}>select category</InputLabel>
            <Select value={categoryId} onChange={handleCategoryChange}>
              <MenuItem value="">select ...</MenuItem>
              {categories.map((c) => (
                <MenuItem key={c._id} value={c._id}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
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
          onClick={handleAddSubCategory}
          style={{ backgroundColor: "#43F", color: "#FFF" }}
        >
          {loader ? (
            <MDSpinner color="white" />
          ) : Object.keys(editedSubCategory).length != 0 ? (
            "edit sub category"
          ) : (
            "add sub category"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

SubCategoryModel.defaultProps = {
  open: false,
  onClose: true,
  refresh: false,
  setRefresh: undefined,
  editedSubCategory: {},
};

SubCategoryModel.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.any,
  refresh: PropTypes.bool,
  setRefresh: PropTypes.func,
  editedSubCategory: PropTypes.object,
};

export default SubCategoryModel;
