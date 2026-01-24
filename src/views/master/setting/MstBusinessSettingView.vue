<template>
  <BaseContainer heading="Business Setting">

    <template #body>
      <form id="settingForm" @submit.prevent="submitForm" class="needs-validation">

        <h6 class="mb-3 text-primary">General</h6>
        <div class="row g-3 mb-4">
          <div class="col-md-3">
            <BaseInput v-model="form.legal_name" label="Legal Name" required />
          </div>

          <div class="col-md-3">
            <BaseInput v-model="form.trade_name" label="Trade Name" required />
          </div>

        </div>

        <h6 class="mb-3 text-primary">Legal </h6>
        <div class="row g-3 mb-4">
          <div class="col-md-3">
            <BaseInput v-model="form.gst_number" label="GST Number" />
          </div>

          <div class="col-md-3">
            <BaseInput v-model="form.cin_number" label="CIN Number" />
          </div>

          <div class="col-md-3">
            <BaseInput v-model="form.pan_number" label="PAN Number" />
          </div>

          <div class="col-md-3">
            <BaseInput v-model="form.tan_number" label="TAN Number" />
          </div>

        </div>

        <h6 class="mb-3 text-primary">Contact</h6>
        <div class="row g-3 mb-4">

          <div class="col-md-3">
            <BaseInput v-model="form.email" label="Email" />
          </div>

          <div class="col-md-3">
            <BaseInput v-model="form.phone_number" label="Phone Number" />
          </div>

        </div>
        <h6 class="mb-3 text-primary">URLs</h6>
        <div class="row g-3 mb-4">
          <div class="col-md-3">
            <BaseInput v-model="form.website" label="Website" />
          </div>

          <div class="col-md-3">
            <BaseInput v-model="form.terms_url" label="Terms & Conditions URL" />
          </div>

          <div class="col-md-3">
            <BaseInput v-model="form.privacy_url" label="Privacy Policy URL" />
          </div>

        </div>


      </form>

      <!-- ================= ACTION ================= -->
      <div class="text-end mt-4">
        <BaseButton variant="primary" :loading="uiStore.isLoading" type="submit" form="settingForm">
          Save Settings
        </BaseButton>
      </div>

    </template>
  </BaseContainer>

  <BaseContainer class="mt-4" heading="Business Address">

    <template #body>
      <AddressComponent v-model="addressForm" form-id="addressForm" @submit="submitAddress" />

      <!-- ✅ BUTTON GOES HERE -->
      <div class="text-end mt-3">
        <BaseButton variant="primary" type="submit" form="addressForm" :loading="uiStore.isLoading">
          Save Address
        </BaseButton>
      </div>
    </template>

  </BaseContainer>

</template>

<script setup>
import { ref, onMounted } from "vue";

import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import BaseInput from "@/components/common/inputs/BaseInput.vue";
import BaseAutoCompleteSelect from "@/components/common/inputs/BaseAutoCompleteSelect.vue";

import { useUIStore } from "@/core/utils/stores/uiStore";

import {
  fetchBusinessSettings,
  updateBusinessSetting,
  saveBusinessSettingAddress

} from "@/core/repos/admin/master/masterRepos";
import AddressComponent from "../../../components/common/forms/AddressComponent.vue";

/* ---------------- STATE ---------------- */
const uiStore = useUIStore();
const mListData = ref([]);
const financeYearsList = ref([]);

const addressForm = ref(null);

const form = ref({
  id: null,
  legal_name: "",
  trade_name: "",

  gst_number: "",
  cin_number: "",
  pan_number: "",
  tan_number: "",

  email: "",
  phone_number: "",

  website: "",
  terms_url: "",
  privacy_url: "",
  addr_code: "",

  notes: "",

});

/* ---------------- INIT ---------------- */
onMounted(loadSetting);

/* ---------------- LOAD ---------------- */
async function loadSetting() {
  const data = await fetchBusinessSettings();
  if (data) {
    form.value = { ...form.value, ...data };

    addressForm.value = data.bill_address ?? null;

  }
}

/* ---------------- SAVE ---------------- */
async function submitForm() {
  await updateBusinessSetting(form.value);
  loadSetting();
}

async function submitAddress() {
  await saveBusinessSettingAddress(addressForm.value);
}


</script>
