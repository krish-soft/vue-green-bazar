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


    // shipment & Groups

    getShipmentList(filters = {}) {
        return Api.admin.get("/shipping/shipment", { queryParams: filters });
    },

    getShipmentDetails(id) {
        return Api.admin.get(`/shipping/shipment/${id}`);
    },

    generateShipmentAndPackageGroups(data) {
        return Api.admin.post("/shipping/shipment-generate-package-groups", { data });
    },


    // 
    splitGroup(data) {
        return Api.admin.post("/shipping/shipments/split-group", { data });
    },

    movePackage(data) {
        return Api.admin.post("/shipping/shipments/move-package", { data });
    },

    mergeGroups(data) {
        return Api.admin.post("/shipping/shipments/merge-groups", { data });
    },

    mergeShipments(data) {
        return Api.admin.post("/shipping/shipments/merge-shipments", { data });
    },

    rebuildShipment(id, data) {
        return Api.admin.post(`/shipping/shipments/rebuild/${id}`, { data });
    },






}

export default shippingApiRoutes;