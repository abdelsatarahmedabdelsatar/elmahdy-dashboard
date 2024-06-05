import React, { useState } from "react";
import {
  Button,
  Checkbox,
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
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import handleInputNameChange from "./../../../helpers/index";
import { toast } from "sonner";

const CategoryModel = ({ open, onClose, refresh, setRefresh, editedCategory }) => {
  
  const [isMain, setIsMain] = useState(
    Object.keys(editedCategory).length != 0 ? editedCategory.isMain : false
  );
  const [arName, setArName] = useState(
    Object.keys(editedCategory).length != 0 ? editedCategory.ArName : ""
  );
  const [enName, setEnName] = useState(
    Object.keys(editedCategory).length != 0 ? editedCategory.EnName : ""
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
            EnName: enName,
            ArName: arName,
            image: image,
            isMain: isMain,
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
          setEnName("");
          setArName("");
          toast.success("successfully category edited");
        })
        .catch((err) => {
            if(err.response.data.message.includes("please login again")){
              localStorage.removeItem("token");
              window.location.reload();
            }
          setLoader(false);
          toast.error(err.response.data.errors[0].msg);
        });
    } else {
      axiosInstance
        .post(
          "api/v1/category",
          {
            EnName: enName,
            ArName: arName,
            image: image,
            isMain: isMain,
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
          setEnName("");
          setArName("");
          toast.success("successfully category added");
        })
        .catch((err) => {
          setLoader(false);
          toast.error(err.response.data.errors[0].msg);
        });
    }
  };

  const handleChechLangAndChange = (ev, lng) => {
    if (lng == "ar") setArName(handleInputNameChange(ev, lng));
    else setEnName(handleInputNameChange(ev, lng));
  };
  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>
        {" "}
        {Object.keys(editedCategory).length != 0 ? "edit category" : "add new category"}
      </DialogTitle>
      <DialogContent>
        <ImageUpload setImage={setImage} imagePath={editedCategory?.image} />
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

          <Checkbox checked={isMain} onChange={() => setIsMain(!isMain)} />
          <span style={{ fontSize: "14px" }}>show in feed page</span>
      </DialogContent>
      <p style={{ color: "red", display: "flex", justifyContent: "center", fontSize: "15px" }}>
        {error}
      </p>
      <DialogActions>
        <Button onClick={()=>{
          cleanUP();
          onClose();
        }} color="primary">
          Cancel
        </Button>
        <Button
          disabled={loader}
          onClick={handleAddCategory}
          style={{ backgroundColor: "#43F", color: "#FFF" }}
        >
          {loader ? (
            <MDSpinner color="white" />
          ) : Object.keys(editedCategory).length != 0 ? (
            <>
              <Icon style={{ marginRight: "8px" }}>modeEdit</Icon>
              edit
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
