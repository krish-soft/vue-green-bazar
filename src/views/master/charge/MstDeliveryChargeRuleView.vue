<template>
    <BaseContainer heading="Delivery Charge Rule Management">
        <template #headerActions>
            <BaseButton variant="primary" icon="fas fa-plus" @click="openAdd">
                Add Delivery Charge Rule
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
                                <b>Value: </b>{{ row.measure_value }} <br />
                                <b>Unit: </b>{{ row.measure_unit }} <br />
                                <b>Pack Type: </b>{{ row.pack_type_unit }}
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
            {{ isEdit ? "Edit Delivery Charge Rule" : "Add Delivery Charge Rule" }}
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
            <BaseInput label="Measure (Pack) Size" v-model.trim="form.measure_value" type="number" :step="1"
                placeholder="Enter Pack Size" required />
        </div>

        <div class="mb-3">

            <BaseAutoCompleteSelect label="Measure (Pack) Unit" v-model="form.measure_unit" :options="unitList"
                :label-Key="['name']" value-Key="unit" placeholder="Select Pack Unit" required />
        </div>
        <div class="mb-3">

            <BaseAutoCompleteSelect label="Pack Type Unit" v-model="form.pack_type_unit" :options="packTypeList"
                :label-Key="['name']" value-Key="unit" placeholder="Select Pack Type Unit" required />
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
    fetchDeliveryChargeRules,
    createDeliveryChargeRule,
    updateDeliveryChargeRule,
    deleteDeliveryChargeRule,

    // to create a rule need
    fetchCharges,
    fetchChargeLevels,
    fetchUnits,
    fetchPackTypes

} from "@/core/repos/admin/master/masterRepos";

/* ---------------- STATE ---------------- */
const uiStore = useUIStore();
const mListData = ref([]);
const mListChargeLevels = ref([]);
const mListCharges = ref([]);
const unitList = ref([]);
const packTypeList = ref([]);

const mCalcBase = ref(null);

const aModal = ref(null);
const isEdit = ref(false);

const form = ref({
    id: null,
    rule_no: null, // system generated
    charge_id: "",
    charge_level_id: "",
    description: "",

    measure_value: "",
    measure_unit: "",
    pack_type_unit: "",
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

        measure_value: "",
        measure_unit: "",
        pack_type_unit: "",
        charge_amount: "",

        is_active: true,
    };
}

/* ---------------- INIT ---------------- */
onMounted(loadList);

/* ---------------- LIST ---------------- */
async function loadList() {
    mListData.value = await fetchDeliveryChargeRules();   // ✅ NO CHECK
}

async function loadChargesList() {

    if (mListCharges.value.length == 0) {
        mListCharges.value = await fetchCharges({ is_active: true });
        // Filter only word contains deliver
        // mListCharges.value = mListCharges.value.filter(charge => charge.name.toLowerCase().includes('deliver'));
    }

    if (mListChargeLevels.value.length == 0) {
        mListChargeLevels.value = await fetchChargeLevels({ is_active: true });
        // Filter not contains deliver because only apply to seller and buyer
        // mListChargeLevels.value = mListChargeLevels.value.filter(chargeLevel => !chargeLevel.name.toLowerCase().includes('deliver'));
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
        ? updateDeliveryChargeRule(form.value.id, form.value)
        : createDeliveryChargeRule(form.value));

    closeModal();
    mListData.value = [];
    loadList();    // ✅ ALWAYS SAFE
}

/* ---------------- DELETE ---------------- */
async function deleteAction(id) {
    const confirmed = await showConfirmDialog(
        "Delete Delivery Charge Rule",
        "Are you sure you want to delete this delivery charge rule?"
    );

    if (!confirmed) return;

    await deleteDeliveryChargeRule(id);
    mListData.value = [];

    loadList();    // ✅ ALWAYS SAFE
}
</script>
