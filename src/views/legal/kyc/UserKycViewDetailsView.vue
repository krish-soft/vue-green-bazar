<template>
    <BaseCotainer :heading="'User KYC Details : ' + kycDetails?.kyc_code">

        <template #headerActions>
        </template>

        <template #body>

            <div v-if="kycDetails" class="container-fluid px-0">

                <!-- ================= BASIC INFO ================= -->
                <div class="mb-4">
                    <div class="border-bottom pb-1 mb-2">
                        <h6 class="fw-semibold text-muted mb-0">Basic Information</h6>
                    </div>

                    <table class="table table-sm table-borderless align-middle mb-0">
                        <tbody>
                            <tr>
                                <th class="text-muted fw-normal w-25">KYC Code</th>
                                <td class="fw-semibold">{{ kycDetails.kyc_code }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal w-25">Legal Name</th>
                                <td class="fw-semibold">{{ kycDetails.legal_name }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal w-25">Father Name</th>
                                <td class="fw-semibold">{{ kycDetails.father_name }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal w-25">Mother Name</th>
                                <td class="fw-semibold">{{ kycDetails.mother_name }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal w-25">Aadhaar Last 4</th>
                                <td class="fw-semibold">{{ kycDetails.aadhaar_last4 }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal w-25">Date of Birth</th>
                                <td class="fw-semibold "> <span :class="kycDetails.dob ? 'masked-value' : ''">
                                        {{ kycDetails.dob }}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal w-25">Gender</th>
                                <td class="fw-semibold "> <span :class="kycDetails.gender ? 'masked-value' : ''">{{
                                    kycDetails.gender }}</span></td>
                            </tr>

                        </tbody>
                    </table>
                </div>

                <div class="mb-4">
                    <div class="d-flex justify-content-between align-items-center border-bottom pb-1 mb-2">
                        <h6 class="fw-semibold text-muted mb-0">Verifications</h6>

                        <BaseButton size="sm" variant="primary" @click="openKycModal()"
                            :disabled="!hasDepots || !canKycStatusUpdate">
                            Update KYC Status
                        </BaseButton>
                    </div>

                    <table class="table table-sm table-borderless align-middle mb-0">
                        <tbody>
                            <tr>
                                <th class="text-muted fw-normal w-25">KYC Status</th>
                                <td class="fw-semibold ">
                                    <span class="badge" :class="{
                                        'bg-secondary': kycDetails.status === 'pending',
                                        'bg-success': kycDetails.status === 'approved',
                                        'bg-danger': kycDetails.status === 'rejected',
                                        'bg-info': kycDetails.status === 'under_review',
                                    }">
                                        {{ kycDetails.status }}
                                    </span>

                                </td>
                            </tr>

                            <tr>
                                <th class=" text-muted fw-normal w-25">Verification Mode</th>
                                <td class="fw-semibold">{{ kycDetails.verification_mode }}</td>
                            </tr>

                            <tr>
                                <th class="text-muted fw-normal w-25">Verified At</th>
                                <td class="fw-semibold">{{ kycDetails.verified_at }}</td>
                            </tr>

                            <tr>
                                <th class="text-muted fw-normal w-25">Verified By</th>
                                <td class="fw-semibold">{{ kycDetails.verified_by }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal w-25">Review Comment</th>
                                <td class="fw-semibold">{{ kycDetails.review_comment }}</td>
                            </tr>

                            <tr>
                                <th class="text-muted fw-normal w-25">Is Expired</th>
                                <td class="fw-semibold" :class="kycDetails.is_expired ? 'text-danger' : 'text-success'">
                                    {{ kycDetails.is_expired ? 'Yes' : 'No' }}</td>
                            </tr>

                            <tr>
                                <th class="text-muted fw-normal w-25">Expired At</th>
                                <td class="fw-semibold">{{ kycDetails.expired_at }}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>

                <div class="mb-4">
                    <div class="border-bottom pb-1 mb-2">
                        <h6 class="fw-semibold text-muted mb-0">Documents</h6>
                    </div>

                    <table class="table table-sm table-bordered align-middle mb-0">
                        <thead>
                            <tr>
                                <th class="text-muted fw-normal">#</th>
                                <th class="text-muted fw-normal">Document Code</th>
                                <th class="text-muted fw-normal">Document Type</th>
                                <th class="text-muted fw-normal">Document Number Last 4 Digits</th>
                                <th class="text-muted fw-normal w-25">Document Front File</th>
                                <th class="text-muted fw-normal w-25">Document Back File</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr v-for="(docFile, i) in kycDetails.legal_documents" :key="docFile.id">
                                <td>{{ i + 1 }} </td>
                                <td>{{ docFile.legal_doc_code }}</td>
                                <td>{{ docFile.document_type }}</td>
                                <td>{{ docFile.document_number_last4 }}</td>
                                <td>
                                    <!-- <img v-if="docFile.document_url_front" :src="docFile.document_url_front"
                                        alt="Document Front" width="50" class="zoom-thumb"
                                        @click="openZoom(docFile.document_url_front)" /> -->

                                    <ImageZoomViewer
                                        v-if="kycDetails.status === 'pending' || kycDetails.status === 'under_review'"
                                        :src="docFile.document_url_front" :thumbWidth="75" />

                                    <span v-else class="text-muted">{{ docFile.status }}</span>



                                </td>
                                <td>
                                    <ImageZoomViewer
                                        v-if="kycDetails.status === 'pending' || kycDetails.status === 'under_review'"
                                        :src="docFile.document_url_back" :thumbWidth="75" />

                                    <span v-else class="text-muted">{{ docFile.status }}</span>

                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>


                <div class="mb-4">
                    <div class="d-flex justify-content-between align-items-center border-bottom pb-1 mb-2">
                        <h6 class="fw-semibold text-muted mb-0">Depot Details</h6>

                        <BaseButton size="sm" variant="secondary" @click="openDepotModal()">
                            Add New Depot
                        </BaseButton>
                    </div>

                    <table class="table table-sm table-bordered align-middle mb-0">
                        <thead>
                            <tr>
                                <th class="text-muted fw-normal">#</th>
                                <th class="text-muted fw-normal">Primary</th>
                                <th class="text-muted fw-normal">User Details</th>
                                <th class="text-muted fw-normal">Depot Details</th>
                                <th class="text-muted fw-normal">Action</th>

                            </tr>
                        </thead>
                        <tbody>

                            <tr v-for="(depot, i) in kycDetails.depots" :key="depot.id">
                                <td>{{ i + 1 }} </td>
                                <td><span :class="['badge', depot.is_primary ? 'bg-success' : 'bg-secondary']"> {{
                                    depot.is_primary ? "Yes" : "No" }} </span></td>
                                <td>
                                    {{ depot?.user?.user_code }}
                                    <br>{{ depot?.user?.name }}
                                </td>
                                <td>
                                    {{ depot?.depot?.code }}
                                    <br>{{ depot?.depot?.name }}
                                </td>
                                <td>
                                    <BaseButton iconOnly icon="fas fa-trash" variant="danger"
                                        @click="removeDepotAction(depot.id)" />

                                </td>

                            </tr>

                        </tbody>
                    </table>
                </div>


            </div>

        </template>
    </BaseCotainer>

    <!-- KYC Modal -->
    <BaseModal ref="kycModal" icon="fas fa-id-card">
        <template #title>
            KYC Verification
        </template>

        <form id="kycForm" @submit.prevent="submitKycStatusForm">

            <div class="col-md-12">
                <BaseInput label="User KYC ID" v-model="userKycForm.kyc_id" readonly />

                <BaseAutoCompleteSelect label="Status" v-model="userKycForm.status" :options="kycStatusList"
                    label-key="label" value-key="value" placeholder="Select status" required />


                <BaseInput label="Review Comment" v-model="userKycForm.review_comment"
                    placeholder="Enter Review Comment" required />
            </div>


            <div class="mt-2 d-flex align-items-center gap-2">
                <label class="form-label mb-0">
                    Confirm:
                    <strong>{{ a }} + {{ b }}</strong> =
                </label>

                <BaseInput v-model="confirmAnswer" type="number" class="w-50 mt-2" placeholder="?" required />
            </div>


        </form>

        <template #footer>
            <BaseButton variant="secondary" @click="closeKycModal()">
                Cancel
            </BaseButton>
            <BaseButton variant="primary" type="submit" form="kycForm" :loading="uiStore.isLoading">
                Save
            </BaseButton>
        </template>
    </BaseModal>

    <!-- User Depot -->
    <BaseModal ref="userDepotModal" icon="fas fa-map-marker-alt">
        <template #title>
            Assign New Depot
        </template>

        <form id="depotForm" @submit.prevent="submitDepotForm">
            <div class="col-md-6">
                <BaseInput label="User Code" v-model="kycDetails.user_code" readonly />
                <BaseInput label="User Id" v-model="userDepotForm.user_id" readonly hidden />
            </div>
            <div class="col-md-12">
                <BaseAutoCompleteSelect label="Depots" v-model="userDepotForm.depot_id" :options="depotList"
                    :label-key="['zone.state.name', 'code', 'name', 'zone.name']" :value-key="'id'"
                    placeholder="Select depot" required />
            </div>
            <div class=" border rounded-3 p-3 bg-light">
                <label class="form-label fw-semibold mb-2">Status</label>

                <div class="d-flex align-items-center justify-content-between">
                    <span class="text-muted">
                        Charge Level is
                        <b :class="userDepotForm.is_primary ? 'text-success' : 'text-danger'">
                            {{ userDepotForm.is_primary ? "Primary" : "Not" }}
                        </b>
                    </span>

                    <!-- TOGGLE -->
                    <div class="status-toggle" :class="{ active: userDepotForm.is_primary }"
                        @click="userDepotForm.is_primary = !userDepotForm.is_primary">
                        <span class="toggle-knob"></span>
                    </div>
                </div>
            </div>
        </form>

        <template #footer>
            <BaseButton variant="secondary" @click="closeDepotModal()">
                Cancel
            </BaseButton>
            <BaseButton variant="primary" type="submit" form="depotForm" :loading="uiStore.isLoading">
                Save
            </BaseButton>
        </template>
    </BaseModal>


</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useUIStore } from "@/core/utils/stores/uiStore";
import {
    fetchKycDetails,
    updateKycStatus,

} from "@/core/repos/admin/legal/legalRepos";
import { fetchDepots } from "@/core/repos/admin/master/masterRepos";
import { addCustomerDepot, removeCustomerDepot } from "@/core/repos/admin/customer/customerRepos";
import { fetchAllEnums } from "@/core/repos/utils/utilsRepos";


import { useRoute } from "vue-router";

import BaseCotainer from "@/components/common/cards/BaseContainer.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import BaseInput from "@/components/common/inputs/BaseInput.vue";
import BaseModal from "@/components/common/modal/BaseModal.vue";
import BaseAutoCompleteSelect from "@/components/common/inputs/BaseAutoCompleteSelect.vue";

import ImageZoomViewer from "@/components/common/other/ImageZoomViewer.vue";
import { showConfirmDialog } from "@/core/utils/uiHelpers/swalUtils.js";

const a = ref(0);
const b = ref(0);
const confirmAnswer = ref("");

const generateCaptcha = () => {
    a.value = Math.floor(Math.random() * 9) + 1; // 1–9
    b.value = Math.floor(Math.random() * 9) + 1; // 1–9
    confirmAnswer.value = "";
};

onMounted(generateCaptcha);

const isConfirmValid = computed(() =>
    Number(confirmAnswer.value) === a.value + b.value
);



/* ---------------- STATE ---------------- */
const uiStore = useUIStore();
const route = useRoute();

const kycId = ref(route.params.id);
const kycDetails = ref([]);
const depotList = ref([]);
const kycStatusList = ref([]);

const userDepotModal = ref(null);
const kycModal = ref(null);



const userDepotForm = ref({
    id: null,
    user_id: null,
    depot_id: null,
    is_primary: false,
});

const resetUserDepotForm = ref({
    id: null,
    user_id: null,
    depot_id: null,
    is_primary: false,
});


const userKycForm = ref({
    id: null,
    kyc_id: "",
    status: null,
    review_comment: "",
});

const resetUserKycForm = ref({
    id: null,
    kyc_id: "",
    status: "",
    review_comment: "",
});

/* ---------------- INIT ---------------- */
onMounted(() => loadKycDetails(kycId.value));

/* ---------------- LOAD ---------------- */
async function loadKycDetails(id) {
    const data = await fetchKycDetails(id);
    if (!data) {
        return;
    }
    kycDetails.value = data;
}

/* ---------------- DEPOT MODAL ---------------- */

async function openDepotModal() {
    depotList.value = await fetchDepots({ is_active: true });
    userDepotForm.value = {
        user_id: kycDetails.value.user_id,
    };
    userDepotModal.value.show();
}

function closeDepotModal() {
    userDepotModal.value.hide();
    resetUserDepotForm.value = { ...resetUserDepotForm.value };
}

const submitDepotForm = async () => {
    await addCustomerDepot(userDepotForm.value);
    closeDepotModal();
    // kycDetails.value = [];
    await loadKycDetails(kycId.value);
};

const removeDepotAction = async (id) => {
    const confirmed = await showConfirmDialog(
        "Remove Depot",
        "Are you sure you want to remove this depot?"
    );
    if (!confirmed) return;
    await removeCustomerDepot(id);
    kycDetails.value = [];
    await loadKycDetails(kycId.value);
}


/* ---------------- KYC MODAL ---------------- */

// true false is depot exist or not so can sue for multiplue places

const hasDepots = computed(() => {
    return Array.isArray(kycDetails.value?.depots) &&
        kycDetails.value.depots.length > 0;
});

const canKycStatusUpdate = computed(() => {
    return uiStore.isSuperAdminGroup() || kycDetails.value.status === 'under_review';
});

async function openKycModal() {
    // Check deptos exist or not of users
    if (!hasDepots.value) {
        uiStore.errorMessages = ["Please assign at least one depot to the user before verifying KYC.", "warning"];
        return;
    }
    // Get all enums for kyc status
    var data = await fetchAllEnums();

    if (!data) {
        return;
    }
    // console.log("KYC Statuses:", data);
    generateCaptcha();

    resetUserDepotForm.value = { ...resetUserKycForm.value };

    kycStatusList.value = data.kyc_statuses;
    userKycForm.value.kyc_id = kycId || kycDetails.value.id; // assign kyc id to form
    userKycForm.value.status = kycDetails.value.status;
    userKycForm.value.review_comment = kycDetails.value.review_comment;

    // Remove the status which currenly set to avoid reselecting same status
    kycStatusList.value = kycStatusList.value.filter((status => status.value !== kycDetails.value.status));

    kycModal.value.show();
}

function closeKycModal() {
    resetUserKycForm.value = { ...resetUserKycForm.value };
    kycModal.value.hide();
}

/* ---------------- SAVE KYC STATUS ---------------- */
async function submitKycStatusForm() {

    if (!isConfirmValid.value) {
        uiStore.errorMessages = ["Confirmation failed. Please solve the sum."];
        generateCaptcha();
        return;
    }


    await updateKycStatus(kycId.value, userKycForm.value);
    closeKycModal();
    resetUserKycForm.value = { ...resetUserKycForm.value };
    kycDetails.value = [];
    await loadKycDetails(kycId.value);
}

</script>