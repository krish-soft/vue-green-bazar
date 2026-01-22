// router.js
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/utils/stores/authStore";
import { useErrorStore } from "@/utils/stores/errorStore"; // Import Pinia store
import HomeView from "@/views/HomeView.vue";
import SignInView from "@/views/auth/SignInView.vue";
import MsUnitView from "@/views/master/unit/MsUnitView.vue";
import MstPackTypeView from "@/views/master/packType/MstPackTypeView.vue";
import MstVehicleView from "@/views/master/vehicle/MstVehicleView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/signin", name: "signin", component: SignInView },

    // Master Routes
    {
      path: "/master/unit",
      name: "msunit",
      component: MsUnitView,
      meta: { requiresAuth: true },
    },
    {
      path: "/master/packType",
      name: "mstpacktype",
      component: MstPackTypeView,
      meta: { requiresAuth: true },
    },
    {
      path: "/master/vehicle",
      name: "mstvehicle",
      component: MstVehicleView,
      meta: { requiresAuth: true },
    },
  ],

  linkActiveClass: "router-link-active",
  linkExactActiveClass: "router-link-exact-active",
});

// Global Navigation Guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const errorStore = useErrorStore(); // Access the Pinia store for error messages

  console.log("isLoggedIn: " + authStore.isLoggedIn); // Debugging
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    console.log("Setting error message..."); // Debugging
    errorStore.setErrorMessages(["You must be logged in to access this page."]);

    console.log("Error Store:", errorStore.getErrors); // Debugging
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Redirect to the login page
    next("/signin");
  } else {
    next(); // Allow navigation
  }
});

export default router;
