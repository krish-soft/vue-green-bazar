<template>
  <BaseContainer heading="India States Management">
    <template #headerActions>
      <BaseButton variant="primary" icon="fas fa-plus" @click="openAdd">
        Add State
      </BaseButton>
    </template>

    <template #body>
      <table id="datatable" class="table table-hover table-striped table-bordered align-middle">
        <thead class="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>ISO Code</th>
            <th>Language</th>
            <th>Type</th>
            <th>Country</th>
            <th>Status</th>
            <th class="text-center">Action</th>
          </tr>
        </thead>

        <tbody v-if="mListData.length">
          <tr v-for="(row, i) in mListData" :key="row.id">
            <td>{{ i + 1 }}</td>
            <td>{{ row.name }}</td>
            <td>{{ row.iso_code }}</td>
            <td>{{ row.language }}</td>
            <td>{{ row.type }}</td>
            <td>{{ row.country_iso_code }}</td>
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
  <BaseModal ref="aModal" icon="fas fa-flag">
    <template #title>
      {{ isEdit ? "Edit Unit" : "Add Unit" }}
    </template>


    <div class="mb-3">
      <BaseInput label="Name" v-model="form.name" placeholder="Enter state name" required />
    </div>

    <div class="mb-3">
      <BaseInput label="ISO Code" v-model="form.iso_code" placeholder="Enter state ISO code" required
        :disabled="isEdit" />
    </div>

    <div class="mb-3">
      <BaseInput label="Language" v-model="form.language" placeholder="Enter state language" />
    </div>

    <div class="mb-3">
      <BaseInput label="Type" v-model="form.type" placeholder="Enter state type" readonly required />
    </div>

    <div class="border rounded-3 p-3 bg-light">
      <label class="form-label fw-semibold mb-2">Union Territory</label>

      <div class="d-flex align-items-center justify-content-between">
        <span class="text-muted">
          State is
          <b :class="form.is_ut ? 'text-warning' : 'text-success'">
            {{ form.is_ut ? "Union Territory" : "Not Union Territory" }}
          </b>
        </span>

        <!-- TOGGLE -->
        <div class="status-toggle" :class="{ active: form.is_ut }" @click="form.is_ut = !form.is_ut">
          <span class="toggle-knob"></span>
        </div>
      </div>
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
import { ref, onMounted, watch } from "vue";

import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import BaseModal from "@/components/common/modal/BaseModal.vue";
import BaseAutoCompleteSelect from "@/components/common/inputs/BaseAutoCompleteSelect.vue";
import BaseInput from "@/components/common/inputs/BaseInput.vue";

import { useUIStore } from "@/core/utils/stores/uiStore";
import { showConfirmDialog } from "@/core/utils/uiHelpers/swalUtils.js";

import {
  fetchStates,
  createState,
  updateState,
  deleteState,
} from "@/core/repos/admin/master/masterRepos";

/* ---------------- STATE ---------------- */
const uiStore = useUIStore();
const mListData = ref([]);
const stateList = ref([]);

const aModal = ref(null);
const isEdit = ref(false);

const form = ref({
  id: null,
  name: "",
  iso_code: "",
  language: "",
  type: "ST",
  country_iso_code: "",
  is_ut: false,
  is_active: true,
});

function resetForm() {
  form.value = {
    id: null,
    name: "",
    iso_code: "",
    language: "",
    type: "ST",
    country_iso_code: "",
    is_ut: false,
    is_active: true,
  };
}

// Watch on ut if on then its type is UT otherwise ST

watch(
  () => form.value.is_ut,
  (newVal) => {
    form.value.type = newVal ? "UT" : "ST";
  },
  { immediate: true }
);

/* ---------------- INIT ---------------- */
onMounted(loadList);

/* ---------------- LIST ---------------- */
async function loadList() {
  mListData.value = await fetchStates();   // ✅ NO CHECK
}

/* ---------------- MODAL ---------------- */
async function openAdd() {
  isEdit.value = false;

  resetForm();
  aModal.value.show();
}

async function openEdit(row) {
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
    ? updateState(form.value.id, form.value)
    : createState(form.value));

  closeModal();
  mListData.value = [];
  loadList();    // ✅ ALWAYS SAFE
}

/* ---------------- DELETE ---------------- */
async function deleteAction(id) {
  const confirmed = await showConfirmDialog(
    "Delete State",
    "Are you sure you want to delete this state?"
  );

  if (!confirmed) return;

  await deleteState(id);
  mListData.value = [];

  loadList();    // ✅ ALWAYS SAFE
}
</script>
