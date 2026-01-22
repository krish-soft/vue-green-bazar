<template>
  <BaseContainer heading="Unit Management">
    <template #headerActions>
      <BaseButton
        variant="primary"
        icon="fas fa-plus"
        @click="openAdd"
      >
        Add Unit
      </BaseButton>
    </template>

    <template #body>
      <table
        id="datatable"
        class="table table-hover table-striped table-bordered align-middle"
      >
        <thead class="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Unit</th>
            <th>Status</th>
            <th class="text-center">Action</th>
          </tr>
        </thead>

        <tbody v-if="mListData.length">
          <tr v-for="(row, i) in mListData" :key="row.id">
            <td>{{ i + 1 }}</td>
            <td>{{ row.name }}</td>
            <td>{{ row.unit }}</td>
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
    </template>
  </BaseContainer>

  <!-- ADD / EDIT MODAL -->
  <BaseModal ref="unitModal" icon="fas fa-ruler-combined">
    <template #title>
      {{ isEdit ? "Edit Unit" : "Add Unit" }}
    </template>

    <div class="mb-3">
      <label class="form-label">Name</label>
      <input
        class="form-control"
        v-model.trim="form.name"
        placeholder="Enter unit name"
        required
      />
    </div>

    <div class="mb-3">
      <label class="form-label">Unit</label>
      <input
        class="form-control"
        v-model.trim="form.unit"
        placeholder="Eg: KG, PCS"
         :disabled="isEdit"
      />
    </div>

       <div class="border rounded-3 p-3 bg-light">
  <label class="form-label fw-semibold mb-2">Status</label>

  <div class="d-flex align-items-center justify-content-between">
    <span class="text-muted">
      Unit is
      <b :class="form.is_active ? 'text-success' : 'text-danger'">
        {{ form.is_active ? "Active" : "Inactive" }}
      </b>
    </span>

    <!-- TOGGLE -->
    <div
      class="status-toggle"
      :class="{ active: form.is_active }"
      @click="form.is_active = !form.is_active"
    >
      <span class="toggle-knob"></span>
    </div>
  </div>
</div>
<!-- 
   <div class="border rounded-3 p-3 bg-light">
  <label class="form-label fw-semibold mb-2">Status</label>

  <div class="d-flex align-items-center justify-content-between">
    <span class="text-muted">
     Unit is <b>{{ form.is_active ? "active" : "inactive" }}</b>
    </span>

    <button
      type="button"
      class="btn"
      :class="form.is_active ? 'btn-outline-success' : 'btn-outline-danger'"
      @click="form.is_active = !form.is_active"
    >
      <i
        class="fas"
        :class="form.is_active ? 'fa-check-circle' : 'fa-ban'"
      ></i>
      {{ form.is_active ? "Active" : "Inactive" }}
    </button>
  </div>
</div> -->


    <template #footer>
      <BaseButton variant="secondary" @click="closeModal">
        Cancel
      </BaseButton>
      <BaseButton
        variant="primary"
        :loading="uiStore.isLoading"
        @click="submitForm"
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

/* ---------------- STATE ---------------- */
const uiStore = useUIStore();
const mListData = ref([]);

const unitModal = ref(null);
const isEdit = ref(false);

const form = ref({
  id: null,
  name: "",
  unit: "",
  is_active: true,
});

/* ---------------- INIT ---------------- */
onMounted(loadList);

/* ---------------- API ---------------- */
async function loadList() {
  uiStore.isLoading = true;
  const resp = await apiRouteService.getMstUnitList();
  if (resp?.isSuccess) mListData.value = resp.data;
  uiStore.isLoading = false;
}

/* ---------------- MODAL ---------------- */
function openAdd() {
  isEdit.value = false;
  resetForm();
  unitModal.value.show();
}

function openEdit(row) {
  isEdit.value = true;
  form.value = { ...row };
  unitModal.value.show();
}

function closeModal() {
  unitModal.value.hide();
  resetForm();
}

function resetForm() {
  form.value = {
    id: null,
    name: "",
    unit: "",
    is_active: true,
  };
}

/* ---------------- SAVE ---------------- */
async function submitForm() {
  uiStore.isLoading = true;

  const resp = isEdit.value
    ? await apiRouteService.updateMstUnit(form.value.id, form.value)
    : await apiRouteService.createMstUnit(form.value);

  uiStore.isLoading = false;

  if (resp?.isSuccess) {
    uiStore.successMessage = resp.message;
    closeModal();
      mListData.value = []; // Clear the list to force reload
    loadList();
  } else {
    uiStore.errorMessages = [resp?.message];
  }
}

/* ---------------- DELETE ---------------- */
async function deleteUnit(id) {
  const confirmed = await showConfirmDialog(
    "Delete Unit",
    "Are you sure you want to delete this unit?"
  );

  if (!confirmed) return;

  uiStore.isLoading = true;
  const resp = await apiRouteService.deleteMstUnit(id);
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
