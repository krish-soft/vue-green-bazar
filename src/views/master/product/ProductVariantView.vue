<template>
    <BaseContainer heading="Product Variant Management">
        <template #headerActions>
            <BaseButton variant="primary" icon="fas fa-plus" @click="openAdd">
                Add Product Variant
            </BaseButton>
        </template>

        <template #body>
            <table id="datatable" class="table table-hover table-striped table-bordered align-middle">
                <thead class="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Picture</th>
                        <th>Variant Name</th>
                        <th>Variant Code</th>
                        <th>Product</th>
                        <th>HSN</th>
                        <th>UPC</th>
                        <th>SKU</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th class="text-center">Action</th>
                    </tr>
                </thead>

                <tbody v-if="mListData.length">
                    <tr v-for="(row, i) in mListData" :key="row.id">
                        <td>{{ i + 1 }}</td>
                        <td><img v-if="row.picture" :src="row.pictureUrl" alt="..."
                                style="width: 50px; height: 50px; object-fit: cover;">
                            <span v-else class="text-muted">No Image</span>
                        </td>
                        <td>{{ row.name }}</td>
                        <td>{{ row.variant_code }}</td>
                        <td>{{ row?.product?.name }} ({{ row?.product?.product_code }})</td>
                        <td>{{ row.hsn }}</td>
                        <td>{{ row.upc }}</td>
                        <td>{{ row.sku }}</td>
                        <td>{{ row.description }}</td>
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
    <BaseModal ref="aModal" icon="fas fa-tags">
        <template #title>
            {{ isEdit ? "Edit Product Variant" : "Add Product Variant" }}
        </template>

        <form id="newForm" @submit.prevent="submitForm">

            <div class="mb-3">

                <BaseAutoCompleteSelect label="Product" v-model="form.product_id" :options="productList"
                    :label-Key="['name', 'product_code']" value-Key="id" placeholder="Select Product" required />
            </div>

            <div class="mb-3">
                <BaseInput label="Name" v-model.trim="form.name" placeholder="Enter Product Variant Name" required />
            </div>

            <div class="mb-3">
                <BaseInput label="Description" v-model.trim="form.description" placeholder="Enter Description"
                    required />
            </div>

            <div class="mb-3">
                <BaseInput label="HSN" v-model.trim="form.hsn" placeholder="Enter HSN" />
            </div>

            <div class="mb-3">
                <BaseInput label="UPC" v-model.trim="form.upc" placeholder="Enter UPC" />
            </div>

            <div class="mb-3">
                <BaseInput label="SKU" v-model.trim="form.sku" placeholder="Enter SKU" />
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
    fetchProductVariants,
    createProductVariant,
    updateProductVariant,
    deleteProductVariant,
    fetchProducts
} from "@/core/repos/admin/master/masterRepos";
import BaseAutoCompleteSelect from "@/components/common/inputs/BaseAutoCompleteSelect.vue";

/* ---------------- STATE ---------------- */
const uiStore = useUIStore();
const mListData = ref([]);
const productList = ref([]);

const aModal = ref(null);
const isEdit = ref(false);

const form = ref({
    id: null,
    variant_code: null, // system generated

    product_id: "",
    name: "",
    description: "",

    upc: "",
    sku: "",
    hsn: "",

    is_active: true,
});

function resetForm() {
    form.value = {
        id: null,
        variant_code: null, // system generated

        product_id: "",
        name: "",
        description: "",

        upc: "",
        sku: "",
        hsn: "",
        is_active: true,
    };
}


/* ---------------- INIT ---------------- */
onMounted(loadList);

/* ---------------- LIST ---------------- */
async function loadList() {
    mListData.value = await fetchProductVariants();   // ✅ NO CHECK
}

async function loadProductList() {
    if (productList.value.length > 0) return;
    productList.value = await fetchProducts({ is_active: true });   // ✅ NO CHECK
}


/* ---------------- MODAL ---------------- */
async function openAdd() {
    isEdit.value = false;
    await loadProductList();
    resetForm();
    aModal.value.show();
}

async function openEdit(row) {
    isEdit.value = true;
    await loadProductList();
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
        ? updateProductVariant(form.value.id, form.value)
        : createProductVariant(form.value));

    closeModal();
    mListData.value = [];
    loadList();    // ✅ ALWAYS SAFE
}

/* ---------------- DELETE ---------------- */
async function deleteAction(id) {

    const confirmed = await showConfirmDialog(
        "Delete Product Variant",
        "Are you sure you want to delete this product variant?"
    );

    if (!confirmed) return;

    await deleteProductVariant(id);

    mListData.value = [];
    loadList();    // ✅ ALWAYS SAFE
}
</script>
