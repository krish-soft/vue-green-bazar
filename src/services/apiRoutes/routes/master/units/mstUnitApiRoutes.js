import { Api } from "@/services/core/api";

const mstUnitApiRoutes = {
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
};

export default mstUnitApiRoutes;
