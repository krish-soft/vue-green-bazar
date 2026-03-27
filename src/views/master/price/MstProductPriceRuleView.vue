<template>
    <BaseContainer heading="Product Price Rule Management">
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
                            <th>Rule No</th>
                            <th>Charge Level</th>
                            <th>User Type</th>
                            <th>Pack Unit</th>
                            <th>Calc Type</th>

                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>5</th>
                            <th>10</th>
                            <th>20</th>

                            <th>Status</th>
                            <th class="text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody v-if="mListData.length">
                        <tr v-for="(row, i) in mListData" :key="row.id">
                            <td>{{ i + 1 }}</td>
                            <td>{{ row.rule_no }}</td>
                            <td>{{ row.charge_level?.code }}</td>
                            <td>{{ row.user_type }}</td>
                            <td>{{ row.pack_unit }}</td>
                            <td>{{ row.calc_type }}</td>

                            <td>{{ row['1_pkg'] }}</td>
                            <td>{{ row['2_pkg'] }}</td>
                            <td>{{ row['3_pkg'] }}</td>
                            <td>{{ row['5_pkg'] }}</td>
                            <td>{{ row['10_pkg'] }}</td>
                            <td>{{ row['20_pkg'] }}</td>


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
            {{ isEdit ? "Edit Product Price Rule" : "Add Product Price Rule" }}
        </template>


        <div class="mb-3">
            <BaseAutoCompleteSelect label="Charge Level" :options="mListChargeLevels" v-model="form.charge_level_id"
                value-key="id" :label-key="['code', 'user_role_type', 'name']" required />
        </div>

        <div class="mb-3">
            <BaseAutoCompleteSelect label="Calculation Type" :options="mCalculationTypeEnum" v-model="form.calc_type"
                value-key="code" label-key="label" required />
        </div>

        <div class="mb-3">
            <BaseAutoCompleteSelect label="Pack Unit" :options="unitList" v-model="form.pack_unit" value-key="code"
                label-key="label" required />
        </div>

        <div class="mb-3">
            <BaseAutoCompleteSelect label="User Type" :options="userTypeList" v-model="form.user_type" value-key="value"
                label-key="label" />
        </div>

        <div class="mb-3">
            <BaseInput label="1" v-model.trim="form['1_pkg']" type="number" :step="1" placeholder="1 -Pkg" required />
        </div>

        <div class="mb-3">
            <BaseInput label="2" v-model.trim="form['2_pkg']" type="number" :step="1" placeholder="2 -Pkg" required />
        </div>

        <div class="mb-3">
            <BaseInput label="3" v-model.trim="form['3_pkg']" type="number" :step="1" placeholder="3 -Pkg" required />
        </div>

        <div class="mb-3">
            <BaseInput label="5" v-model.trim="form['5_pkg']" type="number" :step="1" placeholder="5 -Pkg" required />

        </div>

        <div class="mb-3">
            <BaseInput label="10" v-model.trim="form['10_pkg']" type="number" :step="1" placeholder="10 -Pkg"
                required />

        </div>

        <div class="mb-3">
            <BaseInput label="20" v-model.trim="form['20_pkg']" type="number" :step="1" placeholder="20 -Pkg"
                required />

        </div>

        <div class=" border rounded-3 p-3 bg-light">

            <label class="form-label fw-semibold mb-2">Status</label>

            <div class="d-flex align-items-center justify-content-between">
                <span class="text-muted">
                    Price is
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
import BaseAutoCompleteSelect from "@/components/common/inputs/BaseAutoCompleteSelect.vue";

import { useUIStore } from "@/core/utils/stores/uiStore";
import { showConfirmDialog } from "@/core/utils/uiHelpers/swalUtils.js";
import { mCalculationTypeEnum, mCalculationConditionTypeEnum, mCalculationChargeBaseTypeEnum } from "@/core/utils/constants/constants.js";
import { fetchAllEnums } from "@/core/repos/utils/utilsRepos"

import {
    fetchProductPriceRuleList,
    createProductPriceRule,
    updateProductPriceRule,
    deleteProductPriceRule,

    fetchChargeLevels,
} from "@/core/repos/admin/master/masterRepos";

/* ---------------- STATE ---------------- */
const uiStore = useUIStore();
const mListData = ref([]);
const mListChargeLevels = ref([]);
const userTypeList = ref([])

const unitList = [
    { code: "kg", label: "kg" },

];
const aModal = ref(null);
const isEdit = ref(false);

const form = ref({
    id: null,
    rule_no: null,
    charge_level_id: "",
    user_type: "",

    pack_unit: "",
    calc_type: "",

    '1_pkg': 0.00,
    '2_pkg': 0.00,
    '3_pkg': 0.00,
    '5_pkg': 0.00,
    '10_pkg': 0.00,
    '20_pkg': 0.00,

    is_active: true,
});

function resetForm() {
    form.value = {
        id: null,
        rule_no: null,
        charge_level_id: "",
        user_type: "",

        pack_unit: "",
        calc_type: "",

        '1_pkg': 0.00,
        '2_pkg': 0.00,
        '3_pkg': 0.00,
        '5_pkg': 0.00,
        '10_pkg': 0.00,
        '20_pkg': 0.00,

        is_active: true,
    };
}

/* ---------------- INIT ---------------- */
onMounted(loadList);

/* ---------------- LIST ---------------- */
async function loadList() {
    mListData.value = await fetchProductPriceRuleList();   // ✅ NO CHECK

    if (mListChargeLevels.value.length == 0) {
        mListChargeLevels.value = await fetchChargeLevels({ is_active: true });
    }
    const enums = await fetchAllEnums()
    userTypeList.value = enums.user_types || []


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



/* ---------------- SAVE ---------------- */
async function submitForm() {
    await (isEdit.value
        ? updateProductPriceRule(form.value.id, form.value)
        : createProductPriceRule(form.value));

    closeModal();
    mListData.value = [];
    loadList();    // ✅ ALWAYS SAFE
}

/* ---------------- DELETE ---------------- */
async function deleteAction(id) {
    const confirmed = await showConfirmDialog(
        "Delete Price Rule",
        "Are you sure you want to delete this price rule?"
    );

    if (!confirmed) return;

    await deleteProductPriceRule(id);
    mListData.value = [];

    loadList();    // ✅ ALWAYS SAFE
}
</script>
