<template>

    <!-- ================= FILTER ================= -->
    <BaseContainer heading="Settlement Batch Preview & Creation">

        <template #body>

            <div class="row g-3">

                <div class="col-md-2">
                    <BaseInput v-model="form.cut_off_date" type="date" label="Cut Off Date" />
                </div>

                <div class="col-md-2">
                    <label class="form-label fw-semibold">Owner Type</label>
                    <select v-model="form.owner_type" class="form-control">
                        <option value="seller">Seller</option>
                        <option value="buyer">Buyer</option>
                        <option value="delivery">Delivery</option>
                    </select>
                </div>

                <div class="col-md-2">
                    <label class="form-label fw-semibold">Filter Type</label>
                    <select v-model="form.filter_type" class="form-control">
                        <option value="need_to_pay_online">Need To Pay (Online)</option>
                        <option value="need_to_pay_cash">Need To Pay (Cash)</option>
                        <option value="need_to_receive_online">Need To Receive</option>
                    </select>
                </div>

                <!-- ✅ FIXED HERE -->
                <div class="col-md-3">
                    <BaseAutoCompleteSelect label="Platform Account" v-model="form.platform_account_id"
                        :options="platformAccounts" :label-key="['accnt_code']" value-key="id"
                        placeholder="Select Platform Account" />
                </div>

                <div class="col-md-1">
                    <br />
                    <BaseButton variant="secondary" class="w-100 mt-2" @click="loadPreview">
                        Preview
                    </BaseButton>
                </div>

                <div class="col-md-2">
                    <br />
                    <BaseButton variant="primary" class="w-100 mt-2" @click="submitBatch">
                        Create Batch
                    </BaseButton>
                </div>

            </div>

        </template>

    </BaseContainer>


    <!-- ================= SUMMARY ================= -->
    <div v-if="summary" class="row g-3 mt-4">

        <div class="col-xl-2 col-md-4">
            <div class="card shadow-sm h-100">
                <div class="card-body">
                    <small class="text-muted">TOTAL CREDIT</small>
                    <div class="fs-3 fw-bold text-success">{{ f(summary.total_credit) }}</div>
                </div>
            </div>
        </div>

        <div class="col-xl-2 col-md-4">
            <div class="card shadow-sm h-100">
                <div class="card-body">
                    <small class="text-muted">TOTAL DEBIT</small>
                    <div class="fs-3 fw-bold text-danger">{{ f(summary.total_debit) }}</div>
                </div>
            </div>
        </div>

        <div class="col-xl-2 col-md-4">
            <div class="card shadow-sm h-100">
                <div class="card-body">
                    <small class="text-muted">NET SETTLEMENT</small>
                    <div class="fs-3 fw-bold" :class="netClass(summary.net_amount)">
                        {{ f(summary.net_amount) }}
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-2 col-md-6">
            <div class="card shadow-sm h-100 bg-light">
                <div class="card-body">
                    <small class="text-muted">PLATFORM BALANCE</small>
                    <div class="fs-4 fw-bold text-primary">
                        {{ f(summary.platform_current_balance) }}
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-2 col-md-6">
            <div class="card shadow-sm h-100">
                <div class="card-body">
                    <small class="text-muted">AFTER SETTLEMENT</small>
                    <div class="fs-4 fw-bold"
                        :class="summary.platform_remaining_balance_after_settlement < 0 ? 'text-danger' : 'text-success'">
                        {{ f(summary.platform_remaining_balance_after_settlement) }}
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-2 col-md-12">
            <div class="card shadow-sm h-100">
                <div class="card-body">
                    <small class="text-muted">ACCOUNTS</small>
                    <div class="fs-4 fw-bold">{{ totalAccounts }}</div>

                    <small class="text-muted mt-2">LEDGERS</small>
                    <div class="fs-5 fw-semibold">{{ totalLedgers }}</div>
                </div>
            </div>
        </div>

    </div>


    <!-- ================= TABLE ================= -->
    <BaseContainer heading="Settlement Preview" class="mt-4">

        <template #body>

            <div class="table-responsive">

                <table class="table table-bordered table-hover align-middle">

                    <thead class="table-dark">
                        <tr>
                            <th>Owner</th>
                            <th>Account ID</th>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Currency</th>
                            <th class="text-end">Credit</th>
                            <th class="text-end">Debit</th>
                            <th class="text-end">Net</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr v-for="row in preview" :key="row.account_id" style="cursor:pointer"
                            @click="openLedgerModal(row)">
                            <td>{{ row.owner_type }}</td>
                            <td>{{ row.account_id }}</td>
                            <td>{{ row.accnt_code }}</td>
                            <td class="fw-semibold">{{ row.account_name }}</td>
                            <td>{{ row.currency }}</td>

                            <td class="text-end text-success">{{ f(row.calc_total_credit) }}</td>
                            <td class="text-end text-danger">{{ f(row.calc_total_debit) }}</td>
                            <td class="text-end fw-bold" :class="netClass(row.calc_net_amount)">
                                {{ f(row.calc_net_amount) }}
                            </td>
                        </tr>

                        <tr v-if="!preview.length">
                            <td colspan="8" class="text-center text-muted py-4">
                                No data available
                            </td>
                        </tr>

                    </tbody>

                </table>

            </div>

        </template>

    </BaseContainer>


    <!-- ================= MODAL ================= -->
    <BaseModal ref="ledgerModal" size="modal-xl" scrollable>

        <template #title>Account Ledger Details</template>

        <div v-if="selectedAccount">

            <div class="border-bottom pb-2 mb-3">
                <div class="fw-bold">{{ selectedAccount.account_name }}</div>
            </div>

            <table class="table table-sm table-bordered">
                <tbody>
                    <tr v-for="(ledger, i) in selectedAccount.ledgers" :key="ledger.id">
                        <td>{{ i + 1 }}</td>
                        <td>{{ ledger.ledger_date }}</td>
                        <td>{{ ledger.common_reference }}</td>
                        <td>{{ ledger.description }}</td>
                        <td class="text-end text-success">{{ f(ledger.credit) }}</td>
                        <td class="text-end text-danger">{{ f(ledger.debit) }}</td>
                        <td class="text-end">{{ f(ledger.net_amount) }}</td>
                    </tr>
                </tbody>
            </table>

        </div>

    </BaseModal>

</template>

<script setup>

import { ref, computed, watch, onMounted } from "vue";

import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import BaseModal from "@/components/common/modal/BaseModal.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import BaseInput from "@/components/common/inputs/BaseInput.vue";
import BaseAutoCompleteSelect from "@/components/common/inputs/BaseAutoCompleteSelect.vue";

import {
    fetchSettlementPreviewList,
    createSettlementBatch
} from "@/core/repos/admin/common/accountingRepos";

import { fetchPlatformAccounts } from "@/core/repos/utils/utilsRepos";

const form = ref({
    cut_off_date: "",
    owner_type: "seller",
    filter_type: "need_to_pay_online",
    platform_account_id: null
});

const summary = ref(null);
const preview = ref([]);

const ledgerModal = ref(null);
const selectedAccount = ref(null);

const platformAccounts = ref([]);

watch(
    () => [form.value.cut_off_date, form.value.owner_type, form.value.filter_type],
    () => {
        summary.value = null;
        preview.value = [];
        form.value.platform_account_id = null;
    }
);

onMounted(loadPlatformAccounts);

async function loadPlatformAccounts() {
    const data = await fetchPlatformAccounts();
    if (!data) return;
    platformAccounts.value = data;
}

async function loadPreview() {

    if (!form.value.cut_off_date) {
        alert("Select cut off date");
        return;
    }

    summary.value = null;
    preview.value = [];

    const data = await fetchSettlementPreviewList(form.value);

    if (!data) return;

    summary.value = data.summary || null;
    preview.value = data.preview || [];
}

async function submitBatch() {

    if (!preview.value.length) {
        alert("Preview first");
        return;
    }

    await createSettlementBatch(form.value);
}

const totalAccounts = computed(() => preview.value.length);

const totalLedgers = computed(() => {
    return preview.value.reduce((t, row) => t + (row.ledgers?.length || 0), 0);
});

function openLedgerModal(row) {
    selectedAccount.value = row;
    ledgerModal.value.show();
}

function f(v) { return Number(v || 0).toFixed(2); }

function netClass(v) {
    return Number(v) < 0 ? "text-danger" : "text-warning";
}

</script>
