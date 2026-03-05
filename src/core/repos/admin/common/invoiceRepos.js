import { withUI } from "@/core/repos/_helpers/repoHelper";
import apiRouteService from "@/core/services/apiRoutes/apiRouteService.js";

// Invoices
export const fetchInvoicesList = (filters = {}) =>
    withUI(() => apiRouteService.getInvoicesList(filters), {
        showSuccessMessage: false,
    });

export const fetchInvoiceDetails = (id) =>
    withUI(() => apiRouteService.getInvoiceDetails(id), {
        showSuccessMessage: false,
    });

export const createInvoice = (data) =>
    withUI(() => apiRouteService.createInvoice(data));


export const updateInvoice = (id, data) =>
    withUI(() => apiRouteService.updateInvoice(id, data));

export const deleteInvoice = (id) =>
    withUI(() => apiRouteService.deleteInvoice(id));