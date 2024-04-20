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

const ProductModel = ({ open, onClose }) => {
  const [title, setTitle] = useState("");
  const [information, setInformation] = useState("");

  const handleAddProduct = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>add new product</DialogTitle>
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
          type="information"
          fullWidth
          value={information}
          onChange={(e) => setInformation(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddProduct} style={{ backgroundColor: "#43F", color: "#FFF" }}>
          add product
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ProductModel.defaultProps = {
  open: false,
  onClose: true,
};

ProductModel.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.any,
};

export default ProductModel;
