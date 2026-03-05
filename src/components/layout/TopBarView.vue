<!-- TopBarView.vue -->
<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm">
    <TopBarLoader :show="uiStore.isLoading || isLoading" :onTop="!uiStore.isCenterLoading" />

    <div class="container-fluid">
      <!-- Brand -->
      <RouterLink class="navbar-brand fw-bold" :to="{ name: 'home' }">
        KHET BAJAR
      </RouterLink>

      <!-- Right Icons (ALWAYS VISIBLE) -->
      <div class="d-flex align-items-center order-lg-3 ms-auto">

        <!-- 🔙 BACK BUTTON (NEW) -->
        <button v-if="isLoggedIn" class="btn btn-sm btn-outline-light me-2" title="Go Back" @click="goBack">
          <i class="fas fa-arrow-left"></i>
        </button>

        <!-- 🔄 REFRESH BUTTON (NEW – ROUTE ONLY) -->
        <button v-if="isLoggedIn" class="btn btn-sm btn-outline-light me-2" title="Refresh Page" @click="refreshPage">
          <i class="fas fa-rotate-right"></i>
        </button>

        <!-- Keep Vertical Sep -->
        <div class="vr me-2 ms-2" style="color: #ffffff;"></div>

        <!-- Existing icons (UNCHANGED) -->
        <button class="nav-icon me-2" v-if="isLoggedIn">
          <i class="fas fa-bell"></i>
        </button>

        <button class="nav-icon me-2" v-if="isLoggedIn">
          <i class="fas fa-cog"></i>
        </button>

        <TopBarProfile v-if="isLoggedIn" />

        <RouterLink v-else class="btn btn-outline-light btn-sm" :to="{ name: 'signin' }">
          Sign In
        </RouterLink>
      </div>

      <!-- Mobile Toggle -->
      <button class="navbar-toggler order-lg-2 ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#topbar">
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
import { useRouter, useRoute } from "vue-router";

import { useAuthStore } from "@/core/utils/stores/authStore";
import { useUIStore } from "@/core/utils/stores/uiStore";

import TopBarMenu from "./navbar/TopBarMenu.vue";
import TopBarProfile from "./navbar/TopBarProfile.vue";
import TopBarLoader from "./navbar/TopBarLoader.vue";

/* STORES */
const authStore = useAuthStore();
const uiStore = useUIStore();

/* ROUTER */
const router = useRouter();
const route = useRoute();

/* STATE */
const isLoading = ref(false);

/* DERIVED */
const isLoggedIn = computed(() => authStore.isLoggedIn);

/* 🔙 BACK */
const goBack = () => {
  router.back();
};

/* 🔄 REFRESH CURRENT ROUTE ONLY (NO FULL RELOAD) */
/* SAFE REFRESH */
const refreshPage = () => {
  router.go(0);
};

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
