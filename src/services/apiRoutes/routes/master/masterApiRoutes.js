// mstUnitApiRoutes
import { Api } from "@/services/core/api";

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




  

  //
};

export default masterApiRoutes;
