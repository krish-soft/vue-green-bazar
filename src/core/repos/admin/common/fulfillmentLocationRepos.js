import { withUI } from "@/core/repos/_helpers/repoHelper";
import apiRouteService from "@/core/services/apiRoutes/apiRouteService.js";



// Fulfillment Location
export const fetchFulfillmentLocationsList = (filters = {}) =>
    withUI(() => apiRouteService.getFulfillmentLocationsList(filters), {
        showSuccessMessage: false,
    });
export const createFulfillmentLocation = (data) =>
    withUI(() => apiRouteService.createFulfillmentLocation(data));
export const fetchFulfillmentLocationDetails = (id) =>
    withUI(() => apiRouteService.getFulfillmentLocationDetails(id), {
        showSuccessMessage: false,
    });
export const updateFulfillmentLocation = (id, data) =>
    withUI(() => apiRouteService.updateFulfillmentLocation(id, data));
export const deleteFulfillmentLocation = (id) =>
    withUI(() => apiRouteService.deleteFulfillmentLocation(id));

// Depot add or details
export const addFulfillmentLocationDepot = (data) =>
    withUI(() => apiRouteService.addFulfillmentLocationDepot(data));

export const removeFulfillmentLocationDepot = (id) =>
    withUI(() => apiRouteService.removeFulfillmentLocationDepot(id));
