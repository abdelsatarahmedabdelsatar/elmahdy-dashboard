import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import { useState } from "react";
import { useEffect } from "react";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [brands, setbrands] = useState([]);
  const [products, setproducts] = useState([]);
  const [categories, setcategories] = useState([]);

  useEffect(() => {});

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Grid container spacing={5} mt={1}>
        <Grid item xs={12} md={6} lg={6}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="dark"
              icon="group"
              title="users"
              count={281}
              percentage={{
                color: "success",
                amount: "+55%",
                label: "than lask week",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              icon="reorder"
              title="products"
              count="234"
              percentage={{
                color: "success",
                amount: "+3%",
                label: "than last month",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="success"
              icon="dns"
              title="categories"
              count="8"
              percentage={{
                color: "success",
                amount: "+1%",
                label: "than yesterday",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="primary"
              icon="interests"
              title="brands"
              count="31"
              percentage={{
                color: "success",
                amount: "",
                label: "Just updated",
              }}
            />
          </MDBox>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default Dashboard;
