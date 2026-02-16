import { withUI } from "@/core/repos/_helpers/repoHelper";
import apiRouteService from "@/core/services/apiRoutes/apiRouteService.js";



// Utils

export const fetchStates = (filters = {}) =>
    withUI(() => apiRouteService.getStates(filters), {
        showSuccessMessage: false,
    });

export const fetchMarkets = (filters = {}) =>
    withUI(() => apiRouteService.getMarkets(filters), {
        showSuccessMessage: false,
    });


export const fetchUnits = (filters = {}) =>
    withUI(() => apiRouteService.getUnits(filters), {
        showSuccessMessage: false,
    });

export const fetchPackTypeUnits = (filters = {}) =>
    withUI(() => apiRouteService.getPackTypeUnits(filters), {
        showSuccessMessage: false,
    });

export const fetchAllEnums = (filters = {}) =>
    withUI(() => apiRouteService.getAllEnums(filters), {
        showSuccessMessage: false,
    });