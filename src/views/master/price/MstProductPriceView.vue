<template>
    <BaseContainer heading="Product Price Management">
        <template #headerActions>
            <BaseButton variant="primary" icon="fas fa-plus" @click="openAdd">
                Add Product Price
            </BaseButton>
        </template>

        <template #body>
            <div class="table-responsive">
                <table id="datatable" class="table table-hover table-striped table-bordered align-middle">
                    <thead class="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Product Code</th>
                            <th>Product Name</th>
                            <th>Price Date</th>
                            <th>Price (Per Unit/Per Kg)</th>
                            <th>Min. Price (Per Unit/Per Kg)</th>
                            <th>Max. Price (Per Unit/Per Kg)</th>
                            <th>Market</th>
                            <th class="text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody v-if="mListData.length">
                        <tr v-for="(row, i) in mListData" :key="row.id">
                            <td>{{ i + 1 }}</td>
                            <td>{{ row.product?.product_code }}</td>
                            <td>{{ row.product?.name }}</td>
                            <td>{{ row.price_date }}</td>
                            <td>{{ row.price }}</td>
                            <td>{{ row.min_price }}</td>
                            <td>{{ row.max_price }}</td>
                            <td>{{ row.market?.name }}</td>



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
            {{ isEdit ? "Edit Product Price" : "Add Product Price" }}
        </template>


        <div class="mb-3">
            <BaseAutoCompleteSelect label="Select Product" :options="productList" v-model="form.product_id"
                value-key="id" :label-key="['code', 'name']" required />
        </div>

        <!-- <div class="mb-3">
            <BaseAutoCompleteSelect label="Select Market" :options="marketList" v-model="form.market_id" value-key="id"
                :label-key="['code', 'name']" />
        </div> -->

        <div class="mb-3">
            <BaseInput label="Price Date" v-model.trim="form.price_date" type="date" placeholder="Price Date"
                required />
        </div>


        <div class="mb-3">
            <BaseInput label="Price (Per Unit/Per Kg)" v-model.trim="form.price" type="number" :step="1"
                placeholder="Price" required />
        </div>

        <div class="mb-3">
            <BaseInput label="Min. Price (Per Unit/Per Kg)" v-model.trim="form.min_price" type="number" :step="1"
                placeholder="Price" step="1" />
        </div>

        <div class="mb-3">
            <BaseInput label="Max. Price (Per Unit/Per Kg)" v-model.trim="form.max_price" type="number" :step="1"
                placeholder="Price" step="1" />
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
import BaseInput from "@/components/common/inputs/BaseInput.vue";
import BaseAutoCompleteSelect from "@/components/common/inputs/BaseAutoCompleteSelect.vue";

import { useUIStore } from "@/core/utils/stores/uiStore";
import { showConfirmDialog } from "@/core/utils/uiHelpers/swalUtils.js";
import { mCalculationTypeEnum, mCalculationConditionTypeEnum, mCalculationChargeBaseTypeEnum } from "@/core/utils/constants/constants.js";
import { fetchAllEnums, fetchMarkets } from "@/core/repos/utils/utilsRepos"

import {
    fetchPriceList,
    createProductPrice,
    updateProductPrice,
    deleteProductPrice,

    fetchProducts,

    fetchChargeLevels,
} from "@/core/repos/admin/master/masterRepos";

/* ---------------- STATE ---------------- */
const uiStore = useUIStore();
const mListData = ref([]);

const marketList = ref([]);
const productList = ref([]);

const unitList = [
    { code: "kg", label: "kg" },

];
const aModal = ref(null);
const isEdit = ref(false);

const form = ref({
    id: null,
    product_id: null,
    product_code: "",
    price: "",
    max_price: "",
    min_price: "",

    market_id: null,
    depot_id: null,

});

function resetForm() {
    form.value = {
        id: null,
        product_id: null,
        product_code: "",
        price: "",
        max_price: "",
        min_price: "",

        market_id: null,
        depot_id: null,
    };
}

/* ---------------- INIT ---------------- */
onMounted(loadList);

/* ---------------- LIST ---------------- */
async function loadList() {
    mListData.value = await fetchPriceList();   // ✅ NO CHECK

    marketList.value = await fetchMarkets({ is_active: true });

    productList.value = await fetchProducts({ is_active: true });
}

/* ---------------- MODAL ---------------- */
async function openAdd() {
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


// 

watch(
    () => form.value.price,
    (price) => {
        const p = Number(price);
        if (!p) {
            form.value.min_price = "";
            form.value.max_price = "";
            return;
        }

        let min = p * 0.75;
        let max = p * 1.25;

        if (min <= 0) min = p;

        form.value.min_price = Math.round(min);
        form.value.max_price = Math.round(max);
    }
);


/* ---------------- SAVE ---------------- */
async function submitForm() {
    await (isEdit.value
        ? updateProductPrice(form.value.id, form.value)
        : createProductPrice(form.value));

    closeModal();
    mListData.value = [];
    loadList();    // ✅ ALWAYS SAFE
}

/* ---------------- DELETE ---------------- */
async function deleteAction(id) {
    const confirmed = await showConfirmDialog(
        "Delete Price",
        "Are you sure you want to delete this price?"
    );

    if (!confirmed) return;

    await deleteProductPrice(id);
    mListData.value = [];

    loadList();    // ✅ ALWAYS SAFE
}
</script>
