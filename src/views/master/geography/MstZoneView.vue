<template>
  <BaseContainer heading="Zone Management">
    <template #headerActions>
      <BaseButton variant="primary" icon="fas fa-plus" @click="openAdd">
        Add Zone
      </BaseButton>
    </template>

    <template #body>
      <table id="datatable" class="table table-hover table-striped table-bordered align-middle">
        <thead class="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Code</th>
            <th>State</th>
            <th>Status</th>
            <th class="text-center">Action</th>
          </tr>
        </thead>

        <tbody v-if="mListData.length">
          <tr v-for="(row, i) in mListData" :key="row.id">
            <td>{{ i + 1 }}</td>
            <td>{{ row.name }}</td>
            <td>{{ row.code }}</td>
            <td>{{ row?.state?.name }} ({{ row?.state?.iso_code }})</td>
            <td>
              <span class="badge px-3" :class="row.is_active ? 'bg-success' : 'bg-danger'">
                {{ row.is_active ? "Active" : "Inactive" }}
              </span>
            </td>
            <td class="text-center">
              <BaseButton iconOnly variant="primary me-2" icon="fas fa-edit" @click="openEdit(row)" />
              <BaseButton iconOnly variant="danger" icon="fas fa-trash" @click="deleteAction(row.id)" />
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

    <BaseAutoCompleteSelect label="State" v-model="form.state_id" :options="stateList" :label-key="['name', 'iso_code']"
      :value-key="'id'" placeholder="Select State" required :disabled="isEdit" />

    <div class="mb-3">
      <BaseInput v-model="form.name" placeholder="Enter zone name" required />
    </div>

    <div class="mb-3">
      <BaseInput v-model="form.code" placeholder="Enter zone code" required :disabled="isEdit" />

    </div>

    <div class="border rounded-3 p-3 bg-light">
      <label class="form-label fw-semibold mb-2">Status</label>

      <div class="d-flex align-items-center justify-content-between">
        <span class="text-muted">
          Zone is
          <b :class="form.is_active ? 'text-success' : 'text-danger'">
            {{ form.is_active ? "Active" : "Inactive" }}
          </b>
        </span>

        <!-- TOGGLE -->
        <div class="status-toggle" :class="{ active: form.is_active }" @click="form.is_active = !form.is_active">
          <span class="toggle-knob"></span>
        </div>
      </div>
    </div>


    <template #footer>
      <BaseButton variant="secondary" @click="closeModal">
        Cancel
      </BaseButton>
      <BaseButton variant="primary" :loading="uiStore.isLoading" @click="submitForm">
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
import BaseAutoCompleteSelect from "@/components/common/inputs/BaseAutoCompleteSelect.vue";
import BaseInput from "@/components/common/inputs/BaseInput.vue";

import { useUIStore } from "@/core/utils/stores/uiStore";
import { showConfirmDialog } from "@/core/utils/uiHelpers/swalUtils.js";

import {
  fetchZones,
  createZone,
  updateZone,
  deleteZone,

  // 
  fetchStates,
} from "@/core/repos/admin/master/masterRepos";

/* ---------------- STATE ---------------- */
const uiStore = useUIStore();
const mListData = ref([]);
const stateList = ref([]);

const unitModal = ref(null);
const isEdit = ref(false);

const form = ref({
  id: null,
  name: "",
  code: "",
  state_id: "",
  is_active: true,
});

function resetForm() {
  form.value = {
    id: null,
    name: "",
    code: "",
    state_id: "",
    is_active: true,
  };
}


/* ---------------- INIT ---------------- */
onMounted(loadList);

/* ---------------- LIST ---------------- */
async function loadList() {
  mListData.value = await fetchZones();   // ✅ NO CHECK
}

async function loadStates() {
  stateList.value = await fetchStates({ is_active: true });   // ✅ NO CHECK
}


/* ---------------- MODAL ---------------- */
async function openAdd() {
  isEdit.value = false;
  await loadStates();
  resetForm();
  unitModal.value.show();
}

async function openEdit(row) {
  isEdit.value = true;
  await loadStates();
  form.value = { ...row };
  unitModal.value.show();
}

function closeModal() {
  unitModal.value.hide();
  resetForm();
}


/* ---------------- SAVE ---------------- */
async function submitForm() {
  await (isEdit.value
    ? updateZone(form.value.id, form.value)
    : createZone(form.value));

  closeModal();
  mListData.value = [];
  loadList();    // ✅ ALWAYS SAFE
}

/* ---------------- DELETE ---------------- */
async function deleteAction(id) {
  const confirmed = await showConfirmDialog(
    "Delete Zone",
    "Are you sure you want to delete this zone?"
  );

  if (!confirmed) return;

  await deleteZone(id);
  mListData.value = [];

  loadList();    // ✅ ALWAYS SAFE
}
</script>
