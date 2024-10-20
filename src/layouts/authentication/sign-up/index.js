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

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import React, { useEffect, useState } from "react";
import { addAdminSlice } from "../../../redux/root.slice";
import { useDispatch, useSelector } from "react-redux";
import { ErrorToast, SuccessToast } from "components/Toast";

function Cover() {
  const dispatch = useDispatch();
  const [registerationSuccess, setRegisterationSuccess] = useState(false);
  const [userDetails, setUserDetails] = useState({
    userName: "",
    password: "",
    email: "",
  });
  const addAdminSelector = useSelector((state) => state.addAdminReducer);
  const navigate = useNavigate();
  const [noData, setNoData] = useState(false);
  const [errFields, setErrFields] = useState({
    userName: false,
    password: false,
    email: false,
  });
  useEffect(() => {
    console.log("addAdminSelector", addAdminSelector);

    if (
      addAdminSelector?.isSuccess &&
      userDetails.userName &&
      userDetails.email &&
      userDetails.password
    ) {
      setRegisterationSuccess(true);
      setTimeout(() => {
        setRegisterationSuccess(false);
        navigate("/dashboard");
      }, 6000);
    }
  }, [addAdminSelector]);
  const handleOnchage = (e) => {
    e.preventDefault();
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    setErrFields({
      ...errFields,
      [e.target.name]: false,
    });
  };
  const onSignUp = async (e) => {
    e.preventDefault();
    if (!userDetails.userName || !userDetails.password || !userDetails.email) {
      setNoData(true);
      setTimeout(() => {
        setNoData(false);
      }, 6000);
      let err = {
        userName: false,
        password: false,
        email: false,
      };
      if (!userDetails.userName) {
        err.userName = true;
      }
      if (!userDetails.password) {
        err.password = true;
      }
      if (!userDetails.email) {
        err.email = true;
      }
      setErrFields(err);
    } else {
      dispatch(addAdminSlice.actions.request(userDetails));
    }
  };
  return (
    <div>
      <CoverLayout image={bgImage}>
        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="success"
            mx={2}
            mt={-3}
            p={3}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Join us today
            </MDTypography>
            <MDTypography display="block" variant="button" color="white" my={1}>
              Enter your email and password to register
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  name="userName"
                  label="UserName"
                  variant="standard"
                  onChange={handleOnchage}
                  error={errFields.userName}
                  fullWidth
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="email"
                  name="email"
                  label="Email"
                  variant="standard"
                  onChange={handleOnchage}
                  error={errFields.email}
                  fullWidth
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="password"
                  name="password"
                  label="Password"
                  variant="standard"
                  onChange={handleOnchage}
                  error={errFields.password}
                  fullWidth
                />
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" color="info" fullWidth onClick={onSignUp}>
                  sign up
                </MDButton>
              </MDBox>
              <MDBox mt={3} mb={1} textAlign="center">
                <MDTypography variant="button" color="text">
                  Already have an account?{" "}
                  <MDTypography
                    component={Link}
                    to="/authentication/sign-in"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Sign In
                  </MDTypography>
                </MDTypography>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </CoverLayout>
      {noData && <ErrorToast open={noData} setOpen={setNoData} message="Please enter all fields" />}
      {registerationSuccess && (
        <SuccessToast
          open={registerationSuccess}
          setOpen={setRegisterationSuccess}
          message="Signup Successful"
        />
      )}
    </div>
  );
}

export default Cover;
