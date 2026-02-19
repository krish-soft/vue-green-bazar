
import { Api } from "@/core/services/api/api.js";

const accountingApiRoutes = {


    // Accounts 

    getAccountingSummary(filters = {}) {
        return Api.admin.get("/accounting/summary", { queryParams: filters });
    },

    getAccountsList(filters = {}) {
        return Api.admin.get("/accounting/account", { queryParams: filters });
    },

    getAccountDetails(id) {
        return Api.admin.get(`/accounting/account/${id}`);
    },

    createAccount(data) {
        return Api.admin.post("/accounting/account", { data });
    },

    updateAccount(id, data) {
        return Api.admin.put(`/accounting/account/${id}`, { data });
    },

    deleteAccount(id) {
        return Api.admin.delete(`/accounting/account/${id}`);
    },

    // Ledgers

    getLedgersList(filters = {}) {
        return Api.admin.get("/accounting/ledger", { queryParams: filters });
    },

    getLedgerDetails(id) {
        return Api.admin.get(`/accounting/ledger/${id}`);
    },

    createLedger(data) {
        return Api.admin.post("/accounting/ledger", { data });
    },

    updateLedger(id, data) {
        return Api.admin.put(`/accounting/ledger/${id}`, { data });
    },

    deleteLedger(id) {
        return Api.admin.delete(`/accounting/ledger/${id}`);
    },


    // settlements
    getSettlementPreviewList(filters = {}) {
        return Api.admin.get("/accounting/settlement/preview", { queryParams: filters });
    },

    createSettlementBatch(data) {
        return Api.admin.post("/accounting/settlement/create-batch", { data });
    },



}

export default accountingApiRoutes;

