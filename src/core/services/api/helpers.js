// src/services/api/helpers.js
import { useAuthStore } from "@/core/utils/stores/authStore.js";
import router from "@/router/index.js";
import { envConfig } from "@/core/config/env.js";

/* =====================================================
 | Attach Auth Token (SAFE MERGE)
 ===================================================== */
export function attachAuth(config = {}, requireAuth = false) {
  const authStore = useAuthStore();
  const token = authStore.getAuthToken();

  // 🔹 SAFELY merge headers (never overwrite)
  config.headers = {
    ...(config.headers || {}),
    Accept: "application/json",
    "Accept-Language": "en",
    "X-API-KEY": envConfig.apiKey,
  };

  // 🔹 Attach token only if required
  if (requireAuth && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}

/* =====================================================
 | Handle Errors (GLOBAL)
 ===================================================== */
export function handleError(error) {
  if (error.response?.status === 401) {
    const authStore = useAuthStore();
    authStore.resetAuthTokenData();
    router.push({ name: "signin" });
  }

  return Promise.reject(error.response?.data || error);
}
