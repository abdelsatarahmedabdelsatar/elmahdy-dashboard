import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import PropTypes from "prop-types";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Icon from "@mui/material/Icon";

const BrandsTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      {
        id: 173454,
        name: "ahmed",
        age: 23,
        title: "asdasdadasdasd",
      },
      {
        id: 173454,
        name: "ahmed",
        age: 23,
        title: "asdasdadasdasd",
      },
      {
        id: 173454,
        name: "ahmed",
        age: 23,
        title: "asdasdadasdasd",
      },
      {
        id: 173454,
        name: "ahmed",
        age: 23,
        title: "asdasdadasdasd",
      },
      {
        id: 173454,
        name: "ahmed",
        age: 23,
        title: "asdasdadasdasd",
      },
      {
        id: 173454,
        name: "ahmed",
        age: 23,
        title: "asdasdadasdasd",
      },
    ]);
  }, []);

  const handleBrandEdit = () => {
    alert("edit brand !");
  };

  const handleBrandDelete = () => {
    alert("delete brand !");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <TableContainer component={Paper}>
        <Table>
          <TableRow style={{ backgroundColor: "#444", color: "white" }}>
            <TableCell>id</TableCell>
            <TableCell>name</TableCell>
            <TableCell>age</TableCell>
            <TableCell>title</TableCell>
            <TableCell>action</TableCell>
          </TableRow>
          <TableBody>
            {data.map((row, index) => (
              <>
                <TableRow key={index}>
                  {Object.values(row).map((value, index) => (
                    <TableCell key={index}>{value}</TableCell>
                  ))}{" "}
                  <TableCell key={index}>
                    <Icon onClick={handleBrandEdit} style={{ cursor: "pointer" }}>
                      edit
                    </Icon>
                    <Icon color="error" onClick={handleBrandDelete} style={{ cursor: "pointer" }}>
                      delete
                    </Icon>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Footer />
    </DashboardLayout>
  );
};

BrandsTable.defaultProps = {
  data: [],
};

BrandsTable.propTypes = {
  data: PropTypes.array,
};

export default BrandsTable;
