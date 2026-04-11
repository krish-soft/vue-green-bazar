import { withUI } from "@/core/repos/_helpers/repoHelper";
import apiRouteService from "@/core/services/apiRoutes/apiRouteService.js";



// Report Related APIs

export const fetchOrderReportByDepot = (filters = {}) =>
    withUI(() => apiRouteService.getOrderReportByDepot(filters), {
        showSuccessMessage: false,
    });


// sales report
export const fetchSalesReport = (filters = {}) =>
    withUI(() => apiRouteService.getSalesReport(filters), {
        showSuccessMessage: false,
    });


// Shipping report
export const fetchShippingReportBySeller = (filters = {}) =>
    withUI(() => apiRouteService.getShippingReportBySeller(filters), {
        showSuccessMessage: false,
    });

export const fetchShippingReportByBuyer = (filters = {}) =>
    withUI(() => apiRouteService.getShippingReportByBuyer(filters), {
        showSuccessMessage: false,
    });