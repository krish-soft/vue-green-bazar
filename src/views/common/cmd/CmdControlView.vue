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

            <!-- ================= SECTION 1 ================= -->
            <div class="border rounded-3 p-3 mb-4">
                <h5 class="fw-semibold mb-3">
                    1. Cutoff Commands
                    <small class="text-muted">(Allowed 7 AM – 10 AM)</small>
                </h5>

                <BaseButton variant="danger" :disabled="!isSection1Allowed || isRunning"
                    @click="runCmd(cmdCutoffProductListing, 'Cutoff Product Listing', isSection1Allowed)">
                    Cutoff Product Listing
                </BaseButton>
            </div>

            <!-- ================= SECTION 2 ================= -->
            <div class="border rounded-3 p-3 mb-4">
                <h5 class="fw-semibold mb-3">
                    2. Accounting Commands
                    <small class="text-muted">(Allowed 1 PM – 4 PM)</small>
                </h5>

                <div class="d-flex gap-2 flex-wrap">

                    <BaseButton variant="primary" :disabled="!isSection2Allowed || isRunning"
                        @click="runCmd(cmdAccountingProductListing, 'Accounting Product Listing', isSection2Allowed)">
                        Accounting Product Listing
                    </BaseButton>

                    <BaseButton variant="primary" :disabled="!isSection2Allowed || isRunning"
                        @click="runCmd(cmdAccountingOrder, 'Accounting Order', isSection2Allowed)">
                        Accounting Order
                    </BaseButton>

                    <BaseButton variant="primary" :disabled="!isSection2Allowed || isRunning"
                        @click="runCmd(cmdAccountingMarketOrder, 'Accounting Market Order', isSection2Allowed)">
                        Accounting Market Order
                    </BaseButton>

                </div>
            </div>

            <!-- ================= SECTION 3 ================= -->
            <div class="border rounded-3 p-3">
                <h5 class="fw-semibold mb-3">
                    3. Invoice Commands
                    <small class="text-info">(Allowed 3 PM – 6 PM)</small>
                </h5>

                <div class="d-flex gap-2 flex-wrap">

                    <BaseButton variant="warning" :disabled="!isSection3Allowed || isRunning"
                        @click="runCmd(cmdInvoiceGenerateBuyerOrder, 'Generate Buyer Orders Invoice', isSection3Allowed)">
                        Generate Buyer Orders Invoice
                    </BaseButton>

                    <BaseButton variant="warning" :disabled="!isSection3Allowed || isRunning"
                        @click="runCmd(cmdInvoiceGenerateProductListing, 'Generate Product Listings Invoice', isSection3Allowed)">
                        Generate Product Listings Invoice
                    </BaseButton>

                </div>
            </div>

        </template>
    </BaseContainer>
</template>

<script setup>
import { reactive, computed, ref } from "vue";
import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import BaseInput from "@/components/common/inputs/BaseInput.vue";

import {
    cmdCutoffProductListing,
    cmdAccountingOrder,
    cmdAccountingMarketOrder,
    cmdAccountingProductListing,
    cmdInvoiceGenerateBuyerOrder,
    cmdInvoiceGenerateProductListing
} from "@/core/repos/admin/common/cmdRepos";

import Swal from "sweetalert2";


// ================= DATE HELPERS =================
function formatDate(d) {
    return d.toISOString().split('T')[0];
}

const today = new Date();
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);


// ================= FORM =================
const cmdForm = reactive({
    start_date: formatDate(yesterday),
    end_date: formatDate(today),
    is_enforce: false
});


// ================= LOADING STATE =================
const isRunning = ref(false);


// ================= TIME VALIDATION =================
function isWithinRange(startHour, endHour) {
    const now = new Date();
    const hour = now.getHours();
    return hour >= startHour && hour < endHour;
}

const isSection1Allowed = computed(() => true);// isWithinRange(7, 10));
const isSection2Allowed = computed(() => true);// isWithinRange(13, 16));
const isSection3Allowed = computed(() => true);// isWithinRange(15, 18));


// ================= PROFESSIONAL CONFIRM MODAL =================
async function confirmExecution(title) {
    const result = await Swal.fire({
        title: `Confirm ${title}`,
        html: `
            <div style="text-align:left">
                <p>This action may affect financial records.</p>
                <p class="text-danger fw-bold">
                    Type <strong>CONFIRM</strong> to proceed.
                </p>
            </div>
        `,
        input: "text",
        inputPlaceholder: "Type CONFIRM",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Execute",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#d33",
        reverseButtons: true,
        inputValidator: (value) => {
            if (value !== "CONFIRM") {
                return "You must type CONFIRM exactly.";
            }
        }
    });

    return result.isConfirmed;
}


// ================= COMMON RUNNER =================
async function runCmd(cmdFn, title, isAllowed) {

    if (!isAllowed) {
        Swal.fire({
            icon: "error",
            title: "Execution Window Closed",
            text: "This command is not allowed at this time."
        });
        return;
    }

    const confirmed = await confirmExecution(title);
    if (!confirmed) return;

    try {
        isRunning.value = true;

        await cmdFn({ ...cmdForm });

        await Swal.fire({
            icon: "success",
            title: "Success",
            text: `${title} executed successfully.`,
            timer: 2500,
            showConfirmButton: false
        });

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Execution Failed",
            text: error?.message || "Something went wrong."
        });
    } finally {
        isRunning.value = false;
    }
}
</script>