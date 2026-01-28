<template>
    <div class="mb-3 position-relative">
        <label class="form-label">
            {{ label }}
            <span v-if="required" class="text-danger">*</span>
        </label>

        <input type="text" class="form-control" placeholder="Search customer" v-model="searchQuery" :required="required"
            autocomplete="off" style="border:1px dashed #444;" />

        <div v-show="showDropdown" class="border bg-white position-absolute w-100"
            style="top:100%; max-height:220px; overflow-y:auto; z-index:1050">
            <div v-for="customer in suggestions" :key="customer.id"
                class="px-3 py-2 dropdown-item d-flex justify-content-between align-items-center" style="cursor:pointer"
                @mousedown.prevent="selectCustomer(customer)">
                <div class="fw-medium">{{ customer.name }}</div>
                <div class="text-muted small">
                    {{ customer.user_code }} | {{ customer.user_role }}
                </div>
            </div>

            <div v-if="!suggestions.length && searchQuery.length >= 3" class="px-3 py-2 text-muted">
                No results found
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { searchCustomerAutocomplete } from "@/core/repos/admin/customer/customerRepos";

/* ===== PROPS ===== */
const props = defineProps({
    modelValue: { type: Object, default: null },
    label: { type: String, default: "Select Customer" },
    required: { type: Boolean, default: false }
});

/* ===== EMITS ===== */
const emit = defineEmits(["update:modelValue"]);

/* ===== STATE ===== */
const searchQuery = ref("");
const suggestions = ref([]);
const showDropdown = ref(false);
const skipSearch = ref(false); // 🔥 THE KEY
let timer;

/* ===== SYNC model → input (NO API) ===== */
watch(
    () => props.modelValue,
    (val) => {
        skipSearch.value = true;
        searchQuery.value = val?.name ?? "";
    },
    { immediate: true }
);

/* ===== WATCH INPUT ===== */
watch(searchQuery, (val) => {
    // 🔥 selection or external sync → DO NOTHING
    if (skipSearch.value) {
        skipSearch.value = false;
        return;
    }

    clearTimeout(timer);

    if (!val) {
        suggestions.value = [];
        showDropdown.value = false;
        emit("update:modelValue", null);
        return;
    }

    if (val.length < 3) {
        suggestions.value = [];
        showDropdown.value = false;
        return;
    }

    timer = setTimeout(loadCustomers, 300);
});

/* ===== API ===== */
async function loadCustomers() {
    const data = await searchCustomerAutocomplete({ q: searchQuery.value });
    suggestions.value = Array.isArray(data) ? data : [];
    showDropdown.value = true;
}

/* ===== SELECT ===== */
function selectCustomer(customer) {
    skipSearch.value = true;              // 🔥 STOP WATCHER
    searchQuery.value = customer.name;
    showDropdown.value = false;
    emit("update:modelValue", customer);
}
</script>
