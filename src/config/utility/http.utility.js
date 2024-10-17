import axios from "axios";
import { generic } from "config/constants/api.constants";
import { isString } from "lodash";
const config = {
  timeout: generic.API_TIME_OUT,
  headers: window?.headers || {},
  params: {},
  data: {},
  withCredentials: false,
  maxRedirects: 3,
  onUploadProgress: (progressEvent) => progressEvent,
  onDownloadProgress: (progressEvent) => progressEvent,
};

const instance = axios.create(config);

instance.interceptors.response.use(
  (response) => {
    if (response && response?.status === 200 && response?.data?.status === "failure") {
      const errorMessage = response?.data?.errorMessage || "Data Empty";
      window.setHttpErrorMessage(errorMessage);
      setTimeout(() => {
        window.setHttpErrorMessage("");
      }, 6000);
    }
    return response;
  },
  (error) => {
    if (error?.response?.status === 400) {
      let combinedError = "";
      const flag = false;
      const fields = [];

      if (error?.response?.data?.errorMessage) {
        if (isString(error?.response?.data?.errorMessage)) {
          combinedError = error?.response?.data?.errorMessage;
        } else {
          Object.keys(error?.response?.data?.errorMessage).forEach((key) => {
            if (Object.hasOwnProperty.call(error?.response?.data?.errorMessage, key)) {
              fields.push(key.replace("_", ""));
              combinedError += `${error?.response?.data?.errorMessage[key][0]}`;
            }
          });
        }
      }

      if (flag) {
        combinedError = "Technical Error. Please contact technical team";
        console.log("API Failed", fields);
      }

      window.setHttpErrorMessage(combinedError || "Network issue. Please contact technical team");
      setTimeout(() => {
        window.setHttpErrorMessage("");
      }, 6000);
    }

    if (error?.response?.status === 500) {
      window.setHttpErrorMessage("Server exception. Please contact support team");
      setTimeout(() => {
        window.setHttpErrorMessage("");
      }, 6000);
    }

    return Promise.reject(new Error(error));
  }
);
const post = (endpoint, data, configuration = {}) => {
  const postConfig = configuration;
  if (window?.headers) {
    postConfig.headers = window?.headers || {};
  }

  return instance
    .post(endpoint, data, postConfig)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    })
    .finally(() => {});
};

const get = (endpoint, configuration = {}) => {
  const getConfig = configuration;
  if (window?.headers) {
    getConfig.headers = window?.headers || {};
  }

  return instance
    .get(endpoint, getConfig)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    })
    .finally(() => {});
};

const deleteHTTP = (endpoint, configuration = {}) => {
  const deleteConfig = configuration;
  if (window?.headers) {
    deleteConfig.headers = window?.headers || {};
  }

  return instance
    .delete(endpoint, deleteConfig)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    })
    .finally(() => {});
};

const putHTTP = (endpoint, data, configuration = {}) => {
  const putConfig = configuration;
  if (window?.headers) {
    putConfig.headers = window?.headers || {};
  }

  return instance
    .put(endpoint, data, putConfig)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    })
    .finally(() => {});
};

export { post, get, deleteHTTP, putHTTP, config };
