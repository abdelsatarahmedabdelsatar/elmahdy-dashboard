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

const BrandsModel = ({ open, onClose }) => {
  const [name, setname] = useState("");
  const [desc, setDesc] = useState("");

  const handleAddUser = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>add new brand</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <TextField
          margin="dense"
          label="description"
          type="text"
          fullWidth
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddUser} style={{ backgroundColor: "#43F", color: "#FFF" }}>
          add brand
        </Button>
      </DialogActions>
    </Dialog>
  );
};

BrandsModel.defaultProps = {
  open: false,
  onClose: true,
};

BrandsModel.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.any,
};

export default BrandsModel;
