<template>
    <BaseContainer heading="Shipments & Package Groups">

        <!-- ================= HEADER ACTIONS ================= -->
        <template #headerActions>
            <div class="d-flex flex-wrap gap-2 align-items-center">

                <BaseButton variant="primary" icon="fas fa-truck-loading" @click="createPickupGroups">
                    Create Pickup Groups
                </BaseButton>

                <BaseButton variant="danger" icon="fas fa-exchange-alt" @click="createTransferGroups"
                    :disabled="!shipmentList.length">
                    Create Transfer Groups
                </BaseButton>

                <BaseButton variant="warning" icon="fas fa-shipping-fast" @click="createDispatchGroups"
                    :disabled="!shipmentList.length">
                    Create Dispatch Groups
                </BaseButton>

            </div>
        </template>

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

            <!-- SHIPMENT TABLE -->
            <div class="table-responsive">
                <table class="table table-bordered table-striped table-hover align-middle table-sm" id="datatable">
                    <thead class="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Shipment</th>
                            <th>Group Number</th>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Origin<br />Location</th>
                            <th>Origin<br />Depot</th>
                            <th>Seller</th>
                            <th>Destination<br />Location</th>
                            <th>Destination<br />Depot</th>
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
                            <td class="fw-bold text-secondary">
                                {{ row.group_number || '-' }}
                            </td>

                            <td>
                                {{ row.shipment_date ? new Date(row.shipment_date).toDateString() : "-" }}
                            </td>

                            <td>
                                <span class="badge" :class="{
                                    'bg-primary': row.shipment_type === 'pickup',
                                    'bg-danger': row.shipment_type === 'transfer',
                                    'bg-warning text-dark': row.shipment_type === 'dispatch',
                                }">
                                    {{ row.shipment_type }}
                                </span>
                            </td>

                            <!-- Origin -->
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
                                <div v-if="row.seller">
                                    <b>Code:</b> {{ row?.seller?.user_code }}<br />
                                    <b>Nick.:</b> {{ row?.seller?.nickname }}
                                </div>
                            </td>


                            <!-- Destination -->
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
    <BaseModal ref="packageModal" icon="fas fa-boxes" size="modal-lg">

        <template #title>
            Shipment Package Groups
        </template>

        <div class="table-responsive">
            <table class="table table-bordered table-sm align-middle">

                <thead class="table-dark">
                    <tr>
                        <th>Group</th>
                        <th>Package</th>
                        <th>Buyer</th>
                        <th>Seller</th>
                        <th>Status</th>
                        <th>Pack</th>
                        <th>Seller Dropoff</th>
                        <th>Buyer Pickup</th>
                        <th class="text-center">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="g in selectedShipmentGroups" :key="g.id">

                        <td class="fw-semibold text-primary">
                            {{ g.group_number }}
                        </td>

                        <td>{{ g.shipment_package?.package_number }}</td>

                        <td>{{ g.shipment_package?.buyer?.nickname || '-' }}</td>

                        <td>{{ g.shipment_package?.seller?.nickname || '-' }}</td>

                        <td>


                            <StatusBadge :status="g.shipment_package?.status" />
                        </td>

                        <td>
                            {{ g.shipment_package?.pack_size }}
                            {{ g.shipment_package?.pack_unit }}
                        </td>
                        <td>
                            {{ g.shipment_package?.is_seller_dropoff ? 'Yes' : '' }}
                        </td>
                        <td>
                            {{ g.shipment_package?.is_buyer_pickup ? 'Yes' : '' }}
                        </td>

                        <!-- ✅ INLINE ADMIN ACTIONS -->
                        <td class="text-center">
                            <div v-if="isPackageActionEnabled">

                                <button class="btn btn-sm btn-outline-warning me-1" @click.stop="splitSingle(g)">
                                    Split
                                </button>

                                <button class="btn btn-sm btn-outline-primary me-1" @click.stop="startMove(g)">
                                    Move
                                </button>

                                <!-- <button class="btn btn-sm btn-outline-danger" @click.stop="startMerge(g)">
                                Merge
                            </button> -->
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
    generateShipmentAndPackageGroups,
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
    selectedShipmentGroups.value = shipment.shipment_groups || [];

    if (shipment.status === 'grouped') {
        isPackageActionEnabled.value = true;
    } else {
        isPackageActionEnabled.value = false;

    }

    packageModal.value.show();
}

/* ---------------- GENERATE ---------------- */

async function createPickupGroups() {
    const ok = await showConfirmDialog("Generate Pickup Shipment Groups", "Create pickup shipment routes?");
    if (!ok) return;
    await generateShipmentAndPackageGroups({ shipment_type: "pickup" });
    await loadList();
}

async function createTransferGroups() {
    const ok = await showConfirmDialog("Generate Depot Transfer Shipment Groups", "Create transfer shipment routes?");
    if (!ok) return;
    await generateShipmentAndPackageGroups({ shipment_type: "transfer" });
    await loadList();
}
async function createDispatchGroups() {
    const ok = await showConfirmDialog("Generate Dispatch Shipment Groups", "Create dispatch shipment routes?");
    if (!ok) return;
    await generateShipmentAndPackageGroups({ shipment_type: "dispatch" });
    await loadList();
}


/* ---------------- ADMIN ACTIONS ---------------- */

async function splitSingle(group) {

    const ok = await showConfirmDialog("Split Package", "Create new group?");
    if (!ok) return;

    await splitGroup({
        group_number: group.group_number,
        package_ids: [group.shipment_package_id],
    });

    await loadList();
}

function startMove(group) {
    actionMode.value = "move";
    selectedActionGroup.value = group;
}

function startMerge(group) {
    actionMode.value = "merge";
    selectedActionGroup.value = group;
}

function cancelAction() {
    actionMode.value = null;
    targetGroupNumber.value = "";
}

async function confirmMove() {

    await movePackage({
        package_id: selectedActionGroup.value.shipment_package_id,
        group_number: targetGroupNumber.value,
    });

    cancelAction();
    await loadList();
}

async function confirmMerge() {

    await mergeGroups({
        from_group: selectedActionGroup.value.group_number,
        to_group: targetGroupNumber.value,
    });

    cancelAction();
    await loadList();
}


</script>
