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


export const fetchShippingReportByShipment = (filters = {}) =>
    withUI(() => apiRouteService.getShippingReportByShipment(filters), {
        showSuccessMessage: false,
    });


export const fetchAuditLogs = (filters = {}) =>
    withUI(() => apiRouteService.getAuditLogs(filters), {
        showSuccessMessage: false,
    });


export const fetchActivityLogs = (filters = {}) =>
    withUI(() => apiRouteService.getActivityLogs(filters), {
        showSuccessMessage: false,
    });


export const fetchLogsSummary = (filters = {}) =>
    withUI(() => apiRouteService.getLogsSummary(filters), {
        showSuccessMessage: false,
    });