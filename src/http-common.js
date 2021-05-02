import axios from "axios";
import VueCookies from "vue-cookies";
import Firebase from "./firebase.js";

const base = axios.create({
  baseURL: "http://localhost:8080//api",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
});
base.interceptors.request.use(
  (config) => {
    if (VueCookies.get("token") != null) {
      config.headers.Authorization = "Bearer " + VueCookies.get("token").token;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);
base.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      Firebase.logout();
    }
    return Promise.reject(error);
  }
);
export default base;
