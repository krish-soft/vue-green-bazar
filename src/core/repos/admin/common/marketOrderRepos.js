import { withUI } from "@/core/repos/_helpers/repoHelper";
import apiRouteService from "@/core/services/apiRoutes/apiRouteService.js";




// Market Order Related APIs

export const fetchMarketOrdersList = (filters = {}) =>
    withUI(() => apiRouteService.getMarketOrdersList(filters), {
        showSuccessMessage: false,
    });

export const fetchMarketOrderDetails = (id) =>
    withUI(() => apiRouteService.getMarketOrderDetails(id), {
        showSuccessMessage: false,
    });

export const updateMarketOrderStatus = (orderId, data) =>
    withUI(() => apiRouteService.updateMarketOrderStatus(orderId, data));

export const updateMarketOrderAmount = (orderId, data) =>
    withUI(() => apiRouteService.updateMarketOrderAmount(orderId, data));

export const uploadMarketOrderDocument = (orderId, data, files) =>
    withUI(() => apiRouteService.uploadMarketOrderDocument(orderId, data, files));

export const deleteMarketOrderDocument = (documentId) =>
    withUI(() => apiRouteService.deleteMarketOrderDocument(documentId));