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
        return resp.data ?? [];
    }

    // ❌ Errors always override
    uiStore.resetMessages();
    uiStore.errorMessages = [resp?.message || "Something went wrong"];
    return [];
};
