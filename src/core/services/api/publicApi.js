// src/services/api/publicApi.js
import axios from "axios";
import { envConfig } from "@/core/config/env.js";

const publicApi = axios.create({
  baseURL: envConfig.apiBaseUrl,
  // Use the shared timeout from env config for consistent behavior.
  timeout: envConfig.requestTimeoutMs,
  // headers: {
  //   Accept: "application/json",
  //   "Content-Type": "application/json",
  // },
});

export default publicApi;
