export const envConfig = {
    apiBaseUrl: import.meta.env.VITE_APP_API_BASE_URL,
    apiBaseAdminUrl: import.meta.env.VITE_APP_API_BASE_ADMINURL,
    appName: import.meta.env.VITE_APP_NAME,
    appEnv: import.meta.env.VITE_APP_ENV,
    debug: import.meta.env.VITE_APP_DEBUG === 'true',
    version: import.meta.env.VITE_APP_VERSION,
    apiKey: import.meta.env.VITE_APP_API_KEY,

};
