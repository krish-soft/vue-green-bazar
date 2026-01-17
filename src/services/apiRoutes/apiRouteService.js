// src/services/api/apiService.js

import authApiRoutes from "./routes/authApiRoutes";
import masterApiRoutes from "./routes/master/masterApiRoutes";
// later add more
// import productApiRoutes from "./routes/productApiRoutes";
// import orderApiRoutes from "./routes/orderApiRoutes";

const apiRouteService = {
  ...authApiRoutes,
  ...masterApiRoutes,
  // ...productApiRoutes,
  // ...orderApiRoutes,
};

export default apiRouteService;
