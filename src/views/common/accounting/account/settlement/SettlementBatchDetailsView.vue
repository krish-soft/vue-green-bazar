<template>

    <!-- ================= FILTER ================= -->
    <BaseContainer heading="Settlement Batch Details">

        <template #body>


            <div v-if="batchDetails" class="container-fluid px-0">

                <!-- ================= BASIC INFO ================= -->
                <div class="mb-4">
                    <div class="border-bottom pb-1 mb-2">
                        <h6 class="fw-semibold text-muted mb-0">Basic Information</h6>
                    </div>
                    <table class="table table-sm table-borderless align-middle mb-0">
                        <tbody>

                            <tr>
                                <th class="text-muted fw-normal w-25">Financial Year</th>
                                <td class="fw-semibold">{{ batchDetails?.financial_year?.code }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal w-25">Batch No</th>
                                <td class="fw-semibold">{{ batchDetails.batch_no }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal w-25">Batch Date</th>
                                <td class="fw-semibold">{{ batchDetails.batch_date }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal w-25">Cutoff Date</th>
                                <td class="fw-semibold">{{ batchDetails.cutoff_date }}</td>
                            </tr>




                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Accounts -->
            <div class="mb-4">
                <div class="d-flex justify-content-between align-items-center border-bottom pb-1 mb-2">
                    <h6 class="fw-semibold text-muted mb-0">Settlement Accounts</h6>
                </div>

                <div class="table-responsive">


                    <table class="table table-sm table-bordered align-middle mb-0" id="datatable">
                        <thead class="table-dark">
                            <tr>
                                <th>#</th>
                                <th>User Account</th>
                                <th>Platform Account</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(accnt, index) in batchDetails.settlement_accounts" :key="accnt.id">
                                <td>{{ index + 1 }}</td>

                                <td>
                                    <b>Accnt. Code</b>: {{ accnt?.user_account?.accnt_code }} <br />
                                    <b>Owner Type</b>: {{ accnt?.user_account?.owner_type }} <br />
                                    <hr>
                                    <b>User Name</b>: {{ accnt?.user_account?.user?.name }} <br />
                                    <b>User Code</b>: {{ accnt?.user_account?.user?.user_code }} <br />
                                    <b>User Nick.</b>: {{ accnt?.user_account?.user?.nickname }}


                                </td>
                                <td>
                                    <b>Accnt. Code</b>: {{ accnt?.platform_account?.accnt_code }} <br />
                                    <b>Owner Type</b>: {{ accnt?.platform_account?.owner_type }}


                                </td>
                                <td>{{ accnt.amount }}</td>
                                <td>
                                    <StatusBadge :status="accnt.status" />
                                </td>
                                <td>

                                    <BaseButton iconOnly variant="sky me-2" icon="fas fa-book"
                                        @click="openLedgerModal(accnt)" title="View Ledger" />

                                    <BaseButton v-if="accnt.status == 'pending'" iconOnly variant="info me-2"
                                        icon="fas fa-university" @click="openBankDetailsModal(accnt.id)"
                                        title="View Bank Details" />

                                    <BaseButton v-if="accnt.status == 'pending'" iconOnly variant="warning"
                                        icon="fas fa-edit" @click="openUpdateStatusModal(accnt)"
                                        title="Update Status" />

                                </td>

                            </tr>


                        </tbody>
                    </table>

                </div>
            </div>



        </template>

    </BaseContainer>


    <!-- =================Ledger Modal ================= -->
    <BaseModal ref="ledgerModal" icon="fas fa-book" size="modal-lg" scrollable>
        <template #title>
            Account Ledgers
        </template>

        <div class="table-responsive">

            <table class="table table-sm table-bordered align-middle mb-0">
                <thead class="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Settlement Credit</th>
                        <th>Settlement Debit</th>
                        <th>Accnt. Description</th>
                        <th>Accnt. Ledger Date</th>
                        <th>Accnt. Common Reference</th>
                        <th>Accnt. Ledger Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(ledger, index) in accntLedgers" :key="ledger.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ ledger.credit }}</td>
                        <td>{{ ledger.debit }}</td>
                        <td>{{ ledger?.account_ledger?.description }}</td>
                        <td>{{ ledger?.account_ledger?.ledger_date }}</td>
                        <td>{{ ledger?.account_ledger?.common_reference }}</td>
                        <td>
                            <StatusBadge :status="ledger?.account_ledger?.status" />
                        </td>

                    </tr>
                </tbody>
            </table>

        </div>

        <template #footer>
            <BaseButton variant="secondary" @click="closeLedgerModal">
                Cancel
            </BaseButton>

        </template>

    </BaseModal>

    <!-- =================Bank Details Modal ================= -->

    <BaseModal ref="bankDetailsModal" icon="fas fa-university" size="modal-lg" scrollable>
        <template #title>
            Bank Details
        </template>

        <p>Accnt. Account Code: {{ bankDetails.accnt_account_code }}</p>

        <div v-if="bankDetails">
            <p><b>Bank Name</b>: {{ bankDetails.bank_name }}</p>
            <p><b>Branch Name</b>: {{ bankDetails.branch_name }}</p>
            <p><b>Bank Account No</b>: <span class="masked-value">{{ bankDetails.bank_account_number }} </span> </p>
            <p><b>Bank Account Holder Name</b>: <span class="masked-value"> {{ bankDetails.account_holder_name }}</span>
            </p>
        </div>

        <template #footer>
            <BaseButton variant="secondary" @click="bankDetailsModal.hide()">
                Close
            </BaseButton>

        </template>

    </BaseModal>


    <!-- Update Status account modal -->

    <BaseModal ref="updateStatusModal" icon="fas fa-edit" size="modal-lg" scrollable>
        <template #title>
            Update Settlement Account Status
        </template>

        <div class="mb-4 mt-4">
            <BaseAutoCompleteSelect label="Select status" v-model="selectedSettlementAccountStatus"
                :options="settlementAccountStatusOptions" value-key="value" label-key="label" required />
        </div>


        <template #footer>
            <BaseButton variant="primary" @click="confirmUpdateStatus">
                Update
            </BaseButton>
            <BaseButton variant="secondary" @click="updateStatusModal.hide()">
                Cancel
            </BaseButton>
        </template>

    </BaseModal>



</template>

<script setup>

import { ref, onMounted } from "vue";

import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import BaseModal from "@/components/common/modal/BaseModal.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import BaseInput from "@/components/common/inputs/BaseInput.vue";
import BaseAutoCompleteSelect from "@/components/common/inputs/BaseAutoCompleteSelect.vue";
import StatusBadge from "@/components/common/badge/StatusBadge.vue";
import { useRoute } from "vue-router";

import {
    fetchSettlementBatchDetails,
    fetchSettlementAccountBankDetails,
    updateSettlementAccountStatus
} from "@/core/repos/admin/common/accountingRepos";
const route = useRoute();

const ledgerModal = ref(null);
const bankDetailsModal = ref(null);
const updateStatusModal = ref(null);


const accntLedgers = ref(null);
const settlementAccountStatusOptions = [
    { label: "Pending", value: "pending" },
    { label: "Settled", value: "settled" },
    { label: "Failed", value: "failed" },
];
const selectedSettlementAccountStatus = ref(null);
const selectedAccountId = ref(null);



const batchId = ref(route.params.id);

const batchDetails = ref({});
const bankDetails = ref({});

onMounted(loadSettlementBatchDetails);

async function loadSettlementBatchDetails() {
    const data = await fetchSettlementBatchDetails(batchId.value);
    if (!data) return;
    batchDetails.value = data;
}



/* ---------------- LEDGER MODAL ---------------- */

async function openLedgerModal(selectedAccnt) {
    accntLedgers.value = selectedAccnt.settlement_account_ledgers;
    ledgerModal.value.show();
}

function closeLedgerModal() {
    accntLedgers.value = null;
    ledgerModal.value.hide();
}

/* ---------------- BANK DETAILS MODAL ---------------- */
async function openBankDetailsModal(accountId) {
    const data = await fetchSettlementAccountBankDetails(accountId);
    if (!data) return;
    bankDetails.value = data;
    bankDetailsModal.value.show();
}

function closeBankDetailsModal() {
    bankDetails.value = null;
    bankDetailsModal.value.hide();
}

/* ---------------- UPDATE STATUS MODAL ---------------- */
function openUpdateStatusModal(account) {
    selectedAccountId.value = account.id;
    selectedSettlementAccountStatus.value = account.status;
    updateStatusModal.value.show();
}

async function confirmUpdateStatus() {
    if (!selectedSettlementAccountStatus.value) return;

    // Call API to update status
    const success = await updateSettlementAccountStatus(selectedAccountId.value, { status: selectedSettlementAccountStatus.value });
    if (success) {
        // Refresh batch details to reflect the updated status
        await loadSettlementBatchDetails();
        updateStatusModal.value.hide();
    }
}


function closeUpdateStatusModal() {
    selectedAccountId.value = null;
    selectedSettlementAccountStatus.value = null;
    updateStatusModal.value.hide();
}


</script>
