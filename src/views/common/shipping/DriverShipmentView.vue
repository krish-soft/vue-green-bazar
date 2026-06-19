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
                            <th>Image</th>
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
                            <td>
                                <img :src="row?.proof_image_url" alt="Proof Image" class="img-thumbnail" width="60" />
                            </td>

                            <td class="fw-bold text-primary">
                                {{ row.shipment?.shipment_number }}
                            </td>
                            <td>
                                <span class="badge" :class="{
                                    'bg-primary': row.shipment?.shipment_type === 'pickup' || row.shipment?.shipment_type === 'market_pickup',
                                    'bg-danger': row.shipment?.shipment_type === 'transfer',
                                    'bg-warning text-dark': row.shipment?.shipment_type === 'dispatch' || row.shipment?.shipment_type === 'market_dispatch',
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

            <div class="col-12 mt-2">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <h6 class="mb-0">Available Drivers Map (OpenStreetMap)</h6>
                    <small class="text-muted">Click marker to select driver</small>
                </div>

                <div v-if="driversWithCoordinates.length === 0" class="alert alert-warning mb-0">
                    No available driver location found. You can still select a driver from dropdown.
                </div>

                <div v-else ref="driverMapEl" class="driver-assign-map"></div>
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

    <BaseModal ref="detailModal" icon="fas fa-boxes" size="modal-xl">

        <template #title>Shipment Packages</template>

        <!-- Tabs -->
        <ul class="nav nav-tabs mb-3">
            <li class="nav-item">
                <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#packagesTab">
                    Packages
                </button>
            </li>

            <li class="nav-item">
                <button class="nav-link" data-bs-toggle="tab" data-bs-target="#imageTab">
                    Proof Image
                </button>
            </li>
        </ul>

        <!-- Tab Content -->
        <div class="tab-content">

            <!-- TAB 1 : TABLE -->
            <div class="tab-pane fade show active" id="packagesTab">

                <div class="table-responsive">
                    <table class="table table-bordered table-sm">

                        <thead class="table-dark">
                            <tr>
                                <th>Shipment Unique</th>
                                <th>Pkg</th>
                                <th>Pkg (Seller)</th>
                                <th>Pkg (Buyer)</th>
                                <th>Pkg (Market)</th>
                                <th>Qty</th>
                                <th>Pack</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="g in selectedShipmentGroups" :key="g.id">

                                <td class="fw-semibold text-primary">
                                    {{ g.shipment_package_number }}
                                </td>

                                <td>{{ g.package_number }}</td>
                                <td>{{ g.package_number_seller }}</td>
                                <td>{{ g.package_number_buyer }}</td>
                                <td>{{ g.package_number_market }}</td>

                                <td>{{ g.qty }}</td>

                                <td>
                                    {{ g.pack_size }}
                                    {{ g.pack_unit }}
                                </td>

                            </tr>
                        </tbody>

                    </table>
                </div>

            </div>

            <!-- TAB 2 : IMAGE -->
            <div class="tab-pane fade text-center" id="imageTab">

                <div class="mt-3">
                    <img :src="selectedShipmentImage" alt="Proof Image" class="img-thumbnail" width="750" />

                </div>

            </div>

        </div>

    </BaseModal>

</template>

<script setup>

import { ref, onMounted, onBeforeUnmount, computed, nextTick, watch } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import BaseInput from "@/components/common/inputs/BaseInput.vue";
import BaseModal from "@/components/common/modal/BaseModal.vue";
import BaseAutoCompleteSelect from "@/components/common/inputs/BaseAutoCompleteSelect.vue";
// import ImageZoomViewer from "@/components/common/other/ImageZoomViewer.vue";

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

const selectedShipmentImage = ref("");
const selectedShipmentGroups = ref([]);
const selectedDriverShipment = ref(null);

const driverMapEl = ref(null);
const mapInstance = ref(null);
const markerLayer = ref(null);

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

const driversWithCoordinates = computed(() =>
    (driverList.value || []).filter((d) =>
        Number.isFinite(d.__latitude) && Number.isFinite(d.__longitude)
    )
);

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
        __latitude: resolveDriverLatitude(d),
        __longitude: resolveDriverLongitude(d),
        display_label: `${d.driver?.user_code} - ${d.driver?.nickname} (${d.vehicle_number})`
    }));
}

function parseCoordinate(value) {
    if (value === null || value === undefined || value === "") return null;

    const parsed = Number.parseFloat(value);
    if (!Number.isFinite(parsed)) return null;

    return parsed;
}

function resolveDriverLatitude(driverVehicle) {
    return (
        parseCoordinate(driverVehicle?.driver?.driver_location?.latitude)
        ?? parseCoordinate(driverVehicle?.driver?.driverLocation?.latitude)
        ?? parseCoordinate(driverVehicle?.last_latitude)
    );
}

function resolveDriverLongitude(driverVehicle) {
    return (
        parseCoordinate(driverVehicle?.driver?.driver_location?.longitude)
        ?? parseCoordinate(driverVehicle?.driver?.driverLocation?.longitude)
        ?? parseCoordinate(driverVehicle?.last_longitude)
    );
}

function markerColorFor(driverVehicleId) {
    return assignForm.value.driver_vehicle_id === driverVehicleId ? "#dc3545" : "#198754";
}

function ensureDriverMap() {
    if (!driverMapEl.value || mapInstance.value) return;

    const first = driversWithCoordinates.value[0];
    if (!first) return;

    mapInstance.value = L.map(driverMapEl.value, {
        zoomControl: true,
        attributionControl: true,
    }).setView([first.__latitude, first.__longitude], 11);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors",
    }).addTo(mapInstance.value);

    markerLayer.value = L.layerGroup().addTo(mapInstance.value);
}

function refreshDriverMarkers() {
    if (!mapInstance.value || !markerLayer.value) return;

    markerLayer.value.clearLayers();

    const bounds = [];

    driversWithCoordinates.value.forEach((driverVehicle) => {
        const marker = L.circleMarker(
            [driverVehicle.__latitude, driverVehicle.__longitude],
            {
                radius: 9,
                color: markerColorFor(driverVehicle.id),
                fillColor: markerColorFor(driverVehicle.id),
                fillOpacity: 0.9,
                weight: 2,
            }
        );

        marker.bindPopup(
            `<b>${driverVehicle.driver?.nickname || "Driver"}</b><br/>${driverVehicle.vehicle_number || "Vehicle"}`
        );

        marker.on("click", () => {
            assignForm.value.driver_vehicle_id = driverVehicle.id;
            refreshDriverMarkers();
        });

        marker.addTo(markerLayer.value);
        bounds.push([driverVehicle.__latitude, driverVehicle.__longitude]);
    });

    if (bounds.length === 1) {
        mapInstance.value.setView(bounds[0], 13);
    } else if (bounds.length > 1) {
        mapInstance.value.fitBounds(bounds, { padding: [24, 24] });
    }

    mapInstance.value.invalidateSize();
}

async function renderDriverMap() {
    await nextTick();

    if (!driversWithCoordinates.value.length) return;

    ensureDriverMap();
    refreshDriverMarkers();
}

async function loadGroupedShipments() {
    const res = await fetchShipmentList({ status: "pending" });
    shipmentDropdown.value = res || [];
}

function openAssignModal() {
    loadGroupedShipments();
    assignModal.value.show();
    renderDriverMap();
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
    selectedShipmentImage.value = row?.proof_image_url || "";
    selectedShipmentGroups.value = row.shipment?.shipment_packages || [];
    detailModal.value.show();
}

watch(
    () => assignForm.value.driver_vehicle_id,
    () => {
        refreshDriverMarkers();
    }
);

onBeforeUnmount(() => {
    if (mapInstance.value) {
        mapInstance.value.remove();
        mapInstance.value = null;
        markerLayer.value = null;
    }
});

</script>

<style scoped>
.driver-assign-map {
    width: 100%;
    min-height: 320px;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    overflow: hidden;
}
</style>
