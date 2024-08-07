import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MDBox from "components/MDBox";
import Breadcrumbs from "examples/Breadcrumbs";
import { navbar, navbarContainer } from "examples/Navbars/DashboardNavbar/styles";
import MDButton from "./../../../components/MDButton/index";
import UserModel from "layouts/popUpMpdels/UserModel";
import BrandsModel from "layouts/popUpMpdels/BrandModel";
import CategoryModel from "layouts/popUpMpdels/CategoryModel";
import ProductModel from "layouts/popUpMpdels/ProductModel";
import SubCategoryModel from "layouts/popUpMpdels/SubCategoryModel";

import { useMaterialUIController, setTransparentNavbar } from "context";
import Icon from "@mui/material/Icon";
import OptionsModel from "layouts/popUpMpdels/OptionsModel";

function DashboardNavbar({ absolute, light, isMini, refresh, setRefresh }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const route = useLocation().pathname.split("/").slice(1);

  const [userOpen, setUserOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [subcategoryOpen, setSubCategoryOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);

  const handleUserOpen = () => {
    setUserOpen(true);
  };
  const handleUserClose = (eve,reason) => {
    if (reason && reason === "backdropClick") 
    return;
    setUserOpen(false);
  };

  const handleProductOpen = () => {
    setProductOpen(true);
  };
  const handleProductClose = (eve, reason) => {
    if (reason && reason === "backdropClick") 
    return;
    setProductOpen(false);
  };

  const handleOptionsOpen = () => {
    setOptionsOpen(true);
  };
  const handleOptionsClose = (eve, reason) => {
    if (reason && reason === "backdropClick") 
        return;
    setOptionsOpen(false);
  };

  const handleCategoryOpen = () => {
    
    setCategoryOpen(true);
  };
  const handleCategoryClose = (eve, reason) => {
    if (reason && reason === "backdropClick") 
    return;
    setCategoryOpen(false);
  };

  const handleSubCategoryOpen = () => {
    setSubCategoryOpen(true);
  };
  const handleSubCategoryClose = (eve, reason) => {
    if (reason && reason === "backdropClick") 
    return;
    setSubCategoryOpen(false);
  };

  const handleBrandOpen = () => {
    setBrandOpen(true);
  };
  const handleBrandClose = (eve, reason) => {
    if (reason && reason === "backdropClick") 
    return;
    setBrandOpen(false);
  };

  useEffect(() => {
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }
    window.addEventListener("scroll", handleTransparentNavbar);

    handleTransparentNavbar();

    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const ButtonStyle = { backgroundColor: "#ffcc1b", color: "#000" };

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox color="inherit">
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </MDBox>
        {route == "users" ? (
          <MDButton style={{ ...ButtonStyle }} onClick={handleUserOpen}>
            <Icon style={{ marginRight: "10px" }}>add</Icon> add user
          </MDButton>
        ) : route == "categories" ? (
          <MDButton style={{ ...ButtonStyle }} onClick={handleCategoryOpen}>
            <Icon style={{ marginRight: "10px" }}>add</Icon> add category
          </MDButton>
        ) : route == "brands" ? (
          <MDButton style={{ ...ButtonStyle }} onClick={handleBrandOpen}>
            <Icon style={{ marginRight: "10px" }}>add</Icon> add brand
          </MDButton>
        ) : route == "products" ? (
          <MDButton style={{ ...ButtonStyle }} onClick={handleProductOpen}>
            <Icon style={{ marginRight: "10px" }}>add</Icon> add product
          </MDButton>
        ) : route == "subCategories" ? (
          <MDButton style={{ ...ButtonStyle }} onClick={handleSubCategoryOpen}>
            <Icon style={{ marginRight: "10px" }}>add</Icon> add sub category
          </MDButton>
        ) :route == "product-options" ? (
          <MDButton style={{ ...ButtonStyle }} onClick={handleOptionsOpen}>
            <Icon style={{ marginRight: "10px" }}>add</Icon> add option
          </MDButton>
        ) :(
          ""
        )}
      </Toolbar>
      <BrandsModel
        refresh={refresh}
        setRefresh={setRefresh}
        open={brandOpen}
        onClose={handleBrandClose}
      />
      <CategoryModel
        refresh={refresh}
        setRefresh={setRefresh}
        open={categoryOpen}
        onClose={handleCategoryClose}
      />
      <SubCategoryModel
        refresh={refresh}
        setRefresh={setRefresh}
        open={subcategoryOpen}
        onClose={handleSubCategoryClose}
      />
      <ProductModel
        refresh={refresh}
        setRefresh={setRefresh}
        open={productOpen}
        onClose={handleProductClose}
      />
       <OptionsModel
        refresh={refresh}
        setRefresh={setRefresh}
        open={optionsOpen}
        onClose={handleOptionsClose}
      />
      <UserModel
        refresh={refresh}
        setRefresh={setRefresh}
        open={userOpen}
        onClose={handleUserClose}
      />
    </AppBar>
  );
}

DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
  refresh: false,
  setRefresh: undefined,
};

DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
  refresh: PropTypes.bool,
  setRefresh: PropTypes.func,
};

export default DashboardNavbar;
