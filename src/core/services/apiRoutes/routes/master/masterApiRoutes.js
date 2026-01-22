// mstUnitApiRoutes
import { Api } from "@/core/services/api/api.js";
import { get } from "jquery";

const masterApiRoutes = {
  /////////////
  // MstUnit //
  /////////////

  getMstUnitList() {
    return Api.admin.get("/master/mstUnit");
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

  getMstPackTypeList() {
    return Api.admin.get("/master/mstPackType");
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

  getMstVehicleList() {
    return Api.admin.get("/master/mstVehicle");
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
  getMstStateList() {
    return Api.admin.get("/master/mstState");
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
  
  getMstZoneList() {
    return Api.admin.get("/master/mstZone");
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
  getMstDepotList() {
    return Api.admin.get("/master/mstDepot");
  }, // List
  createMstDepot(data) {
    return Api.admin.post("/master/mstDepot", { data });
  }, // Create
  updateMstDepot(id, data) {
    return Api.admin.put(`/master/mstDepot/${id}`, { data });
  }, // Update

  deleteMstDepot(id) {
    return Api.admin.delete(`/master/mstDepot/${id}`);
  }, // Delete

  addDepotAddress(id, data) {
    return Api.admin.post(`/master/mstDepot/addAddress/${id}`, { data });
  }, // Add Address

  updateDepotAddress(depotId, data) {
    return Api.admin.put(`/master/mstDepot/${depotId}/updateAddress`, { data });
  }, // Update Address

  //
};

export default masterApiRoutes;
