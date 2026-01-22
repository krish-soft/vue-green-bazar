// src/services/api/publicApi.js
import axios from "axios";
import { envConfig } from "@/core/config/env.js";

const publicApi = axios.create({
  baseURL: envConfig.apiBaseUrl,
  timeout: 30000,
  // headers: {
  //   Accept: "application/json",
  //   "Content-Type": "application/json",
  // },
});

export default publicApi;
