
import { Api } from "@/core/services/api/api.js";

const cmdApiRoutes = {

    // Cutoff
    cmdCutoffProductListing(data) {
        return Api.admin.post('/cmd/cutoff/product-listing', { data });
    },

    // Accounting
    cmdAccountingOrder(data) {
        return Api.admin.post('/cmd/accounting/order', { data });
    },

    cmdAccountingMarketOrder(data) {
        return Api.admin.post('/cmd/accounting/market-order', { data });
    },

    cmdAccountingDriverShipment(data) {
        return Api.admin.post('/cmd/accounting/driver-shipment', { data });
    },

    // Invoices
    cmdInvoiceGenerateBuyerOrder(data) {
        return Api.admin.post('/cmd/invoice/buyer-order', { data });
    },

    cmdInvoiceGenerateProductListing(data) {
        return Api.admin.post('/cmd/invoice/product-listing', { data });
    }



}

export default cmdApiRoutes;