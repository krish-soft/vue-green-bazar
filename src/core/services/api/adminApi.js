// src/services/api/adminApi.js
import axios from "axios";
import { envConfig } from "@/core/config/env.js";

const adminApi = axios.create({
  baseURL: envConfig.apiBaseAdminUrl,
  timeout: 30000,
  // headers: {
  //   Accept: "application/json",
  //   "Content-Type": "application/json",
   
  // },
});

export default adminApi;
