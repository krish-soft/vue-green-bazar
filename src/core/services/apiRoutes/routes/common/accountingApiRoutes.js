
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

    reverseLedger(id) {
        return Api.admin.get(`/accounting/ledger/reverse/${id}`);
    },


    markLedgerSettled(id) {
        return Api.admin.get(`/accounting/ledger/status/settle/${id}`);
    },


    // settlements
    getSettlementPreviewList(filters = {}) {
        return Api.admin.get("/accounting/settlement/preview", { queryParams: filters });
    },

    createSettlementBatch(data) {
        return Api.admin.post("/accounting/settlement/create-batch", { data });
    },

    getSettlementBatchList(filters = {}) {
        return Api.admin.get("/accounting/settlement/batch", { queryParams: filters });
    },

    getSettlementBatchDetails(id) {
        return Api.admin.get(`/accounting/settlement/batch/${id}`);
    },


    getSettlementAccountBankDetails(accountId) {
        return Api.admin.get(`/accounting/settlement/account-bank-details/${accountId}`);
    },

    updateSettlementAccountStatus(accountId, data) {
        return Api.admin.put(`/accounting/settlement/account/status/${accountId}`, { data });
    },

}


export default accountingApiRoutes;

