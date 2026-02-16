
import { Api } from "@/core/services/api/api.js";

const marketApiRoutes = {

    // Orders

    getMarketOrdersList(filters = {}) {
        return Api.admin.get("/market-order", { queryParams: filters });
    },

    getMarketOrderDetails(orderId) {
        return Api.admin.get(`/market-order/${orderId}`);
    },

    updateMarketOrderStatus(orderId, data) {
        return Api.admin.put(`/market-order/status/${orderId}`, { data });
    },

    updateMarketOrderAmount(orderId, data) {
        return Api.admin.put(`/market-order/order-amount/${orderId}`, { data });
    },

    uploadMarketOrderDocument(orderId, data, fileData) {
        return Api.admin.upload(`/market-order/upload-document/${orderId}`, { data: data, files: fileData });
    },

    deleteMarketOrderDocument(documentId) {
        return Api.admin.delete(`/market-order/delete-document/${documentId}`);
    },



}


export default marketApiRoutes;