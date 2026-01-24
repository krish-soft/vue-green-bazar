<template>
  <BaseContainer heading="Financial Year Management">
    <template #headerActions>
      <BaseButton variant="primary" icon="fas fa-plus" @click="openAdd">
        Add Financial Year
      </BaseButton>
    </template>

    <template #body>
      <table id="datatable" class="table table-hover table-striped table-bordered align-middle">
        <thead class="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Code</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th class="text-center">Action</th>
          </tr>
        </thead>

        <tbody v-if="mListData.length">
          <tr v-for="(row, i) in mListData" :key="row.id">
            <td>{{ i + 1 }}</td>
            <td>{{ row.name }}</td>
            <td>{{ row.code }}</td>
            <td>{{ row.start_date }}</td>
            <td>{{ row.end_date }}</td>
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
  <BaseModal ref="aModal" icon="fas fa-ruler-combined">
    <template #title>
      {{ isEdit ? "Edit Financial Year" : "Add Financial Year" }}
    </template>

    <div class="mb-3">
      <BaseInput label="Name" v-model.trim="form.name" placeholder="Enter Financial Year Name" required />
    </div>

    <div class="mb-3">
      <BaseInput label="Code" v-model.trim="form.code" placeholder="Enter Financial Year Code" required
        :disabled="isEdit" />
    </div>
    <div class="mb-3">
      <BaseInput label="Start Date" type="date" v-model="form.start_date" placeholder="Select Start Date" required />
    </div>

    <div class="mb-3">
      <BaseInput label="End Date" type="date" v-model="form.end_date" placeholder="Select End Date" required />
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
import BaseInput from "@/components/common/inputs/BaseInput.vue";

import { useUIStore } from "@/core/utils/stores/uiStore";
import { showConfirmDialog } from "@/core/utils/uiHelpers/swalUtils.js";

import {
  fetchFinancialYears,
  createFinancialYear,
  updateFinancialYear,
  deleteFinancialYear,
} from "@/core/repos/admin/master/masterRepos";

/* ---------------- STATE ---------------- */
const uiStore = useUIStore();
const mListData = ref([]);

const aModal = ref(null);
const isEdit = ref(false);

const form = ref({
  id: null,
  name: "",
  code: "",
  start_date: "",
  end_date: "",
  is_active: true,
});

function resetForm() {
  form.value = {
    id: null,
    name: "",
    code: "",
    start_date: "",
    end_date: "",
    is_active: true,
  };
}


/* ---------------- INIT ---------------- */
onMounted(loadList);

/* ---------------- LIST ---------------- */
async function loadList() {
  mListData.value = await fetchFinancialYears();   // ✅ NO CHECK
}

/* ---------------- MODAL ---------------- */
function openAdd() {
  isEdit.value = false;
  resetForm();
  aModal.value.show();
}

function openEdit(row) {
  isEdit.value = true;
  form.value = { ...row };
  aModal.value.show();
}

function closeModal() {
  aModal.value.hide();
  resetForm();
}


/* ---------------- SAVE ---------------- */
async function submitForm() {
  await (isEdit.value
    ? updateFinancialYear(form.value.id, form.value)
    : createFinancialYear(form.value));

  closeModal();
  mListData.value = [];
  loadList();    // ✅ ALWAYS SAFE
}

/* ---------------- DELETE ---------------- */
async function deleteAction(id) {
  const confirmed = await showConfirmDialog(
    "Delete Financial Year",
    "Are you sure you want to delete this financial year?"
  );

  if (!confirmed) return;

  await deleteFinancialYear(id);
  mListData.value = [];

  loadList();    // ✅ ALWAYS SAFE
}
</script>
