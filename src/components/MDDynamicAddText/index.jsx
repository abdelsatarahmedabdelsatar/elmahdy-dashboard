import { Icon, Input } from "@mui/material";
import React from "react";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

const DynamicAddText = ({ supplayData, setSupplayData }) => {
  const handleInputChange = (id, event) => {
    const newsupplayData = supplayData.map((input, c) => {
      if (c === id) {
        return event.target.value;
      }
      return input;
    });
    setSupplayData(newsupplayData);
  };

  const handleAddInput = () => {
    const newInput = "";
    setSupplayData([...supplayData, newInput]);
  };

  const handleRemoveInput = (i) => {
    let inps = [...supplayData];
    inps.splice(i, 1);
    const newsupplayData = [...inps];
    setSupplayData(newsupplayData);
  };

  return (
    <div >
      {supplayData.map((input, i) => (
        <div key={i}>
          <Input type="text" value={input} onChange={(event) => handleInputChange(i, event)} />
          <Button style={{paddingTop:"20px",paddingBottom:"0px",paddingLeft:"0px"}} type="button" onClick={() => handleRemoveInput(i)}>
           <Icon color="error">delete</Icon>
          </Button>
        </div>
      ))}

      <div>
        <Button style={{ padding: "0px" }} type="button" onClick={handleAddInput}>
          + Add text
        </Button>
      </div>
    </div>
  );
};

DynamicAddText.defaultProps = {
  supplayData: [],
  setSupplayData: undefined,
};

DynamicAddText.propTypes = {
  supplayData: PropTypes.array,
  setSupplayData: PropTypes.any,
};

export default DynamicAddText;
