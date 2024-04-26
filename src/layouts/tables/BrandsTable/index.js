import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TablePagination,
  Paper,
} from "@mui/material";
import PropTypes from "prop-types";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Icon from "@mui/material/Icon";
import MDSpinner from "components/MDSpinner/MDSpinner";
import BrandsModel from "layouts/popUpMpdels/BrandModel";
import ConfirmModel from "layouts/popUpMpdels/ConfirmModel";
import axiosInstance from "axiosConfig/instance";

const BrandsTable = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [brandOpen, setBrandOpen] = useState(false);
  const [editedBrand, setEditedBrand] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [ConfirmDeleteopen, setConfirmDeleteOpen] = useState(false);
  const [deletedId, setDeletedId] = useState("");
  const [deletedName, setDeletedName] = useState("");

  const handleConfirmDeleteOpen = (id, name) => {
    setDeletedName(name);
    setDeletedId(id);
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
      .get("api/v1/brand", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setData(res.data.data.data);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });

    return () => {
      setLoader(false);
      setData([]);
    };
  }, [refresh]);

  const handleBrandOpen = (obj) => {
    setEditedBrand(obj);
    setBrandOpen(true);
  };
  const handleBrandClose = () => {
    setBrandOpen(false);
  };

  const handleBrandDelete = (id) => {
    axiosInstance
      .delete("api/v1/brand/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setRefresh(!refresh);
        handleConfirmDeleteClose();
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
          {" "}
          <DashboardNavbar refresh={refresh} setRefresh={setRefresh} />{" "}
          <TableContainer component={Paper}>
            <Table>
              <thead style={{ display: "table-header-group", color: "#FFF" }}>
                <tr style={{ backgroundColor: "#444" }}>
                  <TableCell>logo</TableCell>
                  <TableCell>en name</TableCell>
                  <TableCell>ar name</TableCell>
                  <TableCell>created time</TableCell>
                  <TableCell>action</TableCell>
                </tr>
              </thead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {" "}
                        <img
                          width={30}
                          height={30}
                          src={`https://elmahdy.onrender.com/${row.image}`}
                        />
                      </TableCell>
                      <TableCell>{row.EnName}</TableCell>
                      <TableCell>{row.ArName}</TableCell>
                      <TableCell>{row.createdAt.split("T")[0]}</TableCell>
                      <TableCell>
                        <Icon onClick={() => handleBrandOpen(row)} style={{ cursor: "pointer" }}>
                          edit
                        </Icon>
                        <Icon
                          color="error"
                          onClick={() => handleConfirmDeleteOpen(row._id, row.name)}
                          style={{ cursor: "pointer" }}
                        >
                          delete
                        </Icon>
                      </TableCell>
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

      <Footer />
      {brandOpen && (
        <BrandsModel
          refresh={refresh}
          setRefresh={setRefresh}
          open={true}
          onClose={handleBrandClose}
          editedBrand={editedBrand}
        />
      )}
      <div>
        <ConfirmModel
          title={`are you sure to delete ${deletedName} ?`}
          open={ConfirmDeleteopen}
          onClose={handleConfirmDeleteClose}
          onConfirm={() => handleBrandDelete(deletedId)}
        />
      </div>
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
