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
    withUI(() => apiRouteService.createAccount(data));

export const updateAccount = (id, data) =>
    withUI(() => apiRouteService.updateAccount(id, data));

export const deleteAccount = (id) =>
    withUI(() => apiRouteService.deleteAccount(id));

// Ledgers

export const fetchLedgersList = (filters = {}) =>
    withUI(() => apiRouteService.getLedgersList(filters), {
        showSuccessMessage: false,
    });

export const fetchLedgerDetails = (id) =>
    withUI(() => apiRouteService.getLedgerDetails(id), {
        showSuccessMessage: false,
    });

export const createLedger = (data) =>
    withUI(() => apiRouteService.createLedger(data));

export const updateLedger = (id, data) =>
    withUI(() => apiRouteService.updateLedger(id, data));

export const deleteLedger = (id) =>
    withUI(() => apiRouteService.deleteLedger(id));

