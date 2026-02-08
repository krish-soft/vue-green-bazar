import { Api } from "@/core/services/api/api.js";

const reportApiRoutes = {


    getOrderReportByDepot(filters = {}) {
        return Api.admin.get("/report/orders-by-depot", { queryParams: filters });
    },


}


export default reportApiRoutes;