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
import axiosInstance from "axiosConfig/instance";
import SubCategoryModel from "layouts/popUpMpdels/SubCategoryModel";
import { toast } from "sonner";

const SubCategoriesTables = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [editedSubCategory, setEditedSubCategory] = useState({});
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

  const handleCategoryOpen = (obj) => {
    setEditedSubCategory(obj);
    setCategoryOpen(true);
  };
  const handleCategoryClose = () => {
    setCategoryOpen(false);
  };

  useEffect(() => {
    axiosInstance
      .get("api/v1/subCategory?limit=1000000", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setData(res.data.data.data);
        setLoader(false);
      })
      .catch((err) => {
          if(err.respone.data.message.includes("please login again")){
            localStorage.removeItem("token");
            window.location.reload();
          }
        setLoader(false);
        console.log(err);
      });
    return () => {
      setLoader(false);
      setData([]);
    };
  }, [refresh]);

  const handleCategoryDelete = (id) => {
    axiosInstance
      .delete("api/v1/subCategory/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setRefresh(!refresh);
        handleConfirmDeleteClose();
        toast.success("successfully subcategory deleted");
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
                  <TableCell>en name</TableCell>
                  <TableCell>ar name</TableCell>
                  <TableCell>category</TableCell>
                  <TableCell>created time</TableCell>
                  <TableCell>action</TableCell>
                </tr>
              </thead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.EnName}</TableCell>
                      <TableCell>{row.ArName}</TableCell>
                      <TableCell>{row.category?.EnName}</TableCell>
                      <TableCell>{row.createdAt.split("T")[0]}</TableCell>

                      <TableCell>
                        <Icon onClick={() => handleCategoryOpen(row)} style={{ cursor: "pointer" }}>
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
              rowsPerPageOptions={[5, 10, 25]}
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
      {categoryOpen && (
        <SubCategoryModel
          refresh={refresh}
          setRefresh={setRefresh}
          open={true}
          onClose={handleCategoryClose}
          editedSubCategory={editedSubCategory}
        />
      )}
      <div>
        <ConfirmModel
          title={`are you sure to delete ${deletedName} ?`}
          open={ConfirmDeleteopen}
          onClose={handleConfirmDeleteClose}
          onConfirm={() => handleCategoryDelete(deletedId)}
        />
      </div>
    </DashboardLayout>
  );
};

SubCategoriesTables.defaultProps = {
  data: [],
};

SubCategoriesTables.propTypes = {
  data: PropTypes.array,
};

export default SubCategoriesTables;
