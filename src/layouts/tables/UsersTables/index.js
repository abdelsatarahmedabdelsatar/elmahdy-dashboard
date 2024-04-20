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
import axios from "axios";

const UsersTables = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // axios.get("https://elmahdy.onrender.com/api/v1/users").then((res) => {
    //   console.log(res);
    // });

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

  const handleUserEdit = () => {
    alert("edit user !");
  };

  const handleUserDelete = () => {
    alert("delete user !");
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <TableContainer component={Paper}>
        <Table>
          <thead style={{ display: "table-header-group", color: "#FFF" }}>
            <tr style={{ backgroundColor: "#444" }}>
              <TableCell>id</TableCell>
              <TableCell>name</TableCell>
              <TableCell>age</TableCell>
              <TableCell>title</TableCell>
              <TableCell>action</TableCell>
            </tr>
          </thead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {Object.values(row).map((value, index) => (
                  <TableCell key={index}>{value}</TableCell>
                ))}
                <TableCell key={index}>
                  <Icon onClick={handleUserEdit} style={{ cursor: "pointer" }}>
                    edit
                  </Icon>
                  <Icon color="error" onClick={handleUserDelete} style={{ cursor: "pointer" }}>
                    delete
                  </Icon>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Footer />
    </DashboardLayout>
  );
};

UsersTables.defaultProps = {
  data: [],
};

UsersTables.propTypes = {
  data: PropTypes.array,
};

export default UsersTables;
