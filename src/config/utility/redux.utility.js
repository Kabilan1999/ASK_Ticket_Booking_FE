import { createSlice } from "@reduxjs/toolkit";
import { actions } from "react-table";
const initialState = {
  isLoading: false,
  isLoaded: false,
  request: {},
  response: {},
  isError: false,
  isSuccess: false,
  error: {},
  flag: false,
  reset: false,
};

export const getSlice = (name) =>
  createSlice({
    name,
    initialState,
    reducers: {
      request: (state, action) => {
        state.isLoading = true;
        state.isLoaded = false;
        state.request = action.payload;
        state.error = {};
        state.reset = false;
        state.isSuccess = false;
        state.isError = false;
        state.flag = false;
      },
      response: (state, action) => {
        state.isLoading = false;
        state.isLoaded = true;
        state.response = action.payload;
        state.error = {};
        state.reset = false;
        state.isSuccess = true;
        state.isError = false;
        state.flag = false;
      },
      error: (state, action) => {
        state.isLoading = false;
        state.isLoaded = true;
        state.error = action.payload;
        state.response = {};
        state.reset = false;
        state.isSuccess = true;
        state.isError = true;
        state.flag = false;
      },
      flag: (state) => {
        state.flag = true;
      },
      reset: (state) => {
        state.isLoading = false;
        state.isLoaded = false;
        state.request = {};
        state.response = {};
        state.error = {};
        state.reset = true;
        state.isSuccess = false;
        state.isError = false;
        state.flag = false;
      },
      put: (state, action) => {
        //used for without saga and store in reducers
        state.response = action.payload;
      },
    },
  });
