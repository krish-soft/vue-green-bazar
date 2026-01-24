<template>
    <BaseContainer heading="Minimum Order Charge Rule Management">
        <template #headerActions>
            <BaseButton variant="primary" icon="fas fa-plus" @click="openAdd">
                Add Minimum Order Charge Rule
            </BaseButton>
        </template>

        <template #body>
            <div class="table-responsive">
                <table id="datatable" class="table table-hover table-striped table-bordered align-middle">
                    <thead class="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Charges Name</th>
                            <th>Charge Level</th>
                            <th>Charge Level<br /> Code</th>
                            <th>Charge Level <br /> User Type</th>
                            <th>Rule No</th>
                            <th>Description</th>
                            <th>Calculation Details</th>

                            <th>Min. Order </th>
                            <th>Charge Amount</th>
                            <th>Status</th>
                            <th class="text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody v-if="mListData.length">
                        <tr v-for="(row, i) in mListData" :key="row.id">
                            <td>{{ i + 1 }}</td>
                            <td>{{ row?.charge?.name }}</td>
                            <td>
                                {{ row?.charge_level?.name }}
                            </td>
                            <td>
                                {{ row?.charge_level?.code }}
                            </td>
                            <td>
                                <span :class="`role-${row?.charge_level?.user_role_type.toLowerCase()}`">
                                    {{ row?.charge_level?.user_role_type }}
                                </span>
                            </td>

                            <td>{{ row.rule_no }}</td>
                            <td>{{ row.description }}</td>

                            <td>
                                <b>Type: </b>{{ row.calc_type }} <br />
                                <b>Condition: </b>{{ row.calc_condition }} <br />
                                <b>Base: </b>{{ row.calc_base }}
                            </td>
                            <td>
                                <b>Price: </b>{{ row.min_order_price }}<br />
                                <b>Quantity: </b>{{ row.min_order_qty }}<br />
                                <b>Weight: </b>{{ row.min_order_weight }}<br />

                            </td>
                            <td>{{ row.charge_amount }}</td>

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
            {{ isEdit ? "Edit Minimum Order Charge Rule" : "Add Minimum Order Charge Rule" }}
        </template>

        <div class="mb-3">
            <BaseAutoCompleteSelect label="Charges" :options="mListCharges" v-model="form.charge_id" value-key="id"
                :label-key="['code', 'name']" required />
        </div>
        <div class="mb-3">
            <BaseAutoCompleteSelect label="Charge Level" :options="mListChargeLevels" v-model="form.charge_level_id"
                value-key="id" :label-key="['code', 'user_role_type', 'name']" required />
        </div>

        <div class="mb-3">
            <BaseInput label="Description " v-model.trim="form.description" placeholder="Enter Description" required />
        </div>

        <div class="mb-3">
            <BaseAutoCompleteSelect label="Calculation Type" :options="mCalculationTypeEnum" v-model="form.calc_type"
                value-key="code" label-key="label" required />
        </div>
        <div class="mb-3">
            <BaseAutoCompleteSelect label="Calculation Condition" :options="mCalculationConditionTypeEnum"
                v-model="form.calc_condition" value-key="code" label-key="label" required />
        </div>
        <div class="mb-3">
            <BaseAutoCompleteSelect label="Calculation Base" :options="mCalculationChargeBaseTypeEnum"
                v-model="form.calc_base" value-key="code" label-key="label" required />
        </div>

        <div class="mb-3">
            <BaseInput label="Minimum Order Price" v-model.trim="form.min_order_price" :step="0.01"
                placeholder="Enter Minimum Order Price" required v-if="form.calc_base === 'price'" />
        </div>

        <div class="mb-3">
            <BaseInput label="Minimum Order Qty" v-model.trim="form.min_order_qty" :step="0.01"
                placeholder="Enter Minimum Order Qty" required v-if="form.calc_base === 'qty'" />
        </div>

        <div class="mb-3">
            <BaseInput label="Minimum Order Weight" v-model.trim="form.min_order_weight" :step="0.01"
                placeholder="Enter Minimum Order Weight" required v-if="form.calc_base === 'weight'" />
        </div>

        <div class="mb-3">
            <BaseInput label="Charge Amount" v-model.trim="form.charge_amount" placeholder="Enter Charge Amount"
                :step="0.5" required />
        </div>

        <div class=" border rounded-3 p-3 bg-light">
            <label class="form-label fw-semibold mb-2">Status</label>

            <div class="d-flex align-items-center justify-content-between">
                <span class="text-muted">
                    Rule is
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
import {
    fetchMinimumOrderChargeRules,
    createMinimumOrderChargeRule,
    updateMinimumOrderChargeRule,
    deleteMinimumOrderChargeRule,

    // to create a rule need
    fetchCharges,
    fetchChargeLevels,

} from "@/core/repos/admin/master/masterRepos";

/* ---------------- STATE ---------------- */
const uiStore = useUIStore();
const mListData = ref([]);
const mListChargeLevels = ref([]);
const mListCharges = ref([]);

const mCalcBase = ref(null);

const aModal = ref(null);
const isEdit = ref(false);

const form = ref({
    id: null,
    rule_no: null, // system generated
    charge_id: "",
    charge_level_id: "",
    description: "",
    calc_base: "",
    calc_type: "",
    calc_condition: "",
    min_order_price: "",
    min_order_qty: "",
    min_order_weight: "",
    charge_amount: "",
    is_active: true,
});

function resetForm() {
    form.value = {
        id: null,
        rule_no: null, // system generated
        charge_id: "",
        charge_level_id: "",
        description: "",
        calc_base: "",
        calc_type: "",
        calc_condition: "",
        min_order_price: "",
        min_order_qty: "",
        min_order_weight: "",
        charge_amount: "",
        is_active: true,
    };
}

/* ---------------- INIT ---------------- */
onMounted(loadList);

/* ---------------- LIST ---------------- */
async function loadList() {
    mListData.value = await fetchMinimumOrderChargeRules();   // ✅ NO CHECK
}

async function loadChargesList() {

    if (mListCharges.value.length == 0) {
        mListCharges.value = await fetchCharges({ is_active: true });
    }

    if (mListChargeLevels.value.length == 0) {
        mListChargeLevels.value = await fetchChargeLevels({ is_active: true });
    }

}


/* ---------------- MODAL ---------------- */
async function openAdd() {
    isEdit.value = false;
    await loadChargesList();
    resetForm();
    aModal.value.show();
}

async function openEdit(row) {
    isEdit.value = true;
    await loadChargesList();
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
        ? updateMinimumOrderChargeRule(form.value.id, form.value)
        : createMinimumOrderChargeRule(form.value));

    closeModal();
    mListData.value = [];
    loadList();    // ✅ ALWAYS SAFE
}

/* ---------------- DELETE ---------------- */
async function deleteAction(id) {
    const confirmed = await showConfirmDialog(
        "Delete Minimum Order Charge Rule",
        "Are you sure you want to delete this minimum order charge rule?"
    );

    if (!confirmed) return;

    await deleteMinimumOrderChargeRule(id);
    mListData.value = [];

    loadList();    // ✅ ALWAYS SAFE
}
</script>
