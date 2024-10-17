/* eslint-disable react/prop-types */
import { Alert, createTheme, Snackbar, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
const theme = createTheme({
  palette: {
    success: {
      main: "#0E2F61",
    },
    error: {
      main: "#B10000",
    },
  },
});

function ErrorToast(props) {
  const { open, message, setOpen } = props;
  const [openToast, setOpentoast] = useState(false);
  useEffect(() => {
    if (open) {
      setOpentoast(true);
    }
  }, [open]);

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        open={openToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={() => {
          setOpentoast(false);
          setOpen(false);
        }}
      >
        <Alert
          variant="filled"
          sx={{
            width: "100%",
            marginBottom: "74px",
            bgcolor: "#B10000",
            borderRadius: "0px",
            marginRight: "42px",
          }}
          onClose={() => {
            setOpentoast(false);
            setOpen(false);
          }}
          severity="error"
        >
          {message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

function SuccessToast(props) {
  const { open, message, setOpen } = props;
  const [openToast, setOpentoast] = useState(false);
  useEffect(() => {
    if (open) {
      setOpentoast(true);
    }
  }, [open]);

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        open={openToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={() => {
          setOpentoast(false);
          setOpen(false);
        }}
      >
        <Alert
          variant="filled"
          sx={{
            width: "100%",
            marginBottom: "74px",
            bgcolor: "#0E2F61",
            borderRadius: "0px",
            marginRight: "42px",
          }}
          onClose={() => {
            setOpentoast(false);
            setOpen(false);
          }}
          severity="success"
        >
          {message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
export { ErrorToast, SuccessToast };
