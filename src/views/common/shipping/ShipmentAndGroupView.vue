<template>
    <BaseContainer heading="Shipments & Package Groups">



        <!-- ================= BODY ================= -->
        <template #body>

            <!-- FILTERS -->
            <div class="row mb-3 g-2">
                <div class="col-md-3">
                    <BaseInput v-model="filters.start_date" type="date" />
                </div>

                <div class="col-md-3">
                    <BaseInput v-model="filters.end_date" type="date" />
                </div>

                <div class="col-md-3">
                    <BaseButton variant="primary" icon="fas fa-search" @click="loadList">
                        Load
                    </BaseButton>
                </div>
            </div>

            <hr>
            <!-- OLD -->
            <div class="table-responsive">
                <table class="table table-bordered table-striped table-hover align-middle table-sm" id="datatable">
                    <thead class="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Shipment</th>

                            <th>Date</th>
                            <th>Type</th>
                            <th>Origin<br />Location</th>
                            <th>Origin<br />Depot</th>
                            <th>Origin<br />Market</th>
                            <th>Seller</th>
                            <th>Destination<br />Location</th>
                            <th>Destination<br />Depot</th>
                            <th>Destination<br />Market</th>
                            <th>Buyer</th>
                            <th>Status</th>
                            <th class="text-center">Total Packages</th>
                            <th class="text-center">Total Weight</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="(row, i) in shipmentList" :key="row.id" class="cursor-pointer"
                            @click="openPackages(row)">
                            <td>{{ i + 1 }}</td>

                            <td class="fw-bold text-primary">
                                {{ row.shipment_number }}
                            </td>
                            <td>
                                {{ row.shipment_date ? new Date(row.shipment_date).toDateString() : "-" }}
                            </td>

                            <td>
                                <span class="badge" :class="{
                                    'bg-primary': row.shipment_type === 'pickup' || row.shipment_type === 'market_pickup',
                                    'bg-danger': row.shipment_type === 'transfer',
                                    'bg-warning text-dark': row.shipment_type === 'dispatch' || row.shipment_type === 'market_dispatch',
                                }">
                                    {{ row.shipment_type }}
                                </span>
                            </td>

                            <td>
                                <div v-if="row.origin_fulfillment_location">
                                    <b>Code:</b> {{ row?.origin_fulfillment_location?.fl_code }}<br />
                                    <b>Name:</b> {{ row?.origin_fulfillment_location?.name }}
                                    <br />
                                    <b>Village:</b> {{ row?.origin_fulfillment_location?.address?.village }} <br />
                                    <b>Taluka:</b> {{ row?.origin_fulfillment_location?.address?.taluka }} <br />
                                    <b>City:</b> {{ row?.origin_fulfillment_location?.address?.city }} <br />
                                    <b>State:</b> {{ row?.origin_fulfillment_location?.address?.state }} <br />
                                </div>
                            </td>
                            <td>
                                <div v-if="row.origin_depot">
                                    <b>Code:</b> {{ row?.origin_depot?.code }}<br />
                                    <b>Name:</b> {{ row?.origin_depot?.name }}
                                </div>
                            </td>
                            <td>
                                <div v-if="row.origin_market">
                                    <b>Code:</b> {{ row?.origin_market?.code }}<br />
                                    <b>Name:</b> {{ row?.origin_market?.name }}
                                </div>
                            </td>
                            <td>
                                <div v-if="row.seller">
                                    <b>Code:</b> {{ row?.seller?.user_code }}<br />
                                    <b>Nick.:</b> {{ row?.seller?.nickname }}
                                </div>
                            </td>


                            <td>
                                <div v-if="row.destination_fulfillment_location">
                                    <b>Code:</b> {{ row?.destination_fulfillment_location?.fl_code }}<br />
                                    <b>Name:</b> {{ row?.destination_fulfillment_location?.name }}
                                    <br />
                                    <b>Village:</b> {{ row?.destination_fulfillment_location?.address?.village }} <br />
                                    <b>Taluka:</b> {{ row?.destination_fulfillment_location?.address?.taluka }} <br />
                                    <b>City:</b> {{ row?.destination_fulfillment_location?.address?.city }} <br />
                                    <b>State:</b> {{ row?.destination_fulfillment_location?.address?.state }} <br />
                                </div>
                            </td>
                            <td>
                                <div v-if="row.destination_depot">
                                    <b>Code:</b> {{ row?.destination_depot?.code }}<br />
                                    <b>Name:</b> {{ row?.destination_depot?.name }}
                                </div>
                            </td>
                            <td>
                                <div v-if="row.destination_market">
                                    <b>Code:</b> {{ row?.destination_market?.code }}<br />
                                    <b>Name:</b> {{ row?.destination_market?.name }}
                                </div>
                            </td>

                            <td>
                                <div v-if="row.buyer">
                                    <b>Code:</b> {{ row?.buyer?.user_code }}<br />
                                    <b>Nick.:</b> {{ row?.buyer?.nickname }}
                                </div>
                            </td>



                            <td>
                                <StatusBadge :status="row.status" />
                            </td>

                            <td class="text-center fw-semibold">
                                {{ row.total_packages }}
                            </td>
                            <td class="text-center fw-semibold">
                                {{ row.total_weight }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>


        </template>
    </BaseContainer>


    <!-- ================= PACKAGE GROUP MODAL ================= -->
    <BaseModal ref="packageModal" icon="fas fa-boxes" size="modal-xl">

        <template #title>
            Shipment Packages
        </template>

        <div class="table-responsive">
            <table class="table table-bordered table-sm align-middle">

                <thead class="table-dark">
                    <tr>
                        <th>Shipment Unique</th>
                        <th>Pkg</th>
                        <th>Pkg-BU</th>
                        <th>Pkg-SL</th>
                        <th>Pkg-MK</th>

                        <th>Buyer</th>
                        <th>Seller</th>
                        <th>Market</th>

                        <th>Status</th>

                        <th>Pack</th>

                        <th>Seller Dropoff</th>
                        <th>Buyer Pickup</th>
                        <th class="text-center">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="g in selectedShipmentGroups" :key="g.id">

                        <td class="fw-semibold text-primary smaller">
                            {{ g.shipment_package_number }}
                            <!-- {{ g.shipment_trace_code }}<br> -->
                        </td>

                        <td>{{ g.package_number }}</td>
                        <td>{{ g.package_number_buyer }}</td>
                        <td>{{ g.package_number_seller }}</td>
                        <td>{{ g.package_number_market }}</td>

                        <td>{{ g.buyer?.nickname || '-' }}</td>

                        <td>{{ g.seller?.nickname || '-' }}</td>
                        <td>{{ g.market?.code || '-' }}</td>

                        <td>


                            <StatusBadge :status="g.status" />
                        </td>

                        <td>
                            {{ g.pack_size }}
                            {{ g.pack_unit }}
                        </td>
                        <td>
                            {{ g.is_seller_dropoff ? 'Yes' : '' }}
                        </td>
                        <td>
                            {{ g.is_buyer_pickup ? 'Yes' : '' }}
                        </td>

                        <!-- ✅ INLINE ADMIN ACTIONS -->
                        <td class="text-center">
                            <div v-if="isPackageActionEnabled">


                            </div>


                        </td>
                    </tr>
                </tbody>

            </table>
        </div>

        <!-- ================= INLINE FORM ================= -->
        <div class="border-top pt-3 mt-3" v-if="actionMode">

            <div class="row g-2 align-items-center">

                <div class="col-md-4">
                    <BaseInput v-model="targetGroupNumber" placeholder="Target Group Number" />
                </div>

                <div class="col-md-3">

                    <BaseButton v-if="actionMode === 'move'" variant="primary" @click="confirmMove">
                        Confirm Move
                    </BaseButton>
                    <!-- 
                    <BaseButton v-if="actionMode === 'merge'" variant="danger" @click="confirmMerge">
                        Confirm Merge
                    </BaseButton> -->

                </div>

                <div class="col-md-3">
                    <BaseButton variant="secondary" @click="cancelAction">
                        Cancel
                    </BaseButton>
                </div>

            </div>

        </div>

    </BaseModal>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import BaseInput from "@/components/common/inputs/BaseInput.vue";
import BaseModal from "@/components/common/modal/BaseModal.vue";

import {
    fetchShipmentList,
    splitGroup,
    movePackage,
    mergeGroups
} from "@/core/repos/admin/common/shippingRepos";

import { showConfirmDialog } from "@/core/utils/uiHelpers/swalUtils.js";
import StatusBadge from "../../../components/common/badge/StatusBadge.vue";

/* ---------------- STATE ---------------- */

const shipmentList = ref([]);
const selectedShipmentGroups = ref([]);
const selectedActionGroup = ref(null);

const actionMode = ref(null); // move | merge
const targetGroupNumber = ref("");

const packageModal = ref(null);
const isPackageActionEnabled = ref(true);

const today = new Date();
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);

const formatDate = (d) => d.toISOString().slice(0, 10);

const filters = ref({
    start_date: formatDate(yesterday),
    end_date: formatDate(today),
});

/* ---------------- INIT ---------------- */

onMounted(loadList);

/* ---------------- LOAD ---------------- */

async function loadList() {
    const res = await fetchShipmentList(filters.value);
    shipmentList.value = res || [];
}

/* ---------------- MODAL ---------------- */



function openPackages(shipment) {
    selectedShipmentGroups.value = shipment.shipment_packages || [];

    // if (shipment.status === 'grouped') {
    //     isPackageActionEnabled.value = true;
    // } else {
    //     isPackageActionEnabled.value = false;

    // }

    packageModal.value.show();
}





</script>
