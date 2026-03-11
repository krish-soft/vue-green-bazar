
import { Api } from "@/core/services/api/api.js";

const adminUserApiRoutes = {

    // Admin Users

    getAdminUsersList(filters = {}) {
        return Api.admin.get("/adminUser", { queryParams: filters });
    },

    getAdminUserDetails(id) {
        return Api.admin.get(`/adminUser/${id}`);
    },

    createAdminUser(data) {
        return Api.admin.post("/adminUser", { data });
    },

    updateAdminUser(id, data) {
        return Api.admin.put(`/adminUser/${id}`, { data });
    },

    deleteAdminUser(id) {
        return Api.admin.delete(`/adminUser/${id}`);
    },


}

export default adminUserApiRoutes;