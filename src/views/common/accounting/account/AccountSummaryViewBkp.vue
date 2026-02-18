<template>

    <BaseContainer heading="Accounting Summary Dashboard">
        <template #body>

            <!-- ================= PLATFORM ACCOUNTS ================= -->
            <div class="row mb-4">
                <div class="col-12">
                    <h5 class="fw-bold mb-3">Platform Accounts</h5>

                    <div class="row">
                        <div v-for="(row, i) in summary.platform_accounts" :key="i"
                            class="col-xl-3 col-md-4 col-sm-6 mb-3">
                            <div class="card shadow-sm border-0 h-100 summary-card">
                                <div class="card-body">

                                    <div class="fw-semibold text-muted small">
                                        {{ row.accnt_code }}
                                    </div>

                                    <h6 class="fw-bold mb-3">
                                        {{ row.name }}
                                    </h6>

                                    <div class="summary-line">
                                        <span>Available</span>
                                        <b class="text-success">{{ row.available_balance }}</b>
                                    </div>

                                    <div class="summary-line">
                                        <span>Hold</span>
                                        <b class="text-warning">{{ row.hold_balance }}</b>
                                    </div>

                                    <div class="summary-line total">
                                        <span>Total</span>
                                        <b>{{ row.total_balance }}</b>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <!-- ================= SELLER / BUYER / DELIVERY ================= -->
            <div class="row">

                <!-- SELLER -->
                <div class="col-lg-4 mb-4">
                    <div class="card shadow-sm border-0 h-100">
                        <div class="card-header fw-bold">Seller Accounts</div>

                        <div class="card-body p-0">
                            <table class="table table-sm mb-0">
                                <thead class="table-light">
                                    <tr>
                                        <th>Status</th>
                                        <th>Available</th>
                                        <th>Hold</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(row, i) in summary.seller_accounts" :key="i">
                                        <td>
                                            <span class="badge" :class="statusClass(row.status)">
                                                {{ row.status }}
                                            </span>
                                        </td>
                                        <td class="text-success fw-semibold">
                                            {{ row.total_available_balance }}
                                        </td>
                                        <td class="text-warning fw-semibold">
                                            {{ row.total_hold_balance }}
                                        </td>
                                        <td class="fw-bold">
                                            {{ row.total_balance }}
                                        </td>
                                    </tr>

                                    <tr v-if="summary.seller_accounts.length === 0">
                                        <td colspan="4" class="text-center text-muted py-3">No Data</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


                <!-- BUYER -->
                <div class="col-lg-4 mb-4">
                    <div class="card shadow-sm border-0 h-100">
                        <div class="card-header fw-bold">Buyer Accounts</div>

                        <div class="card-body p-0">
                            <table class="table table-sm mb-0">
                                <thead class="table-light">
                                    <tr>
                                        <th>Status</th>
                                        <th>Available</th>
                                        <th>Hold</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(row, i) in summary.buyer_accounts" :key="i">
                                        <td>
                                            <span class="badge" :class="statusClass(row.status)">
                                                {{ row.status }}
                                            </span>
                                        </td>
                                        <td class="text-success fw-semibold">
                                            {{ row.total_available_balance }}
                                        </td>
                                        <td class="text-warning fw-semibold">
                                            {{ row.total_hold_balance }}
                                        </td>
                                        <td class="fw-bold">
                                            {{ row.total_balance }}
                                        </td>
                                    </tr>

                                    <tr v-if="summary.buyer_accounts.length === 0">
                                        <td colspan="4" class="text-center text-muted py-3">No Data</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


                <!-- DELIVERY -->
                <div class="col-lg-4 mb-4">
                    <div class="card shadow-sm border-0 h-100">
                        <div class="card-header fw-bold">Delivery Accounts</div>

                        <div class="card-body p-0">
                            <table class="table table-sm mb-0">
                                <thead class="table-light">
                                    <tr>
                                        <th>Status</th>
                                        <th>Available</th>
                                        <th>Hold</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(row, i) in summary.delivery_accounts" :key="i">
                                        <td>
                                            <span class="badge" :class="statusClass(row.status)">
                                                {{ row.status }}
                                            </span>
                                        </td>
                                        <td class="text-success fw-semibold">
                                            {{ row.total_available_balance }}
                                        </td>
                                        <td class="text-warning fw-semibold">
                                            {{ row.total_hold_balance }}
                                        </td>
                                        <td class="fw-bold">
                                            {{ row.total_balance }}
                                        </td>
                                    </tr>

                                    <tr v-if="summary.delivery_accounts.length === 0">
                                        <td colspan="4" class="text-center text-muted py-3">No Data</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>

        </template>
    </BaseContainer>

</template>

<script setup>

import { ref, onMounted } from "vue";
import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import { fetchAccountingSummary } from "@/core/repos/admin/common/accountingRepos";

/* ---------------- STATE ---------------- */

const summary = ref({
    platform_accounts: [],
    seller_accounts: [],
    buyer_accounts: [],
    delivery_accounts: [],
});

/* ---------------- INIT ---------------- */
onMounted(loadSummary);

/* ---------------- LOAD ---------------- */
async function loadSummary() {

    const data = await fetchAccountingSummary();

    if (!data) return;

    summary.value = data;
}

/* ---------------- HELPERS ---------------- */
function statusClass(status) {
    if (status === "available") return "bg-success";
    if (status === "hold") return "bg-warning";
    return "bg-secondary";
}

</script>

<style scoped>
.summary-card {
    border-radius: 12px;
}

.summary-line {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
    font-size: 14px;
}

.summary-line.total {
    border-top: 1px solid #eee;
    padding-top: 6px;
    margin-top: 8px;
    font-weight: 600;
}
</style>
