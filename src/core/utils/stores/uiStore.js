// src/utils/stores/uiStore.js
import { defineStore } from "pinia";
import { ref } from "vue";
import { useUserStore } from "@/core/utils/stores/userStore.js";

export const useUIStore = defineStore("ui", () => {
  const isLoading = ref(false);
  const isCenterLoading = ref(false);
  const sidebarCollapsed = ref(false);
  const successMessage = ref("");
  const errorMessages = ref([]);
  const warningMessages = ref([]);

  function resetMessages() {
    successMessage.value = "";
    errorMessages.value = [];
    warningMessages.value = [];
  }

  function isSuperAdminGroup() {
    // Get Current user role
    const userStore = useUserStore();
    const userRole = userStore.userRole;

    if (userRole && (userRole === 'super_admin' || userRole === 'admin')) {
      return true;
    }
    return false;
  }

  return {
    isLoading,
    isCenterLoading,
    successMessage,
    errorMessages,
    warningMessages,
    resetMessages,
    sidebarCollapsed,

    isSuperAdminGroup,
  };
});
