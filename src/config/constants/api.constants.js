const url = {
  BASE_URL: `${window.appDomain === "PROD" ? `http://localhost:3500/` : `http://localhost:3500/`}`,
};
const endpoints = {
  GET_ADMIN: `${url.BASE_URL}admin`,
  CHECK_ADMIN: `${url.BASE_URL}admin/authorise`,
};
const generic = {
  API_TIME_OUT: 60000,
};
export { endpoints, generic, url };
