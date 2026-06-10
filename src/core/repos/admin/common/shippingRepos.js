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



// Shipment & Groups Related APIs

export const fetchShipmentList = (filters = {}) =>
    withUI(() => apiRouteService.getShipmentList(filters), {
        showSuccessMessage: false,
    });

export const fetchShipmentDetails = (id) =>
    withUI(() => apiRouteService.getShipmentDetails(id), {
        showSuccessMessage: false,
    });

export const generateShipmentAndPackageGroups = (payload) =>
    withUI(() => apiRouteService.generateShipmentAndPackageGroups(payload));

export const updateShipmentStatus = (shipmentId, payload) =>
    withUI(() => apiRouteService.updateShipmentStatus(shipmentId, payload));


export const splitGroup = (payload) =>
    withUI(() => apiRouteService.splitGroup(payload));

export const movePackage = (payload) =>
    withUI(() => apiRouteService.movePackage(payload));

export const mergeGroups = (payload) =>
    withUI(() => apiRouteService.mergeGroups(payload));

export const mergeShipments = (payload) =>
    withUI(() => apiRouteService.mergeShipments(payload));


export const rebuildShipment = (id, payload) =>
    withUI(() => apiRouteService.rebuildShipment(id, payload));


// driver related APIs

export const fetchDriverList = (filters = {}) =>
    withUI(() => apiRouteService.getDriverList(filters), {
        showSuccessMessage: false,
    });

export const fetchDriverShipmentList = (filters = {}) =>
    withUI(() => apiRouteService.getDriverShipmentList(filters), {
        showSuccessMessage: false,
    });

export const assignShipmentToDriver = (payload) =>
    withUI(() => apiRouteService.assignShipmentToDriver(payload));

export const changeDriverShipment = (id, payload) =>
    withUI(() => apiRouteService.changeDriverShipment(id, payload));

export const cancelDriverShipment = (id, payload) =>
    withUI(() => apiRouteService.cancelDriverShipment(id, payload));


