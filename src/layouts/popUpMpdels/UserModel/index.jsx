import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { PropTypes } from "prop-types";

const UserModel = ({ open, onClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleAddUser = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>add new user</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Username"
          type="text"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="dense"
          label="email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddUser} style={{ backgroundColor: "#43F", color: "#FFF" }}>
          add user
        </Button>
      </DialogActions>
    </Dialog>
  );
};

UserModel.defaultProps = {
  open: false,
  onClose: true,
};

UserModel.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.any,
};

export default UserModel;
