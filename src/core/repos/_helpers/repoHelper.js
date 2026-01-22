import {useUIStore} from "@/core/utils/stores/uiStore";

export const withUI = async (apiCall) => {
    const uiStore = useUIStore();

    uiStore.isLoading = true;
    // uiStore.resetMessages();

    const resp = await apiCall();

    uiStore.isLoading = false;

    // Detect HTTP method (axios)
    const method = resp?.config?.method?.toLowerCase();

    // Dont want to so on every get request message so
    const isWriteOperation =
        method === "post" ||
        method === "put" ||
        method === "patch" ||
        method === "delete";

    // ✅ Reset messages ONLY for write operations
    if (isWriteOperation) {
        uiStore.resetMessages();
    }

    if (resp?.isSuccess) {
        // ✅ Show success ONLY for write operations
        if (isWriteOperation) {
            uiStore.successMessage = resp.message || "";
        }

        return resp.data ?? [];
    }

    uiStore.errorMessages = [resp?.message || "Something went wrong"];
    return [];
};
