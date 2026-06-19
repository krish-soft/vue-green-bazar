<template>
  <BaseContainer heading="Active Delivery Tracking">
    <template #headerActions>
      <BaseButton variant="primary" icon="fas fa-rotate" @click="loadTrackData">
        Refresh
      </BaseButton>
    </template>

    <template #body>
      <div class="row mb-3 g-2">
        <div class="col-lg-2 col-md-3">
          <BaseInput v-model="filters.start_date" type="date" />
        </div>
        <div class="col-lg-2 col-md-3">
          <BaseInput v-model="filters.end_date" type="date" />
        </div>
        <div class="col-lg-3 col-md-6">
          <BaseInput v-model="filters.shipment_number" placeholder="Shipment Number" />
        </div>
        <div class="col-lg-2 col-md-6">
          <select v-model.number="refreshSeconds" class="form-select">
            <option :value="0">Manual Refresh</option>
            <option :value="15">Auto 15s</option>
            <option :value="30">Auto 30s</option>
            <option :value="60">Auto 60s</option>
          </select>
        </div>
        <div class="col-lg-3 col-md-12">
          <BaseButton variant="primary" icon="fas fa-search" @click="loadTrackData">
            Load
          </BaseButton>
        </div>
      </div>

      <div class="tracking-summary mb-3">
        <div class="summary-item">
          <div class="summary-label">Active Deliveries</div>
          <div class="summary-value">{{ trackRows.length }}</div>
        </div>

        <div class="summary-item">
          <div class="summary-label">Tracked Drivers</div>
          <div class="summary-value">{{ uniqueDriverCount }}</div>
        </div>

        <div class="summary-item">
          <div class="summary-label">Last Sync</div>
          <div class="summary-value">{{ formatDateTime(lastSyncAt) }}</div>
        </div>

        <div class="summary-item">
          <div class="summary-label">Refresh Mode</div>
          <div class="summary-value">{{ refreshLabel }}</div>
        </div>
      </div>

      <div v-if="trackRows.length === 0" class="alert alert-warning mb-3">
        No active delivery location found.
      </div>

      <div v-else>
        <div ref="mapEl" class="driver-map mb-2"></div>

        <div class="map-legend">
          <span class="legend-item"><span class="legend-dot dot-requested"></span>Requested</span>
          <span class="legend-item"><span class="legend-dot dot-accepted"></span>Accepted</span>
          <span class="legend-item"><span class="legend-dot dot-started"></span>In Transit</span>
          <span class="legend-item"><span class="legend-dot dot-default"></span>Other Active</span>
        </div>
      </div>
    </template>
  </BaseContainer>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import BaseInput from "@/components/common/inputs/BaseInput.vue";
import { fetchDriverShipmentList } from "@/core/repos/admin/common/shippingRepos";

const mapEl = ref(null);
const mapInstance = ref(null);
const markerLayer = ref(null);
const deliveryRows = ref([]);
const refreshSeconds = ref(30);
const refreshInterval = ref(null);
const lastSyncAt = ref(null);

const today = new Date();
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);

const formatDate = (d) => d.toISOString().slice(0, 10);

const filters = ref({
  start_date: formatDate(yesterday),
  end_date: formatDate(today),
  shipment_number: null,
});

function parseCoordinate(value) {
  if (value === null || value === undefined || value === "") return null;

  const parsed = Number.parseFloat(value);
  if (!Number.isFinite(parsed)) return null;

  return parsed;
}

const trackRows = computed(() =>
  (deliveryRows.value || [])
    .filter((row) => !["completed", "cancelled", "rejected"].includes((row?.status || "").toLowerCase()))
    .map((row) => ({
      ...row,
      __latitude:
        parseCoordinate(row?.driver?.driver_location?.latitude) ??
        parseCoordinate(row?.driver?.driverLocation?.latitude) ??
        parseCoordinate(row?.driver_vehicle?.last_latitude) ??
        parseCoordinate(row?.driverVehicle?.last_latitude),
      __longitude:
        parseCoordinate(row?.driver?.driver_location?.longitude) ??
        parseCoordinate(row?.driver?.driverLocation?.longitude) ??
        parseCoordinate(row?.driver_vehicle?.last_longitude) ??
        parseCoordinate(row?.driverVehicle?.last_longitude),
    }))
    .filter((row) => Number.isFinite(row.__latitude) && Number.isFinite(row.__longitude))
);

const uniqueDriverCount = computed(() => {
  const ids = new Set((trackRows.value || []).map((row) => row.driver_id).filter(Boolean));
  return ids.size;
});

const refreshLabel = computed(() => {
  if (!refreshSeconds.value) return "Manual";
  return `Auto (${refreshSeconds.value}s)`;
});

function formatDateTime(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString();
}

function statusToColor(status) {
  const normalized = (status || "").toLowerCase();
  if (normalized === "requested") return "#f59f00";
  if (normalized === "accepted") return "#0d6efd";
  if (normalized === "started") return "#198754";
  return "#6c757d";
}

function escapeHtml(value) {
  return String(value ?? "-")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function locationUpdatedAt(row) {
  return (
    row?.driver?.driver_location?.updated_at ||
    row?.driver?.driverLocation?.updated_at ||
    row?.updated_at ||
    row?.assigned_at ||
    null
  );
}

function ensureMap() {
  if (!mapEl.value || mapInstance.value) return;
  const first = trackRows.value[0];
  if (!first) return;

  mapInstance.value = L.map(mapEl.value).setView([first.__latitude, first.__longitude], 11);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(mapInstance.value);

  markerLayer.value = L.layerGroup().addTo(mapInstance.value);
}

function renderMarkers() {
  if (!mapInstance.value || !markerLayer.value) return;

  markerLayer.value.clearLayers();
  const bounds = [];

  trackRows.value.forEach((row) => {
    const color = statusToColor(row?.status);
    const flagHtml = `<div class="driver-flag" style="--flag-color:${color}"><i class="fas fa-location-dot"></i></div>`;
    const marker = L.circleMarker([row.__latitude, row.__longitude], {
      radius: 9,
      color,
      fillColor: color,
      fillOpacity: 0.55,
      weight: 2,
    });

    const flagMarker = L.marker([row.__latitude, row.__longitude], {
      icon: L.divIcon({
        className: "driver-flag-wrapper",
        html: flagHtml,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      }),
    });

    marker.bindPopup(
      `<div class="popup-card">` +
      `<div class="popup-title">${escapeHtml(row.driver?.nickname || "Driver")}</div>` +
      `<div><b>Driver Code:</b> ${escapeHtml(row.driver?.user_code || "-")}</div>` +
      `<div><b>Shipment:</b> ${escapeHtml(row.shipment?.shipment_number || "-")}</div>` +
      `<div><b>Type:</b> ${escapeHtml(row.shipment?.shipment_type || "-")}</div>` +
      `<div><b>Vehicle:</b> ${escapeHtml(row.driver_vehicle?.vehicle_number || row.driverVehicle?.vehicle_number || "-")}</div>` +
      `<div><b>Status:</b> <span class="popup-status">${escapeHtml(row.status || "-")}</span></div>` +
      `<div><b>Last Location:</b> ${escapeHtml(row.__latitude)}, ${escapeHtml(row.__longitude)}</div>` +
      `<div><b>Updated:</b> ${escapeHtml(formatDateTime(locationUpdatedAt(row)))}</div>` +
      `</div>`
    );

    flagMarker.bindPopup(marker.getPopup());

    marker.addTo(markerLayer.value);
    flagMarker.addTo(markerLayer.value);
    bounds.push([row.__latitude, row.__longitude]);
  });

  if (bounds.length === 1) {
    mapInstance.value.setView(bounds[0], 13);
  } else if (bounds.length > 1) {
    mapInstance.value.fitBounds(bounds, { padding: [24, 24] });
  }

  mapInstance.value.invalidateSize();
}

async function renderMap() {
  await nextTick();
  if (!trackRows.value.length) {
    if (markerLayer.value) {
      markerLayer.value.clearLayers();
    }
    return;
  }

  ensureMap();
  renderMarkers();
}

async function loadTrackData() {
  const res = await fetchDriverShipmentList(filters.value);
  deliveryRows.value = res || [];
  lastSyncAt.value = new Date().toISOString();
  await renderMap();
}

function resetAutoRefresh() {
  if (refreshInterval.value) {
    clearInterval(refreshInterval.value);
    refreshInterval.value = null;
  }

  if (!refreshSeconds.value) return;

  refreshInterval.value = setInterval(() => {
    loadTrackData();
  }, refreshSeconds.value * 1000);
}

onMounted(loadTrackData);

watch(refreshSeconds, () => {
  resetAutoRefresh();
});

watch(trackRows, () => {
  renderMap();
});

onMounted(() => {
  resetAutoRefresh();
});

onBeforeUnmount(() => {
  if (refreshInterval.value) {
    clearInterval(refreshInterval.value);
    refreshInterval.value = null;
  }

  if (mapInstance.value) {
    mapInstance.value.remove();
    mapInstance.value = null;
    markerLayer.value = null;
  }
});
</script>

<style scoped>
.driver-map {
  width: 100%;
  min-height: 68vh;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  overflow: hidden;
}

.tracking-summary {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.summary-item {
  border: 1px solid #e9ecef;
  border-radius: 10px;
  padding: 10px 12px;
  background: #f8f9fa;
}

.summary-label {
  font-size: 12px;
  color: #6c757d;
}

.summary-value {
  font-size: 16px;
  font-weight: 700;
  color: #212529;
}

.map-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 10px 12px;
  background: #fff;
}

.legend-item {
  font-size: 13px;
  color: #495057;
}

.legend-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 6px;
}

.dot-requested {
  background: #f59f00;
}

.dot-accepted {
  background: #0d6efd;
}

.dot-started {
  background: #198754;
}

.dot-default {
  background: #6c757d;
}

:deep(.driver-flag-wrapper) {
  background: transparent;
  border: 0;
}

:deep(.driver-flag) {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  color: var(--flag-color);
  border: 2px solid var(--flag-color);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.22);
  font-size: 11px;
}

:deep(.popup-card) {
  min-width: 220px;
}

:deep(.popup-title) {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 4px;
}

:deep(.popup-status) {
  text-transform: capitalize;
  font-weight: 700;
}

@media (max-width: 991px) {
  .tracking-summary {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .driver-map {
    min-height: 58vh;
  }
}

@media (max-width: 575px) {
  .tracking-summary {
    grid-template-columns: 1fr;
  }

  .driver-map {
    min-height: 52vh;
  }
}
</style>
