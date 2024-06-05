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
import handleInputNameChange from "./../../../helpers/index";
import Grid from "@mui/material/Grid";
import { toast } from "sonner";

const BrandsModel = ({ open, onClose, refresh, setRefresh, editedBrand }) => {
  const [enName, setEnName] = useState(
    Object.keys(editedBrand).length != 0 ? editedBrand.EnName : ""
  );
  const [arName, setArName] = useState(
    Object.keys(editedBrand).length != 0 ? editedBrand.ArName : ""
  );

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
            EnName: enName,
            ArName: arName,
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
          setEnName("");
          setArName("");
          toast.success("successfully brand edited");
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
          "api/v1/brand",
          {
            EnName: enName,
            ArName: arName,
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
          setEnName("");
          setArName("");
          toast.success("successfully brand added");
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
        {Object.keys(editedBrand).length != 0 ? "edit brand" : "add new brand"}
      </DialogTitle>
      <DialogContent>
        <ImageUpload setImage={setImage} imagePath={editedBrand?.image} />
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
