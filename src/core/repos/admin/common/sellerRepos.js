import { withUI } from "@/core/repos/_helpers/repoHelper";
import apiRouteService from "@/core/services/apiRoutes/apiRouteService.js";


// Seller Related APIs

// Product Listing
export const fetchProductListingsList = (filters = {}) =>
    withUI(() => apiRouteService.getProductListingsList(filters), {
        showSuccessMessage: false,
    });
export const fetchProductListingDetails = (id) =>
    withUI(() => apiRouteService.getProductListingDetails(id), {
        showSuccessMessage: false,
    });
export const cancelProductListing = (id, payload) =>
    withUI(() => apiRouteService.cancelProductListing(id, payload));


// Listing Package
export const updateListingPackage = (packageId, payload) =>
    withUI(() => apiRouteService.updateListingPackage(packageId, payload));

export const cancelListingPackage = (packageId, payload) =>
    withUI(() => apiRouteService.cancelListingPackage(packageId, payload));
