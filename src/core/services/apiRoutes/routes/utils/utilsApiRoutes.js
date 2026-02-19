// mstUnitApiRoutes
import { Api } from "@/core/services/api/api.js";
// import { get } from "jquery";

const utilsApiRoutes = {

    getStates(filters = {}) {
        return Api.public.get("/utils/states", { queryParams: filters });
    }, //

    getAllEnums(filters = {}) {
        return Api.public.get("/utils/enums", { queryParams: filters, auth: true });
    }, //


    // Admin routes

    getMarkets(filters = {}) {
        return Api.public.get("/utils/markets", { queryParams: filters, auth: true });
    }, //

    getUnits(filters = {}) {
        return Api.public.get("/utils/units", { queryParams: filters, auth: true });
    }, //

    getPackTypeUnits(filters = {}) {
        return Api.public.get("/utils/pack-type-units", { queryParams: filters, auth: true });
    }, //

    getPlatformAccounts(filters = {}) {
        return Api.public.get("/utils/platform-accounts", { queryParams: filters, auth: true });
    }, //


}


export default utilsApiRoutes;