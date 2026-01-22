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
  }


  //
};

export default masterApiRoutes;
