<template>
  <BaseContainer heading="Finance Setting">

    <template #body>
      <form id="settingForm" @submit.prevent="submitForm" class="needs-validation">

        <h6 class="mb-3 text-primary">Currency</h6>
        <div class="row g-3 mb-4">
          <div class="col-md-2">
            <BaseInput v-model="form.currency" label="Currency" required readonly />
          </div>

          <div class="col-md-2">
            <BaseInput v-model="form.currency_symbol" label="Currency Symbol" readonly />
          </div>

          <div class="col-md-2">
            <BaseInput v-model="form.currency_position" label="Currency Position" readonly />
          </div>
        </div>

        <h6 class="mb-3 text-primary">Digit</h6>
        <div class="row g-3 mb-4">
          <div class="col-md-2">
            <BaseInput v-model="form.thousand_separator" label="Thousand Separator" required />
          </div>

          <div class="col-md-2">
            <BaseInput v-model="form.decimal_separator" label="Decimal Separator" required />
          </div>

          <div class="col-md-2">
            <BaseInput v-model="form.decimal_places" label="Decimal Places" required />
          </div>
        </div>

        <h6 class="mb-3 text-primary">Financial Year</h6>
        <div class="row g-3 mb-4">

          <div class="col-md-4">
            <BaseAutoCompleteSelect v-model="form.financial_year_id" :options="financeYearsList" label="Financial Year"
              :label-key="['name', 'code']" value-key="id" required />
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
import BaseAutoCompleteSelect from "@/components/common/inputs/BaseAutoCompleteSelect.vue";

import { useUIStore } from "@/core/utils/stores/uiStore";

import {
  fetchFinanceSettings,
  updateFinanceSetting,
  //
  fetchFinancialYears
} from "@/core/repos/admin/master/masterRepos";

/* ---------------- STATE ---------------- */
const uiStore = useUIStore();
const mListData = ref([]);
const financeYearsList = ref([]);

const form = ref({
  id: null,
  currency: "",
  currency_symbol: "",
  currency_position: "",
  thousand_separator: "",
  decimal_separator: "",
  decimal_places: "",

  financial_year_id: "",
});

/* ---------------- INIT ---------------- */
onMounted(loadSetting);

/* ---------------- LOAD ---------------- */
async function loadSetting() {
  const data = await fetchFinanceSettings();
  financeYearsList.value = await fetchFinancialYears({ is_active: true });
  if (data) {
    form.value = { ...form.value, ...data };
  }
}

/* ---------------- SAVE ---------------- */
async function submitForm() {
  await updateFinanceSetting(form.value);
  loadSetting();
}
</script>
