
import { Api } from "@/core/services/api/api.js";

const cmdApiRoutes = {

    // Cutoff
    cmdCutoffProductListing(data) {
        return Api.admin.post('/cmd/cutoff/product-listing', { data });
    },

    cmdCutoffSeller(data) {
        return Api.admin.post('/cmd/cutoff/seller', { data });
    },

    cmdCutoffBuyer(data) {
        return Api.admin.post('/cmd/cutoff/buyer', { data });
    },


    // Accounting
    cmdAccountingOrder(data) {
        return Api.admin.post('/cmd/accounting/order', { data });
    },

    cmdAccountingDemandOrder(data) {
        return Api.admin.post('/cmd/accounting/demand-order', { data });
    },


    cmdAccountingMarketOrder(data) {
        return Api.admin.post('/cmd/accounting/market-order', { data });
    },

    cmdAccountingInvoice(data) {
        return Api.admin.post('/cmd/accounting/invoice', { data });
    },

    cmdAccountingProductListing(data) {
        return Api.admin.post('/cmd/accounting/product-listing', { data });
    },

    // Invoices
    cmdInvoiceGenerateBuyerOrder(data) {
        return Api.admin.post('/cmd/invoice/buyer-order', { data });
    },

    cmdInvoiceGenerateBuyerDemandOrder(data) {
        return Api.admin.post('/cmd/invoice/buyer-demand-order', { data });
    },

    cmdInvoiceGenerateProductListing(data) {
        return Api.admin.post('/cmd/invoice/product-listing', { data });
    }



}

export default cmdApiRoutes;