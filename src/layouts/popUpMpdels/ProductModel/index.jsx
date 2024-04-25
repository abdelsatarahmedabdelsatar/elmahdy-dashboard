import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";
import axiosInstance from "axiosConfig/instance";
import ImageUpload from "components/MDImageUpload";
import MultiImageUpload from "components/MDMultiImageUpload";
import MDSpinner from "components/MDSpinner/MDSpinner";

const ProductModel = ({ open, onClose, refresh, setRefresh, editedProduct }) => {
  const [name, setName] = useState(
    Object.keys(editedProduct).length != 0 ? editedProduct.title : ""
  );
  const [image, setImage] = useState(null);
  const [multiImage, setMultiImage] = useState([]);
  const [quantity, setQuantity] = useState(
    Object.keys(editedProduct).length != 0 ? editedProduct.quantity : ""
  );
  const [sold, setSold] = useState(
    Object.keys(editedProduct).length != 0 ? editedProduct.sold : ""
  );
  const [price, setPrice] = useState(
    Object.keys(editedProduct).length != 0 ? editedProduct.price : ""
  );
  const [priceAfterDicount, setPriceAfterDicount] = useState(
    Object.keys(editedProduct).length != 0 ? editedProduct.priceAfterDiscount : ""
  );
  const [description, setDescription] = useState(
    Object.keys(editedProduct).length != 0 ? editedProduct.description : ""
  );

  const [color, setColor] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [filteredSubCategories, setfilteredSubCategories] = useState([]);
  const [subCategory, setSubCategory] = useState("");

  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    axiosInstance
      .get("api/v1/category", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setCategories(res.data.data.data);
      });

    axiosInstance
      .get("api/v1/subCategory/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setSubCategories(res.data.data.data);
      });
    axiosInstance
      .get("api/v1/brand", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setBrands(res.data.data.data);
      });
  }, []);

  const handleMultiImageChange = (event) => {
    setColor(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    let cat = categories.find((c) => c._id == event.target.value);
    setfilteredSubCategories(subCategories.filter((f) => f.category?.name == cat.name));
  };

  const handleSubCategoryChange = (event) => {
    setSubCategory(event.target.value);
  };

  const handleBrandsChange = (event) => {
    setBrand(event.target.value);
  };
  const handleAddProduct = () => {
    setLoader(true);
    if (Object.keys(editedProduct).length != 0) {
      axiosInstance
        .put(
          "api/v1/product/" + editedProduct._id,
          {
            title: name,
            description: description,
            quantity: quantity,
            sold: sold,
            price: price,
            priceAfterDicount: priceAfterDicount,
            colors: color,
            imageCover: image,
            images: multiImage,
            category: category,
            subCategory: subCategory,
            brand: brand,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          setError("");
          setLoader(false);
          onClose();
          setRefresh(!refresh);
        })
        .catch((err) => {
          setLoader(false);
          console.log(err);
          setError(err.response.data.errors[0].msg);
        });
    } else {
      axiosInstance
        .post(
          "api/v1/product",
          {
            title: name,
            description: description,
            quantity: quantity,
            sold: sold,
            price: price,
            priceAfterDicount: priceAfterDicount,
            colors: color,
            imageCover: image,
            images: multiImage,
            category: category,
            subCategory: subCategory,
            brand: brand,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          setError("");
          setLoader(false);
          setRefresh(!refresh);
          onClose();
        })
        .catch((err) => {
          setLoader(false);
          setError(err.response.data.errors[0].msg);
        });
    }
  };

  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <DialogTitle>
        {Object.keys(editedProduct).length != 0 ? "edit product" : "add new product"}
      </DialogTitle>

      <DialogContent>
        <Grid container alignItems="center" justifyContent="space-evenly" columnSpacing={3}>
          <Grid item md={6} sm={6}>
            <ImageUpload setImage={setImage} imagePath={editedProduct?.image} />
          </Grid>
          <Grid item md={6} sm={6}>
            <MultiImageUpload setMultiImage={setMultiImage} />
          </Grid>
          {/* <Grid item md={6} sm={6}>
          <ImageUpload setImage={setImage} />
        </Grid> */}
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <TextField
              autoFocus
              margin="dense"
              label="name"
              type="text"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <TextField
              autoFocus
              margin="dense"
              label="quantity"
              type="text"
              fullWidth
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <TextField
              autoFocus
              margin="dense"
              label="sold"
              type="text"
              fullWidth
              value={sold}
              onChange={(e) => setSold(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <TextField
              autoFocus
              margin="dense"
              label="price"
              type="text"
              fullWidth
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <TextField
              autoFocus
              margin="dense"
              label="description"
              type="text"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={4}>
            <TextField
              autoFocus
              margin="dense"
              label="price after discount"
              type="text"
              fullWidth
              value={priceAfterDicount}
              onChange={(e) => setPriceAfterDicount(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} style={{ marginTop: "20px" }} sm={6} md={6} lg={3}>
            <Grid container>
              <InputLabel style={{ margin: "8px" }}>choose product color</InputLabel>
              <Select
                multiple
                value={color}
                onChange={handleMultiImageChange}
                renderValue={(selected) => selected.join(", ")}
              >
                <MenuItem value="" disabled>
                  select
                </MenuItem>
                <MenuItem value="red">red</MenuItem>
                <MenuItem value="blue">green</MenuItem>
                <MenuItem value="yellow">blue</MenuItem>
                <MenuItem value="white">white</MenuItem>
                <MenuItem value="pink">pink</MenuItem>
              </Select>
              <Button style={{ fontSize: "11px" }} size="small" onClick={() => setColor([])}>
                Clear
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ marginTop: "20px" }} sm={6} md={6} lg={3}>
            <Grid container>
              <InputLabel style={{ margin: "5px" }}>choose category</InputLabel>
              <Select value={category} onChange={handleCategoryChange}>
                <MenuItem value="" disabled>
                  select
                </MenuItem>
                {categories.map((c) => (
                  <MenuItem key={c._id} value={c._id}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ marginTop: "20px" }} sm={6} md={6} lg={3}>
            <Grid container>
              <InputLabel style={{ margin: "5px" }}>choose sub category</InputLabel>
              <Select value={subCategory} onChange={handleSubCategoryChange}>
                <MenuItem value="" disabled>
                  select
                </MenuItem>
                {filteredSubCategories.map((s) => (
                  <MenuItem key={s._id} value={s._id}>
                    {s.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ marginTop: "20px" }} sm={6} md={6} lg={3}>
            <Grid container>
              <InputLabel style={{ margin: "5px" }}>choose product brand</InputLabel>
              <Select value={brand} onChange={handleBrandsChange}>
                <MenuItem value="" disabled>
                  select
                </MenuItem>
                {brands.map((b) => (
                  <MenuItem key={b._id} value={b._id}>
                    {b.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <p style={{ color: "red", display: "flex", justifyContent: "center", fontSize: "15px" }}>
        {error}
      </p>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          disabled={loader}
          onClick={handleAddProduct}
          style={{ backgroundColor: "#43F", color: "#FFF" }}
        >
          {loader ? (
            <MDSpinner color="white" />
          ) : Object.keys(editedProduct).length != 0 ? (
            "edit product"
          ) : (
            "add product"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ProductModel.defaultProps = {
  open: false,
  onClose: true,
  refresh: false,
  setRefresh: undefined,
  editedProduct: {},
};

ProductModel.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.any,
  refresh: PropTypes.bool,
  setRefresh: PropTypes.func,
  editedProduct: PropTypes.object,
};

export default ProductModel;
