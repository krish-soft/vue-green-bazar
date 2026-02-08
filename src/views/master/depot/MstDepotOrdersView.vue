<template>
    <div class="container-fluid">

        <!-- FILTER -->
        <BaseContainer
            :heading="'Depot Operations & Sales Report : ' + report?.depot?.code + ' | ' + report?.depot?.name"
            subHeading="Open, Processing & Closed Orders">
            <template #body>
                <div class="row g-3 align-items-end">
                    <div class="col-md-4">
                        <BaseInput v-model="filters.start_date" label="Start Date" type="date" />
                    </div>
                    <div class="col-md-4">
                        <BaseInput v-model="filters.end_date" label="End Date" type="date" />
                    </div>
                    <div class="col-md-4 text-end">
                        <BaseButton @click="fetchReport">Load Report</BaseButton>
                    </div>
                </div>

                <!-- CONTEXT (IMPORTANT FOR NON-VUE USERS) -->
                <div v-if="report?.meta" class="mt-2 small text-muted">
                    Depot ID: <b>{{ depotId }}</b> |
                    Period: <b>{{ report.meta.from }}</b> → <b>{{ report.meta.to }}</b>
                </div>
            </template>
        </BaseContainer>

        <!-- REPORT -->
        <div v-if="report" class="card mt-4">
            <div class="card-body">

                <!-- ================= ORDERS SUMMARY ================= -->
                <h6 class="fw-bold mb-3">Orders Summary</h6>
                <div class="row g-3 mb-4">
                    <div class="col-md-3" v-for="(v, k) in report.orders_summary" :key="k">
                        <div class="border rounded p-3 text-center bg-light">
                            <div class="small text-muted">{{ label(k) }}</div>
                            <div class="fs-4 fw-bold text-primary">{{ v }}</div>
                        </div>
                    </div>
                </div>

                <!-- ================= QUANTITY SUMMARY ================= -->
                <h6 class="fw-bold mb-3">Quantity Summary</h6>
                <div class="row g-3 mb-4">
                    <div class="col-md-4">
                        <div class="border rounded p-3 text-center bg-light">
                            <div class="small text-muted">Ordered Qty</div>
                            <div class="fs-4 fw-bold">
                                {{ report.quantity_summary.ordered_qty }}
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="border rounded p-3 text-center bg-light">
                            <div class="small text-muted">Shipped Qty (Closed)</div>
                            <div class="fs-4 fw-bold text-success">
                                {{ report.quantity_summary.shipped_qty }}
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="border rounded p-3 text-center bg-light">
                            <div class="small text-muted">Pending To Ship</div>
                            <div class="fs-4 fw-bold text-warning">
                                {{ report.quantity_summary.pending_to_ship_qty }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ================= AMOUNT SUMMARY ================= -->
                <h6 class="fw-bold mb-3">Amount Summary (₹)</h6>
                <div class="row g-3">
                    <div class="col-md-3">
                        <div class="border rounded p-3 text-center bg-light">
                            <div class="small text-muted">Open Amount</div>
                            <div class="fs-5 fw-bold">
                                ₹{{ num(report.amount_summary.open_amount) }}
                            </div>
                        </div>
                    </div>

                    <div class="col-md-3">
                        <div class="border rounded p-3 text-center bg-light">
                            <div class="small text-muted">Processing Amount</div>
                            <div class="fs-5 fw-bold">
                                ₹{{ num(report.amount_summary.processing_amount) }}
                            </div>
                        </div>
                    </div>

                    <div class="col-md-3">
                        <div class="border rounded p-3 text-center bg-light">
                            <div class="small text-muted">Closed Amount</div>
                            <div class="fs-5 fw-bold text-success">
                                ₹{{ num(report.amount_summary.closed_amount) }}
                            </div>
                        </div>
                    </div>

                    <div class="col-md-3">
                        <div class="border rounded p-3 text-center bg-light">
                            <div class="small text-muted">Total Amount</div>
                            <div class="fs-5 fw-bold text-success">
                                ₹{{ num(report.amount_summary.total_amount) }}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import BaseInput from "@/components/common/inputs/BaseInput.vue";
import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import { fetchOrderReportByDepot } from "@/core/repos/admin/common/reportRepos.js";

const route = useRoute();
const depotId = Number(route.params.id);

/* default dates (frontend only) */
const today = new Date();
const past30 = new Date();
past30.setDate(today.getDate() - 30);
const format = d => d.toISOString().split("T")[0];


const filters = ref({
    start_date: format(past30),
    end_date: format(today),
});

const report = ref(null);

const fetchReport = async () => {
    report.value = await fetchOrderReportByDepot({
        depot_id: depotId,
        ...filters.value,
    });
};

onMounted(fetchReport);

/* helpers */
const num = (v, d = 2) =>
    Number.isFinite(Number(v)) ? Number(v).toFixed(d) : "0.00";

const label = k =>
    k.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
</script>
