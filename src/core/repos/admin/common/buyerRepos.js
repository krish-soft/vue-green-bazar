import { withUI } from "@/core/repos/_helpers/repoHelper";
import apiRouteService from "@/core/services/apiRoutes/apiRouteService.js";


// Seller Related APIs

// Orders
export const fetchOrdersList = (filters = {}) =>
    withUI(() => apiRouteService.getOrdersList(filters), {
        showSuccessMessage: false,
    });

export const fetchOrderDetails = (id) =>
    withUI(() => apiRouteService.getOrderDetails(id), {
        showSuccessMessage: false,
    });