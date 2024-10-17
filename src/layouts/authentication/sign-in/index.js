/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { checkAdminSlice, userLoginDetailsSlice } from "../../../redux/root.slice";
import axios from "axios";
import { endpoints } from "config/constants/api.constants";
import MDAlert from "components/MDAlert";
import { Alert } from "@mui/material";
import { ErrorToast } from "components/Toast";

function Basic() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkAuthority = useSelector((state) => state.checkAdminReducer);
  const [invalidUser, setInvalidUser] = useState(false);
  const [noData, setnoData] = useState(false);
  const [errFields, setErrFields] = useState({
    userName: false,
    password: false,
  });
  useEffect(() => {
    dispatch(checkAdminSlice.actions.reset());
    dispatch(userLoginDetailsSlice.actions.reset());
  }, []);
  useEffect(() => {
    if (checkAuthority?.isSuccess && loginDetails?.userName && loginDetails?.password) {
      if (!checkAuthority?.response?.data?.isAdmin) {
        setInvalidUser(true);
        setTimeout(() => {
          setInvalidUser(false);
        }, 6000);
        setErrFields({
          userName: true,
          password: true,
        });
      } else {
        dispatch(userLoginDetailsSlice.actions.request(loginDetails));
        navigate("/dashboard");
      }
    }
  }, [checkAuthority]);
  const [loginDetails, setLoginDetails] = useState({
    userName: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);

  const onSignIn = async (e) => {
    e.preventDefault();
    if (!loginDetails.userName || !loginDetails.password) {
      setnoData(true);
      setTimeout(() => {
        setnoData(false);
      }, 6000);
      let err = {
        userName: false,
        password: false,
      };
      if (!loginDetails.userName) {
        err.userName = true;
      }
      if (!loginDetails.password) {
        err.password = true;
      }
      setErrFields(err);
    } else {
      dispatch(checkAdminSlice.actions.request(loginDetails));
    }
  };
  const handleOnchage = (e) => {
    e.preventDefault();
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
    setErrFields({
      ...errFields,
      [e.target.name]: false,
    });
  };

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <div>
      <BasicLayout image={bgImage}>
        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Sign in
            </MDTypography>
            <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
              <Grid item xs={2}>
                <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                  <FacebookIcon color="inherit" />
                </MDTypography>
              </Grid>
              <Grid item xs={2}>
                <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                  <GitHubIcon color="inherit" />
                </MDTypography>
              </Grid>
              <Grid item xs={2}>
                <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                  <GoogleIcon color="inherit" />
                </MDTypography>
              </Grid>
            </Grid>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={2}>
                <MDInput
                  type="userName"
                  label="UserName"
                  name="userName"
                  fullWidth
                  error={errFields.userName}
                  onChange={handleOnchage}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="password"
                  label="Password"
                  name="password"
                  fullWidth
                  error={errFields.password}
                  onChange={handleOnchage}
                />
              </MDBox>
              <MDBox display="flex" alignItems="center" ml={-1}>
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
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" color="info" fullWidth onClick={onSignIn}>
                  sign in
                </MDButton>
              </MDBox>
              <MDBox mt={3} mb={1} textAlign="center">
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
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </BasicLayout>
      {invalidUser && (
        <ErrorToast
          open={invalidUser}
          setOpen={setInvalidUser}
          message="Please enter valid username and password"
        />
      )}
      {noData && (
        <ErrorToast open={noData} setOpen={setnoData} message="Please both username and password" />
      )}
    </div>
  );
}

export default Basic;
