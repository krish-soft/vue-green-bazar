
import { Api } from "@/core/services/api/api.js";

const fulfillmentLocationApiRoutes = {

    getFulfillmentLocationsList(filters = {}) {
        return Api.admin.get("/fulfillmentLocation", { queryParameters: filters });
    },

    createFulfillmentLocation(data) {
        return Api.admin.post("/fulfillmentLocation", { data });
    },

    getFulfillmentLocationDetails(id) {
        return Api.admin.get(`/fulfillmentLocation/${id}`);
    },

    updateFulfillmentLocation(id, data) {
        return Api.admin.put(`/fulfillmentLocation/${id}`, { data });
    }, // Update

    deleteFulfillmentLocation(id) {
        return Api.admin.delete(`/fulfillmentLocation/${id}`);
    }, // Delete

    // Depot add or detials
    addFulfillmentLocationDepot(data) {
        return Api.admin.post("/fulfillmentLocation/addDepot", { data });
    },

    removeFulfillmentLocationDepot(id) {
        return Api.admin.delete(`/fulfillmentLocation/removeDepot/${id}`);
    },

}

export default fulfillmentLocationApiRoutes;