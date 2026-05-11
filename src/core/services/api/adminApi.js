// src/services/api/adminApi.js
import axios from "axios";
import { envConfig } from "@/core/config/env.js";

const adminApi = axios.create({
  baseURL: envConfig.apiBaseAdminUrl,
  // Use the shared timeout from env config for consistent behavior.
  timeout: envConfig.requestTimeoutMs,
  // headers: {
  //   Accept: "application/json",
  //   "Content-Type": "application/json",
   
  // },
});

export default adminApi;
