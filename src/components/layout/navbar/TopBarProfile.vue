<template>
    <div class="dropdown">
        <!-- Trigger -->
        <button class="btn btn-link nav-link dropdown-toggle text-white" data-bs-toggle="dropdown"
            aria-expanded="true">
            <i class="fas fa-user-circle fs-5"></i>
        </button>

        <!-- Dropdown -->
        <ul class="dropdown-menu dropdown-menu-end">
            <!-- User name -->
            <li class="dropdown-header small text-muted">
                {{ userName }}
            </li>

            <li>
                <hr class="dropdown-divider" />
            </li>

            <!-- Settings -->
            <li>
                <RouterLink class="dropdown-item" to="/settings">
                    <i class="fas fa-cog me-2"></i>
                    Settings
                </RouterLink>
            </li>

            <!-- Logout -->
            <li>
                <button class="dropdown-item text-danger" type="button" @click="logout">
                    <i class="fas fa-power-off me-2"></i>
                    Logout
                </button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";

import { useAuthStore } from "@/utils/stores/authStore";
import { useUserStore } from "@/utils/stores/userStore";
import { useUIStore } from "@/utils/stores/uiStore";
import apiRouteService from "@/services/apiRoutes/apiRouteService";

const authStore = useAuthStore();
const userStore = useUserStore();
const uiStore = useUIStore();
const router = useRouter();

/* -----------------------
 | USER NAME
 ----------------------- */
const userName = userStore.userName;

/* -----------------------
 | LOGOUT
 ----------------------- */
const logout = async () => {
    uiStore.isLoading = true;
    try {
        await apiRouteService.logout();
    } catch (_) {
        // ignore API error
    } finally {
        authStore.forceLogout();        

        router.push({ name: "signin" });
    }

    uiStore.isLoading = false;
};
</script>
