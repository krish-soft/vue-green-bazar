import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { localStorageManager } from "@/utils/localStorageManager";

const STORAGE_KEY = "_aD_";
const _hydrated = ref(false);

/* -----------------------
 | SAFE EXPIRY PARSER
 ----------------------- */
function parseExpiry(expiryTime) {
  if (!expiryTime) return null;

  // Unix timestamp (seconds)
  if (typeof expiryTime === "number" && expiryTime < 1e12) {
    return expiryTime * 1000;
  }

  // Unix timestamp (milliseconds)
  if (typeof expiryTime === "number") {
    return expiryTime;
  }

  // String datetime (fix space → ISO)
  if (typeof expiryTime === "string") {
    return new Date(expiryTime.replace(" ", "T")).getTime();
  }

  return null;
}

export const useAuthStore = defineStore("auth", () => {
  /* -----------------------
   | STATE
   ----------------------- */
  const token = ref(null);
  const expiresAt = ref(null); // ALWAYS timestamp (ms)

  /* -----------------------
   | HYDRATE FROM STORAGE
   ----------------------- */
  function hydrate() {
    if (_hydrated.value) return;

    const stored = localStorageManager.getItem(STORAGE_KEY);

    if (!stored?.token || !stored?.expiresAt) {
      resetAuthTokenData();
      return;
    }

    const expiryTimestamp = parseExpiry(stored.expiresAt);

    if (!expiryTimestamp || Number.isNaN(expiryTimestamp)) {
      resetAuthTokenData();
      return;
    }

    if (Date.now() < expiryTimestamp) {
      token.value = stored.token;
      expiresAt.value = expiryTimestamp;
    } else {
      resetAuthTokenData();
    }

    _hydrated.value = true;
  }

  hydrate();

  /* -----------------------
   | GETTERS
   ----------------------- */
  const isLoggedIn = computed(() => {
    return !!token.value && !!expiresAt.value && Date.now() < expiresAt.value;
  });

  /* -----------------------
   | ACTIONS
   ----------------------- */
  function setAuthTokenData(newToken, expiryTime) {
    const expiryTimestamp = parseExpiry(expiryTime);

    if (!expiryTimestamp || Number.isNaN(expiryTimestamp)) {
      console.error("Invalid expiry time:", expiryTime);
      resetAuthTokenData();
      return;
    }

    token.value = newToken;
    expiresAt.value = expiryTimestamp;

    localStorageManager.setItem(STORAGE_KEY, {
      token: newToken,
      expiresAt: expiryTimestamp,
    });
  }

  function resetAuthTokenData() {
    token.value = null;
    expiresAt.value = null;
    localStorageManager.removeItem(STORAGE_KEY);
  }

  // ✅ KEPT — used by axios / helpers
  function getAuthToken() {
    return token.value;
  }

  return {
    // state
    token,
    expiresAt,

    // getters
    isLoggedIn,

    // actions
    setAuthTokenData,
    resetAuthTokenData,
    getAuthToken,

    hydrate,
    _hydrated,
  };
});
