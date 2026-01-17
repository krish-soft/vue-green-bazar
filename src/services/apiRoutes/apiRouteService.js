// src/services/api/apiService.js

import authApiRoutes from "./routes/authApiRoutes";
// later add more
// import productApiRoutes from "./routes/productApiRoutes";
// import orderApiRoutes from "./routes/orderApiRoutes";

const apiRouteService = {
  ...authApiRoutes,
  // ...productApiRoutes,
  // ...orderApiRoutes,
};

export default apiRouteService;
