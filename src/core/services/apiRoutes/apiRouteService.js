// apiRouteService.js

import authApiRoutes from "./routes/authApiRoutes.js";
import masterApiRoutes from "./routes/master/masterApiRoutes.js";
import userLegalApiRoutes from "./routes/legal/userLegalApiRoutes.js";
import customerApiRoutes from "./routes/customer/customerApiRoutes.js";
import utilsApiRoutes from "./routes/utils/utilsApiRoutes.js";
// later add more

const apiRouteService = {
  ...utilsApiRoutes,
  ...authApiRoutes,
  ...masterApiRoutes,
  ...userLegalApiRoutes,
  ...customerApiRoutes,
  // ...productApiRoutes,
  // ...orderApiRoutes,
};

export default apiRouteService;
