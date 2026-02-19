<template>



    <BaseContainer heading="Account Settlement Preview">

        <template #body>

            <div class="row">
                <div class="col-md-4">
                    <BaseInput v-model="cutoffDate" type="date" label="Cut Off Date" required />
                </div>

                <div class="col-md-2">
                    <br />
                    <BaseButton variant="primary" class="mt-2" @click="loadPreview"> Preview </BaseButton>
                </div>
            </div>
        </template>

    </BaseContainer>


    <!-- ================= SUMMARY SECTION ================= -->
    <div v-if="summary" class="row mb-4 mt-4">

        <div v-for="(item, key) in summary" :key="key" class="col-md-4">
            <div class="card shadow-sm h-100">
                <div class="card-body">

                    <div class="fw-semibold text-uppercase mb-2">
                        {{ key }}
                    </div>

                    <div class="small text-muted">
                        Total Credit
                    </div>
                    <div class="fw-semibold text-success">
                        {{ f(item.total_credit) }}
                    </div>

                    <div class="small text-muted mt-2">
                        Total Debit
                    </div>
                    <div class="fw-semibold text-danger">
                        {{ f(item.total_debit) }}
                    </div>

                    <div class="border-top mt-3 pt-2 fw-bold" :class="netClass(item.net_amount)">
                        Net : {{ f(item.net_amount) }}
                    </div>

                </div>
            </div>
        </div>

    </div>


    <!-- ================= PREVIEW TABLE ================= -->


    <BaseContainer heading="Account Settlement Preview">

        <template #body>

            <div class="table-responsive">
                <table class="table table-bordered table-striped table-hover align-middle mb-0" id="datatable">

                    <thead class="table-dark">
                        <tr>
                            <th>Owner Type</th>
                            <th>Account ID</th>
                            <th>Account Code</th>
                            <th>Account Name</th>
                            <th>Currency</th>
                            <th class="text-end">Credit</th>
                            <th class="text-end">Debit</th>
                            <th class="text-end">Net</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr v-for="row in preview" :key="row.account_id" style="cursor:pointer"
                            @click="openLedgerModal(row)">
                            <td class="text-uppercase fw-semibold">
                                {{ row.owner_type }}
                            </td>

                            <td>{{ row.account_id }}</td>

                            <td>{{ row.accnt_code }}</td>

                            <td class="fw-semibold">
                                {{ row.account_name }}
                            </td>

                            <td>{{ row.currency }}</td>

                            <td class="text-end text-success fw-semibold">
                                {{ f(row.calc_total_credit) }}
                            </td>

                            <td class="text-end text-danger fw-semibold">
                                {{ f(row.calc_total_debit) }}
                            </td>

                            <td class="text-end fw-bold" :class="netClass(row.calc_net_amount)">
                                {{ f(row.calc_net_amount) }}
                            </td>
                        </tr>

                    </tbody>

                </table>
            </div>
        </template>
    </BaseContainer>






    <!-- ================= LEDGER MODAL ================= -->
    <BaseModal ref="ledgerModal" size="modal-xl" scrollable>

        <template #title>
            Account Ledger Details
        </template>

        <div v-if="selectedAccount">

            <!-- ACCOUNT HEADER -->
            <div class="border-bottom pb-2 mb-3">
                <div class="fw-bold fs-6">
                    {{ selectedAccount.account_name }}
                </div>

                <small class="text-muted">
                    Owner : {{ selectedAccount.owner_type }} |
                    ID : {{ selectedAccount.account_id }} |
                    Code : {{ selectedAccount.accnt_code }} |
                    Currency : {{ selectedAccount.currency }}
                </small>
            </div>

            <!-- LEDGER TABLE -->
            <div class="table-responsive">
                <table class="table table-sm table-bordered align-middle">

                    <thead class="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Common Reference</th>
                            <th>Description</th>
                            <th class="text-end">Credit</th>
                            <th class="text-end">Debit</th>
                            <th class="text-end">Net</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr v-for="(ledger, index) in selectedAccount.ledgers" :key="ledger.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ ledger.ledger_date }}</td>
                            <td>{{ ledger.common_reference }}</td>
                            <td>{{ ledger.description }}</td>
                            <td class="text-end text-success">
                                {{ f(ledger.credit) }}
                            </td>

                            <td class="text-end text-danger">
                                {{ f(ledger.debit) }}
                            </td>

                            <td class="text-end">
                                {{ f(ledger.net_amount) }}
                            </td>
                        </tr>

                    </tbody>

                </table>
            </div>

        </div>

    </BaseModal>

</template>


<script setup>

import { ref } from "vue";

import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import BaseModal from "@/components/common/modal/BaseModal.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import BaseInput from "@/components/common/inputs/BaseInput.vue";


import { fetchSettlementPreviewList } from "@/core/repos/admin/common/accountingRepos";

const cutoffDate = ref("");
const summary = ref(null);
const preview = ref([]);

const ledgerModal = ref(null);
const selectedAccount = ref(null);

async function loadPreview() {

    if (!cutoffDate.value) {
        alert("Select Cut Off Date");
        return;
    }

    const data = await fetchSettlementPreviewList({
        cut_off_date: cutoffDate.value
    });

    if (!data) return;

    summary.value = data.summary || {};
    preview.value = data.preview || [];
}

function openLedgerModal(row) {
    selectedAccount.value = row;
    ledgerModal.value.show();
}

function f(v) {
    return Number(v || 0).toFixed(2);
}

function netClass(v) {
    return Number(v) < 0 ? "text-danger" : "text-success";
}

</script>
