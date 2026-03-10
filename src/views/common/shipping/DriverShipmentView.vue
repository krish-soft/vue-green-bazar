<template>
    <BaseContainer heading="Driver Shipments">

        <!-- ================= HEADER ================= -->
        <template #headerActions>
            <div class="d-flex gap-2">
                <BaseButton variant="primary" icon="fas fa-user-plus" @click="openAssignModal">
                    Assign Shipment
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
                    <BaseInput v-model="filters.shipment_number" placeholder="Shipment Number" />
                </div>

                <div class="col-md-3">
                    <BaseButton variant="primary" icon="fas fa-search" @click="loadList">
                        Load
                    </BaseButton>
                </div>
            </div>
            <hr>

            <!-- TABLE -->
            <div class="table-responsive">
                <table class="table table-bordered table-striped table-sm align-middle" id="datatable">
                    <thead class="table-dark">
                        <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>Shipment</th>
                            <th>Shipment Type</th>
                            <th>Driver</th>
                            <th>Vehicle</th>
                            <th>Status</th>
                            <th>Assigned At</th>
                            <th>Assigned By</th>
                            <th>Packages</th>
                            <th>Remarks</th>
                            <th class="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="(row, i) in driverShipmentList" :key="row.id" class="cursor-pointer"
                            @click="openShipmentDetails(row)">

                            <td>{{ i + 1 }}</td>

                            <td class="fw-bold text-warning">
                                {{ row.id }}
                            </td>

                            <td class="fw-bold text-primary">
                                {{ row.shipment?.shipment_number }}
                            </td>
                            <td>
                                <span class="badge" :class="{
                                    'bg-primary': row.shipment?.shipment_type === 'pickup',
                                    'bg-danger': row.shipment?.shipment_type === 'transfer',
                                    'bg-warning text-dark': row.shipment?.shipment_type === 'dispatch',
                                }">
                                    {{ row.shipment?.shipment_type }}
                                </span>
                            </td>

                            <td>
                                <b>Code:</b> {{ row.driver?.user_code }}<br />
                                <b>Nick.:</b> {{ row.driver?.nickname }}
                            </td>

                            <td>{{ row.driver_vehicle?.vehicle_number }}</td>

                            <td>
                                <StatusBadge :status="row.status" />

                            </td>

                            <td>{{ new Date(row.assigned_at).toDateString() }}</td>

                            <td>
                                <b>Code:</b> {{ row.assigned_by?.user_code }}<br />
                                <b>Nick.:</b> {{ row.assigned_by?.nickname }}
                            </td>

                            <td class="fw-semibold text-center">
                                {{ row.shipment?.total_packages }}
                            </td>

                            <td class="text-center">
                                {{ row.remarks }}
                            </td>

                            <td class="text-center">
                                <button class="btn btn-sm btn-outline-primary me-1" @click.stop="openChangeDriver(row)"
                                    :disabled="row.status !== 'pending' && row.status !== 'accepted'">
                                    Change
                                </button>

                                <button class="btn btn-sm btn-outline-danger" @click.stop="cancelDriver(row)"
                                    :disabled="row.status === 'cancelled' || row.status === 'completed'">
                                    Cancel
                                </button>
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>

        </template>
    </BaseContainer>

    <!-- ================= ASSIGN MODAL ================= -->
    <BaseModal ref="assignModal" icon="fas fa-user-plus" size="modal-lg">

        <template #title>Assign Shipment To Driver</template>

        <div class="row g-2">

            <div class="col-md-6">
                <BaseAutoCompleteSelect label="Shipment" v-model="assignForm.shipment_id" :options="shipmentDropdown"
                    :label-key="['shipment_type', 'shipment_number']" value-key="id" required />
            </div>

            <div class="col-md-6">
                <BaseAutoCompleteSelect label="Driver Vehicle" v-model="assignForm.driver_vehicle_id"
                    :options="driverList" label-key="display_label" value-key="id" required />
            </div>

            <div class="col-md-12 mt-3">
                <BaseButton variant="primary" @click="confirmAssign">
                    Assign
                </BaseButton>
            </div>

        </div>
    </BaseModal>

    <!-- ================= CHANGE DRIVER ================= -->
    <BaseModal ref="changeModal" icon="fas fa-user-edit">

        <template #title>Change Driver</template>

        <BaseAutoCompleteSelect label="Driver Vehicle" v-model="changeForm.driver_vehicle_id" :options="driverList"
            label-key="display_label" value-key="id" />

        <div class="mt-3">
            <BaseButton variant="primary" @click="confirmChangeDriver">
                Update Driver
            </BaseButton>
        </div>

    </BaseModal>

    <!-- ================= SHIPMENT DETAILS ================= -->
    <BaseModal ref="detailModal" icon="fas fa-boxes" size="modal-lg">

        <template #title>Shipment Packages</template>

        <div class="table-responsive">
            <table class="table table-bordered table-sm">

                <thead class="table-dark">
                    <tr>
                        <th>Group</th>
                        <th>Package</th>
                        <th>Buyer</th>
                        <th>Seller</th>
                        <th>Qty</th>
                        <th>Pack</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="g in selectedShipmentGroups" :key="g.id">

                        <td class="fw-semibold text-primary">
                            {{ g.group_number }}
                        </td>

                        <td>{{ g.shipment_package?.package_number }}</td>

                        <td>{{ g.shipment_package?.buyer?.nickname }}</td>

                        <td>{{ g.shipment_package?.seller?.nickname }}</td>

                        <td>{{ g.shipment_package?.qty }}</td>

                        <td>
                            {{ g.shipment_package?.pack_size }}
                            {{ g.shipment_package?.pack_unit }}
                        </td>

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
import BaseAutoCompleteSelect from "@/components/common/inputs/BaseAutoCompleteSelect.vue";

import {
    fetchDriverList,
    fetchDriverShipmentList,
    assignShipmentToDriver,
    changeDriverShipment,
    cancelDriverShipment,
    fetchShipmentList
} from "@/core/repos/admin/common/shippingRepos";

import { showConfirmDialog } from "@/core/utils/uiHelpers/swalUtils.js";
import StatusBadge from "../../../components/common/badge/StatusBadge.vue";

const driverShipmentList = ref([]);
const driverList = ref([]);
const shipmentDropdown = ref([]);

const assignModal = ref(null);
const changeModal = ref(null);
const detailModal = ref(null);

const selectedShipmentGroups = ref([]);
const selectedDriverShipment = ref(null);

const assignForm = ref({ shipment_id: null, driver_vehicle_id: null });
const changeForm = ref({ driver_vehicle_id: null });

const today = new Date();
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);

const formatDate = (d) => d.toISOString().slice(0, 10);

const filters = ref({
    start_date: formatDate(yesterday),
    end_date: formatDate(today),
    shipment_number: null
});

onMounted(async () => {
    await loadDrivers();
    await loadList();
});

async function loadList() {
    const res = await fetchDriverShipmentList(filters.value);
    driverShipmentList.value = res || [];
}

async function loadDrivers() {
    const res = await fetchDriverList();

    driverList.value = (res || []).map(d => ({
        ...d,
        display_label: `${d.driver?.user_code} - ${d.driver?.nickname} (${d.vehicle_number})`
    }));
}

async function loadGroupedShipments() {
    const res = await fetchShipmentList({ status: "grouped" });
    shipmentDropdown.value = res || [];
}

function openAssignModal() {
    loadGroupedShipments();
    assignModal.value.show();
}

async function confirmAssign() {
    const ok = await showConfirmDialog("Assign Shipment To Driver", "Confirm assign?");
    if (!ok) return;

    await assignShipmentToDriver(assignForm.value);

    assignModal.value.hide();
    assignForm.value = { shipment_id: null, driver_vehicle_id: null };

    await loadList();
}

function openChangeDriver(row) {
    selectedDriverShipment.value = row;
    changeModal.value.show();
}

async function confirmChangeDriver() {
    await changeDriverShipment(
        selectedDriverShipment.value.id,
        changeForm.value
    );

    changeModal.value.hide();
    await loadList();
}

async function cancelDriver(row) {
    const ok = await showConfirmDialog("Cancel Driver Shipment", "Are you sure?");
    if (!ok) return;

    await cancelDriverShipment(row.id);
    await loadList();
}

function openShipmentDetails(row) {
    selectedShipmentGroups.value = row.shipment?.shipment_groups || [];
    detailModal.value.show();
}

</script>
