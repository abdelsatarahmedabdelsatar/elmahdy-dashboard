/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: /product/material-dashboard-react
* Copyright 2023 Creative Tim ()

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React base styles
import typography from "assets/theme/base/typography";

function Footer() {
  const { size } = typography;

  return (
    <MDBox
      width="100%"
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="end"
      alignItems="center"
      px={1.5}
      py={5}
    >
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        color="text"
        fontSize={size.sm}
        px={1.5}
      >
        &copy; {new Date().getFullYear()}, جميع الحقوق محفوظة لصالح شركة المهدي للدعايا والاعلان
      </MDBox>
    </MDBox>
  );
}

Footer.defaultProps = {
  company: { href: "#", name: "web developer" },
};

Footer.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
};

export default Footer;
