// mstUnitApiRoutes
import { Api } from "@/core/services/api/api.js";
// import { get } from "jquery";

const utilsApiRoutes = {

    getStates(filters = {}) {
        return Api.public.get("/utils/states", { queryParams: filters });
    }, //

    getUnits(filters = {}) {
        return Api.public.get("/utils/units", { queryParams: filters });
    }, //

    getPackTypeUnits(filters = {}) {
        return Api.public.get("/utils/pack-type-units", { queryParams: filters });
    }, //

    getAllEnums(filters = {}) {
        return Api.public.get("/utils/enums", { queryParams: filters, auth: true });
    }, //

}


export default utilsApiRoutes;