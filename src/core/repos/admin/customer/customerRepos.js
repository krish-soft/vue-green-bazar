import { withUI } from "@/core/repos/_helpers/repoHelper";
import apiRouteService from "@/core/services/apiRoutes/apiRouteService.js";

// Customer

export const searchCustomerAutocomplete = (filters = {}) =>
    withUI(() => apiRouteService.searchCustomerAutocomplete(filters), {
        showSuccessMessage: false,
    });

export const fetchCustomerList = (filters = {}) =>
    withUI(() => apiRouteService.getCustomerList(filters), {
        showSuccessMessage: false,
    });

export const createCustomer = (data) =>
    withUI(() => apiRouteService.createCustomer(data));

export const updateCustomer = (id, data) =>
    withUI(() => apiRouteService.updateCustomer(id, data));


export const deleteCustomer = (id) =>
    withUI(() => apiRouteService.deleteCustomer(id));

// Depot add or details
export const addCustomerDepot = (data) =>
    withUI(() => apiRouteService.addCustomerDepot(data));
export const removeCustomerDepot = (id) =>
    withUI(() => apiRouteService.removeCustomerDepot(id));

// Address Details
export const addCustomerAddress = (data) =>
    withUI(() => apiRouteService.addCustomerAddress(data));
export const addCustomerBillingAddress = (data) =>
    withUI(() => apiRouteService.addCustomerBillingAddress(data));