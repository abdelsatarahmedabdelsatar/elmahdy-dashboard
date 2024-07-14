import React, { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
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
import { toast } from "sonner";

const SubCategoryModel = ({ open, onClose, refresh, setRefresh, editedSubCategory }) => {
  let edited_flag = Object.keys(editedSubCategory).length != 0;
  const [isMain, setIsMain] = useState(edited_flag ? editedSubCategory.isMain : false);
  const [arName, setArName] = useState(edited_flag ? editedSubCategory.ArName : "");
  const [enName, setEnName] = useState(edited_flag ? editedSubCategory.EnName : "");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(edited_flag ? editedSubCategory.category._id : "");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const cleanUp = () => {
    setEnName("");
    setArName("");
    setCategoryId("");
  };
  useEffect(() => {
    axiosInstance
      .get("api/v1/category?limit=1000000", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setCategories(res.data.data.data);
      });
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
    if (edited_flag) {
      axiosInstance
        .put(
          "api/v1/subCategory/" + editedSubCategory._id,
          {
            EnName: enName,
            ArName: arName,
            category: categoryId,
            isMain: isMain,
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
          toast.success("successfully edited");
        })
        .catch((err) => {
          setLoader(false);
          toast.error(err.response.data.errors[0].msg);
        });
    } else {
      axiosInstance
        .post(
          "api/v1/subCategory",
          {
            EnName: enName,
            ArName: arName,
            category: categoryId,
            isMain: isMain,
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
          toast.success("successfully added");
        })
        .catch((err) => {
          setLoader(false);
          toast.error(err.response.data.errors[0].msg);
        });
    }
  };

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>{edited_flag ? "edit sub category" : "add new sub category"}</DialogTitle>
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
                  {c.EnName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Checkbox checked={isMain} onChange={() => setIsMain(!isMain)} />
        <span style={{ fontSize: "14px" }}>show in feed page</span>
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
          ) : edited_flag ? (
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
