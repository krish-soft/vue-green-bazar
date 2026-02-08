
import { Api } from "@/core/services/api/api.js";

const accountingApiRoutes = {


    // Accounts 

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



}

export default accountingApiRoutes;

