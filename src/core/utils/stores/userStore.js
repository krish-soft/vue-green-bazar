import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { localStorageManager } from "@/core/utils/localStorageManager.js";

const STORAGE_KEY = "_uD_";

/* -----------------------
 | DEFAULT USER SHAPE
 ----------------------- */
const defaultUserMeta = () => ({
  user_id: null,
  user_code: null,
  name: null,
  nickname: null,
  email: null,
  role: null,
  user_type: null,
  access_modules: [],
  user_setting: null,
});

export const useUserStore = defineStore("user", () => {
  /* -----------------------
   | STATE
   ----------------------- */
  const userMeta = ref(defaultUserMeta());

  /* -----------------------
   | HYDRATE FROM STORAGE
   ----------------------- */
  const hydrate = () => {
    const stored = localStorageManager.getItem(STORAGE_KEY);

    if (!stored || typeof stored !== "object") {
      resetUser();
      return;
    }

    userMeta.value = {
      ...defaultUserMeta(),
      ...stored,
    };
  };

  hydrate();

  /* -----------------------
   | ACTIONS
   ----------------------- */

  function setUserMetaData(data) {
    if (!data || typeof data !== "object") return;

    userMeta.value = {
      ...defaultUserMeta(),
      ...data,
    };

    localStorageManager.setItem(STORAGE_KEY, userMeta.value);
  }

  function updateUserMetaPartial(partialData) {
    if (!partialData || typeof partialData !== "object") return;

    userMeta.value = {
      ...userMeta.value,
      ...partialData,
    };

    localStorageManager.setItem(STORAGE_KEY, userMeta.value);
  }

  function removeUserMetaData() {
    resetUser();
  }

  function resetUser() {
    userMeta.value = defaultUserMeta();
    localStorageManager.removeItem(STORAGE_KEY);
  }

  /* -----------------------
   | GETTERS (ATOMIC)
   ----------------------- */
  const userId = computed(() => userMeta.value.user_id);
  const userCode = computed(() => userMeta.value.user_code);
  const userName = computed(() => userMeta.value.name);
  const userNickname = computed(() => userMeta.value.nickname);
  const userEmail = computed(() => userMeta.value.email);
  const userRole = computed(() => userMeta.value.role);
  const userType = computed(() => userMeta.value.user_type);
  const accessModules = computed(() => userMeta.value.access_modules || []);
  const userSetting = computed(() => userMeta.value.user_setting);

  /* -----------------------
   | DERIVED / LOGIC GETTERS
   ----------------------- */

  const hasUser = computed(() => !!userMeta.value.user_id);

  const hasRole = (role) => {
    if (!role) return false;
    return userMeta.value.role === role;
  };

  const hasAnyRole = (roles = []) => {
    if (!Array.isArray(roles)) return false;
    return roles.includes(userMeta.value.role);
  };

  const hasModuleAccess = (moduleKey) => {
    if (!moduleKey) return false;
    return accessModules.value.includes(moduleKey);
  };

  const hasAnyModuleAccess = (modules = []) => {
    if (!Array.isArray(modules)) return false;
    return modules.some((m) => accessModules.value.includes(m));
  };

  /* -----------------------
   | AUTO-SYNC SAFETY
   ----------------------- */
  watch(
    userMeta,
    (val) => {
      if (val?.user_id) {
        localStorageManager.setItem(STORAGE_KEY, val);
      }
    },
    { deep: true }
  );

  /* -----------------------
   | EXPORT
   ----------------------- */
  return {
    // state
    userMeta,

    // actions
    setUserMetaData,
    updateUserMetaPartial,
    removeUserMetaData,
    resetUser,

    // atomic getters
    userId,
    userCode,
    userName,
    userNickname,
    userEmail,
    userRole,
    userType,
    accessModules,
    userSetting,

    // logic getters
    hasUser,
    hasRole,
    hasAnyRole,
    hasModuleAccess,
    hasAnyModuleAccess,
  };
});
