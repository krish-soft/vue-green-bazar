// src/services/api/routes/authApiRoutes.js

import { Api } from "../../core/api";


const authApiRoutes = {
  /* =====================================================
   | AUTHENTICATION (ADMIN)
   ===================================================== */

  login(credentials) {
    return Api.admin.post("/signin", {
      data: credentials,
    });
  },

  register(userData) {
    return Api.admin.post("/signup", {
      data: userData,
    });
  },

  logout() {
    return Api.admin.post("/signout", {
      auth: true,
    });
  },

  /* =====================================================
   | USER SESSION / META
   ===================================================== */

  getUserMetaData(userUid) {
    return Api.admin.get("/user-meta-data", {
      queryParams: { user_uid: userUid },
      auth: true,
    });
  },

  /* =====================================================
   | FUTURE EXTENSIONS (READY)
   ===================================================== */

  // refreshToken() {
  //   return Api.admin.post("/refresh-token", { auth: true });
  // },

  // updateProfile(data) {
  //   return Api.admin.put("/profile", { data, auth: true });
  // },
};

export default authApiRoutes;
