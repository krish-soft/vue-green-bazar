<template>
    <BaseContainer heading="Product Packaging Management">
        <template #headerActions>
            <BaseButton variant="primary" icon="fas fa-plus" @click="openAdd">
                Add Product Packaging
            </BaseButton>
        </template>

        <template #body>
            <table id="datatable" class="table table-hover table-striped table-bordered align-middle">
                <thead class="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Product</th>
                        <th>Pack Size</th>
                        <th>Pack Unit</th>
                        <th>Pack Type Unit</th>
                        <th>Status</th>
                        <th class="text-center">Action</th>
                    </tr>
                </thead>

                <tbody v-if="mListData.length">
                    <tr v-for="(row, i) in mListData" :key="row.id">
                        <td>{{ i + 1 }}</td>

                        <td>{{ row?.product?.name }} ({{ row?.product?.product_code }})</td>
                        <td>{{ row.pack_size }}</td>
                        <td>{{ row.pack_unit }}</td>
                        <td>{{ row.pack_type_unit }}</td>
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
    <BaseModal ref="aModal" icon="fas fa-dolly">
        <template #title>
            {{ isEdit ? "Edit Product Packaging" : "Add Product Packaging" }}
        </template>

        <form id="newForm" @submit.prevent="submitForm">

            <div class="mb-3">

                <BaseAutoCompleteSelect label="Product" v-model="form.product_id" :options="productList"
                    :label-Key="['name', 'product_code']" value-Key="id" placeholder="Select Product" required />
            </div>

            <div class="mb-3">
                <BaseInput label="Pack Size" v-model.trim="form.pack_size" type="number" :step="1"
                    placeholder="Enter Pack Size" required />
            </div>

            <div class="mb-3">

                <BaseAutoCompleteSelect label="Pack Unit" v-model="form.pack_unit" :options="unitList"
                    :label-Key="['name']" value-Key="unit" placeholder="Select Pack Unit" required />
            </div>
            <div class="mb-3">

                <BaseAutoCompleteSelect label="Pack Type Unit" v-model="form.pack_type_unit" :options="packTypeList"
                    :label-Key="['name']" value-Key="unit" placeholder="Select Pack Type Unit" required />
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
    fetchProductPackagings,
    createProductPackaging,
    updateProductPackaging,
    deleteProductPackaging,

    // For Dropdown
    fetchProducts,
    fetchUnits,
    fetchPackTypes

} from "@/core/repos/admin/master/masterRepos";
import BaseAutoCompleteSelect from "@/components/common/inputs/BaseAutoCompleteSelect.vue";

/* ---------------- STATE ---------------- */
const uiStore = useUIStore();
const mListData = ref([]);
const productList = ref([]);
const unitList = ref([]);
const packTypeList = ref([]);

const aModal = ref(null);
const isEdit = ref(false);

const form = ref({
    id: null,

    product_id: "",
    pack_size: "",
    pack_unit: "",
    pack_type_unit: "",

    is_active: true,
});

function resetForm() {
    form.value = {
        id: null,

        product_id: "",
        pack_size: "",
        pack_unit: "",
        pack_type_unit: "",
        is_active: true,
    };
}


/* ---------------- INIT ---------------- */
onMounted(loadList);

/* ---------------- LIST ---------------- */
async function loadList() {
    mListData.value = await fetchProductPackagings();   // ✅ NO CHECK
}

async function loadDropDownLists() {
    if (productList.value.length == 0) {
        productList.value = await fetchProducts({ is_active: true });
    }

    if (unitList.value.length == 0) {
        unitList.value = await fetchUnits({ is_active: true });
    }

    if (packTypeList.value.length == 0) {
        packTypeList.value = await fetchPackTypes({ is_active: true });
    }
}


/* ---------------- MODAL ---------------- */
async function openAdd() {
    isEdit.value = false;
    await loadDropDownLists();
    resetForm();
    aModal.value.show();
}

async function openEdit(row) {
    isEdit.value = true;
    await loadDropDownLists();
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
        ? updateProductPackaging(form.value.id, form.value)
        : createProductPackaging(form.value));

    closeModal();
    mListData.value = [];
    loadList();    // ✅ ALWAYS SAFE
}

/* ---------------- DELETE ---------------- */
async function deleteAction(id) {

    const confirmed = await showConfirmDialog(
        "Delete Product Packaging",
        "Are you sure you want to delete this product packaging?"
    );

    if (!confirmed) return;

    await deleteProductPackaging(id);
    mListData.value = [];
    loadList();    // ✅ ALWAYS SAFE
}
</script>
