import { Api } from "@/core/services/api/api.js";

const invoiceApiRoutes = {

    // Invoices

    getInvoicesList(filters = {}) {
        return Api.admin.get("/invoice", { queryParams: filters });
    },

    getInvoiceDetails(invoiceId) {
        return Api.admin.get(`/invoice/${invoiceId}`);

    },

    createInvoice(data) {
        return Api.admin.post("/invoice", { data });
    },

    updateInvoice(invoiceId, data) {
        return Api.admin.put(`/invoice/${invoiceId}`, { data });
    },

    deleteInvoice(invoiceId) {
        return Api.admin.delete(`/invoice/${invoiceId}`);
    }





}

export default invoiceApiRoutes;