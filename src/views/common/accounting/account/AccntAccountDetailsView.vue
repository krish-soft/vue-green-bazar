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
                                <td class="fw-semibold">{{ accountDetails.available_balance }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal w-25">Hold Balance</th>
                                <td class="fw-semibold">{{ accountDetails.hold_balance }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal w-25">Total Credit</th>
                                <td class="fw-semibold">{{ accountDetails.total_credit }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal w-25">Total Debit</th>
                                <td class="fw-semibold">{{ accountDetails.total_debit }}</td>
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
                <div class="border-bottom pb-1 mb-2">
                    <h6 class="fw-semibold text-muted mb-0">Ledger Information</h6>
                </div>
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
                            <th>Reference</th>
                            <th>Payment Reference</th>
                            <th>Remarks</th>
                            <th>Settled At</th>
                            <!-- <th>Tax</th>
                            <th>Open Balance</th> -->
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(ledger, index) in accountDetails.ledgers" :key="ledger.id">
                            <td>{{ index + 1 }}</td>
                            <!-- <td class="fw-semibold">{{ ledger.ledger_txn_code }}</td> -->
                            <td>{{ ledger.source_type }}</td>
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
                            <td>{{ ledger.reference || 'N/A' }}</td>
                            <td>{{ ledger.payment_reference || 'N/A' }}</td>
                            <td>{{ ledger.remarks || 'N/A' }}</td>
                            <td>{{ ledger.settled_at || 'N/A' }}</td>
                            <!-- <td>
                                <span class="badge" :class="ledger.is_tax ? 'bg-info' : 'bg-secondary'">
                                    {{ ledger.is_tax ? 'Taxed' : 'Non-Taxed' }}
                                </span>
                            </td>
                            <td>
                                <span class="badge" :class="ledger.is_open_balance ? 'bg-primary' : 'bg-light'">
                                    {{ ledger.is_open_balance ? 'Open Balance' : '' }}
                                </span>
                            </td> -->
                        </tr>
                    </tbody>
                </table>

            </div>


        </template>

    </BaseContainer>

</template>

<script setup>


import { ref, onMounted } from "vue";
import { useUIStore } from "@/core/utils/stores/uiStore";
import { fetchAccountDetails } from "@/core/repos/admin/common/accountingRepos";

import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import BaseInput from "@/components/common/inputs/BaseInput.vue";

import { useRoute } from "vue-router";
/* ---------------- STATE ---------------- */
const uiStore = useUIStore();
const route = useRoute();

const accountDetails = ref([]);
const accountId = ref(route.params.id);
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


</script>