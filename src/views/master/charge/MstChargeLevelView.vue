<template>
    <BaseContainer heading="Charges Level  Management">
        <template #headerActions>
            <BaseButton variant="primary" icon="fas fa-plus" @click="openAdd">
                Add Charges Level
            </BaseButton>
        </template>

        <template #body>
            <div class="table-responsive">
                <table id="datatable" class="table table-hover table-striped table-bordered align-middle">
                    <thead class="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Description</th>
                            <th>User Role Type</th>
                            <th>Status</th>
                            <th class="text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody v-if="mListData.length">
                        <tr v-for="(row, i) in mListData" :key="row.id">
                            <td>{{ i + 1 }}</td>
                            <td>{{ row.name }}</td>
                            <td>{{ row.code }}</td>
                            <td>{{ row.description }}</td>
                            <td>{{ row.user_role_type }}</td>
                            <td>
                                <span class="badge px-3" :class="row.is_active ? 'bg-success' : 'bg-danger'">
                                    {{ row.is_active ? "Active" : "Inactive" }}
                                </span>
                            </td>
                            <td class="text-center">
                                <BaseButton iconOnly variant="primary me-2" icon="fas fa-edit" @click="openEdit(row)" />
                                <BaseButton iconOnly variant="danger" icon="fas fa-trash"
                                    @click="deleteAction(row.id)" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </template>
    </BaseContainer>

    <!-- ADD / EDIT MODAL -->
    <BaseModal ref="aModal" icon="fas fa-hand-holding-dollar">
        <template #title>
            {{ isEdit ? "Edit Charges Level" : "Add Charges Level" }}
        </template>

        <div class="mb-3">
            <BaseInput label="Name" v-model.trim="form.name" placeholder="Enter Charge Name" required />
        </div>

        <div class="mb-3">
            <BaseInput label="Code" v-model.trim="form.code" placeholder="Enter Charge Code" required
                :disabled="isEdit" />
        </div>

        <div class="mb-3">
            <BaseInput label="Description" v-model.trim="form.description" placeholder="Enter Description" required />
        </div>

        <div class="mb-3">
            <BaseAutoCompleteSelect label="User Role Type" :options="mUserRoleTypeEnum" v-model="form.user_role_type"
                value-key="code" label-key="label" required />
        </div>


        <div class=" border rounded-3 p-3 bg-light">
            <label class="form-label fw-semibold mb-2">Status</label>

            <div class="d-flex align-items-center justify-content-between">
                <span class="text-muted">
                    Charge Level is
                    <b :class="form.is_active ? 'text-success' : 'text-danger'">
                        {{ form.is_active ? "Active" : "Inactive" }}
                    </b>
                </span>

                <!-- TOGGLE -->
                <div class="status-toggle" :class="{ active: form.is_active }"
                    @click="form.is_active = !form.is_active">
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
import { mUserRoleTypeEnum } from "@/core/utils/constants/constants";


import {
    fetchChargeLevels,
    createChargeLevel,
    updateChargeLevel,
    deleteChargeLevel
} from "@/core/repos/admin/master/masterRepos";
import BaseAutoCompleteSelect from "@/components/common/inputs/BaseAutoCompleteSelect.vue";

/* ---------------- STATE ---------------- */
const uiStore = useUIStore();
const mListData = ref([]);


const aModal = ref(null);
const isEdit = ref(false);

const form = ref({
    id: null,
    name: "",
    code: "",
    description: "",
    user_role_type: "",
    is_active: true,
});

function resetForm() {
    form.value = {
        id: null,
        name: "",
        code: "",
        description: "",
        user_role_type: "",
        is_active: true,
    };
}

/* ---------------- INIT ---------------- */
onMounted(loadList);

/* ---------------- LIST ---------------- */
async function loadList() {
    mListData.value = await fetchChargeLevels();   // ✅ NO CHECK
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
        ? updateChargeLevel(form.value.id, form.value)
        : createChargeLevel(form.value));

    closeModal();
    mListData.value = [];
    loadList();    // ✅ ALWAYS SAFE
}

/* ---------------- DELETE ---------------- */
async function deleteAction(id) {
    const confirmed = await showConfirmDialog(
        "Delete Charge Level",
        "Are you sure you want to delete this charge level?"
    );

    if (!confirmed) return;

    await deleteChargeLevel(id);
    mListData.value = [];

    loadList();    // ✅ ALWAYS SAFE
}
</script>
