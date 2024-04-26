import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  Icon,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import axiosInstance from "axiosConfig/instance";
import InputLabel from "@mui/material/InputLabel";
import MDSpinner from "components/MDSpinner/MDSpinner";
import handleInputNameChange from "./../../../helpers/index";

const SubCategoryModel = ({ open, onClose, refresh, setRefresh, editedSubCategory }) => {
  const [arName, setArName] = useState(
    Object.keys(editedSubCategory).length != 0 ? editedSubCategory.ArName : ""
  );
  const [enName, setEnName] = useState(
    Object.keys(editedSubCategory).length != 0 ? editedSubCategory.EnName : ""
  );
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const cleanUp = () => {
    setEnName("");
    setArName("");
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

  const handleChechLangAndChange = (ev, lng) => {
    if (lng == "ar") setArName(handleInputNameChange(ev, lng));
    else setEnName(handleInputNameChange(ev, lng));
  };

  const handleAddSubCategory = () => {
    setLoader(true);
    if (Object.keys(editedSubCategory).length != 0) {
      axiosInstance
        .put(
          "api/v1/subCategory/" + editedSubCategory._id,
          {
            EnName: enName,
            ArName: arName,
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
          cleanUp();
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
            EnName: enName,
            ArName: arName,
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
          cleanUp();
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
        <Grid container alignItems="center" justifyContent="space-evenly" columnSpacing={1.5}>
          <Grid item xs={12} sm={6} md={4} lg={6}>
            <TextField
              autoFocus
              margin="dense"
              label="english name"
              type="text"
              fullWidth
              value={enName}
              onChange={(eve) => handleChechLangAndChange(eve, "en")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={6}>
            <TextField
              autoFocus
              margin="dense"
              label="arabic name"
              type="text"
              fullWidth
              value={arName}
              onChange={(eve) => handleChechLangAndChange(eve, "ar")}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={2}>
          <FormControl fullWidth style={{ marginTop: "10px" }}>
            <InputLabel
              id="demo-simple-select-label"
              style={{ paddingLeft: "3px", paddingRight: "3px", backgroundColor: "#FFF" }}
            >
              category
            </InputLabel>
            <Select
              style={{ height: "42px" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={categoryId}
              onChange={handleCategoryChange}
            >
              {categories.map((c) => (
                <MenuItem key={c._id} value={c._id}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
          style={{ backgroundColor: "#43F", color: "#FFF", padding: "12px" }}
        >
          {loader ? (
            <MDSpinner color="white" />
          ) : Object.keys(editedSubCategory).length != 0 ? (
            <>
              <Icon style={{ marginRight: "8px" }}>modeEdit</Icon>
              edit sub category
            </>
          ) : (
            <>
              <Icon style={{ marginRight: "8px" }}>add</Icon>
              add
            </>
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
