<template>
  <div>
    <!-- Sidebar -->
    <SideBarMenuView />

    <!-- Top Bar -->
    <TopBarView :isLoading="uiStore.isLoading" />

    <!-- Alerts -->
    <AlertMessages :successMessage="uiStore.successMessage" :errorMessages="uiStore.errorMessages"
      :warningMessages="uiStore.warningMessages" />

    <!-- CONTENT + FOOTER WRAPPER -->
    <div class="d-flex flex-column min-vh-100" :class="contentClass" style="padding-top:56px;">
      <!-- Main Content -->
      <main class="container-fluid flex-fill">
        <router-view />
      </main>

      <!-- Footer -->
      <footer class="bg-light text-end py-3 px-3 border-top">
        <span class="text-muted">
          © 2025
          <a href="https://www.lionheartapps.com" target="_blank" style="color: orangered">
            Lionheart Apps (OPC) Pvt. Ltd.
          </a>
        </span>
      </footer>
    </div>
  </div>
</template>


<script setup>
import { computed } from "vue";
import { useUIStore } from "@/utils/stores/uiStore";

import TopBarView from "@/components/layout/TopBarView.vue";
import SideBarMenuView from "@/components/layout/SideBarMenuView.vue";
import AlertMessages from "@/components/alerts/AlertMessages.vue";

const uiStore = useUIStore();

const contentClass = computed(() =>
  uiStore.sidebarCollapsed
    ? "ms-sidebar-collapsed"
    : "ms-sidebar-expanded"
);
</script>


<style scoped>
.ms-sidebar-expanded {
  margin-left: 240px;
}

.ms-sidebar-collapsed {
  margin-left: 72px;
}

/* Mobile: sidebar overlays content */
/* @media (max-width: 991px) {

  .ms-sidebar-expanded,
  .ms-sidebar-collapsed {
    margin-left: 0;
  }
} */
</style>
