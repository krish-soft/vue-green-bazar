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
  };

  // API key header is required by backend middleware, but only send when configured.
  if (envConfig.apiKey) {
    config.headers["X-API-KEY"] = envConfig.apiKey;
  }

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
  const status = error?.response?.status;

  if (status === 401) {
    const authStore = useAuthStore();
    authStore.resetAuthTokenData();
    router.push({ name: "signin" });
  }

  // Normalize errors so UI layers can consume a stable shape.
  return Promise.reject({
    status,
    message:
      error?.response?.data?.message ||
      error?.message ||
      "Request failed",
    data: error?.response?.data || null,
    raw: error,
  });
}
