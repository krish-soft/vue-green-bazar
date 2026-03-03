<template>

    <BaseContainer heading="Account Details">


        <template #body>

            <div v-if="accountDetails" class="container-fluid px-0">

                <!-- ================= BASIC INFO ================= -->
                <div class="mb-4">
                    <div class="border-bottom pb-1 mb-2">
                        <h6 class="fw-semibold text-muted mb-0">Basic Information</h6>
                    </div>
                    <table class="table table-sm table-borderless align-middle mb-0">
                        <tbody>

                            <tr>
                                <th class="text-muted fw-normal w-25">Account Code</th>
                                <td class="fw-semibold">{{ accountDetails.accnt_code }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal w-25">Account Name</th>
                                <td class="fw-semibold">{{ accountDetails.name }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal w-25">Account Type</th>
                                <td class="fw-semibold">{{ accountDetails.type || 'N/A' }}</td>
                            </tr>

                            <tr>
                                <th class="text-muted fw-normal w-25">Owner Type</th>
                                <td class="fw-semibold">{{ accountDetails.owner_type || 'N/A' }}</td>
                            </tr>

                            <tr>
                                <th class="text-muted fw-normal w-25">Owner ID</th>
                                <td class="fw-semibold">{{ accountDetails.owner_id || 'N/A' }}</td>
                            </tr>

                            <tr v-if="accountDetails.user">
                                <th class="text-muted fw-normal w-25">User</th>
                                <td class="fw-semibold">
                                    <b>Code:</b> {{ accountDetails.user?.user_code }}
                                    <br /><b>Nick.:</b> {{ accountDetails.user?.nickname || "N/A" }}
                                </td>
                            </tr>


                            <tr>
                                <th class="text-muted fw-normal w-25">Currency</th>
                                <td class="fw-semibold">{{ accountDetails.currency }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal w-25">Active/Inactive Status</th>
                                <td class="fw-semibold">
                                    <span class="badge" :class="accountDetails.is_active ? 'bg-success' : 'bg-danger'">
                                        {{ accountDetails.is_active ? 'Active' : 'Inactive' }}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal w-25">Inactive Reason</th>
                                <td class="fw-semibold">{{ accountDetails.inactive_reason || "N/A" }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal w-25">Available Balance</th>
                                <td class="fw-semibold text-success">{{ accountDetails.available_balance }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal w-25">Hold Balance</th>
                                <td class="fw-semibold text-info">{{ accountDetails.hold_balance }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal w-25">Total Credit</th>
                                <td class="fw-semibold text-primary ">{{ accountDetails.total_credit }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal w-25">Total Debit</th>
                                <td class="fw-semibold text-danger">{{ accountDetails.total_debit }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal w-25">Remarks</th>
                                <td class="fw-semibold">{{ accountDetails.remarks || "N/A" }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>


            <!-- ================= Ledgers ================= -->
            <div class="mb-4">
                <div class="d-flex justify-content-between align-items-center border-bottom pb-1 mb-2">
                    <h6 class="fw-semibold text-muted mb-0">Ledger Details</h6>

                    <BaseButton size="sm" variant="secondary" @click="openLedgerModal()">
                        Add Manual Entry
                    </BaseButton>
                </div>

                <div class="table-responsive">


                    <table class="table table-sm table-bordered align-middle mb-0" id="datatable">
                        <thead class="table-dark">
                            <tr>
                                <th>#</th>
                                <!-- <th>Ledger Code</th> -->
                                <th>Source Type</th>
                                <th>Source Code</th>
                                <th>Description</th>
                                <th>Credit</th>
                                <th>Debit</th>
                                <th>Ledger Date</th>
                                <th>Entry Type</th>
                                <th>Status</th>
                                <!-- <th>Reference</th>
                                <th>Payment Reference</th> -->
                                <th>Common Reference</th>
                                <th>Remarks</th>
                                <th>Settled At</th>
                                <!-- <th>Tax</th> -->
                                <th>Open Balance</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(ledger, index) in accountDetails.ledgers" :key="ledger.id">
                                <td>{{ index + 1 }}</td>
                                <!-- <td class="fw-semibold">{{ ledger.ledger_txn_code }}</td> -->
                                <!-- <td>{{ ledger.source_type }}</td>-->
                                <td>{{ ledger.source_type?.split('\\').pop() }}</td>

                                <td>{{ ledger.source_code }}</td>
                                <td>{{ ledger.description }}</td>
                                <td class="fw-semibold">{{ ledger.credit }}</td>
                                <td class="fw-semibold">{{ ledger.debit }}</td>
                                <td>{{ ledger.ledger_date }}</td>
                                <td>{{ ledger.entry_type || 'N/A' }}</td>
                                <td>
                                    <span class="badge"
                                        :class="ledger.status === 'settled' ? 'bg-success' : (ledger.status === 'pending' ? 'bg-warning' : (ledger.status === 'available' ? 'bg-info' : 'bg-danger'))">
                                        {{ ledger.status }}
                                    </span>
                                </td>
                                <!-- <td>{{ ledger.reference || 'N/A' }}</td>
                                <td>{{ ledger.payment_reference || 'N/A' }}</td> -->
                                <td>{{ ledger.common_reference || 'N/A' }}</td>
                                <td>{{ ledger.remarks || 'N/A' }}</td>
                                <td>{{ ledger.settled_at || 'N/A' }}</td>
                                <!-- <td>
                                    <span class="badge" :class="ledger.is_tax ? 'bg-info' : 'bg-secondary'">
                                        {{ ledger.is_tax ? 'Taxed' : 'Non-Taxed' }}
                                    </span>
                                </td> -->
                                <td>
                                    <span class="badge" :class="ledger.is_open_balance ? 'bg-primary' : 'bg-light'">
                                        {{ ledger.is_open_balance ? 'Open Balance' : '' }}
                                    </span>
                                </td>
                                <td>
                                    <div class="btn-group">
                                        <BaseButton icon="fas fa-undo" iconOnly="true" size="sm" variant="danger"
                                            @click="reverseLedgerById(ledger.id)"
                                            :disabled="ledger.status === 'settled' || ledger.is_open_balance"
                                            title="Reverse ledger entry" />

                                        <BaseButton class="ms-1" icon="fas fa-check" iconOnly="true" size="sm"
                                            variant="success" @click="markLedgerSettledById(ledger.id)"
                                            :disabled="ledger.status === 'settled'"
                                            title="Mark ledger status settled" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>


        </template>

    </BaseContainer>

    <BaseModal ref="ledgerModal" icon="fas fa-book" size="modal-lg" scrollable>
        <template #title>
            Add Manual Entry
        </template>

        <form id="ledgerForm" @submit.prevent="submitLedgerForm">
            <div class="row g-3">

                <!-- Row 1 -->
                <div class="col-md-4">
                    <BaseInput label="Account ID" v-model="ledgerForm.account_id" readonly />
                </div>

                <div class="col-md-8"></div>

                <!-- <div class="col-md-4">
                    <BaseAutoCompleteSelect label="Financial Year" v-model="ledgerForm.financial_year_id"
                        :options="financialYears" :label-key="'id'" :value-key="'id'" required />
                </div> -->
                <!-- 
                <div class="col-md-4">
                    <BaseAutoCompleteSelect label="Entry Type" v-model="ledgerForm.entry_type" :options="entryTypes"
                        :label-key="'label'" :value-key="'value'" required />
                </div> -->

                <div class="col-md-6">


                    <!-- Tax -->
                    <div class=" border rounded-3 p-3 bg-light">
                        <!-- <label class="form-label fw-semibold mb-2">Tax</label> -->

                        <div class="d-flex align-items-center justify-content-between">
                            <span class="text-muted">
                                Is Tax Entry
                                <b :class="ledgerForm.is_tax ? 'text-danger' : 'text-success'">
                                    {{ ledgerForm.is_tax ? "Tax" : "Not" }}
                                </b>
                            </span>

                            <!-- TOGGLE -->
                            <div class="status-toggle" :class="{ active: ledgerForm.is_tax }"
                                @click="ledgerForm.is_tax = !ledgerForm.is_tax">
                                <span class="toggle-knob"></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6">

                    <!-- Open Balance -->
                    <div class=" border rounded-3 p-3 bg-light">
                        <!-- <label class="form-label fw-semibold mb-2">Open Balance</label> -->

                        <div class="d-flex align-items-center justify-content-between">
                            <span class="text-muted">
                                Is Open Balance Entry
                                <b :class="ledgerForm.is_open_balance ? 'text-warning' : 'text-secondary'">
                                    {{ ledgerForm.is_open_balance ? "Open Balance" : "Not" }}
                                </b>
                            </span>

                            <!-- TOGGLE -->
                            <div class="status-toggle" :class="{ active: ledgerForm.is_open_balance }"
                                @click="ledgerForm.is_open_balance = !ledgerForm.is_open_balance">
                                <span class="toggle-knob"></span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Row 2 -->
                <!-- <div class="col-md-4">
                    <BaseInput label="Source Type" v-model="ledgerForm.source_type" />
                </div>

                <div class="col-md-4">
                    <BaseInput label="Source ID" v-model="ledgerForm.source_id" />
                </div>

                <div class="col-md-4">
                    <BaseInput label="Source Code" v-model="ledgerForm.source_code" />
                </div> -->

                <!-- Row 3 -->
                <div class="col-md-4">
                    <BaseInput label="Ledger Date" type="date" v-model="ledgerForm.ledger_date" required />
                </div>

                <div class="col-md-4">
                    <BaseInput label="Credit Amount" type="number" min="0" v-model="ledgerForm.credit" required
                        :readonly="!isCreditEdit" />
                </div>

                <div class="col-md-4">
                    <BaseInput label="Debit Amount" type="number" min="0" v-model="ledgerForm.debit" required
                        :readonly="!isDebitEdit" />
                </div>

                <!-- Row 5 -->
                <div class="col-md-6">
                    <BaseInput label="Description" v-model="ledgerForm.description" required />
                </div>

                <div class="col-md-6">

                    <!--Status -->
                    <BaseAutoCompleteSelect label="Status" v-model="ledgerForm.status" :options="statusOptions"
                        :label-key="'label'" :value-key="'value'" required />

                </div>


                <!-- Row 4 -->
                <div class="col-md-6">
                    <BaseInput label="Reference" v-model="ledgerForm.reference" />
                </div>

                <div class="col-md-6">
                    <BaseInput label="Payment Reference" v-model="ledgerForm.payment_reference" />
                </div>

                <div class="col-md-6">
                    <BaseInput label="Remarks" v-model="ledgerForm.remarks" />
                </div>





            </div>
        </form>

        <template #footer>
            <BaseButton variant="secondary" @click="closeLedgerModal">
                Cancel
            </BaseButton>
            <BaseButton variant="primary" type="submit" form="ledgerForm" :loading="uiStore.isLoading">
                Save
            </BaseButton>
        </template>
    </BaseModal>

</template>

<script setup>


import { ref, onMounted, watch } from "vue";
import { useUIStore } from "@/core/utils/stores/uiStore";
import { fetchAccountDetails, createLedger, reverseLedger, markLedgerSettled } from "@/core/repos/admin/common/accountingRepos";
import { fetchAllEnums } from "@/core/repos/utils/utilsRepos";

import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import BaseInput from "@/components/common/inputs/BaseInput.vue";
import BaseModal from "@/components/common/modal/BaseModal.vue";
import BaseAutoCompleteSelect from "@/components/common/inputs/BaseAutoCompleteSelect.vue";


import { useRoute } from "vue-router";
/* ---------------- STATE ---------------- */
const uiStore = useUIStore();
const route = useRoute();

const accountDetails = ref([]);
const accountId = ref(route.params.id);
const ledgerModal = ref(null);
const financialYears = ref([]);
const entryTypes = ref([]);

const isCreditEdit = ref(true);
const isDebitEdit = ref(true);

import { showConfirmDialog } from "@/core/utils/uiHelpers/swalUtils.js";


/* ---------------- INIT ---------------- */
onMounted(loadDetails);

/* ---------------- LOAD ---------------- */
async function loadDetails() {
    const data = await fetchAccountDetails(accountId.value);
    if (!data) {
        return;
    }
    accountDetails.value = data;
}

// Form 

const ledgerForm = ref({
    account_id: accountId.value,
    financial_year_id: null,
    source_type: null,
    source_id: null,
    source_code: null,
    description: null,
    credit: 0,
    debit: 0,
    ledger_date: null,
    entry_type: null,
    status: "pending",
    is_tax: false,
    is_open_balance: false,
    reference: null,
    payment_reference: null,
    remarks: null,
});


const resetLedgerForm = ref({
    account_id: accountId.value,
    financial_year_id: null,
    source_type: null,
    source_code: null,
    description: null,
    credit: 0,
    debit: 0,
    ledger_date: null,
    entry_type: null,
    status: "available",
    is_tax: false,
    is_open_balance: false,
    reference: null,
    payment_reference: null,
    remarks: null,
});

const statusOptions = [
    // { label: 'Pending', value: 'pending' },
    { label: 'Available', value: 'available' },
    // { label: 'Settled', value: 'settled' },
];

/* STATUS → BOOLEAN (SOURCE OF TRUTH = STATUS) */
watch(
    () => ledgerForm.value.is_open_balance,
    (isOpen) => {
        if (isOpen) {
            // ledgerForm.value.status = 'settled';   // ✅ ASSIGN
            ledgerForm.value.is_tax = false;
            ledgerForm.value.debit = 0;
            isDebitEdit.value = false;
        } else {
            isDebitEdit.value = true;
            // ledgerForm.value.status = 'pending';   // ✅ ASSIGN
            ledgerForm.value.debit = 0;
            ledgerForm.value.credit = 0;
        }


    }
);

watch(
    () => ledgerForm.value.is_tax,
    (isTax) => {
        if (isTax) {
            ledgerForm.value.status = 'available'; // ✅ ASSIGN
            ledgerForm.value.is_open_balance = false;
            ledgerForm.value.debit = 0;
        }
    }
);

watch(
    () => ledgerForm.value.credit,
    (credit) => {
        if (credit > 0) {
            ledgerForm.value.debit = 0;
            isDebitEdit.value = false;
        } else {
            isDebitEdit.value = true;
        }
    }
);

watch(
    () => ledgerForm.value.debit,
    (debit) => {
        if (debit > 0) {
            ledgerForm.value.credit = 0;
            isCreditEdit.value = false;
        } else {
            isCreditEdit.value = true;
        }
    }
);



/* ---------------- LEDGER MODAL ---------------- */

async function openLedgerModal() {
    ledgerForm.value = { ...resetLedgerForm.value };

    var data = await fetchAllEnums();

    if (!data) {
        return;
    }
    financialYears.value = data.financial_years;
    entryTypes.value = data.accounting_entry_types;

    ledgerModal.value.show();
}

function closeLedgerModal() {
    ledgerModal.value.hide();
    // Reset form data to default values
    ledgerForm.value = { ...resetLedgerForm.value };
}

const submitLedgerForm = async () => {
    // Implement form submission logic here
    // You can access form data from the resetlocationLedgerForm ref
    // After successful submission, close the modal and reset the form


    const payload = { ...ledgerForm.value };
    const response = await createLedger(payload);

    if (!response) {
        // Refresh account details to show the new ledger entry
        return;
    }

    await loadDetails();
    closeLedgerModal();
}


async function reverseLedgerById(ledgerId) {

    const confirmed = await showConfirmDialog(
        "Reverse Ledger Entry",
        "Are you sure you want to reverse this ledger entry?"
    );
    if (!confirmed) return;


    const data = await reverseLedger(ledgerId);

    if (data) {
        await loadDetails();
    }
}

async function markLedgerSettledById(ledgerId) {

    const confirmed = await showConfirmDialog(
        "Mark Ledger Settled",
        "Are you sure you want to mark this ledger entry as settled?"
    );
    if (!confirmed) return;

    markLedgerSettled(ledgerId).then((data) => {
        if (data) {
            loadDetails();
        }
    });
}

</script>