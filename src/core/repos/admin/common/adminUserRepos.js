import { withUI } from "@/core/repos/_helpers/repoHelper";
import apiRouteService from "@/core/services/apiRoutes/apiRouteService.js";




// Admin User Related APIs

export const fetchAdminUsersList = (filters = {}) =>
    withUI(() => apiRouteService.getAdminUsersList(filters), {
        showSuccessMessage: false,
    });

export const fetchAdminUserDetails = (id) =>
    withUI(() => apiRouteService.getAdminUserDetails(id), {
        showSuccessMessage: false,
    });

export const createAdminUser = (payload) =>
    withUI(() => apiRouteService.createAdminUser(payload));

export const updateAdminUser = (id, payload) =>
    withUI(() => apiRouteService.updateAdminUser(id, payload));

export const deleteAdminUser = (id) =>
    withUI(() => apiRouteService.deleteAdminUser(id));


// Dashboard Data
export const fetchDashboardData = () =>
    withUI(() => apiRouteService.getDashboardData(), {
        showSuccessMessage: false,
    });