import { withUI } from "@/core/repos/_helpers/repoHelper";
import apiRouteService from "@/core/services/apiRoutes/apiRouteService.js";



// Shipping Related APIs

export const fetchShipmentPackageSummary = (filters = {}) =>
    withUI(() => apiRouteService.getShipmentPackageSummary(filters), {
        showSuccessMessage: false,
    });

export const fetchShipmentPackageList = (filters = {}) =>
    withUI(() => apiRouteService.getShipmentPackageList(filters), {
        showSuccessMessage: false,
    });

export const fetchShipmentPackageDetails = (id) =>
    withUI(() => apiRouteService.getShipmentPackageDetails(id), {
        showSuccessMessage: false,
    });

export const updateShipmentPackageStatus = (packageId, payload) =>
    withUI(() => apiRouteService.updateShipmentPackageStatus(packageId, payload));