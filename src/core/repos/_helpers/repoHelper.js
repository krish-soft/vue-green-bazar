import { useUIStore } from "@/core/utils/stores/uiStore";

/**
 * @param {Function} apiCall
 * @param {Object} options
 * @param {Boolean} options.showSuccessMessage
 */
export const withUI = async (
    apiCall,
    { showSuccessMessage = true } = {}
) => {
    const uiStore = useUIStore();

    uiStore.isLoading = true;

    // ❗ Reset messages ONLY if we intend to show a new success
    if (showSuccessMessage) {
        uiStore.resetMessages();
    }

    const resp = await apiCall();

    uiStore.isLoading = false;

    if (resp?.isSuccess) {
        if (showSuccessMessage) {
            uiStore.successMessage = resp.message || "";
        }
        return resp.data ?? true;
    }

    // ❌ Errors always override
    // uiStore.resetMessages();
    /* ✅ FIX: HANDLE VALIDATION ERRORS PROPERLY */
    if (typeof resp?.message === "string") {
        uiStore.errorMessages = resp.message
            .split(";")
            .map(m => m.trim())
            .filter(Boolean);
    } else if (Array.isArray(resp?.message)) {
        uiStore.errorMessages = resp.message;
    } else {
        uiStore.errorMessages = ["Something went wrong"];
    }

    // Return empty array on error for consistency
    return null;
};
