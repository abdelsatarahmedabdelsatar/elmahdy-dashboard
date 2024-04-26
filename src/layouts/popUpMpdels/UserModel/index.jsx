import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  TextField,
} from "@mui/material";
import { PropTypes } from "prop-types";
import axiosInstance from "axiosConfig/instance";
import ImageUpload from "components/MDImageUpload";
import MDSpinner from "components/MDSpinner/MDSpinner";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

const UserModel = ({ open, onClose, refresh, setRefresh, editedUser }) => {
  const [username, setUsername] = useState(
    Object.keys(editedUser).length != 0 ? editedUser.userName : ""
  );
  const [email, setEmail] = useState(Object.keys(editedUser).length != 0 ? editedUser.email : "");
  const [fullName, setFullName] = useState(
    Object.keys(editedUser).length != 0 ? editedUser.fullName : ""
  );
  const [address, setAddress] = useState(
    Object.keys(editedUser).length != 0 ? editedUser.adress : ""
  );
  const [mobile, setMobile] = useState(
    Object.keys(editedUser).length != 0 ? editedUser.mobile : ""
  );
  const [image, setImage] = useState(null);
  const [pass, setPass] = useState(Object.keys(editedUser).length != 0 ? editedUser.password : "");
  const [confirmPass, setConfirmPass] = useState(
    Object.keys(editedUser).length != 0 ? editedUser.passwordConfirm : ""
  );
  const [error, setError] = useState("");
  const [loader, serLoader] = useState(false);
  const cleanUp = () => {
    setUsername("");
    setEmail("");
    setFullName("");
    setAddress("");
    setMobile("");
    setImage(null);
    setPass("");
    setConfirmPass("");
  };

  const handleAddUser = () => {
    serLoader(true);
    if (Object.keys(editedUser).length != 0) {
      axiosInstance
        .put(
          "api/v1/users/" + editedUser._id,
          {
            fullName: fullName,
            userName: username,
            email: email,
            adress: address,
            mobile: mobile,
            profileImage: image,
            role: "User",
            password: pass,
            passwordConfirm: confirmPass,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          serLoader(false);
          setError("");
          onClose();
          setRefresh(!refresh);
          cleanUp();
        })
        .catch((err) => {
          serLoader(false);
          setError(err.response.data.errors[0].msg);
        });
    } else {
      axiosInstance
        .post(
          "api/v1/auth/register",
          {
            fullName: fullName,
            userName: username,
            email: email,
            adress: address,
            mobile: mobile,
            profileImage: image,
            role: "User",
            password: pass,
            passwordConfirm: confirmPass,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          serLoader(false);
          setError("");
          onClose();
          setRefresh(!refresh);
          cleanUp();
        })
        .catch((err) => {
          serLoader(false);
          setError(err.response.data.errors[0].msg);
        });
    }
  };

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle> {Object.keys(editedUser).length != 0 ? "edit user" : "add user"}</DialogTitle>
      <DialogContent>
        <ImageUpload setImage={setImage} imagePath={editedUser?.profileImage} />
        <Grid container alignItems="center" justifyContent="space-evenly" columnSpacing={3}>
          <Grid item md={6} xs={12}>
            <TextField
              autoFocus
              margin="dense"
              label="full name"
              type="text"
              fullWidth
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              autoFocus
              margin="dense"
              label="username"
              type="text"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <TextField
              autoFocus
              margin="dense"
              label="email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <TextField
              autoFocus
              margin="dense"
              label="mobile"
              type="text"
              fullWidth
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            {" "}
            <TextField
              autoFocus
              margin="dense"
              label="address"
              type="text"
              fullWidth
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
          {Object.keys(editedUser).length == 0 ? (
            <>
              <Grid item md={6} xs={12}>
                <TextField
                  margin="dense"
                  label="password"
                  type="password"
                  fullWidth
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  margin="dense"
                  label="confirm password"
                  type="password"
                  fullWidth
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                />
              </Grid>
            </>
          ) : (
            ""
          )}
        </Grid>
        <p
          style={{
            color: "red",
            display: "flex",
            justifyContent: "center",
            fontSize: "15px",
            marginTop: "5px",
          }}
        >
          {error}
        </p>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            cleanUp();
            onClose();
          }}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          disabled={loader}
          onClick={handleAddUser}
          style={{ backgroundColor: "#43F", color: "#FFF" }}
        >
          {loader ? (
            <MDSpinner color="white" />
          ) : Object.keys(editedUser).length != 0 ? (
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

UserModel.defaultProps = {
  open: false,
  onClose: true,
  refresh: false,
  setRefresh: undefined,
  editedUser: {},
};

UserModel.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.any,
  refresh: PropTypes.bool,
  setRefresh: PropTypes.func,
  editedUser: PropTypes.object,
};

export default UserModel;
