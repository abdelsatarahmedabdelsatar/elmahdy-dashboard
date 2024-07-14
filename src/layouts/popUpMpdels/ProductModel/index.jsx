import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
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
import Icon from "@mui/material/Icon";
import handleInputNameChange from "./../../../helpers/index";
import { toast } from "sonner";

const ProductModel = ({ open, onClose, refresh, setRefresh, editedProduct }) => {
  let edited_flag = Object.keys(editedProduct).length != 0;

  const [enTitle, setEnTitle] = useState(edited_flag ? editedProduct.EnTitle : "");
  const [arTitle, setArTitle] = useState(edited_flag ? editedProduct.ArTitle : "");
  const [enDescription, setEnDescription] = useState(
    edited_flag ? editedProduct.EnDescription : ""
  );
  const [arDescription, setArDescription] = useState(
    edited_flag ? editedProduct.ArDescription : ""
  );
  const [image, setImage] = useState(null);
  const [multiImage, setMultiImage] = useState([]);
  const [quantity, setQuantity] = useState(edited_flag ? editedProduct.quantity : "");
  const [optionsValue, setOptionsValue] = useState(
    edited_flag ? editedProduct.options.map((p) => p._id) : []
  );
  const [sold, setSold] = useState(edited_flag ? editedProduct.sold : "");
  const [price, setPrice] = useState(edited_flag ? editedProduct.price : "");
  const [priceAfterDicount, setPriceAfterDicount] = useState(
    edited_flag ? editedProduct.priceAfterDiscount : ""
  );

  const [color, setColor] = useState(edited_flag ? editedProduct.colors : []);
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState(edited_flag ? editedProduct.brand._id : "");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(edited_flag ? editedProduct.category._id : "");
  const [subCategories, setSubCategories] = useState([]);
  const [filteredSubCategories, setfilteredSubCategories] = useState([]);
  const [subCategory, setSubCategory] = useState(edited_flag ? editedProduct.subCategory._id : "");
  const [options, setOptions] = useState([]);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const cleanUp = () => {
    setEnTitle("");
    setArTitle("");
    setEnDescription("");
    setArDescription("");
    setImage({});
    setMultiImage([]);
    setOptionsValue([]);
    setQuantity("");
    setSold("");
    setPrice("");
    setPriceAfterDicount("");
    setColor([]);
    // setBrands([]);
    setBrand("");
    // setCategories([]);
    setCategory("");
    // setSubCategories([]);
    // setfilteredSubCategories([]);
    setSubCategory("");
    setError("");
    setLoader(false);
  };

  useEffect(() => {
    if (edited_flag) {
      axiosInstance
        .get("api/v1/subCategory?limit=1000000", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setfilteredSubCategories(
            res.data.data.data.filter((f) => f.category.EnName == editedProduct.category.EnName)
          );
        });
    }
  }, []);

  useEffect(() => {
    axiosInstance
      .get("api/v1/category?limit=1000000", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setCategories(res.data.data.data);
      });

    axiosInstance
      .get("api/v1/subCategory?limit=1000000", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setSubCategories(res.data.data.data);
      });
    axiosInstance
      .get("api/v1/brand?limit=1000000", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setBrands(res.data.data.data);
      });

    axiosInstance
      .get("api/v1/option", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setOptions(res.data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleOptionsChange = (event) => {
    setOptionsValue(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    let cat = categories.find((c) => c._id == event.target.value);
    setfilteredSubCategories(subCategories.filter((f) => f.category?.EnName == cat.EnName));
  };

  const handleSubCategoryChange = (event) => {
    setSubCategory(event.target.value);
  };

  const handleBrandsChange = (event) => {
    setBrand(event.target.value);
  };
  const handleAddProduct = () => {

    if(sold > quantity){
      toast.error("sold shoud be lower than quantity");
    }else{
          const formData = new FormData();

    formData.append("EnTitle", enTitle);
    formData.append("ArTitle", arTitle);
    formData.append("EnDescription", enDescription);
    formData.append("ArDescription", arDescription);
    formData.append("quantity", quantity);
    formData.append("sold", sold);
    formData.append("price", price);
    formData.append("priceAfterDiscount", priceAfterDicount);
    formData.append("imageCover", image);

    // multiImage.forEach((f, i) => {
    //   formData.append(`images[${i}]`, f, f.name);
    // });

    for (let i = 0; i < multiImage.length; i++) {
      formData.append(`images`, multiImage[i], multiImage[i].name);
    }

    color.forEach((str, index) => {
      formData.append(`colors[${index}]`, str);
    });

    optionsValue.forEach((str, index) => {
      formData.append(`options[${index}]`, str);
    });

    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("brand", brand);

    setLoader(true);
    if (Object.keys(editedProduct).length != 0) {
      axiosInstance
        .put("api/v1/product/" + editedProduct._id, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          cleanUp();
          onClose();
          setRefresh(!refresh);
          toast.success("successfully product edited");
        })
        .catch((err) => {
          setLoader(false);
          if (err.response.data.errors) toast.error(err.response.data.errors[0].msg);
          else toast.error("error occured");
        });
    } else {
      axiosInstance
        .post("api/v1/product", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          cleanUp();
          onClose();
          setRefresh(!refresh);
          toast.success("successfully product added");
        })
        .catch((err) => {
          setLoader(false);
          console.log(err);
          if (err.response.data.errors) toast.error(err.response.data.errors[0].msg);
          else toast.error("error occured");
        });
    }
    }


  };

  const handleChechTiltleLangAndChange = (ev, lng) => {
    if (lng == "ar") setArTitle(handleInputNameChange(ev, lng));
    else setEnTitle(handleInputNameChange(ev, lng));
  };

  const handleChechDescriptionLangAndChange = (ev, lng) => {
    if (lng == "ar") setArDescription(handleInputNameChange(ev, lng));
    else setEnDescription(handleInputNameChange(ev, lng));
  };

  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <DialogTitle>
        {Object.keys(editedProduct).length != 0 ? "edit product" : "add new product"}
      </DialogTitle>

      <DialogContent>
        <Grid container alignItems="center" justifyContent="space-evenly" columnSpacing={3}>
          <Grid item md={6} sm={6}>
            <ImageUpload setImage={setImage} imagePath={editedProduct?.imageCover} />
          </Grid>
          <Grid item md={6} sm={6}>
            <MultiImageUpload
              setMultiImage={setMultiImage}
              imgsLength={editedProduct?.images?.length}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              autoFocus
              margin="dense"
              label="english title"
              type="text"
              fullWidth
              value={enTitle}
              onChange={(eve) => handleChechTiltleLangAndChange(eve, "en")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              autoFocus
              margin="dense"
              label="arabic title"
              type="text"
              fullWidth
              value={arTitle}
              onChange={(eve) => handleChechTiltleLangAndChange(eve, "ar")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              autoFocus
              margin="dense"
              label="english description"
              type="text"
              fullWidth
              value={enDescription}
              onChange={(eve) => handleChechDescriptionLangAndChange(eve, "en")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
              autoFocus
              margin="dense"
              label="arabic description"
              type="text"
              fullWidth
              value={arDescription}
              onChange={(eve) => handleChechDescriptionLangAndChange(eve, "ar")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
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

          <Grid item xs={12} sm={6} md={4} lg={3}>
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
          <Grid item xs={12} sm={6} md={4} lg={3}>
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
          <Grid item xs={12} sm={6} md={4} lg={3}>
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

          <Grid item xs={12} style={{ marginTop: "10px" }} sm={6} md={6} lg={3}>
            <Grid container>
              <FormControl fullWidth>
                <InputLabel
                  id="demo-simple-select2-label"
                  style={{ paddingLeft: "3px", paddingRight: "3px", backgroundColor: "#FFF" }}
                >
                  color
                </InputLabel>
                <Select
                  style={{ height: "42px" }}
                  labelId="demo-simple-select2-label"
                  id="demo-simple-select2"
                  value={color}
                  onChange={handleColorChange}
                  multiple
                >
                  <MenuItem value="" disabled>
                    choose
                  </MenuItem>
                  <MenuItem value="white">white</MenuItem>
                  <MenuItem value="red">red</MenuItem>
                  <MenuItem value="blue">green</MenuItem>
                  <MenuItem value="yellow">blue</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ marginTop: "10px" }} sm={6} md={6} lg={3}>
            <Grid container>
              <FormControl fullWidth>
                <InputLabel
                  style={{ paddingLeft: "3px", paddingRight: "3px", backgroundColor: "#FFF" }}
                >
                  choose category
                </InputLabel>
                <Select style={{ height: "42px" }} value={category} onChange={handleCategoryChange}>
                  <MenuItem value="" disabled>
                    select
                  </MenuItem>
                  {categories.map((c) => (
                    <MenuItem key={c._id} value={c._id}>
                      {c.EnName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ marginTop: "10px" }} sm={6} md={6} lg={3}>
            <Grid container>
              <FormControl fullWidth>
                <InputLabel
                  style={{ paddingLeft: "3px", paddingRight: "3px", backgroundColor: "#FFF" }}
                >
                  choose sub category
                </InputLabel>
                <Select
                  style={{ height: "42px" }}
                  value={subCategory}
                  onChange={handleSubCategoryChange}
                >
                  <MenuItem value="" disabled>
                    select
                  </MenuItem>
                  {filteredSubCategories.map((s) => (
                    <MenuItem key={s._id} value={s._id}>
                      {s.EnName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ marginTop: "10px" }} sm={6} md={6} lg={3}>
            <Grid container>
              <FormControl fullWidth>
                <InputLabel
                  style={{ paddingLeft: "3px", paddingRight: "3px", backgroundColor: "#FFF" }}
                >
                  choose product brand
                </InputLabel>
                <Select style={{ height: "42px" }} value={brand} onChange={handleBrandsChange}>
                  <MenuItem value="" disabled>
                    select
                  </MenuItem>
                  {brands.map((b) => (
                    <MenuItem key={b._id} value={b._id}>
                      {b.EnName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ marginTop: "15px" }} sm={6} md={6} lg={3}>
            <Grid container>
              <FormControl fullWidth style={{ height: "200px" }}>
                <InputLabel
                  id="demo-simple-select2-label2"
                  style={{
                    paddingLeft: "3px",
                    paddingRight: "3px",
                    backgroundColor: "#FFF",
                  }}
                >
                  product options
                </InputLabel>
                <Select
                  style={{ height: "42px" }}
                  labelId="demo-simple-select2-label2"
                  id="demo-simple-select2"
                  value={optionsValue}
                  onChange={handleOptionsChange}
                  multiple
                >
                  <MenuItem value="" disabled>
                    choose
                  </MenuItem>
                  {options.map((o) => {
                    return (
                      <MenuItem key={o._id} value={o._id}>
                        {o.EnName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <p style={{ color: "red", display: "flex", justifyContent: "center", fontSize: "15px" }}>
        {error}
      </p>
      <DialogActions>
        <Button
          onClick={() => {
            cleanUp();
            onClose();
          }}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          disabled={loader}
          onClick={handleAddProduct}
          style={{ backgroundColor: "#43F", color: "#FFF" }}
        >
          {loader ? (
            <MDSpinner color="white" />
          ) : edited_flag ? (
            <>
              <Icon style={{ marginRight: "8px" }}>modeEdit</Icon>
              edit
            </>
          ) : (
            <>
              <Icon style={{ marginRight: "8px" }}>add</Icon>
              add
            </>
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
