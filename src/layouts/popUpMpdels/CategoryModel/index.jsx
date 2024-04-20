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

const CategoryModel = ({ open, onClose }) => {
  const [title, setTitle] = useState("");
  const [information, setInformation] = useState("");

  const handleAddCategory = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>add new category</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="title"
          type="text"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="information"
          type="text"
          fullWidth
          value={information}
          onChange={(e) => setInformation(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddCategory} style={{ backgroundColor: "#43F", color: "#FFF" }}>
          add category
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CategoryModel.defaultProps = {
  open: false,
  onClose: true,
};

CategoryModel.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.any,
};

export default CategoryModel;
