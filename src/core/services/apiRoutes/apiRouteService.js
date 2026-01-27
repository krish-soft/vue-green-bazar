// apiRouteService.js

import authApiRoutes from "./routes/authApiRoutes.js";
import masterApiRoutes from "./routes/master/masterApiRoutes.js";
import userLegalApiRoutes from "./routes/legal/userLegalApiRoutes.js";
import customerApiRoutes from "./routes/customer/customerApiRoutes.js";
import utilsApiRoutes from "./routes/utils/utilsApiRoutes.js";
import fulfillmentLocationApiRoutes from "./routes/common/fulfillmentLocationApiRoutes.js";
import productListingApiRoutes from "./routes/common/productListingApiRoutes.js";
// later add more

const apiRouteService = {
  ...utilsApiRoutes,
  ...authApiRoutes,
  ...masterApiRoutes,
  ...userLegalApiRoutes,
  ...customerApiRoutes,

  ...fulfillmentLocationApiRoutes,
  ...productListingApiRoutes,
  // ...productApiRoutes,
  // ...orderApiRoutes,
};

export default apiRouteService;
