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

export const uploadDepotPicture = (id, payload) =>
  withUI(() => masterApiRoutes.uploadDepotPicture(id, payload));

export const removeDepotPicture = (id) =>
  withUI(() => masterApiRoutes.removeDepotPicture(id)); 