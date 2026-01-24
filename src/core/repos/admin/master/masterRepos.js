import { withUI } from "@/core/repos/_helpers/repoHelper";
import masterApiRoutes from "@/core/services/apiRoutes/routes/master/masterApiRoutes.js";

/* ======================
   MstUnit
====================== */
export const fetchUnits = (queryParams = {}) =>
  withUI(() => masterApiRoutes.getMstUnitList(queryParams), {
    showSuccessMessage: false,
  });

export const createUnit = (payload) =>
  withUI(() => masterApiRoutes.createMstUnit(payload));

export const updateUnit = (id, payload) =>
  withUI(() => masterApiRoutes.updateMstUnit(id, payload));

export const deleteUnit = (id) =>
  withUI(() => masterApiRoutes.deleteMstUnit(id));

/* ======================
   MstPackType
====================== */
export const fetchPackTypes = (queryParams = {}) =>
  withUI(() => masterApiRoutes.getMstPackTypeList(queryParams), {
    showSuccessMessage: false,
  });

export const createPackType = (payload) =>
  withUI(() => masterApiRoutes.createMstPackType(payload));

export const updatePackType = (id, payload) =>
  withUI(() => masterApiRoutes.updateMstPackType(id, payload));

export const deletePackType = (id) =>
  withUI(() => masterApiRoutes.deleteMstPackType(id));

/* ======================
   MstVehicle
====================== */
export const fetchVehicles = (queryParams = {}) =>
  withUI(() => masterApiRoutes.getMstVehicleList(queryParams), {
    showSuccessMessage: false,
  });

export const createVehicle = (payload) =>
  withUI(() => masterApiRoutes.createMstVehicle(payload));

export const updateVehicle = (id, payload) =>
  withUI(() => masterApiRoutes.updateMstVehicle(id, payload));

export const deleteVehicle = (id) =>
  withUI(() => masterApiRoutes.deleteMstVehicle(id));

/* ======================
   MstState
====================== */
export const fetchStates = (filters = {}) =>
  withUI(() => masterApiRoutes.getMstStateList(filters), {
    showSuccessMessage: false,
  });

export const createState = (payload) =>
  withUI(() => masterApiRoutes.createMstState(payload));

export const updateState = (id, payload) =>
  withUI(() => masterApiRoutes.updateMstState(id, payload));

export const deleteState = (id) =>
  withUI(() => masterApiRoutes.deleteMstState(id));

/* ======================
   MstZone
====================== */
export const fetchZones = (filters = {}) =>
  withUI(() => masterApiRoutes.getMstZoneList(filters), {
    showSuccessMessage: false,
  });

export const createZone = (payload) =>
  withUI(() => masterApiRoutes.createMstZone(payload));

export const updateZone = (id, payload) =>
  withUI(() => masterApiRoutes.updateMstZone(id, payload));

export const deleteZone = (id) =>
  withUI(() => masterApiRoutes.deleteMstZone(id));

/* ======================
   MstDepot
====================== */
export const fetchDepots = (queryParams = {}) =>
  withUI(() => masterApiRoutes.getMstDepotList(queryParams), {
    showSuccessMessage: false,
  });

export const createDepot = (payload) =>
  withUI(() => masterApiRoutes.createMstDepot(payload));

export const updateDepot = (id, payload) =>
  withUI(() => masterApiRoutes.updateMstDepot(id, payload));

export const showDepotDetails = (id) =>
  withUI(() => masterApiRoutes.showMstDepot(id), { showSuccessMessage: false });

export const deleteDepot = (id) =>
  withUI(() => masterApiRoutes.deleteMstDepot(id));

export const saveDepotAddress = (id, payload) =>
  withUI(() => masterApiRoutes.addDepotAddress(id, payload));

export const uploadDepotPicture = (id, filePayload) =>
  withUI(() => masterApiRoutes.uploadDepotPicture(id, filePayload));

export const removeDepotPicture = (id) =>
  withUI(() => masterApiRoutes.removeDepotPicture(id));

/* ======================
   MstProductCategory
====================== */

export const fetchProductCategories = (filters = {}) =>
  withUI(() => masterApiRoutes.getMstProductCategoryList(filters), {
    showSuccessMessage: false,
  });

export const createProductCategory = (payload) =>
  withUI(() => masterApiRoutes.createMstProductCategory(payload));

export const updateProductCategory = (id, payload) =>
  withUI(() => masterApiRoutes.updateMstProductCategory(id, payload));

export const deleteProductCategory = (id) =>
  withUI(() => masterApiRoutes.deleteMstProductCategory(id));

/* ======================
   MstProduct
====================== */

export const fetchProducts = (filters = {}) =>
  withUI(() => masterApiRoutes.getMstProductList(filters), {
    showSuccessMessage: false,
  });
export const createProduct = (payload) =>
  withUI(() => masterApiRoutes.createMstProduct(payload));
export const updateProduct = (id, payload) =>
  withUI(() => masterApiRoutes.updateMstProduct(id, payload));
export const deleteProduct = (id) =>
  withUI(() => masterApiRoutes.deleteMstProduct(id));

/* ======================
   MstProductVariant
====================== */

export const fetchProductVariants = (filters = {}) =>
  withUI(() => masterApiRoutes.getMstProductVariantList(filters), {
    showSuccessMessage: false,
  });
export const createProductVariant = (payload) =>
  withUI(() => masterApiRoutes.createMstProductVariant(payload));
export const updateProductVariant = (id, payload) =>
  withUI(() => masterApiRoutes.updateMstProductVariant(id, payload));
export const deleteProductVariant = (id) =>
  withUI(() => masterApiRoutes.deleteMstProductVariant(id));


/* ======================
   MstProductPackaging
====================== */

export const fetchProductPackagings = (filters = {}) =>
  withUI(() => masterApiRoutes.getMstProductPackagingList(filters), {
    showSuccessMessage: false,
  });
export const createProductPackaging = (payload) =>
  withUI(() => masterApiRoutes.createMstProductPackaging(payload));
export const updateProductPackaging = (id, payload) =>
  withUI(() => masterApiRoutes.updateMstProductPackaging(id, payload));
export const deleteProductPackaging = (id) =>
  withUI(() => masterApiRoutes.deleteMstProductPackaging(id));


/* ======================
   MstCharge
====================== */
export const fetchCharges = (filters = {}) =>
  withUI(() => masterApiRoutes.getMstChargeList(filters), {
    showSuccessMessage: false,
  });
export const createCharge = (payload) =>
  withUI(() => masterApiRoutes.createMstCharge(payload));
export const updateCharge = (id, payload) =>
  withUI(() => masterApiRoutes.updateMstCharge(id, payload));
export const deleteCharge = (id) =>
  withUI(() => masterApiRoutes.deleteMstCharge(id));


/* ======================
   MstChargeLevel
====================== */

export const fetchChargeLevels = (filters = {}) =>
  withUI(() => masterApiRoutes.getMstChargeLevelList(filters), {
    showSuccessMessage: false,
  });
export const createChargeLevel = (payload) =>
  withUI(() => masterApiRoutes.createMstChargeLevel(payload));
export const updateChargeLevel = (id, payload) =>
  withUI(() => masterApiRoutes.updateMstChargeLevel(id, payload));
export const deleteChargeLevel = (id) =>
  withUI(() => masterApiRoutes.deleteMstChargeLevel(id));


/* ======================
   MstMinimumOrderChargeRule
====================== */
export const fetchMinimumOrderChargeRules = (filters = {}) =>
  withUI(() => masterApiRoutes.getMstMinimumOrderChargeRuleList(filters), {
    showSuccessMessage: false,
  });
export const createMinimumOrderChargeRule = (payload) =>
  withUI(() => masterApiRoutes.createMstMinimumOrderChargeRule(payload));
export const updateMinimumOrderChargeRule = (id, payload) =>
  withUI(() => masterApiRoutes.updateMstMinimumOrderChargeRule(id, payload));
export const deleteMinimumOrderChargeRule = (id) =>
  withUI(() => masterApiRoutes.deleteMstMinimumOrderChargeRule(id));


/* ======================
   MstDeliveryChargeRule
====================== */
export const fetchDeliveryChargeRules = (filters = {}) =>
  withUI(() => masterApiRoutes.getMstDeliveryChargeRuleList(filters), {
    showSuccessMessage: false,
  });
export const createDeliveryChargeRule = (payload) =>
  withUI(() => masterApiRoutes.createMstDeliveryChargeRule(payload));
export const updateDeliveryChargeRule = (id, payload) =>
  withUI(() => masterApiRoutes.updateMstDeliveryChargeRule(id, payload));
export const deleteDeliveryChargeRule = (id) =>
  withUI(() => masterApiRoutes.deleteMstDeliveryChargeRule(id));
