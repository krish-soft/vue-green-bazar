import { withUI } from "@/core/repos/_helpers/repoHelper";
import apiRouteService from "@/core/services/apiRoutes/apiRouteService.js";



// Product Listing
export const fetchProductListingsList = (filters = {}) =>
    withUI(() => apiRouteService.getProductListingsList(filters), {
        showSuccessMessage: false,
    });
export const fetchProductListingDetails = (id) =>
    withUI(() => apiRouteService.getProductListingDetails(id), {
        showSuccessMessage: false,
    });
export const cancelProductListing = (id) =>
    withUI(() => apiRouteService.cancelProductListing(id));


// Listing Package
export const updateListingPackage = (packageId) =>
    withUI(() => apiRouteService.updateListingPackage(packageId));

export const cancelListingPackage = (packageId) =>
    withUI(() => apiRouteService.cancelListingPackage(packageId));

