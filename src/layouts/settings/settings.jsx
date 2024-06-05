import Grid from "@mui/material/Grid";
import MultiImageUpload from "./../../components/MDMultiImageUpload/index";
import TextField from "@mui/material/TextField";
import DashboardLayout from "./../../examples/LayoutContainers/DashboardLayout/index";
import { useState, useEffect } from "react";
import axiosInstance from "./../../axiosConfig/instance";
import { Button } from "@mui/material";
import MDSpinner from "./../../components/MDSpinner/MDSpinner";
import { toast } from "sonner";

function Settings() {
  const [images, setImages] = useState([]);
  const [miliSec, setMiliSec] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    axiosInstance
      .get("api/v1/settings/6645f573b0c3ba6f3ced3e9c", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setImages(res.data.data.images);
        setMiliSec(res.data.data.numberOfSecondForImage);
      }).catch((err)=>{
        if(err.response.data.message.includes("please login again")){
          localStorage.removeItem("token");
          window.location.reload();
        }
      });;
  }, []);

  const handleEdit = () => {
    const formData = new FormData();

    for (let i = 0; i < images.length; i++) {
      formData.append(`images`, images[i], images[i].name);
    }

    formData.append("numberOfSecondForImage", miliSec);
    setLoader(true);
    axiosInstance
      .put(
        "api/v1/settings/6645f573b0c3ba6f3ced3e9c",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.data);
        setLoader(false);
        toast.success("advertising images edited successfully");
      });
  };

  return (
    <>
      <DashboardLayout>
        <div style={{ margin: "15px" }}>
          <h4>Advertising images : </h4>
          <Grid
            borderRadius={2}
            alignContent={"center"}
            mt={4}
            p={5}
            bgcolor="#FEFEFE"
            container
            alignItems="center"
            justifyContent="space-evenly"
            columnSpacing={3}
          >
            <Grid justifyContent={"center"}>
              <MultiImageUpload setMultiImage={setImages} imgsLength={images?.length} />
            </Grid>
            <Grid>
              time in milliseconds
              <TextField
                autoFocus
                margin="dense"
                label="time"
                type="number"
                fullWidth
                value={miliSec}
                onChange={(eve) => setMiliSec(eve.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            disabled={loader}
            onClick={handleEdit}
            style={{ backgroundColor: "#43F", color: "#FFF", float: "right", marginTop: "15px" }}
          >
            {loader ? <MDSpinner color="white" /> : "edit"}
          </Button>
        </div>
      </DashboardLayout>
    </>
  );
}

export default Settings;
