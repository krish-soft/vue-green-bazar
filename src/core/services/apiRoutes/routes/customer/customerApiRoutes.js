
import { Api } from "@/core/services/api/api.js";

const customerApiRoutes = {
    // Users

    searchCustomerAutocomplete(filters = {}) {
        return Api.admin.get("/customer/search", { queryParams: filters });
    },

    getCustomerList(filters = {}) {
        return Api.admin.get("/customer/customer", { queryParams: filters });
    },

    createCustomer(data) {
        return Api.admin.post("/customer/customer", { data });
    },



    updateCustomer(id, data) {
        return Api.admin.put(`/customer/customer/${id}`, { data });
    }, // Update

    deleteCustomer(id) {
        return Api.admin.delete(`/customer/customer/${id}`);
    }, // Delete

    // Depot add or detials
    addCustomerDepot(data) {
        return Api.admin.post("/customer/addDepot", { data });
    },

    removeCustomerDepot(id) {
        return Api.admin.delete(`/customer/removeDepot/${id}`);
    },


    // Address Details
    addCustomerAddress(data) {
        return Api.admin.post("/customer/address", { data });
    },

    addCustomerBillingAddress(data) {
        return Api.admin.post("/customer/billingAddress", { data });
    },





    // Customer Details
}

export default customerApiRoutes;