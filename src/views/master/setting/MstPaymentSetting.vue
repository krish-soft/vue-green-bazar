<template>
  <BaseContainer heading="Payment Setting">

    <template #body>
      <form id="settingForm" @submit.prevent="submitForm" class="needs-validation">

        <h6 class="mb-3 text-primary">Payment</h6>
        <div class="row g-3 mb-4">
          <div class="col-md-3">
            <BaseInput v-model="form.payment_in_mode" label="Payment In Mode [manual/razorpay]" required />
          </div>

          <div class="col-md-3">
            <BaseInput v-model="form.payment_out_mode" label="Payment Out Mode [manual/razorpay]" required />
          </div>


        </div>

        <h6 class="mb-3 text-primary">Payout</h6>
        <div class="row g-3 mb-4">

          <div class="col-md-3">
            <BaseInput v-model="form.min_payout_amount" label="Minimum Payout Amount" type="number" required />
          </div>

          <div class="col-md-3">
            <BaseInput v-model="form.max_payout_amount" label="Maximum Payout Amount" type="number" required />
          </div>


          <div class="col-md-3">
            <BaseInput v-model="form.payout_cycle" label="Payout Cycle (daily/weekly/monthly)" type="text" required />
          </div>
        </div>


        <h6 class="mb-3 text-primary">Cart</h6>
        <div class="row g-3 mb-4">

          <div class="col-md-3">
            <BaseInput v-model="form.min_cart_order_amount" label="Minimum Cart Order Amount" type="number" required />
          </div>

          <div class="col-md-3">
            <BaseInput v-model="form.max_cart_order_amount" label="Maximum Cart Order Amount" type="number" required />
          </div>

          <div class="col-md-3">
            <BaseInput v-model="form.cart_expiry_minutes" label="Cart Expiry Minutes" type="number" required />
          </div>

          <div class="col-md-3">
            <BaseInput v-model="form.max_payment_attempts" label="Maximum Payment Attempts" type="number" required />
          </div>

        </div>


        <h6 class="mb-3 text-primary">Refund</h6>
        <div class="row g-3 mb-4">

          <div class="col-md-3">
            <BaseInput v-model="form.refund_window_days" label="Refund Window Days" type="number" required />
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
  fetchPaymentSettings,
  updatePaymentSetting,

} from "@/core/repos/admin/master/masterRepos";

/* ---------------- STATE ---------------- */
const uiStore = useUIStore();
const mListData = ref([]);
const financeYearsList = ref([]);

const form = ref({
  id: null,
  payment_in_mode: "",
  payment_out_mode: "",

  min_payout_amount: "",
  max_payout_amount: "",

  min_cart_order_amount: "",
  max_cart_order_amount: "",

  payout_cycle: "",
  refund_window_days: "",

  max_payment_attempts: "",
  cart_expiry_minutes: "",

});

/* ---------------- INIT ---------------- */
onMounted(loadSetting);

/* ---------------- LOAD ---------------- */
async function loadSetting() {
  const data = await fetchPaymentSettings();
  if (data) {
    form.value = { ...form.value, ...data };
  }
}

/* ---------------- SAVE ---------------- */
async function submitForm() {
  await updatePaymentSetting(form.value);
  loadSetting();
}
</script>
