import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import { useState, useEffect } from "react";
import axiosInstance from "axiosConfig/instance";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [brands, setbrands] = useState([]);
  const [products, setproducts] = useState([]);
  const [categories, setcategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("api/v1/users", {
        params: {
          isActive: true,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUsers(res.data.data.data);
      });
    axiosInstance
      .get("api/v1/category", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setcategories(res.data.data.data);
      });
    axiosInstance
      .get("api/v1/product", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setproducts(res.data.data.data);
      });
    axiosInstance
      .get("api/v1/brand", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setbrands(res.data.data.data);
      });
    axiosInstance
      .get("api/v1/subCategory", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setSubcategories(res.data.data.data);
      });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Grid container spacing={5} mt={1}>
        <Grid item xs={12} md={6} lg={6}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard color="dark" icon="group" title="users" count={users.length} />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard icon="reorder" title="products" count={products.length} />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="success"
              icon="dns"
              title="categories"
              count={categories.length}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="warning"
              icon="sort"
              title="sub category"
              count={subcategories.length}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="primary"
              icon="interests"
              title="brands"
              count={brands.length}
            />
          </MDBox>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default Dashboard;
