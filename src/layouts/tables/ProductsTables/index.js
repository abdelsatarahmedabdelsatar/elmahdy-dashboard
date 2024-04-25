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
import ProductModel from "layouts/popUpMpdels/ProductModel";
import ConfirmModel from "layouts/popUpMpdels/ConfirmModel";
import axiosInstance from "axiosConfig/instance";

const ProductsTables = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [productOpen, setProductOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState({});
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
    console.log(obj);
    setEditedProduct(obj);
    setProductOpen(true);
  };
  const handleCategoryClose = () => {
    setProductOpen(false);
  };
  useEffect(() => {
    axiosInstance
      .get("api/v1/product", {
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

  const handleProductDelete = (id) => {
    axiosInstance
      .delete("api/v1/product/" + id, {
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
          <DashboardNavbar refresh={refresh} setRefresh={setRefresh} />
          <TableContainer component={Paper}>
            <Table>
              <thead style={{ display: "table-header-group", color: "#FFF" }}>
                <tr style={{ backgroundColor: "#444" }}>
                  <TableCell>title</TableCell>
                  <TableCell>price</TableCell>
                  <TableCell>avg rating</TableCell>
                  <TableCell>category</TableCell>
                  <TableCell>quantity</TableCell>
                  <TableCell>action</TableCell>
                </tr>
              </thead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.price}</TableCell>
                      <TableCell>{row.ratingsAverage}</TableCell>
                      <TableCell>{row.category.name}</TableCell>
                      <TableCell>{row.quantity}</TableCell>
                      <TableCell>
                        <Icon onClick={() => handleproductOpen(row)} style={{ cursor: "pointer" }}>
                          edit
                        </Icon>
                        <Icon
                          color="error"
                          onClick={() => handleConfirmDeleteOpen(row._id, row.title)}
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
        <ProductModel
          refresh={refresh}
          setRefresh={setRefresh}
          open={true}
          onClose={handleCategoryClose}
          editedProduct={editedProduct}
        />
      )}
      <div>
        <ConfirmModel
          title={`are you sure to delete ${deletedName} ?`}
          open={ConfirmDeleteopen}
          onClose={handleConfirmDeleteClose}
          onConfirm={() => handleProductDelete(deletedId)}
        />
      </div>
    </DashboardLayout>
  );
};

ProductsTables.defaultProps = {
  data: [],
};

ProductsTables.propTypes = {
  data: PropTypes.array,
};

export default ProductsTables;
