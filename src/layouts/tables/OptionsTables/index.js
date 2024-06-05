import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  Icon,
} from "@mui/material";
import PropTypes from "prop-types";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDSpinner from "components/MDSpinner/MDSpinner";
import ConfirmModel from "layouts/popUpMpdels/ConfirmModel";
import axiosInstance from "axiosConfig/instance";
import { toast } from "sonner";
import OptionsModel from "layouts/popUpMpdels/OptionsModel";
import axios from "axios";

const OptionsTables = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [productOpen, setProductOpen] = useState(false);
  const [editedOption, setEditedOption] = useState({});
  const [refresh, setRefresh] = useState(false);
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

  const handleproductOpen = (obj) => {
    setEditedOption(obj);
    setProductOpen(true);
  };
  const handleCategoryClose = () => {
    setProductOpen(false);
  };
  useEffect(() => {
    axiosInstance
      .get("api/v1/option", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setData(res.data.data.data);
        console.log(res.data.data.data);
        setLoader(false);
      })
      .catch((err) => {
          // if(err.response.data.message.includes("please login again")){
          //   localStorage.removeItem("token");
          //   window.location.reload();
          // }
        setLoader(false);
        console.log(err);
      });
  }, [refresh]);

  const handleOptionDelete = (id) => {
    axiosInstance
      .delete("api/v1/option/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setRefresh(!refresh);
        handleConfirmDeleteClose();
        toast.success("successfully product deleted");
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
                <tr style={{ backgroundColor: "#444"}}>
                  <TableCell>name</TableCell>
                  <TableCell>title</TableCell>
                  <TableCell>type</TableCell>
                  <TableCell>money added</TableCell>
                  <TableCell>actions</TableCell>

                </tr>
              </thead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index} >
                      <TableCell>{row.EnName}</TableCell>
                      <TableCell>{row.EnTitle}</TableCell>
                      <TableCell>{row.type}</TableCell>
                      <TableCell>{row.moreMoney}</TableCell>
                      
                      <TableCell>
                        <Icon onClick={() => handleproductOpen(row)} style={{ cursor: "pointer" }}>
                          edit
                        </Icon>
                        <Icon
                          color="error"
                          onClick={() => handleConfirmDeleteOpen(row._id, row.EnName)}
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
      {productOpen && (
        <OptionsModel
          refresh={refresh}
          setRefresh={setRefresh}
          open={true}
          onClose={handleCategoryClose}
          editedOption={editedOption}
        />
      )}
      <div>
        <ConfirmModel
          title={`are you sure to delete ${deletedName} ?`}
          open={ConfirmDeleteopen}
          onClose={handleConfirmDeleteClose}
          onConfirm={() => handleOptionDelete(deletedId)}
        />
      </div>
    </DashboardLayout>
  );
};

OptionsTables.defaultProps = {
  data: [],
};

OptionsTables.propTypes = {
  data: PropTypes.array,
};

export default OptionsTables;
