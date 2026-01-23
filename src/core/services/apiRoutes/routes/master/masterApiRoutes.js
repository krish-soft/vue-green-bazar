// mstUnitApiRoutes
import { Api } from "@/core/services/api/api.js";
import { get } from "jquery";

const masterApiRoutes = {
  /////////////
  // MstUnit //
  /////////////

  getMstUnitList(queryParams = {}) {
    return Api.admin.get("/master/mstUnit", { queryParams: queryParams });
  }, // List
  createMstUnit(data) {
    return Api.admin.post("/master/mstUnit", { data });
  }, // Create
  updateMstUnit(id, data) {
    return Api.admin.put(`/master/mstUnit/${id}`, { data });
  }, // Update

  deleteMstUnit(id) {
    return Api.admin.delete(`/master/mstUnit/${id}`);
  }, // Delete

  //////////////////
  // MstPackType //
  /////////////////

  getMstPackTypeList(queryParams = {}) {
    return Api.admin.get("/master/mstPackType", { queryParams: queryParams });
  }, // List
  createMstPackType(data) {
    return Api.admin.post("/master/mstPackType", { data });
  }, // Create
  updateMstPackType(id, data) {
    return Api.admin.put(`/master/mstPackType/${id}`, { data });
  }, // Update

  deleteMstPackType(id) {
    return Api.admin.delete(`/master/mstPackType/${id}`);
  }, // Delete

  //////////////////
  // mstVehicle //
  //////////////////

  getMstVehicleList(queryParams = {}) {
    return Api.admin.get("/master/mstVehicle", { queryParams: queryParams });
  }, // List
  createMstVehicle(data) {
    return Api.admin.post("/master/mstVehicle", { data });
  }, // Create
  updateMstVehicle(id, data) {
    return Api.admin.put(`/master/mstVehicle/${id}`, { data });
  }, // Update

  deleteMstVehicle(id) {
    return Api.admin.delete(`/master/mstVehicle/${id}`);
  }, // Delete

  //////////////////
  // mstState //
  //////////////////
  getMstStateList(queryParams = {}) {
    return Api.admin.get("/master/mstState", { queryParams: queryParams });
  }, // List
  createMstState(data) {
    return Api.admin.post("/master/mstState", { data });
  }, // Create
  updateMstState(id, data) {
    return Api.admin.put(`/master/mstState/${id}`, { data });
  }, // Update
  deleteMstState(id) {
    return Api.admin.delete(`/master/mstState/${id}`);
  }, // Delete

  //////////////////
  // mstZone //
  //////////////////

  getMstZoneList(filters = {}) {
    return Api.admin.get("/master/mstZone", { queryParams: filters });
  }, // List
  createMstZone(data) {
    return Api.admin.post("/master/mstZone", { data });
  }, // Create
  updateMstZone(id, data) {
    return Api.admin.put(`/master/mstZone/${id}`, { data });
  }, // Update

  deleteMstZone(id) {
    return Api.admin.delete(`/master/mstZone/${id}`);
  }, // Delete

  //////////////////
  // mstDepot //
  //////////////////
  getMstDepotList(filters = {}) {
    return Api.admin.get("/master/mstDepot", { queryParams: filters });
  }, // List
  createMstDepot(data) {
    return Api.admin.post("/master/mstDepot", { data });
  }, // Create
  updateMstDepot(id, data) {
    return Api.admin.put(`/master/mstDepot/${id}`, { data });
  }, // Update

  showMstDepot(id) {
    return Api.admin.get(`/master/mstDepot/${id}`);
  }, //
  deleteMstDepot(id) {
    return Api.admin.delete(`/master/mstDepot/${id}`);
  }, // Delete
  addDepotAddress(depotId, data) {
    return Api.admin.post(
      `/master/mstDepot/${depotId}/address`,
      { data }
    );
  }, // Add Address
  uploadDepotPicture(depotId, data) {
    return Api.admin.upload(
      `/master/mstDepot/${depotId}/uploadPicture`,
      { files: data }
    );
  }, // Upload Picture
  removeDepotPicture(id) {
    return Api.admin.delete(`/master/mstDepot/${id}/deletePicture`);
  }, // Remove Picture

  ////////////////////////
  // mstProductCategory //
  ////////////////////////

  getMstProductCategoryList(filters = {}) {
    return Api.admin.get("/master/mstProductCategory", {
      queryParams: filters,
    });
  }, // List
  createMstProductCategory(data) {
    return Api.admin.post("/master/mstProductCategory", { data });
  }, // Create
  updateMstProductCategory(id, data) {
    return Api.admin.put(`/master/mstProductCategory/${id}`, { data });
  }, // Update

  deleteMstProductCategory(id) {
    return Api.admin.delete(`/master/mstProductCategory/${id}`);
  }, // Delete

  //////////////////
  // mstProduct //
  //////////////////

  getMstProductList(filters = {}) {
    return Api.admin.get("/master/mstProduct", {
      queryParams: filters,
    });
  }, // List
  createMstProduct(data) {
    return Api.admin.post("/master/mstProduct", { data });
  }, // Create
  updateMstProduct(id, data) {
    return Api.admin.put(`/master/mstProduct/${id}`, { data });
  }, // Update

  deleteMstProduct(id) {
    return Api.admin.delete(`/master/mstProduct/${id}`);
  }, // Delete


  ///////////////////////
  // mstProductVariant //
  ///////////////////////
  getMstProductVariantList(filters = {}) {
    return Api.admin.get("/master/mstProductVariant", {
      queryParams: filters,
    });
  }, // List
  createMstProductVariant(data) {
    return Api.admin.post("/master/mstProductVariant", { data });
  }, // Create
  updateMstProductVariant(id, data) {
    return Api.admin.put(`/master/mstProductVariant/${id}`, { data });
  }, // Update

  deleteMstProductVariant(id) {
    return Api.admin.delete(`/master/mstProductVariant/${id}`);
  }, // Delete

  /////////////////////////
  // mstProductPackaging //
  /////////////////////////

  getMstProductPackagingList(filters = {}) {
    return Api.admin.get("/master/mstProductPackaging", {
      queryParams: filters,
    });
  }, // List
  createMstProductPackaging(data) {
    return Api.admin.post("/master/mstProductPackaging", { data });
  }, // Create
  updateMstProductPackaging(id, data) {
    return Api.admin.put(`/master/mstProductPackaging/${id}`, { data });
  }, // Update

  deleteMstProductPackaging(id) {
    return Api.admin.delete(`/master/mstProductPackaging/${id}`);
  }, // Delete


  ///////////////
  // mstCharge //
  ///////////////
  getMstChargeList(filters = {}) {
    return Api.admin.get("/master/mstCharge", {
      queryParams: filters,
    });
  }, // List
  createMstCharge(data) {
    return Api.admin.post("/master/mstCharge", { data });
  }, // Create
  updateMstCharge(id, data) {
    return Api.admin.put(`/master/mstCharge/${id}`, { data });
  }, // Update

  deleteMstCharge(id) {
    return Api.admin.delete(`/master/mstCharge/${id}`);
  }, // Delete

  ////////////////////
  // mstChargeLevel //
  ////////////////////
  getMstChargeLevelList(filters = {}) {
    return Api.admin.get("/master/mstChargeLevel", {
      queryParams: filters,
    });
  }, // List  
  createMstChargeLevel(data) {
    return Api.admin.post("/master/mstChargeLevel", { data });
  }, // Create
  updateMstChargeLevel(id, data) {
    return Api.admin.put(`/master/mstChargeLevel/${id}`, { data });
  }, // Update

  deleteMstChargeLevel(id) {
    return Api.admin.delete(`/master/mstChargeLevel/${id}`);
  }, // Delete



  //
};

export default masterApiRoutes;
