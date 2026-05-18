// src/services/api/index.js
import adminApi from "./adminApi.js";
import publicApi from "./publicApi.js";
import { attachAuth, handleError } from "./helpers.js";
import { envConfig } from "@/core/config/env.js";
import router from "@/router/index.js";

import { useAuthStore } from "@/core/utils/stores/authStore.js";
import { useUIStore } from "@/core/utils/stores/uiStore.js";

const API_DEBUG = envConfig.debug;

// Normalize endpoint paths to prevent duplicate/trailing-slash URL variants.
const normalizeEndpoint = (url = "") => {
    if (!url) return "/";
    const ensuredLeadingSlash = url.startsWith("/") ? url : `/${url}`;
    return ensuredLeadingSlash.length > 1
        ? ensuredLeadingSlash.replace(/\/+$/, "")
        : ensuredLeadingSlash;
};

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
    const finalUrl = normalizeEndpoint(url);

    let config = {
        params: queryParams,
        headers,
        responseType,
    };

    config = attachAuth(config, auth);

    // 🔍 REQUEST DEBUG
    // if (API_DEBUG) {
    //     console.group(`[API REQUEST] ${method.toUpperCase()} ${finalUrl}`);
    //     console.log("Query Params:", queryParams);
    //     console.log("Data:", data);
    //     console.log("Headers:", config.headers);
    //     console.log("Auth:", auth);
    //     console.groupEnd();
    // }

    // const requestCall =
    //   method === "get"
    //     ? apiInstance[method](url, config)
    //     : apiInstance[method](url, data, config);

    let requestCall;

    if (method === "get") {
        requestCall = apiInstance.get(finalUrl, config);
    } else if (method === "delete") {
        requestCall = apiInstance.delete(finalUrl, {
            ...config,
            data, // ✅ THIS FIXES AUTH
        });
    } else {
        requestCall = apiInstance[method](finalUrl, data, config);
    }

    return requestCall
        .then((res) => {
            // ✅ RESPONSE DEBUG
            // if (API_DEBUG) {
            //     console.group(`[API RESPONSE] ${method.toUpperCase()} ${finalUrl}`);
            //     console.log("Status:", res.status);
            //     console.log("Data:", res.data);
            //     console.groupEnd();
            // }

            var response = res.data;

            // Handle Unauthenticated globally
            if (response?.actionCode === 1100) {
                const uiStore = useUIStore();
                const authStore = useAuthStore();

                // 1️⃣ Set error message (DO NOT reset after this)
                uiStore.errorMessages = [
                    response?.message || "Session expired",
                    "Your session has expired. Please log in again.",
                ];

                // 2️⃣ Force logout (clear tokens, state)
                authStore.forceLogout();
                uiStore.isLoading = false;

                // 3️⃣ Redirect to signin (hard redirect logic)
                router.replace({ name: "signin" });

                // 4️⃣ Reject promise to stop further handling
                return Promise.reject(response);
            }


            return response;
        })
        .catch((error) => {
            // ❌ ERROR DEBUG
            // if (API_DEBUG) {
            //     console.group(`[API ERROR] ${method.toUpperCase()} ${finalUrl}`);
            //     console.error("Error:", error);
            //     console.error("Response:", error?.response);
            //     console.error("Response Data:", error?.response?.data);
            //     console.groupEnd();
            // }

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
        // Admin endpoints are authenticated by default; allow per-call override.
        get: (url, opts = {}) =>
            request(adminApi, "get", url, { ...opts, auth: opts.auth ?? true }),

        post: (url, opts = {}) =>
            request(adminApi, "post", url, { ...opts, auth: opts.auth ?? true }),

        put: (url, opts = {}) =>
            request(adminApi, "put", url, { ...opts, auth: opts.auth ?? true }),

        delete: (url, opts = {}) =>
            request(adminApi, "delete", url, { ...opts, auth: opts.auth ?? true }),

        upload(
            url,
            {
                method = "post",
                files = {},
                data = {},
                headers = {},
                auth = true,
                useMethodOverride = false,
            } = {}
        ) {
            const formData = new FormData();

            /* ---------------- NORMALIZER ---------------- */
            const normalizeValue = (value) => {
                if (value === null || value === undefined) return "";

                if (typeof value === "boolean") return value ? 1 : 0;

                if (typeof value === "number") return value;

                if (typeof value === "string") return value;

                if (value instanceof Date) return value.toISOString();

                return JSON.stringify(value); // fallback for objects
            };

            /* ---------------- FILE HANDLING ---------------- */
            if (files instanceof File) {
                formData.append("file", files);
            }
            else if (Array.isArray(files)) {
                files.forEach((file) => {
                    if (file instanceof File) {
                        formData.append("files[]", file);
                    }
                });
            }
            else if (typeof files === "object" && files !== null) {
                Object.entries(files).forEach(([key, value]) => {

                    // ✅ Multiple files
                    if (Array.isArray(value)) {
                        value.forEach((file) => {
                            if (file instanceof File) {
                                formData.append(`${key}[]`, file);
                            }
                        });
                    }

                    // ✅ Single file
                    else if (value instanceof File) {
                        formData.append(key, value);
                    }

                    // ❌ Ignore null / invalid
                });
            }

            /* ---------------- DATA HANDLING ---------------- */
            Object.entries(data).forEach(([key, value]) => {

                if (value === null || value === undefined) return;

                // ✅ Array
                if (Array.isArray(value)) {
                    value.forEach((item) => {
                        formData.append(`${key}[]`, normalizeValue(item));
                    });
                }

                // ✅ File inside data (edge case)
                else if (value instanceof File) {
                    formData.append(key, value);
                }

                // ✅ Normal values
                else {
                    formData.append(key, normalizeValue(value));
                }
            });

            /* ---------------- METHOD HANDLING ---------------- */
            let finalMethod = method.toLowerCase();

            if (useMethodOverride && ["put", "patch"].includes(finalMethod)) {
                formData.append("_method", finalMethod.toUpperCase());
                finalMethod = "post";
            }

            /* ---------------- REQUEST ---------------- */
            return request(adminApi, finalMethod, url, {
                data: formData,
                headers: {
                    ...headers,
                    // ❌ DO NOT manually set Content-Type
                },
                auth,
            });
        },
        // Working 2026-03-21
        // upload(
        //     url,
        //     {
        //         files = {},          // can be File | File[] | { key: File | File[] }
        //         data = {},
        //         headers = {},
        //         auth = true,
        //     } = {}
        // ) {
        //     const formData = new FormData();

        //     // Case 1: files is a File or File[]
        //     if (files instanceof File) {
        //         formData.append("file", files);
        //     }
        //     else if (Array.isArray(files)) {
        //         files.forEach((file) => {
        //             formData.append("files[]", file);
        //         });
        //     }
        //     // Case 2: files is an object with custom keys
        //     else if (typeof files === "object") {
        //         Object.entries(files).forEach(([key, value]) => {
        //             if (Array.isArray(value)) {
        //                 value.forEach((file) => {
        //                     formData.append(`${key}[]`, file);
        //                 });
        //             } else if (value instanceof File) {
        //                 formData.append(key, value);
        //             }
        //         });
        //     }

        //     // Append other form fields
        //     Object.entries(data).forEach(([key, value]) => {
        //         formData.append(key, value);
        //     });

        //     return request(adminApi, "post", url, {
        //         data: formData,
        //         headers: {
        //             ...headers,
        //             // DO NOT manually set multipart boundary
        //             "Content-Type": "multipart/form-data",
        //         },
        //         auth,
        //     });
        // },


        // upload(url, { files, data = {}, headers = {}, auth = true } = {}) {
        //     const formData = new FormData();

        //     if (Array.isArray(files)) {
        //         files.forEach((f) => formData.append("files[]", f));
        //     } else {
        //         // formData.append("file", files);
        //         // convert in array
        //         formData.append("files[]", files);
        //     }

        //     Object.entries(data).forEach(([k, v]) => formData.append(k, v));

        //     return request(adminApi, "post", url, {
        //         data: formData,
        //         headers: { ...headers, "Content-Type": "multipart/form-data" },
        //         auth,
        //     });
        // },

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



/**

 *  UPLOAD SAMPLES

 */

// Single File
// upload("/user/profile", {
//     files: { avatar: file }
// });

// Multiple Files
// upload("/kyc", {
//     files: {
//         aadhaar: aadhaarFile,
//         pan: panFile,
//         photos: [photo1, photo2],
//     },
//     data: {
//         user_id: 10
//     }
// });

// without Keys
// upload("/upload", {
//     files: [file1, file2]
// });
