import { withUI } from "@/core/repos/_helpers/repoHelper";
import apiRouteService from "@/core/services/apiRoutes/apiRouteService.js";



// Report Related APIs

export const fetchOrderReportByDepot = (filters = {}) =>
    withUI(() => apiRouteService.getOrderReportByDepot(filters), {
        showSuccessMessage: false,
    });