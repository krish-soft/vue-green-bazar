// src/services/api/apiService.js

import authApiRoutes from "./routes/authApiRoutes.js";
import masterApiRoutes from "./routes/master/masterApiRoutes.js";
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
