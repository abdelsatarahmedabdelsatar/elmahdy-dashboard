import React, { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";
import axiosInstance from "axiosConfig/instance";
import MDSpinner from "components/MDSpinner/MDSpinner";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import handleInputNameChange from "./../../../helpers/index";
import { toast } from "sonner";
import DynamicAddText from "components/MDDynamicAddText";

const OptionsModel = ({ open, onClose, refresh, setRefresh, editedOption }) => {
  const [options, setOptions] = useState([]);
  const [isRelated, setIsRelated] = useState(
    Object.keys(editedOption).length != 0 ? editedOption.isRelated : false
  );
  const [relatedValue, setRelatedValue] = useState(
    Object.keys(editedOption).length != 0 ? editedOption.relatedValue : ""
  );
  const [requiredMoreMoney, setRequiredMoreMoney] = useState(
    Object.keys(editedOption).length != 0 ? editedOption.requiredMoreMoney : false
  );

  const [supplayData, setSupplayData] = useState(
    Object.keys(editedOption).length != 0 ? editedOption.supplayData : []
  );
  const [arName, setArName] = useState(
    Object.keys(editedOption).length != 0 ? editedOption.ArName : ""
  );
  const [enName, setEnName] = useState(
    Object.keys(editedOption).length != 0 ? editedOption.EnName : ""
  );

  const [arTitle, setArTitle] = useState(
    Object.keys(editedOption).length != 0 ? editedOption.ArTitle : ""
  );
  const [enTitle, setEnTitle] = useState(
    Object.keys(editedOption).length != 0 ? editedOption.EnTitle : ""
  );

  const [type, setType] = useState(Object.keys(editedOption).length != 0 ? editedOption.type : "");
  const [relatedOption, setRelatedOption] = useState(
    Object.keys(editedOption).length != 0 ? editedOption.relatedId?._id : ""
  );
  const [moreMoney, setMoreMoney] = useState(
    Object.keys(editedOption).length != 0 ? editedOption.moreMoney : ""
  );
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    axiosInstance
      .get("api/v1/option", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setOptions(res.data.data.data);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const cleanUP = () => {
    setError("");
    setEnName("");
    setArName("");
    setEnTitle("");
    setArTitle("");
    setRelatedOption("");
    setType("");
    setIsRelated(false);
    setRequiredMoreMoney(false);
    setMoreMoney("");
    setRelatedValue("");
    setSupplayData([]);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleRelatedOptionChange = (event) => {
    setRelatedOption(event.target.value);
  };

  const handleMoreMoneyChangeChange = (event) => {
    setMoreMoney(event.target.value);
  };

  const handleRelatedValueChangeChange = (event) => {
    setRelatedValue(event.target.value);
  };

  const addedObjToAPI = () => {
    if (isRelated && !requiredMoreMoney) {
      return {
        EnName: enName,
        ArName: arName,
        EnTitle: enTitle,
        ArTitle: arTitle,
        type: type,
        // requiredMoreMoney: requiredMoreMoney,
        moreMoney: moreMoney,
        isRelated: isRelated,
        relatedId: relatedOption,
        relatedValue: relatedValue,
        supplayData: supplayData,
      };
    } else if (!isRelated && requiredMoreMoney) {
      return {
        EnName: enName,
        ArName: arName,
        EnTitle: enTitle,
        ArTitle: arTitle,
        type: type,
        requiredMoreMoney: requiredMoreMoney,
        moreMoney: moreMoney,
        isRelated: isRelated,
        // relatedId: relatedOption,
        // relatedValue: relatedValue,
        supplayData: supplayData,
      };
    } else if (!isRelated && !requiredMoreMoney) {
      return {
        EnName: enName,
        ArName: arName,
        EnTitle: enTitle,
        ArTitle: arTitle,
        type: type,
        requiredMoreMoney: requiredMoreMoney,
        // moreMoney: moreMoney,
        isRelated: isRelated,
        // relatedId: relatedOption,
        // relatedValue: relatedValue,
        supplayData: supplayData,
      };
    } else {
      return {
        EnName: enName,
        ArName: arName,
        EnTitle: enTitle,
        ArTitle: arTitle,
        type: type,
        requiredMoreMoney: requiredMoreMoney,
        moreMoney: moreMoney,
        isRelated: isRelated,
        relatedId: relatedOption,
        relatedValue: relatedValue,
        supplayData: supplayData,
      };
    }
  };

  const handleAddOption = () => {
    setLoader(true);
    if (Object.keys(editedOption).length != 0) {
      axiosInstance
        .put("api/v1/option/" + editedOption._id, addedObjToAPI(), {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setLoader(false);
          onClose();
          setRefresh(!refresh);
          cleanUP();
          toast.success("successfully option edited");
        })
        .catch((err) => {
          console.log(err);
          if (err.response) {
            if (err.response.data.message.includes("please login again")) {
              localStorage.removeItem("token");
              window.location.reload();
            }
          }

          setLoader(false);
          toast.error(err.response.data.errors[0].msg);
        });
    } else {
      axiosInstance
        .post("api/v1/option", addedObjToAPI(), {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setLoader(false);
          setRefresh(!refresh);
          onClose();
          cleanUP();
          toast.success("successfully option added");
        })
        .catch((err) => {
          setLoader(false);
          toast.error(err.response.data.errors[0].msg);
        });
    }
  };

  const handleChechNameLangAndChange = (ev, lng) => {
    if (lng == "ar") setArName(handleInputNameChange(ev, lng));
    else setEnName(handleInputNameChange(ev, lng));
  };

  const handleChechTitleLangAndChange = (ev, lng) => {
    if (lng == "ar") setArTitle(handleInputNameChange(ev, lng));
    else setEnTitle(handleInputNameChange(ev, lng));
  };
  return (
    <Dialog maxWidth="lg" open={open} onClose={onClose}>
      <DialogTitle>
        {Object.keys(editedOption).length != 0 ? "edit option" : "add new option"}
      </DialogTitle>
      <DialogContent>
        <Grid container alignItems="center" justifyContent="start" columnSpacing={1.5}>
          <Grid item xs={12} sm={6} md={4} lg={6}>
            <TextField
              autoFocus
              margin="dense"
              label="english name"
              type="text"
              fullWidth
              value={enName}
              onChange={(eve) => handleChechNameLangAndChange(eve, "en")}
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
              onChange={(eve) => handleChechNameLangAndChange(eve, "ar")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={6}>
            <TextField
              autoFocus
              margin="dense"
              label="english title"
              type="text"
              fullWidth
              value={enTitle}
              onChange={(eve) => handleChechTitleLangAndChange(eve, "en")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={6}>
            <TextField
              autoFocus
              margin="dense"
              label="arabic title"
              type="text"
              fullWidth
              value={arTitle}
              onChange={(eve) => handleChechTitleLangAndChange(eve, "ar")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={6}>
            <FormControl fullWidth style={{ marginTop: "7px" }}>
              <InputLabel
                id="demo-simple-select-label"
                style={{ paddingLeft: "3px", paddingRight: "3px", backgroundColor: "#FFF" }}
              >
                type
              </InputLabel>
              <Select
                style={{ height: "45px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                onChange={handleTypeChange}
              >
                <MenuItem value="Input">input</MenuItem>
                <MenuItem value="TextArea">text area</MenuItem>
                <MenuItem value="File">file</MenuItem>
                <MenuItem value="DropDown">dropdown</MenuItem>
                <MenuItem value="MultiSelect">multi select</MenuItem>
                <MenuItem value="CheckBox">checkBox</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2} sm={1} md={1} lg={2}>
            <Checkbox checked={isRelated} onChange={() => setIsRelated(!isRelated)} />
            <span style={{ fontSize: "14px" }}>related options</span>
          </Grid>

          <Grid item xs={10} sm={4} md={3} lg={4}>
            {isRelated && (
              <FormControl fullWidth style={{ marginTop: "7px" }}>
                <InputLabel
                  id="demo-simple-select-label2"
                  style={{ paddingLeft: "3px", paddingRight: "3px", backgroundColor: "#FFF" }}
                >
                  select option
                </InputLabel>
                <Select
                  style={{ height: "45px" }}
                  labelId="demo-simple-select-label2"
                  id="demo-simple-select"
                  value={relatedOption}
                  onChange={handleRelatedOptionChange}
                >
                  {options
                    .filter((o) => o._id !== editedOption._id && !o.isRelated)
                    .map((op) => {
                      return (
                        editedOption._id !== op._id && (
                          <MenuItem value={op._id}>{op.EnName}</MenuItem>
                        )
                      );
                    })}
                </Select>
              </FormControl>
            )}
          </Grid>

          {(type == "MultiSelect" || type == "DropDown") && (
            <Grid item xs={12} sm={6} md={4} lg={6}>
              <DynamicAddText supplayData={supplayData} setSupplayData={setSupplayData} />
            </Grid>
          )}

          {isRelated && (
            <Grid item xs={12} sm={6} md={4} lg={6}>
              <FormControl fullWidth style={{ marginTop: "7px" }}>
                <TextField
                  style={{ height: "45px" }}
                  label="related value"
                  id="demo-simple-select"
                  value={relatedValue}
                  onChange={handleRelatedValueChangeChange}
                />
              </FormControl>
            </Grid>
          )}
          <Grid item xs={2} sm={1} md={1} lg={2}>
            <Checkbox
              checked={requiredMoreMoney}
              onChange={() => setRequiredMoreMoney(!requiredMoreMoney)}
            />
            <span style={{ fontSize: "14px" }}> required money</span>
          </Grid>

          <Grid item xs={10} sm={4} md={3} lg={4}>
            {requiredMoreMoney && (
              <FormControl fullWidth style={{ marginTop: "7px" }}>
                <TextField
                  style={{ height: "45px" }}
                  label="amount"
                  id="demo-simple-select"
                  value={moreMoney}
                  onChange={handleMoreMoneyChangeChange}
                />
              </FormControl>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <p style={{ color: "red", display: "flex", justifyContent: "center", fontSize: "15px" }}>
        {error}
      </p>
      <DialogActions>
        <Button
          onClick={() => {
            cleanUP();
            setRefresh(!refresh);
            onClose();
          }}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          disabled={loader}
          onClick={handleAddOption}
          style={{ backgroundColor: "#43F", color: "#FFF" }}
        >
          {loader ? (
            <MDSpinner color="white" />
          ) : Object.keys(editedOption).length != 0 ? (
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

OptionsModel.defaultProps = {
  open: false,
  onClose: true,
  refresh: false,
  setRefresh: undefined,
  editedOption: {},
};

OptionsModel.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.any,
  refresh: PropTypes.bool,
  setRefresh: PropTypes.func,
  editedOption: PropTypes.object,
};

export default OptionsModel;
