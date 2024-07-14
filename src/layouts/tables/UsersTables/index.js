import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
} from "@mui/material";
import PropTypes from "prop-types";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Icon from "@mui/material/Icon";
import MDSpinner from "components/MDSpinner/MDSpinner";
import ConfirmModel from "layouts/popUpMpdels/ConfirmModel";
import UserModel from "layouts/popUpMpdels/UserModel";
import axiosInstance from "axiosConfig/instance";
import { toast } from "sonner";

const UsersTables = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [brandOpen, setBrandOpen] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [ConfirmDeleteopen, setConfirmDeleteOpen] = useState(false);
  const [deletedId, setDeletedId] = useState("");
  const [deletedName, setDeletedName] = useState("");

  const handleBrandOpen = (obj) => {
    setEditedUser(obj);
    setBrandOpen(true);
  };
  const handleUserClose = () => {
    setBrandOpen(false);
  };

  const handleConfirmDeleteOpen = (id, name) => {
    setDeletedId(id);
    setDeletedName(name);
    setConfirmDeleteOpen(true);
  };

  const handleConfirmDeleteClose = () => {
    setConfirmDeleteOpen(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    axiosInstance
      .get("api/v1/users?limit=1000000", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setData(res.data.data.data);
        setLoader(false);
      })
      .catch((err) => {
        if (err.response.data.message.includes("please login again")) {
          localStorage.removeItem("token");
          window.location.reload();
        }
        setLoader(false);
      });
  }, [refresh]);

  const handleUserDelete = (id) => {
    axiosInstance
      .delete("api/v1/users/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setRefresh(!refresh);
        handleConfirmDeleteClose();
        toast.success("successfully user deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <DashboardLayout>
      {loader ? (
        <div style={{ marginTop: "22%", marginBottom: "22%" }}>
          <MDSpinner size={40} />
        </div>
      ) : (
        <>
          <DashboardNavbar refresh={refresh} setRefresh={setRefresh} />
          <TableContainer component={Paper}>
            <Table>
              <thead style={{ display: "table-header-group", color: "#FFF" }}>
                <tr style={{ backgroundColor: "#444" }}>
                  <TableCell>image</TableCell>
                  <TableCell>full name</TableCell>
                  <TableCell>username</TableCell>
                  <TableCell>address</TableCell>
                  <TableCell>email</TableCell>
                  <TableCell>mobile</TableCell>
                  <TableCell>action</TableCell>
                </tr>
              </thead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow
                      style={{ backgroundColor: row.role == "Admin" ? "#DEDEFF" : "" }}
                      key={index}
                    >
                      <TableCell>
                        {" "}
                        <img
                          width={40}
                          height={30}
                          // src={`https://elmahdy.onrender.com/${row.profileImage}`}
                          src={'./logo_2.png'}
                        />
                      </TableCell>
                      <TableCell>
                        <span style={{ fontWeight: "bold" }}>
                          {row.role == "Admin" ? (
                            <span style={{ color: "#2244FF" }}>{row.fullName}</span>
                          ) : (
                            row.fullName
                          )}
                        </span>
                      </TableCell>
                      <TableCell>{row.userName}</TableCell>
                      <TableCell>{row.adress}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.mobile}</TableCell>
                      <span style={{ backgroundColor: row.role == "Admin" ? "#DEDEFF" : "" }}>
                        {!(row.role == "Admin") && (
                          <TableCell>
                            <Icon
                              onClick={() => handleBrandOpen(row)}
                              style={{ cursor: "pointer" }}
                            >
                              edit
                            </Icon>
                            <Icon
                              color="error"
                              onClick={() => handleConfirmDeleteOpen(row._id, row.fullName)}
                              style={{ cursor: "pointer" }}
                            >
                              delete
                            </Icon>
                          </TableCell>
                        )}
                      </span>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]} // Specify the rows per page options
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </>
      )}
      <div>
        <ConfirmModel
          title={`are you sure to delete ${deletedName} ?`}
          open={ConfirmDeleteopen}
          onClose={handleConfirmDeleteClose}
          onConfirm={() => handleUserDelete(deletedId)}
        />
      </div>
      <Footer />
      {brandOpen && (
        <UserModel
          refresh={refresh}
          setRefresh={setRefresh}
          open={true}
          onClose={handleUserClose}
          editedUser={editedUser}
        />
      )}
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
