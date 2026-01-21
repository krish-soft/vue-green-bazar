// src/services/api/index.js
import adminApi from "./adminApi";
import publicApi from "./publicApi";
import { attachAuth, handleError } from "./helpers";
import router from "@/router";

import { useAuthStore } from "@/utils/stores/authStore";
import { useUIStore } from "@/utils/stores/uiStore";

const API_DEBUG = true; // ❗ set false in production

/* --------------------------------
 | CORE REQUEST WRAPPER
 -------------------------------- */
function request(
  apiInstance,
  method,
  url,
  {
    data = {},
    queryParams = {},
    headers = {},
    auth = false,
    responseType,
  } = {},
) {
  let config = {
    params: queryParams,
    headers,
    responseType,
  };

  config = attachAuth(config, auth);

  // 🔍 REQUEST DEBUG
  if (API_DEBUG) {
    console.group(`[API REQUEST] ${method.toUpperCase()} ${url}`);
    console.log("Query Params:", queryParams);
    console.log("Data:", data);
    console.log("Headers:", config.headers);
    console.log("Auth:", auth);
    console.groupEnd();
  }

  // const requestCall =
  //   method === "get"
  //     ? apiInstance[method](url, config)
  //     : apiInstance[method](url, data, config);

  let requestCall;

  if (method === "get") {
    requestCall = apiInstance.get(url, config);
  } else if (method === "delete") {
    requestCall = apiInstance.delete(url, {
      ...config,
      data, // ✅ THIS FIXES AUTH
    });
  } else {
    requestCall = apiInstance[method](url, data, config);
  }

  return requestCall
    .then((res) => {
      // ✅ RESPONSE DEBUG
      if (API_DEBUG) {
        console.group(`[API RESPONSE] ${method.toUpperCase()} ${url}`);
        console.log("Status:", res.status);
        console.log("Data:", res.data);
        console.groupEnd();
      }

      var response = res.data;

      // Handle Unauthenticated globally
      if (
        response?.actionCode === 1100
        //  || response?.message?.includes("Unauthenticated.")
      ) {
        const uiStore = useUIStore();
        uiStore.errorMessages = [
          response?.message,
          "Your session has expired. Please log in again.",
        ];

        const authStore = useAuthStore();
        authStore.forceLogout();

        router.replace({ name: "signin" });
        return Promise.reject(response);
      }

      return response;
    })
    .catch((error) => {
      // ❌ ERROR DEBUG
      if (API_DEBUG) {
        console.group(`[API ERROR] ${method.toUpperCase()} ${url}`);
        console.error("Error:", error);
        console.error("Response:", error?.response);
        console.error("Response Data:", error?.response?.data);
        console.groupEnd();
      }

      return handleError(error);
    });
}

// function request(
//   apiInstance,
//   method,
//   url,
//   {
//     data = {},
//     queryParams = {},
//     headers = {},
//     auth = false,
//     responseType,
//   } = {}
// ) {
//   let config = {
//     params: queryParams,
//     headers,
//     responseType,
//   };

//   config = attachAuth(config, auth);

//   return apiInstance[method](url, method === "get" ? config : data, config)
//     .then((res) => res.data)
//     .catch(handleError);
// }

/* --------------------------------
 | EXPORT API
 -------------------------------- */
export const Api = {
  /* ---------- ADMIN (DEFAULT) ---------- */

  admin: {
    get: (url, opts = {}) =>
      request(adminApi, "get", url, { ...opts, auth: true }),

    post: (url, opts = {}) =>
      request(adminApi, "post", url, { ...opts, auth: true }),

    put: (url, opts = {}) =>
      request(adminApi, "put", url, { ...opts, auth: true }),

    delete: (url, opts = {}) =>
      request(adminApi, "delete", url, { ...opts, auth: true }),

    upload(url, { files, data = {}, headers = {}, auth = true } = {}) {
      const formData = new FormData();

      if (Array.isArray(files)) {
        files.forEach((f) => formData.append("files[]", f));
      } else {
        formData.append("file", files);
      }

      Object.entries(data).forEach(([k, v]) => formData.append(k, v));

      return request(adminApi, "post", url, {
        data: formData,
        headers: { ...headers, "Content-Type": "multipart/form-data" },
        auth,
      });
    },

    download(url, opts = {}) {
      return request(adminApi, "get", url, {
        ...opts,
        auth: true,
        responseType: "blob",
      });
    },
  },

  /* ---------- PUBLIC / SHARED ---------- */

  public: {
    get: (url, opts) => request(publicApi, "get", url, opts),
    post: (url, opts) => request(publicApi, "post", url, opts),
  },
};
