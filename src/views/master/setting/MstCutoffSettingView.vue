<template>
  <BaseContainer heading="Cutoff Setting">

    <template #body>
      <form id="settingForm" @submit.prevent="submitForm" class="needs-validation">

        <!-- ================= GENERAL ================= -->
        <h6 class="mb-3 text-primary">Seller</h6>

        <div class="row g-3 mb-4">

          <div class="col-md-4">
            <BaseInput v-model="form.seller_start_time" type="time" label="Seller Start Time" required />
          </div>

          <div class="col-md-4">
            <BaseInput v-model="form.seller_end_time" type="time" label="Seller End Time" required />
          </div>


          <div class="col-md-3">

            <div class="form-check form-switch mt-4">
              <input class="form-check-input" type="checkbox" v-model="form.is_seller_auto_cutoff"
                id="forceSellerAutoCutoff" />
              <label class="form-check-label" for="forceSellerAutoCutoff">
                Is Seller Auto Cutoff
              </label>
            </div>
          </div>

        </div>


        <h6 class="mb-3 text-primary">Buyer</h6>
        <!-- AutoCutoff -->
        <div class="row g-3 mb-4 align-items-center">

          <div class="col-md-4">
            <BaseInput v-model="form.buyer_start_time" type="time" label="Buyer Start Time" required />
          </div>

          <div class="col-md-4">
            <BaseInput v-model="form.buyer_end_time" type="time" label="Buyer End Time" required />
          </div>


          <div class="col-md-3">
            <div class="form-check form-switch mt-4">
              <input class="form-check-input" type="checkbox" v-model="form.is_buyer_auto_cutoff"
                id="forceBuyerAutoCutoff" />
              <label class="form-check-label" for="forceBuyerAutoCutoff">
                Is Buyer Auto Cutoff
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
  fetchCutoffSettings,
  updateCutoffSetting,
} from "@/core/repos/admin/master/masterRepos";

/* ---------------- STATE ---------------- */
const uiStore = useUIStore();
const mListData = ref([]);

const form = ref({
  id: null,
  seller_start_time: "",
  seller_end_time: "",
  buyer_start_time: "",
  buyer_end_time: "",
  is_buyer_auto_cutoff: false,
  is_seller_auto_cutoff: false,
});

/* ---------------- INIT ---------------- */
onMounted(loadSetting);

/* ---------------- LOAD ---------------- */
async function loadSetting() {
  const data = await fetchCutoffSettings();
  if (data) {
    form.value = { ...form.value, ...data };
    mListData.value = data;
  }
}

/* ---------------- SAVE ---------------- */
async function submitForm() {
  const payload = {
    ...form.value,
    seller_start_time: formatTime(form.value.seller_start_time),
    seller_end_time: formatTime(form.value.seller_end_time),
    buyer_start_time: formatTime(form.value.buyer_start_time),
    buyer_end_time: formatTime(form.value.buyer_end_time),
  };

  await updateCutoffSetting(payload);

  loadSetting();
}

function formatTime(value) {
  if (!value) return value;

  // if already has seconds, return
  if (value.length === 8) return value;

  return value + ":00";
}

</script>
