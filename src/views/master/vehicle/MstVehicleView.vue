<template>
  <BaseContainer heading="Vehicle Management">
    <template #headerActions>
      <BaseButton variant="primary" icon="fas fa-plus" @click="openAdd">
        Add Vehicle
      </BaseButton>
    </template>

    <template #body>
      <div class="table-responsive">
        <table
          id="datatable"
          class="table table-hover table-striped table-bordered align-middle"
        >
          <thead class="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Code</th>
              <th>Description</th>
              <th>Body</th>
              <th>Fuel</th>
              <th>Capacity Class</th>
              <th>Max. Weight (kg)</th>
              <th>Max. Volume (cft)</th>
              <th>Max. Crates</th>
              <th>Notes</th>

              <th>Status</th>
              <th class="text-center">Action</th>
            </tr>
          </thead>

          <tbody v-if="mListData.length">
            <tr v-for="(row, i) in mListData" :key="row.id">
              <td>{{ i + 1 }}</td>
              <td>{{ row.vehicle_name }}</td>
              <td>{{ row.vehicle_code }}</td>
              <td>{{ row.description }}</td>
              <td>{{ row.body_type }}</td>
              <td>{{ row.fuel_type }}</td>
              <td>{{ row.capacity_class }}</td>
              <td>{{ row.max_weight_kg }}</td>
              <td>{{ row.max_volume_cft }}</td>
              <td>{{ row.max_crates }}</td>
              <td>{{ row.notes }}</td>
              <td>
                <span
                  class="badge px-3"
                  :class="row.is_active ? 'bg-success' : 'bg-danger'"
                >
                  {{ row.is_active ? "Active" : "Inactive" }}
                </span>
              </td>
              <td class="text-center">
                <BaseButton
                  iconOnly
                  variant="primary me-2"
                  icon="fas fa-edit"
                  @click="openEdit(row)"
                />
                <BaseButton
                  iconOnly
                  variant="danger"
                  icon="fas fa-trash"
                  @click="deleteUnit(row.id)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </BaseContainer>

  <!-- ADD / EDIT MODAL -->
  <BaseModal ref="vehicleModal" size="modal-lg" icon="fas fa-truck">
    <!-- TITLE -->
    <template #title>
      {{ isEdit ? "Edit Vehicle" : "Add Vehicle" }}
    </template>

    <!-- BODY -->
    <form id="vehicleForm" @submit.prevent="submitForm">
      <div class="row">
        <div class="col-md-6">
          <BaseInput
            label="Vehicle Name"
            v-model="form.vehicle_name"
            placeholder="Enter vehicle name"
            required
          />
        </div>
        <div class="col-md-6">
          <BaseInput
            label="Vehicle Code"
            v-model="form.vehicle_code"
            placeholder="Enter vehicle code"
            required
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <BaseInput
            label="Body Type"
            v-model="form.body_type"
            placeholder="Enter body type"
            required
          />
        </div>
        <div class="col-md-6">
          <BaseInput
            label="Fuel Type"
            v-model="form.fuel_type"
            placeholder="Enter fuel type"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <BaseInput
            label="Capacity Class"
            v-model="form.capacity_class"
            placeholder="Enter capacity class"
            required
          />
        </div>
        <div class="col-md-6">
          <BaseInput
            label="Max. Weight (kg)"
            type="number"
            step="0.5"
            v-model="form.max_weight_kg"
            placeholder="Enter maximum weight in kg"
            required
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <BaseInput
            label="Max. Volume (cft)"
            type="number"
            step="0.5"
            v-model="form.max_volume_cft"
            placeholder="Enter maximum volume in cft"
            required
          />
        </div>
        <div class="col-md-6">
          <BaseInput
            label="Max. Crates"
            type="number"
            v-model="form.max_crates"
            placeholder="Enter maximum number of crates"
            required
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <BaseInput
            label="Description"
            type="textarea"
            v-model="form.description"
            placeholder="Enter vehicle description"
            rows="3"
            required
          />
        </div>
        <div class="col-md-6">
          <div class="border rounded-3 p-3 bg-light mt-4">
            <label class="form-label fw-semibold mb-2">Status</label>

            <div class="d-flex align-items-center justify-content-between">
              <span class="text-muted">
                Vehicle is
                <b :class="form.is_active ? 'text-success' : 'text-danger'">
                  {{ form.is_active ? "Active" : "Inactive" }}
                </b>
              </span>

              <div
                class="status-toggle"
                :class="{ active: form.is_active }"
                @click="form.is_active = !form.is_active"
              >
                <span class="toggle-knob"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>

    <!-- FOOTER (DIRECT CHILD – DO NOT MOVE) -->
    <template #footer>
      <BaseButton type="button" variant="secondary" @click="closeModal">
        Cancel
      </BaseButton>

      <BaseButton
        type="submit"
        variant="primary"
        :loading="uiStore.isLoading"
        form="vehicleForm"
      >
        Save
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, onMounted } from "vue";

import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import BaseModal from "@/components/common/modal/BaseModal.vue";

import apiRouteService from "@/core/services/apiRoutes/apiRouteService.js";
import { useUIStore } from "@/core/utils/stores/uiStore";
import { showConfirmDialog } from "@/core/utils/uiHelpers/swalUtils.js";
import BaseInput from "@/components/common/inputs/BaseInput.vue";

/* ---------------- STATE ---------------- */
const uiStore = useUIStore();
const mListData = ref([]);

const vehicleModal = ref(null);
const isEdit = ref(false);

const form = ref({
  id: null,

  // form fields user input
  vehicle_name: "",
  vehicle_code: "", // coming from backend

  description: "",
  body_type: "",
  fuel_type: "",
  capacity_class: "",
  max_weight_kg: "",
  max_volume_cft: "",
  max_crates: "",
  notes: "",
  // Default Values
  is_active: true,
});

function resetForm() {
  form.value = {
    id: null,

    // form fields user input
    vehicle_name: "",
    vehicle_code: "",

    description: "",
    body_type: "",
    fuel_type: "",
    capacity_class: "",
    max_weight_kg: "",
    max_volume_cft: "",
    max_crates: "",
    notes: "",
    // Default Values
    is_active: true,
  };
}

/* ---------------- INIT ---------------- */
onMounted(loadList);

/* ---------------- API ---------------- */
async function loadList() {
  uiStore.isLoading = true;
  const resp = await apiRouteService.getMstVehicleList();
  if (resp?.isSuccess) mListData.value = resp.data;
  uiStore.isLoading = false;
}

/* ---------------- MODAL ---------------- */
function openAdd() {
  isEdit.value = false;
  resetForm();
  vehicleModal.value.show();
}

function openEdit(row) {
  isEdit.value = true;
  form.value = { ...row };
  vehicleModal.value.show();
}

function closeModal() {
  vehicleModal.value.hide();
  resetForm();
}

/* ---------------- SAVE ---------------- */
async function submitForm() {
  // Validation can be added here

  uiStore.isLoading = true;

  const resp = isEdit.value
    ? await apiRouteService.updateMstVehicle(form.value.id, form.value)
    : await apiRouteService.createMstVehicle(form.value);

  uiStore.isLoading = false;

  if (resp?.isSuccess) {
    uiStore.successMessage = resp.message;
    closeModal();
    mListData.value = [];
    loadList();
  } else {
    uiStore.errorMessages = [resp?.message];
  }
}

/* ---------------- DELETE ---------------- */
async function deleteUnit(id) {
  const confirmed = await showConfirmDialog(
    "Delete Vehicle",
    "Are you sure you want to delete this vehicle?",
  );

  if (!confirmed) return;

  uiStore.isLoading = true;
  const resp = await apiRouteService.deleteMstVehicle(id);
  uiStore.isLoading = false;

  if (resp?.isSuccess) {
    uiStore.successMessage = resp.message;
    mListData.value = []; // Clear the list to force reload
    loadList();
  } else {
    uiStore.errorMessages = [resp?.message];
  }
}
</script>
