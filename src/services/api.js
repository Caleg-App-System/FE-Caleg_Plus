import axios from "axios";

const API = axios.create({
  // baseURL: "https://calegplus-dev.up.railway.app",
  // baseURL: "http://localhost:8000",
  baseURL: "http://be.bitingku.com",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
  },
});

API.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.status !== 401) {
      throw err;
    }
    throw err;
    // console.log(err.response)
    // if (typeof err.response.data.error.name !== 'undefined') {
    //   if ( err.response.data.error.name === 'TokenExpiredError') {
    //     // store.dispatch(logout());
    //     throw err
    //   }
    // }
  }
);

export default API;
