import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import PropTypes from "prop-types";

const ConfirmModal = ({ title, open, onClose, onConfirm }) => {
  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>confirmation</DialogTitle>
      <DialogContent>{title}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="dark">
          Cancel
        </Button>
        <Button onClick={onConfirm} style={{ backgroundColor: "red", color: "#FFF" }} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmModal.defaultProps = {
  title: "",
  open: false,
  onClose: true,
  onConfirm: undefined,
};

ConfirmModal.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.any,
  onConfirm: PropTypes.func,
};

export default ConfirmModal;
