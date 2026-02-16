<template>
    <BaseContainer :heading="'Vehicle KYC Details : ' + vehicleKycDetails?.vehicle_kyc_code">

        <template #body>

            <div v-if="vehicleKycDetails" class="container-fluid px-0">

                <!-- ================= USER INFO ================= -->
                <div class="mb-4">
                    <div class="border-bottom pb-1 mb-2">
                        <h6 class="fw-semibold text-muted mb-0">User Information</h6>
                    </div>

                    <table class="table table-sm table-borderless mb-0">
                        <tbody>
                            <tr>
                                <th class="w-25 text-muted fw-normal">User Code</th>
                                <td>{{ vehicleKycDetails?.user?.user_code }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal">User Name</th>
                                <td>{{ vehicleKycDetails?.user?.name }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal">Vehicle KYC Code</th>
                                <td class="fw-semibold">{{ vehicleKycDetails.vehicle_kyc_code }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- ================= VEHICLE BASIC ================= -->
                <div class="mb-4">
                    <div class="border-bottom pb-1 mb-2">
                        <h6 class="fw-semibold text-muted mb-0">Vehicle Basic Information</h6>
                    </div>

                    <table class="table table-sm table-borderless mb-0">
                        <tbody>
                            <tr>
                                <th class="w-25 text-muted fw-normal">Maker</th>
                                <td>{{ vehicleKycDetails.vehicle_maker }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal">Model</th>
                                <td>{{ vehicleKycDetails.vehicle_model }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal">Type</th>
                                <td>{{ vehicleKycDetails.vehicle_type }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal">Category</th>
                                <td>{{ vehicleKycDetails.vehicle_category }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal">Fuel Type</th>
                                <td>{{ vehicleKycDetails.vehicle_fuel_type }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal">Color</th>
                                <td>{{ vehicleKycDetails.vehicle_color }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal">License Plate</th>
                                <td class="fw-semibold">{{ vehicleKycDetails.license_plate_number }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- ================= DOCUMENT NUMBERS ================= -->
                <div class="mb-4">
                    <div class="border-bottom pb-1 mb-2">
                        <h6 class="fw-semibold text-muted mb-0">Document Numbers</h6>
                    </div>

                    <table class="table table-sm table-borderless mb-0">
                        <tbody>
                            <tr>
                                <th class="w-25 text-muted fw-normal">Driving License</th>
                                <td>{{ vehicleKycDetails.driving_license_number }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal">Registration Number</th>
                                <td>{{ vehicleKycDetails.registration_number }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal">Insurance Policy</th>
                                <td>{{ vehicleKycDetails.insurance_policy_number }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- ================= VEHICLE SPECS ================= -->
                <div class="mb-4">
                    <div class="border-bottom pb-1 mb-2">
                        <h6 class="fw-semibold text-muted mb-0">Vehicle Specifications</h6>
                    </div>

                    <table class="table table-sm table-borderless mb-0">
                        <tbody>
                            <tr>
                                <th class="w-25 text-muted fw-normal">Seating Capacity</th>
                                <td>{{ vehicleKycDetails.seating_capacity }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal">Load Capacity</th>
                                <td>{{ vehicleKycDetails.load_capacity_kg }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal">Engine CC</th>
                                <td>{{ vehicleKycDetails.engine_cc }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal">Transmission</th>
                                <td>{{ vehicleKycDetails.transmission_type }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal">Condition</th>
                                <td>{{ vehicleKycDetails.vehicle_condition }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- ================= PHYSICAL IDENTIFICATION ================= -->
                <div class="mb-4">
                    <div class="border-bottom pb-1 mb-2">
                        <h6 class="fw-semibold text-muted mb-0">Physical Identification</h6>
                    </div>

                    <table class="table table-sm table-borderless mb-0">
                        <tbody>
                            <tr>
                                <th class="w-25 text-muted fw-normal">Chassis Number</th>
                                <td>{{ vehicleKycDetails.chassis_number }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal">Engine Number</th>
                                <td>{{ vehicleKycDetails.engine_number }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal">Unique Mark</th>
                                <td>{{ vehicleKycDetails.vehicle_unique_mark }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal">Branding</th>
                                <td>{{ vehicleKycDetails.vehicle_branding }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- ================= VERIFICATION ================= -->
                <div class="mb-4">
                    <div class="d-flex justify-content-between align-items-center border-bottom pb-1 mb-2">
                        <h6 class="fw-semibold text-muted mb-0">Verification</h6>

                        <BaseButton size="sm" variant="primary" @click="openVehicleKycModal()"
                            :disabled="!canVehicleKycStatusUpdate">
                            Update Vehicle KYC Status
                        </BaseButton>
                    </div>

                    <table class="table table-sm table-borderless mb-0">
                        <tbody>
                            <tr>
                                <th class="w-25 text-muted fw-normal">Status</th>
                                <td>
                                    <span class="badge" :class="{
                                        'bg-secondary': vehicleKycDetails.status === 'pending',
                                        'bg-success': vehicleKycDetails.status === 'approved',
                                        'bg-danger': vehicleKycDetails.status === 'rejected',
                                        'bg-info': vehicleKycDetails.status === 'under_review',
                                    }">
                                        {{ vehicleKycDetails.status }}
                                    </span>
                                </td>
                            </tr>

                            <tr>
                                <th class="text-muted fw-normal">Verification Mode</th>
                                <td>{{ vehicleKycDetails.verification_mode }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal">Verified At</th>
                                <td>{{ vehicleKycDetails.verified_at }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal">Verified By</th>
                                <td>{{ vehicleKycDetails.verified_by }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal">Review Comment</th>
                                <td>{{ vehicleKycDetails.review_comment }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal">Expired</th>
                                <td>{{ vehicleKycDetails.is_expired ? 'Yes' : 'No' }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal">Expired At</th>
                                <td>{{ vehicleKycDetails.expired_at }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- ================= DOCUMENTS ================= -->
                <div class="mb-4">
                    <div class="border-bottom pb-1 mb-2">
                        <h6 class="fw-semibold text-muted mb-0">Vehicle Documents</h6>
                    </div>

                    <table class="table table-sm table-bordered align-middle mb-0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Code</th>
                                <th>Type</th>
                                <th>Front</th>
                                <th>Back</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(docFile, i) in vehicleKycDetails.legal_documents" :key="docFile.id">
                                <td>{{ i + 1 }}</td>
                                <td>{{ docFile.legal_doc_code }}</td>
                                <td>{{ docFile.document_type }}</td>
                                <td>
                                    <ImageZoomViewer
                                        v-if="vehicleKycDetails.status === 'pending' || vehicleKycDetails.status === 'under_review'"
                                        :src="docFile.document_url_front" :thumbWidth="75" />
                                </td>
                                <td>
                                    <ImageZoomViewer
                                        v-if="vehicleKycDetails.status === 'pending' || vehicleKycDetails.status === 'under_review'"
                                        :src="docFile.document_url_back" :thumbWidth="75" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

        </template>
    </BaseContainer>

    <!-- ================= VEHICLE KYC MODAL ================= -->
    <BaseModal ref="vehicleKycModal" icon="fas fa-car">
        <template #title>Vehicle KYC Verification</template>

        <form id="vehicleKycForm" @submit.prevent="submitVehicleKycStatusForm">

            <BaseInput label="Vehicle KYC ID" v-model="vehicleKycForm.kyc_id" readonly />

            <BaseAutoCompleteSelect label="Status" v-model="vehicleKycForm.status" :options="kycStatusList"
                label-key="label" value-key="value" required />

            <BaseInput label="Review Comment" v-model="vehicleKycForm.review_comment" required />

            <div class="mt-2 d-flex align-items-center gap-2">
                Confirm:
                <strong>{{ a }} + {{ b }}</strong> =
                <BaseInput v-model="confirmAnswer" type="number" class="w-50" required />
            </div>

        </form>

        <template #footer>
            <BaseButton variant="secondary" @click="closeVehicleKycModal()">Cancel</BaseButton>
            <BaseButton variant="primary" type="submit" form="vehicleKycForm" :loading="uiStore.isLoading">
                Save
            </BaseButton>
        </template>
    </BaseModal>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useUIStore } from "@/core/utils/stores/uiStore";

import {
    fetchVehicleKycDetails,
    updateVehicleKycStatus
} from "@/core/repos/admin/legal/legalRepos";

import { fetchAllEnums } from "@/core/repos/utils/utilsRepos";

import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import BaseInput from "@/components/common/inputs/BaseInput.vue";
import BaseModal from "@/components/common/modal/BaseModal.vue";
import BaseAutoCompleteSelect from "@/components/common/inputs/BaseAutoCompleteSelect.vue";
import ImageZoomViewer from "@/components/common/other/ImageZoomViewer.vue";

const uiStore = useUIStore();
const route = useRoute();

const vehicleKycId = ref(route.params.id);
const vehicleKycDetails = ref(null);

const vehicleKycModal = ref(null);

const a = ref(0);
const b = ref(0);
const confirmAnswer = ref("");

const generateCaptcha = () => {
    a.value = Math.floor(Math.random() * 9) + 1;
    b.value = Math.floor(Math.random() * 9) + 1;
    confirmAnswer.value = "";
};

const isConfirmValid = computed(() =>
    Number(confirmAnswer.value) === a.value + b.value
);

const kycStatusList = ref([]);

const vehicleKycForm = ref({
    kyc_id: "",
    status: "",
    review_comment: "",
});

onMounted(() => {
    loadVehicleKycDetails(vehicleKycId.value);
});

async function loadVehicleKycDetails(id) {
    const data = await fetchVehicleKycDetails(id);
    if (!data) return;
    vehicleKycDetails.value = data;
}

const canVehicleKycStatusUpdate = computed(() => {
    return uiStore.isSuperAdminGroup() ||
        vehicleKycDetails.value?.status === "under_review";
});

async function openVehicleKycModal() {

    const data = await fetchAllEnums();
    if (!data) return;

    generateCaptcha();

    kycStatusList.value = data.kyc_statuses.filter(
        s => s.value !== vehicleKycDetails.value.status
    );

    vehicleKycForm.value.vehicle_kyc_id = vehicleKycId.value;
    vehicleKycForm.value.status = vehicleKycDetails.value.status;
    vehicleKycForm.value.review_comment = vehicleKycDetails.value.review_comment;

    vehicleKycModal.value.show();
}

function closeVehicleKycModal() {
    vehicleKycModal.value.hide();
}

async function submitVehicleKycStatusForm() {

    if (!isConfirmValid.value) {
        uiStore.errorMessages = ["Confirmation failed."];
        generateCaptcha();
        return;
    }

    await updateVehicleKycStatus(vehicleKycId.value, vehicleKycForm.value);

    closeVehicleKycModal();
    vehicleKycDetails.value = null;

    await loadVehicleKycDetails(vehicleKycId.value);
}
</script>
