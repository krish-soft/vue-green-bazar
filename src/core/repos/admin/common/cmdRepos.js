import { withUI } from "@/core/repos/_helpers/repoHelper";
import apiRouteService from "@/core/services/apiRoutes/apiRouteService.js";



// Cutoff
export const cmdCutoffProductListing = (data) =>
    withUI(() => apiRouteService.cmdCutoffProductListing(data));

export const cmdCutoffSeller = (data) =>
    withUI(() => apiRouteService.cmdCutoffSeller(data));

export const cmdCutoffBuyer = (data) =>
    withUI(() => apiRouteService.cmdCutoffBuyer(data));

// Accounting
export const cmdAccountingOrder = (data) =>
    withUI(() => apiRouteService.cmdAccountingOrder(data));
export const cmdAccountingDemandOrder = (data) =>
    withUI(() => apiRouteService.cmdAccountingDemandOrder(data));

export const cmdAccountingMarketOrder = (data) =>
    withUI(() => apiRouteService.cmdAccountingMarketOrder(data));

export const cmdAccountingProductListing = (data) =>
    withUI(() => apiRouteService.cmdAccountingProductListing(data));

export const cmdAccountingInvoice = (data) =>
    withUI(() => apiRouteService.cmdAccountingInvoice(data));

// Invoices
export const cmdInvoiceGenerateBuyerOrder = (data) =>
    withUI(() => apiRouteService.cmdInvoiceGenerateBuyerOrder(data));

export const cmdInvoiceGenerateProductListing = (data) =>
    withUI(() => apiRouteService.cmdInvoiceGenerateProductListing(data));