// apiRouteService.js

import authApiRoutes from "./routes/authApiRoutes.js";
import masterApiRoutes from "./routes/master/masterApiRoutes.js";
import userLegalApiRoutes from "./routes/legal/userLegalApiRoutes.js";
import customerApiRoutes from "./routes/customer/customerApiRoutes.js";
import utilsApiRoutes from "./routes/utils/utilsApiRoutes.js";
import fulfillmentLocationApiRoutes from "./routes/common/fulfillmentLocationApiRoutes.js";
import sellerApiRoutes from "./routes/common/sellerApiRoutes.js";
import buyerApiRoutes from "./routes/common/buyerApiRoutes.js";
import reportApiRoutes from "./routes/common/reportApiRoutes.js";
import accountingApiRoutes from "./routes/common/accountingApiRoutes.js";
import shippingApiRoutes from "./routes/common/shippingApiRoutes.js";
import marketApiRoutes from "./routes/common/marketApiRoutes.js";
import cmdApiRoutes from "./routes/common/cmdApiRoutes.js";
// later add more

const apiRouteService = {
  ...utilsApiRoutes,
  ...authApiRoutes,
  ...masterApiRoutes,
  ...userLegalApiRoutes,
  ...customerApiRoutes,

  ...fulfillmentLocationApiRoutes,
  ...sellerApiRoutes,
  ...buyerApiRoutes,
  ...reportApiRoutes,

  ...accountingApiRoutes,
  ...shippingApiRoutes,
  ...marketApiRoutes,
  ...cmdApiRoutes,
  // ...productApiRoutes,
  // ...orderApiRoutes,
};

export default apiRouteService;
