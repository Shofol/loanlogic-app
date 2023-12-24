import axios from "axios";
import Toast from "react-native-toast-message";
import { baseURL } from "./config";
const api = axios.create({
  baseURL: baseURL
});

let showNotFoundError = true;
let loadingToast: boolean = false;

api.interceptors.request.use(function (config) {
  if (config.method !== "get") {
    loadingToast = true;
    Toast.show({
      type: "info",
      text1: "Loading..."
    });
  }
  if (config.method === "get" && config.data) {
    showNotFoundError = config.data.showNotFoundError;
  }
  const tokenStr = localStorage.getItem("gesToken")
    ? localStorage.getItem("gesToken")
    : null;
  config.headers["Authorization"] = `Bearer ${tokenStr}`;
  return config;
});

api.interceptors.response.use(
  function (response) {
    if (loadingToast) {
      Toast.hide();
    }
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    if (loadingToast) {
      Toast.hide();
    }
    if (showNotFoundError) {
      Toast.show({
        type: "error",
        text1: error.response.data.error
      });
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default api;
