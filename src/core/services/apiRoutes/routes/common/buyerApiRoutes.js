
import { Api } from "@/core/services/api/api.js";

const buyerApiRoutes = {

    // Orders

    getOrdersList(filters = {}) {
        return Api.admin.get("/order", { queryParams: filters });
    },

    getOrderDetails(id) {
        return Api.admin.get(`/order/${id}`);
    },

    // Demand Orders

    getDemandOrdersList(filters = {}) {
        return Api.admin.get("/demand-order", { queryParams: filters });
    },

    getDemandOrderDetails(id) {
        return Api.admin.get(`/demand-order/${id}`);
    },


    // payment

    getPaymentsList(filters = {}) {
        return Api.admin.get("/payment", { queryParams: filters });
    },

    getPaymentDetails(id) {
        return Api.admin.get(`/payment/${id}`);
    },

    reconcilePayment(data) {
        return Api.admin.post('/payment/reconcile', { data });
    },




}


export default buyerApiRoutes;