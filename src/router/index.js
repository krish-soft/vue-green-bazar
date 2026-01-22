// router.js
import {createRouter, createWebHistory} from "vue-router";
import {useAuthStore} from "@/core/utils/stores/authStore";
import {useErrorStore} from "@/core/utils/stores/errorStore"; // Import Pinia store


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("@/views/HomeView.vue"),
        },
        {
            path: "/signin",
            name: "signin",
            component: () => import("@/views/auth/SignInView.vue"),
        },

        // Master Routes
        {
            path: "/master",
            meta: {requiresAuth: true},
            children: [
                {
                    path: "unit",
                    name: "msunit",
                    component: () =>
                        import("@/views/master/unit/MstUnitView.vue"),
                },
                {
                    path: "packType",
                    name: "mstpacktype",
                    component: () =>
                        import("@/views/master/packType/MstPackTypeView.vue"),
                },
                {
                    path: "vehicle",
                    name: "mstvehicle",
                    component: () =>
                        import("@/views/master/vehicle/MstVehicleView.vue"),
                },
            ],
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
