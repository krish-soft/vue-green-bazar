<template>
    <BaseContainer heading="Shipment Summary">

        <!-- ================= HEADER FILTERS ================= -->
        <template #headerActions>

        </template>

        <template #body>

            <div class="row mb-4">
                <div class="col-md-3">
                    <BaseInput v-model="filters.start_date" type="date" />
                </div>
                <div class="col-md-3">
                    <BaseInput v-model="filters.end_date" type="date" />
                </div>
                <div class="col-md-3">
                    <BaseInput v-model="filters.depot_id" placeholder="Depot ID (optional)" />
                </div>
                <div class="col-md-3">
                    <BaseButton variant="primary" icon="fas fa-search" @click="loadSummary">Load</BaseButton>
                </div>
                <div v-if="summary.filters" class="small text-muted ms-2"> Filters: {{ summary.filters.start_date }} →
                    {{ summary.filters.end_date }} </div>
            </div>
            <hr>
            <!-- ================= STATUS SUMMARY ================= -->
            <div class="row mb-4" v-if="summary.status_summary?.length">

                <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-3" v-for="row in summary.status_summary"
                    :key="row.status">

                    <div class="card text-center shadow-sm cursor-pointer" @click="openPackages(row.packages)">

                        <div class="card-body p-3">
                            <div class="text-uppercase small text-muted fw-semibold">
                                {{ row.status }}
                            </div>

                            <h3 class="fw-bold mb-0">
                                {{ row.total_packages }}
                            </h3>
                        </div>

                    </div>
                </div>

            </div>

            <!-- ================= PACK COMBINATION SUMMARY ================= -->
            <h6 class="fw-bold mb-2" v-if="summary.pack_combination_summary?.length">
                Pack Combination Summary
            </h6>

            <div class="table-responsive mb-4" v-if="summary.pack_combination_summary?.length">

                <table class="table table-bordered table-sm align-middle">
                    <thead class="table-dark">
                        <tr>
                            <th>Pack Size</th>
                            <th>Unit</th>
                            <th>Type</th>
                            <th class="text-end">Packages</th>
                            <th class="text-end">Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="row in summary.pack_combination_summary"
                            :key="row.pack_size + row.pack_unit + row.pack_type_unit" class="cursor-pointer"
                            @click="openPackages(row.packages)">

                            <td>{{ row.pack_size }}</td>
                            <td>{{ row.pack_unit }}</td>
                            <td>{{ row.pack_type_unit }}</td>

                            <td class="text-end fw-semibold">
                                {{ row.total_packages }}
                            </td>

                            <td class="text-end text-success fw-semibold">
                                {{ row.total_weight }} {{ row.pack_unit }}
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- ================= DEPOT SUMMARY ================= -->
            <h6 class="fw-bold mb-2">Depot (Pickup/Shipping) Summary</h6>

            <div class="table-responsive mb-4">
                <table class="table table-hover table-bordered table-sm align-middle">

                    <thead class="table-dark">
                        <tr>
                            <th>Depot</th>
                            <th>Status</th>
                            <th class="text-end">Packages</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="row in summary.regular_depot_summary" :key="row.depot_id + row.status"
                            class="cursor-pointer" @click="openPackages(row.packages)">

                            <td class="fw-semibold">{{ row.depot_name }}</td>

                            <td>
                                <StatusBadge :status="row.status" />
                            </td>

                            <td class="text-end fw-bold">
                                {{ row.total_packages }}
                            </td>

                        </tr>
                    </tbody>

                </table>
            </div>

            <!-- ================= CROSS DEPOT SUMMARY ================= -->
            <h6 class="fw-bold mb-2">Cross Depot Summary</h6>

            <div class="table-responsive">
                <table class="table table-hover table-bordered table-sm align-middle">

                    <thead class="table-dark">
                        <tr>
                            <th>Pickup Depot</th>
                            <th>Shipping Depot</th>
                            <th>Status</th>
                            <th class="text-end">Packages</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="row in summary.cross_depot_summary"
                            :key="row.pickup_depot_id + '-' + row.shipping_depot_id + '-' + row.status"
                            class="cursor-pointer" @click="openPackages(row.packages)">

                            <td>{{ row.pickup_depot_name }}</td>
                            <td>{{ row.shipping_depot_name }}</td>

                            <td>
                                <span class="badge bg-warning text-dark text-uppercase">
                                    {{ row.status }}
                                </span>
                            </td>

                            <td class="text-end fw-bold">
                                {{ row.total_packages }}
                            </td>

                        </tr>
                    </tbody>

                </table>
            </div>

        </template>
    </BaseContainer>

    <!-- ================= PACKAGE DETAIL MODAL ================= -->
    <BaseModal ref="packageModal" icon="fas fa-box" size="modal-lg">

        <template #title>
            Package Details
        </template>

        <div class="table-responsive">
            <table class="table table-bordered table-sm align-middle">

                <thead class="table-dark">
                    <tr>
                        <th>Shipment</th>
                        <th>Package</th>
                        <th>Buyer</th>
                        <th>Seller</th>
                        <th>Status</th>
                        <th>Weight</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="p in selectedPackages" :key="p.id">
                        <td>{{ p.shipment_package_number }}</td>
                        <td>{{ p.package_number }}</td>
                        <td>{{ p.buyer?.nickname }}</td>
                        <td>{{ p.seller?.nickname }}</td>
                        <td>
                            <StatusBadge :status="p.status" />
                        </td>
                        <td>{{ p.pack_size }} {{ p.pack_unit }}</td>
                    </tr>
                </tbody>

            </table>
        </div>

    </BaseModal>
</template>

<script setup>
import { ref, onMounted } from "vue";

import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import BaseInput from "@/components/common/inputs/BaseInput.vue";
import BaseModal from "@/components/common/modal/BaseModal.vue";

import { fetchShipmentPackageSummary } from "@/core/repos/admin/common/shippingRepos";
import StatusBadge from "../../../components/common/badge/StatusBadge.vue";

/* ---------------- STATE ---------------- */

const summary = ref({});

const today = new Date();
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);

const formatDate = (d) => d.toISOString().slice(0, 10);

const filters = ref({
    start_date: formatDate(yesterday),
    end_date: formatDate(today),
    depot_id: null,
});

const packageModal = ref(null);
const selectedPackages = ref([]);

/* ---------------- INIT ---------------- */

onMounted(loadSummary);

/* ---------------- LOAD ---------------- */

async function loadSummary() {
    const res = await fetchShipmentPackageSummary(filters.value);
    summary.value = res || {};
}

/* ---------------- MODAL ---------------- */

function openPackages(packages) {
    selectedPackages.value = packages || [];
    packageModal.value.show();
}
</script>
