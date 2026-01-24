<template>
    <BaseContainer heading="Charges Management">
        <template #headerActions>
            <BaseButton variant="primary" icon="fas fa-plus" @click="openAdd">
                Add Charges
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
                            <th>CGST (%)</th>
                            <th>SGST (%)</th>
                            <th>IGST (%)</th>

                            <th>Taxable</th>
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

                            <td>{{ row.cgst_percent }}</td>
                            <td>{{ row.sgst_percent }}</td>
                            <td>{{ row.igst_percent }}</td>
                            <td>
                                <span class="badge px-3"
                                    :class="row.is_taxable ? 'bg-warning text-danger' : 'bg-success'">
                                    {{ row.is_taxable ? "Taxable" : "Non-Taxable" }}
                                </span>
                            </td>
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
            {{ isEdit ? "Edit Charge" : "Add Charge" }}
        </template>

        <div class="mb-3">
            <BaseInput label="Name (Will Reflect on Invoice)" v-model.trim="form.name" placeholder="Enter Charge Name"
                required />
        </div>

        <div class="mb-3">
            <BaseInput label="Code" v-model.trim="form.code" placeholder="Enter Charge Code" required
                :disabled="isEdit" />
        </div>

        <div class="mb-3">
            <BaseInput label="Description" v-model.trim="form.description" placeholder="Enter Description" />
        </div>

        <div class="mb-3">
            <BaseInput label="CGST Percent" v-model.trim="form.cgst_percent" type="number" :step="0.01"
                placeholder="Enter CGST Percent" required />

        </div>

        <div class="mb-3">
            <BaseInput label="SGST Percent" v-model.trim="form.sgst_percent" type="number" :step="0.01"
                placeholder="Enter SGST Percent" required />

        </div>

        <div class="mb-3">
            <BaseInput label="IGST Percent" v-model.trim="form.igst_percent" type="number" :step="0.01"
                placeholder="Enter IGST Percent" required />
        </div>



        <div class=" border rounded-3 p-3 bg-light">
            <label class="form-label fw-semibold mb-2">Taxable</label>

            <div class="d-flex align-items-center justify-content-between">
                <span class="text-muted">
                    Charges is
                    <b :class="form.is_taxable ? 'text-warning' : 'text-gray'">
                        {{ form.is_taxable ? "Taxable" : "Non-Taxable" }}
                    </b>
                </span>

                <!-- TOGGLE -->
                <div class="status-toggle" :class="{ active: form.is_taxable }"
                    @click="form.is_taxable = !form.is_taxable">
                    <span class="toggle-knob"></span>
                </div>
            </div>
        </div>


        <div class=" border rounded-3 p-3 bg-light">
            <label class="form-label fw-semibold mb-2">Status</label>

            <div class="d-flex align-items-center justify-content-between">
                <span class="text-muted">
                    Charges is
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

import {
    fetchCharges,
    createCharge,
    updateCharge,
    deleteCharge
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
    description: "",
    cgst_percent: "",
    sgst_percent: "",
    igst_percent: "",

    is_active: true,
    is_taxable: false,
});

function resetForm() {
    form.value = {
        id: null,
        name: "",
        code: "",
        description: "",
        cgst_percent: "",
        sgst_percent: "",
        igst_percent: "",

        is_active: true,
        is_taxable: false,
    };
}

/* ---------------- INIT ---------------- */
onMounted(loadList);

/* ---------------- LIST ---------------- */
async function loadList() {
    mListData.value = await fetchCharges();   // ✅ NO CHECK
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
        ? updateCharge(form.value.id, form.value)
        : createCharge(form.value));

    closeModal();
    mListData.value = [];
    loadList();    // ✅ ALWAYS SAFE
}

/* ---------------- DELETE ---------------- */
async function deleteAction(id) {
    const confirmed = await showConfirmDialog(
        "Delete Charge",
        "Are you sure you want to delete this charge?"
    );

    if (!confirmed) return;

    await deleteCharge(id);
    mListData.value = [];

    loadList();    // ✅ ALWAYS SAFE
}
</script>
