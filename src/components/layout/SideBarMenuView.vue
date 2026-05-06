<template>
  <aside v-if="hasUser" class="position-fixed start-0 d-flex flex-column sidebar border-end"
    :style="sidebarStyle">
    <!-- HEADER + TOGGLE -->
    <div class="d-flex align-items-center justify-content-between px-3 py-2 border-bottom">
      <div v-if="!collapsed">
        <div class="fw-semibold text-white">
          {{ userName }}
        </div>
        <small class="text-light opacity-75">
          {{ userRole }}
        </small>
      </div>

      <!-- COLLAPSE TOGGLER (ALWAYS VISIBLE) -->
      <button class="btn btn-sm btn-outline-light" @click="toggle">
        <i class="fas fa-bars"></i>
      </button>
    </div>

    <!-- MENU -->
    <div class="flex-fill overflow-auto py-2 menu-scroll">
      <ul class="nav nav-pills flex-column gap-1 px-2">
        <SidebarItem
    v-for="(item, i) in menu"
    :key="i"
    :item="item"
    :collapsed="collapsed"
    :level="0"
  />
      </ul>
    </div>
  </aside>

  
</template>

<script setup>
import { computed } from "vue";
import { useUserStore } from "@/core/utils/stores/userStore";
import { useUIStore } from "@/core/utils/stores/uiStore";

import { sideMenu } from "@/core/utils/menus/sideMenu";
import { filterSideMenu } from "@/core/utils/menus/filterSideMenu";

import SidebarItem from "./SidebarItem.vue";

const userStore = useUserStore();
const uiStore = useUIStore();

const hasUser = computed(() => userStore.hasUser);
const collapsed = computed(() => uiStore.sidebarCollapsed);

const menu = computed(() =>
  filterSideMenu(sideMenu, userStore.accessModules)
);

const userName = computed(() => userStore.userName || "User");
const userRole = computed(() => userStore.userRole || "Role");

const sidebarStyle = computed(() => ({
  top: "56px",
  height: "calc(100vh - 56px)",
  width: collapsed.value ? "72px" : "240px",
  zIndex: 1029
}));

const toggle = () => {
  uiStore.sidebarCollapsed = !uiStore.sidebarCollapsed;
};
</script>

<style scoped>
.sidebar {
  background: linear-gradient(180deg, #14532d, #064e3b);
  /* farmer green */
}

.menu-scroll {
  padding-bottom: 1.25rem;
  scrollbar-gutter: stable;
}

</style>

