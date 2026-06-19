<template>
  <BaseContainer heading="Active Drivers Map">
    <template #headerActions>
      <BaseButton variant="primary" icon="fas fa-rotate" @click="loadDrivers">
        Refresh
      </BaseButton>
    </template>

    <template #body>
      <div class="row g-2 mb-3">
        <div class="col-md-8">
          <BaseInput
            v-model="driverQuery"
            placeholder="Find specific driver (code, nickname, vehicle)"
          />
        </div>
        <div class="col-md-4 d-flex align-items-end">
          <BaseButton variant="secondary" icon="fas fa-xmark" @click="clearFilter">
            Clear Filter
          </BaseButton>
        </div>
      </div>

      <div v-if="filteredActiveDrivers.length === 0" class="alert alert-warning mb-3">
        No active driver location found.
      </div>

      <div v-else ref="mapEl" class="driver-map mb-3"></div>

      <div class="table-responsive">
        <table class="table table-bordered table-sm align-middle">
          <thead class="table-dark">
            <tr>
              <th>#</th>
              <th>Driver</th>
              <th>Driver Code</th>
              <th>Vehicle</th>
              <th>Latitude</th>
              <th>Longitude</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in filteredActiveDrivers" :key="row.id">
              <td>{{ i + 1 }}</td>
              <td>{{ row.driver?.nickname || '-' }}</td>
              <td>{{ row.driver?.user_code || '-' }}</td>
              <td>{{ row.vehicle_number || '-' }}</td>
              <td>{{ row.__latitude }}</td>
              <td>{{ row.__longitude }}</td>
            </tr>
          </tbody>
        </table>
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
import { fetchDriverList } from "@/core/repos/admin/common/shippingRepos";

const mapEl = ref(null);
const mapInstance = ref(null);
const markerLayer = ref(null);
const driverRows = ref([]);
const driverQuery = ref("");

function parseCoordinate(value) {
  if (value === null || value === undefined || value === "") return null;

  const parsed = Number.parseFloat(value);
  if (!Number.isFinite(parsed)) return null;

  return parsed;
}

const activeDrivers = computed(() =>
  (driverRows.value || [])
    .map((d) => ({
      ...d,
      __latitude:
        parseCoordinate(d?.driver?.driver_location?.latitude) ??
        parseCoordinate(d?.driver?.driverLocation?.latitude) ??
        parseCoordinate(d?.last_latitude),
      __longitude:
        parseCoordinate(d?.driver?.driver_location?.longitude) ??
        parseCoordinate(d?.driver?.driverLocation?.longitude) ??
        parseCoordinate(d?.last_longitude),
    }))
    .filter((d) => Number.isFinite(d.__latitude) && Number.isFinite(d.__longitude))
);

const filteredActiveDrivers = computed(() => {
  const query = (driverQuery.value || "").trim().toLowerCase();
  if (!query) return activeDrivers.value;

  return activeDrivers.value.filter((row) => {
    const nickname = (row.driver?.nickname || "").toLowerCase();
    const userCode = (row.driver?.user_code || "").toLowerCase();
    const vehicle = (row.vehicle_number || "").toLowerCase();

    return (
      nickname.includes(query) ||
      userCode.includes(query) ||
      vehicle.includes(query)
    );
  });
});

function clearFilter() {
  driverQuery.value = "";
}

function ensureMap() {
  if (!mapEl.value || mapInstance.value) return;
  const first = filteredActiveDrivers.value[0];
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

  filteredActiveDrivers.value.forEach((row) => {
    const marker = L.circleMarker([row.__latitude, row.__longitude], {
      radius: 9,
      color: "#198754",
      fillColor: "#198754",
      fillOpacity: 0.9,
      weight: 2,
    });

    marker.bindPopup(
      `<b>${row.driver?.nickname || "Driver"}</b><br/>${row.driver?.user_code || "-"}<br/>${row.vehicle_number || "-"}`
    );

    marker.addTo(markerLayer.value);
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
  if (!filteredActiveDrivers.value.length) {
    if (markerLayer.value) {
      markerLayer.value.clearLayers();
    }
    return;
  }

  ensureMap();
  renderMarkers();
}

async function loadDrivers() {
  const res = await fetchDriverList();
  driverRows.value = res || [];
  await renderMap();
}

onMounted(loadDrivers);

watch(filteredActiveDrivers, () => {
  renderMap();
});

onBeforeUnmount(() => {
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
  min-height: 360px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  overflow: hidden;
}
</style>
