
import { Api } from "@/core/services/api/api.js";

const productListingApiRoutes = {

    getProductListingsList(filters = {}) {
        return Api.admin.get("/listing/", { queryParameters: filters });
    },

    getProductListingDetails(id) {
        return Api.admin.get(`/listing/${id}`);
    },

    cancelProductListing(id, data) {
        return Api.admin.post(`/listing/cancel/${id}`, { data });
    },


    updateListingPackage(packageId, data) {
        return Api.admin.put(`/listing/packages/${packageId}`, { data });
    },

    cancelListingPackage(packageId, data) {
        return Api.admin.post(`/listing/packages/cancel/${packageId}`, { data });
    },


}

export default productListingApiRoutes;