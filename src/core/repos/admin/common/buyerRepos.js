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



// payment
export const fetchPaymentsList = (filters = {}) =>
    withUI(() => apiRouteService.getPaymentsList(filters), {
        showSuccessMessage: false,
    });

export const fetchPaymentDetails = (id) =>
    withUI(() => apiRouteService.getPaymentDetails(id), {
        showSuccessMessage: false,
    });

export const reconcilePayment = (data) =>
    withUI(() => apiRouteService.reconcilePayment(data), {
        showSuccessMessage: true,
    });