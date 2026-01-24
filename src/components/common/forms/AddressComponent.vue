<template>
    <form :id="formId" @submit.prevent="submit">

        <!-- Address Name -->
        <div class="row">
            <div class="col-md-6">
                <BaseInput label="Address Name" v-model="localForm.addr_name" placeholder="e.g. Main Warehouse"
                    required />
            </div>
        </div>

        <!-- Address Lines -->
        <div class="row">
            <div class="col-md-6">
                <BaseInput label="Address Line 1" v-model="localForm.address_line1" required />
            </div>
            <div class="col-md-6">
                <BaseInput label="Address Line 2" v-model="localForm.address_line2" />
            </div>
        </div>

        <!-- Locality -->
        <div class="row">
            <div class="col-md-4">
                <BaseInput label="Village" v-model="localForm.village" />
            </div>
            <div class="col-md-4">
                <BaseInput label="Taluka" v-model="localForm.taluka" />
            </div>
            <div class="col-md-4">
                <BaseInput label="City" v-model="localForm.city" required />
            </div>
        </div>

        <!-- State & Postal -->
        <div class="row">
            <div class="col-md-4">
                <BaseAutoCompleteSelect label="State" v-model="localForm.state" :options="states" label-key="name"
                    value-key="name" placeholder="Select State" required />
            </div>

            <div class="col-md-4">
                <BaseInput label="State ISO" v-model="localForm.state_iso" readonly />
            </div>

            <div class="col-md-4">
                <BaseInput label="Postal Code" v-model="localForm.postal_code" required />
            </div>
        </div>

        <!-- Geo -->
        <div class="row">
            <div class="col-md-6">
                <BaseInput label="Latitude" type="number" step="any" v-model="localForm.latitude" required />
            </div>
            <div class="col-md-6">
                <BaseInput label="Longitude" type="number" step="any" v-model="localForm.longitude" required />
            </div>
        </div>

        <!-- Contact -->
        <div class="row">
            <div class="col-md-6">
                <BaseInput label="Contact Name" v-model="localForm.contact_name" />
            </div>
            <div class="col-md-6">
                <BaseInput label="Phone Number" v-model="localForm.phone_number" />
            </div>
        </div>

    </form>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";

import BaseInput from "@/components/common/inputs/BaseInput.vue";
import BaseAutoCompleteSelect from "@/components/common/inputs/BaseAutoCompleteSelect.vue";

import { fetchStates } from "@/core/repos/admin/master/masterRepos";

/* ---------------- PROPS ---------------- */
const props = defineProps({
    modelValue: { type: Object, required: true }, // v-model
    formId: { type: String, default: "addressForm" },
});

/* ---------------- EMITS ---------------- */
const emit = defineEmits(["update:modelValue", "submit"]);

/* ---------------- LOCAL STATE ---------------- */
const localForm = ref({ ...props.modelValue });
const states = ref([]);

/* ---------------- LOAD STATES INTERNALLY ---------------- */
onMounted(async () => {
    states.value = await fetchStates({ is_active: true });
});

/* ---------------- SYNC FROM PARENT ---------------- */
watch(
    () => props.modelValue,
    (val) => {
        localForm.value = { ...val };
    },
    { deep: true }
);

/* ---------------- SYNC TO PARENT ---------------- */
watch(
    localForm,
    (val) => {
        emit("update:modelValue", val);
    },
    { deep: true }
);

/* ---------------- AUTO STATE ISO ---------------- */
watch(
    () => localForm.value.state,
    (newState) => {
        const stateObj = states.value.find(s => s.name === newState);
        localForm.value.state_iso = stateObj?.iso_code || "";
    }
);

/* ---------------- SUBMIT ---------------- */
function submit() {
    emit("submit");
}
</script>
