<template>
    <BaseContainer heading="CMD Control Panel" class="mb-4">

        <template #body>

            <!-- ================= COMMON FORM ================= -->
            <div class="border rounded-3 p-3 mb-4 bg-light-subtle">
                <h6 class="fw-bold mb-3">Common Parameters</h6>

                <div class="row g-3">
                    <div class="col-md-3">
                        <BaseInput type="date" label="Start Date" v-model="cmdForm.start_date" />
                    </div>

                    <div class="col-md-3">
                        <BaseInput type="date" label="End Date" v-model="cmdForm.end_date" />
                    </div>

                    <div class="col-md-4 ms-3">
                        <label class="form-label fw-semibold d-block mb-2">
                            Enforce Mode
                        </label>
                        <div class="form-check form-switch">
                            <input class="form-check-input fs-5" type="checkbox" role="switch" id="is_enforce"
                                v-model="cmdForm.is_enforce">
                            <label class="form-check-label ms-2" for="is_enforce">
                                {{ cmdForm.is_enforce ? 'Enabled' : 'Disabled' }}
                            </label>
                        </div>
                    </div>

                </div>
            </div>

            <!-- ================= PRODUCT SECTION ================= -->
            <div class="border rounded-3 p-3 mb-4">
                <h5 class="fw-semibold mb-3">1. Cutoff Commands</h5>

                <BaseButton variant="danger" @click="runCmd(cmdCutoffProductListing, 'Cutoff Product Listing')">
                    Cutoff Product Listing
                </BaseButton>
            </div>

            <!-- ================= ACCOUNTING SECTION ================= -->
            <div class="border rounded-3 p-3 mb-4">
                <h5 class="fw-semibold mb-3">2. Accounting Commands</h5>

                <div class="d-flex gap-2 flex-wrap">
                    <BaseButton variant="primary" @click="runCmd(cmdAccountingOrder, 'Accounting Order')">
                        Accounting Order
                    </BaseButton>

                    <BaseButton variant="primary" @click="runCmd(cmdAccountingMarketOrder, 'Accounting Market Order')">
                        Accounting Market Order
                    </BaseButton>
                    <!-- 
                    <BaseButton variant="primary"
                        @click="runCmd(cmdAccountingDriverShipment, 'Accounting Driver Shipment')">
                        Accounting Driver Shipment
                    </BaseButton> -->
                </div>
            </div>

            <!-- ================= INVOICE SECTION ================= -->
            <div class="border rounded-3 p-3">
                <h5 class="fw-semibold mb-3">3. Invoice Commands <small class="text-info">[With Enforce Mode]</small>
                </h5>

                <div class="d-flex gap-2 flex-wrap">
                    <BaseButton variant="warning"
                        @click="runCmd(cmdInvoiceGenerateBuyerOrder, 'Generate Buyer Orders Invoice')">
                        Generate Buyer Orders Invoice
                    </BaseButton>

                    <BaseButton variant="warning"
                        @click="runCmd(cmdInvoiceGenerateProductListing, 'Generate Product Listings Invoice')">
                        Generate Product Listings Invoice
                    </BaseButton>
                </div>
            </div>

        </template>
    </BaseContainer>
</template>

<script setup>
import { reactive } from "vue";
import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import BaseInput from "@/components/common/inputs/BaseInput.vue";

import {
    cmdCutoffProductListing,
    cmdAccountingOrder,
    cmdAccountingMarketOrder,
    cmdAccountingDriverShipment,
    cmdInvoiceGenerateBuyerOrder,
    cmdInvoiceGenerateProductListing
} from "@/core/repos/admin/common/cmdRepos";

import { showConfirmDialog } from "@/core/utils/uiHelpers/swalUtils.js";


// ===== DEFAULT DATE HELPERS =====
function formatDate(d) {
    return d.toISOString().split('T')[0];
}

const today = new Date();
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);


// ===== COMMON FORM =====
const cmdForm = reactive({
    start_date: formatDate(yesterday),
    end_date: formatDate(today),
    is_enforce: false
});


// ===== COMMON CMD RUNNER =====
async function runCmd(cmdFn, title) {

    const confirmed = await showConfirmDialog(
        title,
        `Are you sure you want to run ${title}?`
    );

    if (!confirmed) return;

    await cmdFn({
        ...cmdForm
    });
}

</script>