<template>
  <BaseContainer heading="App Setting">

    <template #body>
      <form id="settingForm" @submit.prevent="submitForm" class="needs-validation">

        <!-- ================= GENERAL ================= -->
        <h6 class="mb-3 text-primary">General</h6>
        <div class="row g-3 mb-4">
          <div class="col-md-4">
            <BaseInput v-model="form.app_name" label="App Name" required />
          </div>

          <div class="col-md-4">
            <BaseInput v-model="form.app_version" label="App Version" />
          </div>
        </div>

        <!-- ================= LOCALIZATION ================= -->
        <h6 class="mb-3 text-primary">Localization</h6>

        <div class="row g-3 mb-4">
          <div class="col-md-2">
            <BaseInput v-model="form.timezone" label="Timezone" readonly />
          </div>

          <div class="col-md-2">
            <BaseInput v-model="form.locale" label="Locale" readonly />
          </div>

          <div class="col-md-2">
            <BaseInput v-model="form.fallback_locale" label="Fallback Locale" readonly />
          </div>

          <!-- <div class="col-md-2">
            <BaseInput v-model="form.date_format" label="Date Format" />
          </div>

          <div class="col-md-2">
            <BaseInput v-model="form.time_format" label="Time Format" />
          </div> -->

        </div>

        <!-- ================= MAINTENANCE ================= -->
        <!-- <h6 class="mb-3 text-primary">Maintenance</h6>
        <div class="row g-3 mb-4 align-items-center">
          <div class="col-md-3">
            <div class="form-check form-switch mt-4">
              <input class="form-check-input" type="checkbox" v-model="form.is_maintenance_mode" id="maintenanceMode" />
              <label class="form-check-label" for="maintenanceMode">
                Maintenance Mode
              </label>
            </div>
          </div>

          <div class="col-md-6">
            <BaseInput v-model="form.maintenance_message" label="Maintenance Message"
              :readonly="!form.is_maintenance_mode" />
          </div>
        </div> -->

        <!-- ================= REGISTRATION ================= -->
        <h6 class="mb-3 text-primary">Registration</h6>
        <div class="row g-3 mb-4">
          <div class="col-md-3">
            <div class="form-check form-switch mt-4">
              <input class="form-check-input" type="checkbox" v-model="form.is_registration_enabled"
                id="registrationEnabled" />
              <label class="form-check-label" for="registrationEnabled">
                Enable Registration
              </label>
            </div>
          </div>
        </div>

        <!-- ================= MOBILE APP ================= -->
        <h6 class="mb-3 text-primary">Mobile App</h6>

        <!-- ANDROID -->
        <div class="row g-3 mb-3 align-items-center">
          <div class="col-md-4">
            <BaseInput v-model="form.mobile_app_android_version" label="Android App Version" />
          </div>

          <div class="col-md-3">
            <div class="form-check form-switch mt-4">
              <input class="form-check-input" type="checkbox" v-model="form.is_force_app_android_update"
                id="forceAndroid" />
              <label class="form-check-label" for="forceAndroid">
                Force Android Update
              </label>
            </div>
          </div>
        </div>

        <!-- IOS -->
        <div class="row g-3 mb-4 align-items-center">
          <div class="col-md-4">
            <BaseInput v-model="form.mobile_app_ios_version" label="iOS App Version" />
          </div>

          <div class="col-md-3">
            <div class="form-check form-switch mt-4">
              <input class="form-check-input" type="checkbox" v-model="form.is_force_app_ios_update" id="forceIos" />
              <label class="form-check-label" for="forceIos">
                Force iOS Update
              </label>
            </div>
          </div>
        </div>

        <!-- ================= MOBILE APP DRIVER ================= -->
        <h6 class="mb-3 text-primary">Mobile App Driver</h6>

        <!-- ANDROID -->
        <div class="row g-3 mb-3 align-items-center">
          <div class="col-md-4">
            <BaseInput v-model="form.driver_mobile_app_android_version" label="Android App Version" />
          </div>

          <div class="col-md-3">
            <div class="form-check form-switch mt-4">
              <input class="form-check-input" type="checkbox" v-model="form.is_force_driver_app_android_update"
                id="forceDriverAndroid" />
              <label class="form-check-label" for="forceDriverAndroid">
                Force Android Update
              </label>
            </div>
          </div>
        </div>

        <!-- IOS -->
        <div class="row g-3 mb-4 align-items-center">
          <div class="col-md-4">
            <BaseInput v-model="form.driver_mobile_app_ios_version" label="iOS App Version" />
          </div>

          <div class="col-md-3">
            <div class="form-check form-switch mt-4">
              <input class="form-check-input" type="checkbox" v-model="form.is_force_driver_app_ios_update"
                id="forceDriverIos" />
              <label class="form-check-label" for="forceDriverIos">
                Force iOS Update
              </label>
            </div>
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
</template>

<script setup>
import { ref, onMounted } from "vue";

import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import BaseInput from "@/components/common/inputs/BaseInput.vue";

import { useUIStore } from "@/core/utils/stores/uiStore";

import {
  fetchAppSettings,
  updateAppSetting,
} from "@/core/repos/admin/master/masterRepos";

/* ---------------- STATE ---------------- */
const uiStore = useUIStore();
const mListData = ref([]);

const form = ref({
  id: null,
  app_name: "",
  timezone: "Asia/Kolkata",
  locale: "en",
  fallback_locale: "en",

  date_format: "",
  time_format: "",

  is_maintenance_mode: false,
  maintenance_message: "",

  is_registration_enabled: true,

  app_version: "",

  mobile_app_android_version: "",
  is_force_app_android_update: false,

  driver_mobile_app_android_version: "",
  is_force_driver_app_android_update: false,

  mobile_app_ios_version: "",
  is_force_app_ios_update: false,

  driver_mobile_app_ios_version: "",
  is_force_driver_app_ios_update: false,



});

/* ---------------- INIT ---------------- */
onMounted(loadSetting);

/* ---------------- LOAD ---------------- */
async function loadSetting() {
  const data = await fetchAppSettings();
  if (data) {
    form.value = { ...form.value, ...data };
    mListData.value = data;
  }
}

/* ---------------- SAVE ---------------- */
async function submitForm() {
  await updateAppSetting(form.value);
  loadSetting();
}
</script>
