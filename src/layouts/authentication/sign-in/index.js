import { Link } from "react-router-dom";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Card from "@mui/material/Card";
import { useState } from "react";
import MDSpinner from "components/MDSpinner/MDSpinner";
import axiosInstance from "axiosConfig/instance";

function Basic() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [signInLoader, setSignInLoader] = useState(false);
  const handleMailChange = (eve) => {
    setMail(eve.target.value);
  };

  const handlePasswordChange = (eve) => {
    setPassword(eve.target.value);
  };

  const handleSignIn = () => {
    if (password.length < 8) {
      setError("password should be more 8 character");
    } else {
      setSignInLoader(true);
      axiosInstance
        .post("api/v1/auth/login", {
          email: mail,
          password: password,
        })
        .then((res) => {
          setError("");
          setSignInLoader(false);
          if (res.data.data.role == "Admin") {
            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem("fullName", res.data.data.fullName);
            localStorage.setItem("img", res.data.data.profileImage);
            window.location.reload();
          } else {
            setError("you must ba an admin");
          }
        })
        .catch((err) => {
            if(err.response.data.message.includes("please login again")){
              localStorage.removeItem("token");
              window.location.reload();
            }
          setSignInLoader(false);
          setError("error in email or password");
        });
    }
  };
  return (
    <BasicLayout>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="warning"
          borderRadius="lg"
          coloredShadow="warning"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <img src="./logo_1.png" width={160} />
          {/* <MDTypography variant="h4" fontWeight="medium" color="black" mt={1}>
            elmahdy dashboard
          </MDTypography> */}
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                onChange={handleMailChange}
                value={mail}
                type="email"
                label="Email"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                onChange={handlePasswordChange}
                value={password}
                label="Password"
                fullWidth
              />
            </MDBox>
            {/* <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox> */}
            {error ? (
              <p
                style={{
                  color: "red",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "15px",
                }}
              >
                {error}
              </p>
            ) : (
              ""
            )}
            <MDBox mt={2} mb={1}>
              <MDButton
                disabled={signInLoader}
                variant="gradient"
                color="warning"
                fullWidth
                onClick={handleSignIn}
              >
                {signInLoader ? (
                  <MDSpinner color="black" />
                ) : (
                  <span style={{ color: "black" }}>sign in</span>
                )}
              </MDButton>
            </MDBox>
            {/* <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox> */}
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
