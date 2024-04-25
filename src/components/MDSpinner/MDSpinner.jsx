import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";

const MDSpinner = ({ color, size }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <CircularProgress color={color} size={size} />
    </div>
  );
};
MDSpinner.defaultProps = {
  color: "info",
  size: 10,
};

// Typechecking props for the MDSpinner
MDSpinner.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};
export default MDSpinner;
