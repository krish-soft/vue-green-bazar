
import { Api } from "@/core/services/api/api.js";

const buyerApiRoutes = {

    // Orders

    getOrdersList(filters = {}) {
        return Api.admin.get("/order", { queryParameters: filters });
    },

    getOrderDetails(id) {
        return Api.admin.get(`/order/${id}`);
    },


    // cart 






}


export default buyerApiRoutes;