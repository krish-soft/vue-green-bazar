<template>
    <BaseContainer heading="Product Category Management">
        <template #headerActions>
            <BaseButton variant="primary" icon="fas fa-plus" @click="openAdd">
                Add Product Category
            </BaseButton>
        </template>

        <template #body>
            <table id="datatable" class="table table-hover table-striped table-bordered align-middle">
                <thead class="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Code</th>
                        <th>HSN Chapter</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th class="text-center">Action</th>
                    </tr>
                </thead>

                <tbody v-if="mListData.length">
                    <tr v-for="(row, i) in mListData" :key="row.id">
                        <td>{{ i + 1 }}</td>
                        <td>{{ row.name }}</td>
                        <td>{{ row.category_code }}</td>
                        <td>{{ row.hsn_chapter }}</td>
                        <td>{{ row.description }}</td>
                        <td>
                            <span class="badge px-3" :class="row.is_active ? 'bg-success' : 'bg-danger'">
                                {{ row.is_active ? "Active" : "Inactive" }}
                            </span>
                        </td>
                        <td class="text-center">
                            <BaseButton iconOnly variant="primary me-2" icon="fas fa-edit" @click="openEdit(row)" />
                            <BaseButton iconOnly variant="danger" icon="fas fa-trash" @click="deleteCategory(row.id)" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </template>
    </BaseContainer>

    <!-- ADD / EDIT MODAL -->
    <BaseModal ref="aModal" icon="fas fa-tags">
        <template #title>
            {{ isEdit ? "Edit Product Category" : "Add Product Category" }}
        </template>

        <form id="newForm" @submit.prevent="submitForm">

            <div class="mb-3">
                <BaseInput label="Name" v-model.trim="form.name" placeholder="Enter Product Category Name" required />
            </div>

            <div class="mb-3">
                <BaseInput label="HSN Chapter" v-model.trim="form.hsn_chapter" placeholder="Enter HSN Chapter"
                    required />
            </div>

            <div class="mb-3">
                <BaseInput label="Description" v-model.trim="form.description" placeholder="Enter Description"
                    required />
            </div>

            <div class="border rounded-3 p-3 bg-light">
                <label class="form-label fw-semibold mb-2">Status</label>

                <div class="d-flex align-items-center justify-content-between">
                    <span class="text-muted">
                        Product Category is
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
        </form>



        <template #footer>
            <BaseButton variant="secondary" @click="closeModal">
                Cancel
            </BaseButton>
            <BaseButton variant="primary" :loading="uiStore.isLoading" form="newForm" type="submit">
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
    fetchProductCategories,
    createProductCategory,
    updateProductCategory,
    deleteProductCategory
} from "@/core/repos/admin/master/masterRepos";

/* ---------------- STATE ---------------- */
const uiStore = useUIStore();
const mListData = ref([]);

const aModal = ref(null);
const isEdit = ref(false);

const form = ref({
    id: null,
    category_code: null, // system generated
    name: "",

    hsn_chapter: "",
    description: "",
    is_active: true,
});

function resetForm() {
    form.value = {
        id: null,
        category_code: null, // system generated
        name: "",
        category_code: "",
        hsn_chapter: "",
        description: "",
        is_active: true,
    };
}


/* ---------------- INIT ---------------- */
onMounted(loadList);

/* ---------------- LIST ---------------- */
async function loadList() {
    mListData.value = await fetchProductCategories();   // ✅ NO CHECK
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
        ? updateProductCategory(form.value.id, form.value)
        : createProductCategory(form.value));

    closeModal();
    mListData.value = [];
    loadList();    // ✅ ALWAYS SAFE
}

/* ---------------- DELETE ---------------- */
async function deleteCategory(id) {
    const confirmed = await showConfirmDialog(
        "Delete Product Category",
        "Are you sure you want to delete this product category?"
    );

    if (!confirmed) return;

    await deleteProductCategory(id);
    mListData.value = [];
    loadList();    // ✅ ALWAYS SAFE
}
</script>
