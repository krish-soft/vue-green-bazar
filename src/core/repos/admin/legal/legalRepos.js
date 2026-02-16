import { withUI } from "@/core/repos/_helpers/repoHelper";
import apiRouteService from "@/core/services/apiRoutes/apiRouteService.js";

// KYC

export const fetchKycList = (filters = {}) =>
    withUI(() => apiRouteService.getKycList(filters), {
        showSuccessMessage: false,
    });
export const fetchKycDetails = (id) =>
    withUI(() => apiRouteService.getKycDetails(id), {
        showSuccessMessage: false,
    });
export const updateKycStatus = (id, data) =>
    withUI(() => apiRouteService.updateKycStatus(id, data));

export const addKycWithDataFiles = (data, files) =>
    withUI(() => apiRouteService.uploadKycWithData(data, files));

// Vehicle KYC

export const fetchVehicleKycList = (filters = {}) =>
    withUI(() => apiRouteService.getVehicleKycList(filters), {
        showSuccessMessage: false,
    });

export const fetchVehicleKycDetails = (id) =>
    withUI(() => apiRouteService.getVehicleKycDetails(id), {
        showSuccessMessage: false,
    });

export const updateVehicleKycStatus = (id, data) =>
    withUI(() => apiRouteService.updateVehicleKycStatus(id, data));