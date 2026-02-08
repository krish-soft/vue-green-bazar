import { withUI } from "@/core/repos/_helpers/repoHelper";
import apiRouteService from "@/core/services/apiRoutes/apiRouteService.js";


// Account

export const fetchAccountsList = (filters = {}) =>
    withUI(() => apiRouteService.getAccountsList(filters), {
        showSuccessMessage: false,
    });

export const fetchAccountDetails = (id) =>
    withUI(() => apiRouteService.getAccountDetails(id), {
        showSuccessMessage: false,
    });

export const createAccount = (data) =>
    withUI(() => apiRouteService.createAccount(data), {
        showSuccessMessage: true,
    });

export const updateAccount = (id, data) =>
    withUI(() => apiRouteService.updateAccount(id, data), {
        showSuccessMessage: true,
    });

export const deleteAccount = (id) =>
    withUI(() => apiRouteService.deleteAccount(id), {
        showSuccessMessage: true,
    });

