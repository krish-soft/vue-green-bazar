import { Api } from "@/core/services/api/api.js";

const reportApiRoutes = {


    getOrderReportByDepot(filters = {}) {
        return Api.admin.get("/report/orders-by-depot", { queryParams: filters });
    },


    getSalesReport(filters = {}) {
        return Api.admin.get("/report/sales", { queryParams: filters });
    },

    // Shipping report

    getShippingReportBySeller(filters = {}) {
        return Api.admin.get("/report/shipping/seller", { queryParams: filters });
    },

    getShippingReportByBuyer(filters = {}) {
        return Api.admin.get("/report/shipping/buyer", { queryParams: filters });
    },

    getShippingReportByShipment(filters = {}) {
        return Api.admin.get("/report/shipping/shipment", { queryParams: filters });
    },





}


export default reportApiRoutes;