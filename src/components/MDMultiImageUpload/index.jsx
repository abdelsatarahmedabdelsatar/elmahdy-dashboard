import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const MultiImageUpload = ({ setMultiImage ,imgsLength }) => {
  const [imagesLength, setImagesLength] = useState(0);
  useEffect(() => {
    return () => {
      setMultiImage([]);
    };
  }, []);

  const handleImageChange = (e) => {
    let ListOfImages = e.target.files;
    console.log(ListOfImages);
    setMultiImage(ListOfImages);
    console.log(ListOfImages);
    setImagesLength(ListOfImages.length);
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
            backgroundColor: "#EFE",
          }}
          onClick={selectFileFrontCover}
        >
          <p style={{ color: "#2d3" }}>{imagesLength} images</p>
        </div>
      ) : !imgsLength?(
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
      ):(
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            border: "2px dashed #45D",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#EFE",
          }}
          onClick={selectFileFrontCover}
        >
          <p style={{ color: "#2d3" }}>{imgsLength} images</p>
        </div>
      )}
    </div>
  );
};

MultiImageUpload.defaultProps = {
  setMultiImage: undefined,
  imgsLength: 0,
};

MultiImageUpload.propTypes = {
  setMultiImage: PropTypes.func,
  imgsLength: PropTypes.number,
};

export default MultiImageUpload;
