
import { Api } from "@/core/services/api/api.js";

const productListingApiRoutes = {

    getProductListingsList(filters = {}) {
        return Api.admin.get("/listing/", { queryParameters: filters });
    },

    getProductListingDetails(id) {
        return Api.admin.get(`/listing/${id}`);
    },

    cancelProductListing(id) {
        return Api.admin.post(`/listing/${id}`);
    },


    updateListingPackage(packageId) {
        return Api.admin.put(`/listing/packages/${packageId}`);
    },

    cancelListingPackage(packageId) {
        return Api.admin.post(`/listing/packages/cancel/${packageId}`);
    },


}

export default productListingApiRoutes;