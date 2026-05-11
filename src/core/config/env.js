// Keep base URLs canonical to avoid server-side slash redirects.
const trimTrailingSlash = (value = "") => value.replace(/\/+$/, "");

export const envConfig = {
    apiBaseUrl: trimTrailingSlash(import.meta.env.VITE_APP_API_BASE_URL || ""),
    apiBaseAdminUrl: trimTrailingSlash(import.meta.env.VITE_APP_API_BASE_ADMINURL || ""),
    appName: import.meta.env.VITE_APP_NAME || "",
    appEnv: import.meta.env.VITE_APP_ENV || "local",
    debug: import.meta.env.DEV || import.meta.env.VITE_APP_DEBUG === "true",
    version: import.meta.env.VITE_APP_VERSION || "",
    apiKey: import.meta.env.VITE_APP_API_KEY || "",
    // Centralized request timeout used by all axios instances.
    requestTimeoutMs: Number(import.meta.env.VITE_APP_API_TIMEOUT || 30000),
};
