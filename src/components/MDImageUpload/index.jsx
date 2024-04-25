import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const ImageUpload = ({ setImage }) => {
  const [perviewImage, setPerviewImage] = useState(null);
  useEffect(() => {
    return () => {
      setImage(null);
    };
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    let reader = new FileReader();

    reader.onload = (event) => {
      setPerviewImage(event.target.result);
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  let selectFileFrontCover = () => {
    document.getElementById("userImage").click();
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <input
        style={{ display: "none" }}
        type="file"
        id="userImage"
        accept="image/*"
        onChange={handleImageChange}
      />

      {perviewImage ? (
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            overflow: "hidden",
            marginBottom: "20px",
          }}
          onClick={selectFileFrontCover}
        >
          <img
            src={perviewImage}
            alt="Selected"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
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
          }}
          src={"./user_image.jpg"}
        />
      )}
    </div>
  );
};

ImageUpload.defaultProps = {
  setImage: undefined,
};

ImageUpload.propTypes = {
  setImage: PropTypes.func,
};

export default ImageUpload;
