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

function DashboardNavbar({ absolute, light, isMini, refresh, setRefresh }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const route = useLocation().pathname.split("/").slice(1);

  const [userOpen, setUserOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [subcategoryOpen, setSubCategoryOpen] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);

  const handleUserOpen = () => {
    setUserOpen(true);
  };
  const handleUserClose = () => {
    setUserOpen(false);
  };

  const handleProductOpen = () => {
    setProductOpen(true);
  };
  const handleProductClose = () => {
    setProductOpen(false);
  };

  const handleCategoryOpen = () => {
    setCategoryOpen(true);
  };
  const handleCategoryClose = () => {
    setCategoryOpen(false);
  };

  const handleSubCategoryOpen = () => {
    setSubCategoryOpen(true);
  };
  const handleSubCategoryClose = () => {
    setSubCategoryOpen(false);
  };

  const handleBrandOpen = () => {
    setBrandOpen(true);
  };
  const handleBrandClose = () => {
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

  // const handleCloseMenu = () => setOpenMenu(false);

  // const renderMenu = () => (
  //   <Menu
  //     anchorEl={openMenu}
  //     anchorReference={null}
  //     anchorOrigin={{
  //       vertical: "bottom",
  //       horizontal: "left",
  //     }}
  //     open={Boolean(openMenu)}
  //     onClose={handleCloseMenu}
  //     sx={{ mt: 2 }}
  //   >
  //     <NotificationItem icon={<Icon>email</Icon>} title="Check new messages" />
  //     <NotificationItem icon={<Icon>podcasts</Icon>} title="Manage Podcast sessions" />
  //     <NotificationItem icon={<Icon>shopping_cart</Icon>} title="Payment successfully completed" />
  //   </Menu>
  // );

  const ButtonStyle = { backgroundColor: "#23F", color: "#FFF" };

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
            add user
          </MDButton>
        ) : route == "categories" ? (
          <MDButton style={{ ...ButtonStyle }} onClick={handleCategoryOpen}>
            add category
          </MDButton>
        ) : route == "brands" ? (
          <MDButton style={{ ...ButtonStyle }} onClick={handleBrandOpen}>
            add brand
          </MDButton>
        ) : route == "products" ? (
          <MDButton style={{ ...ButtonStyle }} onClick={handleProductOpen}>
            add product
          </MDButton>
        ) : route == "subCategories" ? (
          <MDButton style={{ ...ButtonStyle }} onClick={handleSubCategoryOpen}>
            add sub category
          </MDButton>
        ) : (
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
