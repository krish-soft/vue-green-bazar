import { withUI } from "@/core/repos/_helpers/repoHelper";
// import apiRouteService from "@/core/services/apiRoutes/routes/master/apiRouteService.js";
import apiRouteService from "@/core/services/apiRoutes/apiRouteService.js";

/* ======================
   MstUnit
====================== */
export const fetchUnits = (filters = {}) =>
  withUI(() => apiRouteService.getMstUnitList(filters), {
    showSuccessMessage: false,
  });

export const createUnit = (payload) =>
  withUI(() => apiRouteService.createMstUnit(payload));

export const updateUnit = (id, payload) =>
  withUI(() => apiRouteService.updateMstUnit(id, payload));

export const deleteUnit = (id) =>
  withUI(() => apiRouteService.deleteMstUnit(id));

/* ======================
   MstPackType
====================== */
export const fetchPackTypes = (filters = {}) =>
  withUI(() => apiRouteService.getMstPackTypeList(filters), {
    showSuccessMessage: false,
  });

export const createPackType = (payload) =>
  withUI(() => apiRouteService.createMstPackType(payload));

export const updatePackType = (id, payload) =>
  withUI(() => apiRouteService.updateMstPackType(id, payload));

export const deletePackType = (id) =>
  withUI(() => apiRouteService.deleteMstPackType(id));

/* ======================
   MstVehicle
====================== */
export const fetchVehicles = (filters = {}) =>
  withUI(() => apiRouteService.getMstVehicleList(filters), {
    showSuccessMessage: false,
  });

export const createVehicle = (payload) =>
  withUI(() => apiRouteService.createMstVehicle(payload));

export const updateVehicle = (id, payload) =>
  withUI(() => apiRouteService.updateMstVehicle(id, payload));

export const deleteVehicle = (id) =>
  withUI(() => apiRouteService.deleteMstVehicle(id));

/* ======================
   MstState
====================== */
export const fetchStates = (filters = {}) =>
  withUI(() => apiRouteService.getMstStateList(filters), {
    showSuccessMessage: false,
  });

export const createState = (payload) =>
  withUI(() => apiRouteService.createMstState(payload));

export const updateState = (id, payload) =>
  withUI(() => apiRouteService.updateMstState(id, payload));

export const deleteState = (id) =>
  withUI(() => apiRouteService.deleteMstState(id));

/* ======================
   MstZone
====================== */
export const fetchZones = (filters = {}) =>
  withUI(() => apiRouteService.getMstZoneList(filters), {
    showSuccessMessage: false,
  });

export const createZone = (payload) =>
  withUI(() => apiRouteService.createMstZone(payload));

export const updateZone = (id, payload) =>
  withUI(() => apiRouteService.updateMstZone(id, payload));

export const deleteZone = (id) =>
  withUI(() => apiRouteService.deleteMstZone(id));

/* ======================
   MstDepot
====================== */
export const fetchDepots = (filters = {}) =>
  withUI(() => apiRouteService.getMstDepotList(filters), {
    showSuccessMessage: false,
  });

export const createDepot = (payload) =>
  withUI(() => apiRouteService.createMstDepot(payload));

export const updateDepot = (id, payload) =>
  withUI(() => apiRouteService.updateMstDepot(id, payload));

export const showDepotDetails = (id) =>
  withUI(() => apiRouteService.showMstDepot(id), { showSuccessMessage: false });

export const deleteDepot = (id) =>
  withUI(() => apiRouteService.deleteMstDepot(id));

export const saveDepotAddress = (id, payload) =>
  withUI(() => apiRouteService.addDepotAddress(id, payload));

export const uploadDepotPicture = (id, filePayload) =>
  withUI(() => apiRouteService.uploadDepotPicture(id, filePayload));

export const removeDepotPicture = (id) =>
  withUI(() => apiRouteService.removeDepotPicture(id));

/* ======================
   MstProductCategory
====================== */

export const fetchProductCategories = (filters = {}) =>
  withUI(() => apiRouteService.getMstProductCategoryList(filters), {
    showSuccessMessage: false,
  });

export const createProductCategory = (payload) =>
  withUI(() => apiRouteService.createMstProductCategory(payload));

export const updateProductCategory = (id, payload) =>
  withUI(() => apiRouteService.updateMstProductCategory(id, payload));

export const deleteProductCategory = (id) =>
  withUI(() => apiRouteService.deleteMstProductCategory(id));

/* ======================
   MstProduct
====================== */

export const fetchProducts = (filters = {}) =>
  withUI(() => apiRouteService.getMstProductList(filters), {
    showSuccessMessage: false,
  });
export const createProduct = (data, files) =>
  withUI(() => apiRouteService.createMstProduct(data, files));
export const updateProduct = (id, data, files) =>
  withUI(() => apiRouteService.updateMstProduct(id, data, files));
export const deleteProduct = (id) =>
  withUI(() => apiRouteService.deleteMstProduct(id));

/* ======================
   MstProductVariant
====================== */

export const fetchProductVariants = (filters = {}) =>
  withUI(() => apiRouteService.getMstProductVariantList(filters), {
    showSuccessMessage: false,
  });
export const createProductVariant = (payload) =>
  withUI(() => apiRouteService.createMstProductVariant(payload));
export const updateProductVariant = (id, payload) =>
  withUI(() => apiRouteService.updateMstProductVariant(id, payload));
export const deleteProductVariant = (id) =>
  withUI(() => apiRouteService.deleteMstProductVariant(id));


/* ======================
   MstProductPackaging
====================== */

export const fetchProductPackagings = (filters = {}) =>
  withUI(() => apiRouteService.getMstProductPackagingList(filters), {
    showSuccessMessage: false,
  });
export const createProductPackaging = (payload) =>
  withUI(() => apiRouteService.createMstProductPackaging(payload));
export const updateProductPackaging = (id, payload) =>
  withUI(() => apiRouteService.updateMstProductPackaging(id, payload));
export const deleteProductPackaging = (id) =>
  withUI(() => apiRouteService.deleteMstProductPackaging(id));


/* ======================
   MstCharge
====================== */
export const fetchCharges = (filters = {}) =>
  withUI(() => apiRouteService.getMstChargeList(filters), {
    showSuccessMessage: false,
  });
export const createCharge = (payload) =>
  withUI(() => apiRouteService.createMstCharge(payload));
export const updateCharge = (id, payload) =>
  withUI(() => apiRouteService.updateMstCharge(id, payload));
export const deleteCharge = (id) =>
  withUI(() => apiRouteService.deleteMstCharge(id));


/* ======================
   MstChargeLevel
====================== */

export const fetchChargeLevels = (filters = {}) =>
  withUI(() => apiRouteService.getMstChargeLevelList(filters), {
    showSuccessMessage: false,
  });
export const createChargeLevel = (payload) =>
  withUI(() => apiRouteService.createMstChargeLevel(payload));
export const updateChargeLevel = (id, payload) =>
  withUI(() => apiRouteService.updateMstChargeLevel(id, payload));
export const deleteChargeLevel = (id) =>
  withUI(() => apiRouteService.deleteMstChargeLevel(id));


/* ======================
   MstMinimumOrderChargeRule
====================== */
export const fetchMinimumOrderChargeRules = (filters = {}) =>
  withUI(() => apiRouteService.getMstMinimumOrderChargeRuleList(filters), {
    showSuccessMessage: false,
  });
export const createMinimumOrderChargeRule = (payload) =>
  withUI(() => apiRouteService.createMstMinimumOrderChargeRule(payload));
export const updateMinimumOrderChargeRule = (id, payload) =>
  withUI(() => apiRouteService.updateMstMinimumOrderChargeRule(id, payload));
export const deleteMinimumOrderChargeRule = (id) =>
  withUI(() => apiRouteService.deleteMstMinimumOrderChargeRule(id));


/* ======================
   MstDeliveryChargeRule
====================== */
export const fetchDeliveryChargeRules = (filters = {}) =>
  withUI(() => apiRouteService.getMstDeliveryChargeRuleList(filters), {
    showSuccessMessage: false,
  });
export const createDeliveryChargeRule = (payload) =>
  withUI(() => apiRouteService.createMstDeliveryChargeRule(payload));
export const updateDeliveryChargeRule = (id, payload) =>
  withUI(() => apiRouteService.updateMstDeliveryChargeRule(id, payload));
export const deleteDeliveryChargeRule = (id) =>
  withUI(() => apiRouteService.deleteMstDeliveryChargeRule(id));


// settings

// mstFinancialYear
export const fetchFinancialYears = (filters = {}) =>
  withUI(() => apiRouteService.getMstFinancialYearList(filters), {
    showSuccessMessage: false,
  });
export const createFinancialYear = (payload) =>
  withUI(() => apiRouteService.createMstFinancialYear(payload));
export const updateFinancialYear = (id, payload) =>
  withUI(() => apiRouteService.updateMstFinancialYear(id, payload));
export const deleteFinancialYear = (id) =>
  withUI(() => apiRouteService.deleteMstFinancialYear(id));

// mstAppSetting
export const fetchAppSettings = (filters = {}) =>
  withUI(() => apiRouteService.getMstAppSetting(filters), {
    showSuccessMessage: false,
  });

export const updateAppSetting = (payload) =>
  withUI(() => apiRouteService.updateMstAppSetting(payload));

// mstFinanceSetting
export const fetchFinanceSettings = (filters = {}) =>
  withUI(() => apiRouteService.getMstFinanceSetting(filters), {
    showSuccessMessage: false,
  });
export const updateFinanceSetting = (payload) =>
  withUI(() => apiRouteService.updateMstFinanceSetting(payload));

// mstPaymentSetting
export const fetchPaymentSettings = (filters = {}) =>
  withUI(() => apiRouteService.getMstPaymentSetting(filters), {
    showSuccessMessage: false,
  });
export const updatePaymentSetting = (payload) =>
  withUI(() => apiRouteService.updateMstPaymentSetting(payload));

// mstBusinessSetting
export const fetchBusinessSettings = (filters = {}) =>
  withUI(() => apiRouteService.getMstBusinessSetting(filters), {
    showSuccessMessage: false,
  });
export const updateBusinessSetting = (payload) =>
  withUI(() => apiRouteService.updateMstBusinessSetting(payload));

export const saveBusinessSettingAddress = (payload) =>
  withUI(() => apiRouteService.updateMstBusinesSettingsBillingAddress(payload));