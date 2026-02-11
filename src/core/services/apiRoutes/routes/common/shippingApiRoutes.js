import { Api } from "@/core/services/api/api.js";

const shippingApiRoutes = {

    getShipmentPackageSummary(filters = {}) {
        return Api.admin.get("/shipping/summary/", { queryParams: filters });
    },

    getShipmentPackageList(filters = {}) {
        return Api.admin.get("/shipping/shipmentPackage/", { queryParams: filters });
    },

    getShipmentPackageDetails(id) {
        return Api.admin.get(`/shipping/shipmentPackage/${id}`);
    },

    updateShipmentPackageStatus(packageId, data) {
        return Api.admin.put(`/shipping/shipmentPackage/status/${packageId}`, { data });
    },


}

export default shippingApiRoutes;