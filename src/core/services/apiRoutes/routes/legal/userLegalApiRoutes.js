// userLegalApiRoutes.js
import { Api } from "@/core/services/api/api.js";

const userLegalApiRoutes = {

    getKycList(filters = {}) {
        return Api.admin.get("/legal/kyc", { queryParams: filters });
    },

    getKycDetails(id) {
        return Api.admin.get(`/legal/kyc/${id}`);
    },

    updateKycStatus(id, data) {
        return Api.admin.put(`/legal/kyc/status/${id}`, { data });
    },


    uploadKycWithData(data, files) {
        return Api.admin.upload(`/legal/kyc/create`, { data: data, files: files });
    },




};
export default userLegalApiRoutes;
