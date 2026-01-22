<!-- TopBarView.vue -->
<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm">
    <TopBarLoader :show="uiStore.isLoading || isLoading" :onTop="!uiStore.isCenterLoading" />

    <div class="container-fluid">
      <!-- Brand -->
      <RouterLink class="navbar-brand fw-bold" :to="{ name: 'home' }">
        Green Bazar
      </RouterLink>

      <!-- Right Icons (ALWAYS VISIBLE) -->
      <!-- Right Icons (ALWAYS visible) -->
      <div class="d-flex align-items-center order-lg-3 ms-auto">
        <button class="nav-icon me-3" v-if="isLoggedIn">
          <i class="fas fa-bell"></i>
        </button>

        <button class="nav-icon me-3" v-if="isLoggedIn">
          <i class="fas fa-cog"></i>
        </button>

        <TopBarProfile v-if="isLoggedIn" />
        <RouterLink v-else class="btn btn-outline-light btn-sm" :to="{ name: 'signin' }">
          Sign In
        </RouterLink>
      </div>


      <!-- Mobile Toggle -->
      <button class="navbar-toggler order-lg-2 ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#topbar"
        aria-controls="topbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Collapsible Left Menu -->
      <div class="collapse navbar-collapse order-lg-1" id="topbar">
        <TopBarMenu :is-auth="isLoggedIn" />
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed, ref } from "vue";
import { useAuthStore } from "@/core/utils/stores/authStore";
import { useUIStore } from "@/core/utils/stores/uiStore";

import TopBarMenu from "./navbar/TopBarMenu.vue";
import TopBarProfile from "./navbar/TopBarProfile.vue";
import TopBarLoader from "./navbar/TopBarLoader.vue";

/* -----------------------
 | STORES
 ----------------------- */
const authStore = useAuthStore();
const uiStore = useUIStore();

/* -----------------------
 | STATE
 ----------------------- */
const isLoading = ref(false);

/* -----------------------
 | DERIVED
 ----------------------- */
const isLoggedIn = computed(() => authStore.isLoggedIn);
</script>

<style scoped>
.nav-icon {
  background: transparent;
  border: none;
  color: #ffffff;
  font-size: 1.1rem;
}

.nav-icon:hover {
  color: #adb5bd;
}
</style>
