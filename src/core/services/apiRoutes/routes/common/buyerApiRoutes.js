
import { Api } from "@/core/services/api/api.js";

const buyerApiRoutes = {

    // Orders

    getOrdersList(filters = {}) {
        return Api.admin.get("/order", { queryParameters: filters });
    },

    getOrderDetails(id) {
        return Api.admin.get(`/order/${id}`);
    },


    // payment

    getPaymentsList(filters = {}) {
        return Api.admin.get("/payment", { queryParameters: filters });
    },

    getPaymentDetails(id) {
        return Api.admin.get(`/payment/${id}`);
    },

    reconcilePayment(data) {
        return Api.admin.post('/payment/reconcile', { data });
    },




}


export default buyerApiRoutes;