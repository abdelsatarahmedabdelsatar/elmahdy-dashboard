import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const MultiImageUpload = ({ setMultiImage }) => {
  const [imagesLength, setImagesLength] = useState(0);
  useEffect(() => {
    return () => {
      setMultiImage([]);
    };
  }, []);

  const handleImageChange = (e) => {
    setMultiImage(e.target.files);
    setImagesLength(e.target.files.length);
  };

  let selectFileFrontCover = () => {
    document.getElementById("multipleImage").click();
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <input
        style={{ display: "none" }}
        type="file"
        multiple
        id="multipleImage"
        accept="image/*"
        onChange={handleImageChange}
      />

      {imagesLength ? (
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            border: "2px dashed #45D",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#EFEFEF",
          }}
          onClick={selectFileFrontCover}
        >
          <h5>{imagesLength} images</h5>
        </div>
      ) : (
        <img
          onClick={selectFileFrontCover}
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            overflow: "hidden",
            marginBottom: "20px",
            border: "2.5px dashed #45D",
            padding: "8px",
          }}
          src={"./images_upload.png"}
        />
      )}
    </div>
  );
};

MultiImageUpload.defaultProps = {
  setMultiImage: undefined,
};

MultiImageUpload.propTypes = {
  setMultiImage: PropTypes.func,
};

export default MultiImageUpload;
