<template>
    <BaseCotainer heading="FulfillmentLocation Details">

        <template #body>

            <div v-if="locationDetails" class="container-fluid px-0">

                <!-- ================= BASIC INFO ================= -->
                <div class="mb-4">
                    <div class="border-bottom pb-1 mb-2">
                        <h6 class="fw-semibold text-muted mb-0">Basic Information</h6>
                    </div>
                    <table class="table table-sm table-borderless align-middle mb-0">
                        <tbody>
                            <tr>
                                <th class="text-muted fw-normal w-25">User</th>
                                <td class="fw-semibold">
                                    <b>Customer Code:</b> {{ locationDetails?.user?.user_code }}
                                    <br /><b>Name:</b> {{ locationDetails?.user?.name }}
                                    <br /> <span :class="`role-${locationDetails?.user?.role}`">
                                        {{ locationDetails?.user?.role }}
                                    </span>

                                </td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal w-25">FL Code</th>
                                <td class="fw-semibold">{{ locationDetails.fl_code }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal w-25">Location Name</th>
                                <td class="fw-semibold">{{ locationDetails.name }}</td>
                            </tr>

                            <tr>
                                <th class="text-muted fw-normal w-25">Location Type</th>
                                <td class="fw-semibold">{{ locationDetails.type }}</td>
                            </tr>

                            <tr>
                                <th class="text-muted fw-normal w-25">Active/Inactive Status</th>
                                <td class="fw-semibold"><span class="badge"
                                        :class="locationDetails.is_active ? 'bg-success' : 'bg-danger'"> {{
                                            locationDetails.is_active ? 'Active' : 'Inactive' }} </span> </td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal w-25">Inactive Reason</th>
                                <td class="fw-semibold">{{ locationDetails.inactive_reason || "N/A" }}</td>
                            </tr>


                        </tbody>
                    </table>
                </div>

                <!-- ================= ADDRESS ================= -->
                <div class="mb-4">
                    <div class="d-flex justify-content-between align-items-center border-bottom pb-1 mb-2">
                        <h6 class="fw-semibold text-muted mb-0">Address Details</h6>

                        <!-- <BaseButton size="sm" variant="secondary" @click="manageAddress">
                            {{ locationDetails.address ? "Edit Address" : "Add Address" }}
                        </BaseButton> -->
                    </div>

                    <table v-if="locationDetails.address" class="table table-sm table-borderless align-middle mb-0">
                        <tbody>
                            <!-- Address Name / Type -->
                            <tr v-if="locationDetails.address.addr_name">
                                <th class="text-muted fw-normal w-25">Address Name</th>
                                <td>{{ locationDetails.address.addr_name }}</td>
                            </tr>

                            <!-- Address Lines -->
                            <tr>
                                <th class="text-muted fw-normal">Address Line 1</th>
                                <td>{{ locationDetails.address.address_line1 || "N/A" }}</td>
                            </tr>

                            <tr v-if="locationDetails.address.address_line2">
                                <th class="text-muted fw-normal">Address Line 2</th>
                                <td>{{ locationDetails.address.address_line2 }}</td>
                            </tr>

                            <!-- Locality -->
                            <tr v-if="locationDetails.address.landmark">
                                <th class="text-muted fw-normal">Landmark</th>
                                <td>{{ locationDetails.address.landmark }}</td>
                            </tr>

                            <tr v-if="locationDetails.address.village">
                                <th class="text-muted fw-normal">Village</th>
                                <td>{{ locationDetails.address.village }}</td>
                            </tr>

                            <tr v-if="locationDetails.address.taluka">
                                <th class="text-muted fw-normal">Taluka</th>
                                <td>{{ locationDetails.address.taluka }}</td>
                            </tr>

                            <tr v-if="locationDetails.address.district">
                                <th class="text-muted fw-normal">District</th>
                                <td>{{ locationDetails.address.district }}</td>
                            </tr>

                            <!-- City / State -->
                            <tr>
                                <th class="text-muted fw-normal">City</th>
                                <td>{{ locationDetails.address.city || "N/A" }}</td>
                            </tr>

                            <tr>
                                <th class="text-muted fw-normal">State</th>
                                <td>
                                    {{ locationDetails.address.state || "N/A" }}
                                    <span v-if="locationDetails.address.state_iso" class="text-muted">
                                        ({{ locationDetails.address.state_iso }})
                                    </span>
                                </td>
                            </tr>

                            <tr>
                                <th class="text-muted fw-normal">Postal Code</th>
                                <td>{{ locationDetails.address.postal_code || "N/A" }}</td>
                            </tr>

                            <!-- Country -->
                            <tr v-if="locationDetails.address.country">
                                <th class="text-muted fw-normal">Country</th>
                                <td>
                                    {{ locationDetails.address.country }}
                                    <span v-if="locationDetails.address.country_iso" class="text-muted">
                                        ({{ locationDetails.address.country_iso }})
                                    </span>
                                </td>
                            </tr>

                            <!-- Contact -->
                            <tr v-if="locationDetails.address.contact_name">
                                <th class="text-muted fw-normal">Contact Name</th>
                                <td>{{ locationDetails.address.contact_name }}</td>
                            </tr>

                            <tr v-if="locationDetails.address.phone_number">
                                <th class="text-muted fw-normal">Phone</th>
                                <td>
                                    <span v-if="locationDetails.address.dial_code">
                                        +{{ locationDetails.address.dial_code }}
                                    </span>
                                    {{ locationDetails.address.phone_number }}
                                </td>
                            </tr>

                            <tr v-if="locationDetails.address.email">
                                <th class="text-muted fw-normal">Email</th>
                                <td class="text-break">{{ locationDetails.address.email }}</td>
                            </tr>

                            <!-- Geo -->
                            <tr v-if="locationDetails.address.latitude && locationDetails.address.longitude">
                                <th class="text-muted fw-normal">Coordinates</th>
                                <td>
                                    {{ locationDetails.address.latitude }},
                                    {{ locationDetails.address.longitude }}
                                </td>
                            </tr>

                            <!-- Status -->
                            <tr>
                                <th class="text-muted fw-normal">Status</th>
                                <td>
                                    <span class="badge"
                                        :class="locationDetails.address.is_active ? 'bg-success' : 'bg-danger'">
                                        {{ locationDetails.address.is_active ? "Active" : "Inactive" }}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div v-else class="text-muted small">
                        No address information available.
                    </div>

                </div>

                <!-- ================= VERIFICATIONS ================= -->
                <div class="mb-4">
                    <div class="d-flex justify-content-between align-items-center border-bottom pb-1 mb-2">
                        <h6 class="fw-semibold text-muted mb-0">Verifications</h6>

                        <BaseButton size="sm" variant="primary" @click="openKycModal()"
                            :disabled="!hasDepots || !canKycStatusUpdate">
                            Update Verification Status
                        </BaseButton>
                    </div>

                    <table class="table table-sm table-borderless align-middle mb-0">
                        <tbody>
                            <tr>
                                <th class="text-muted fw-normal w-25">Verification Status</th>
                                <td class="fw-semibold ">
                                    <span class="badge" :class="{
                                        'bg-secondary': locationDetails.status === 'pending',
                                        'bg-success': locationDetails.status === 'approved',
                                        'bg-danger': locationDetails.status === 'rejected',
                                        'bg-info': locationDetails.status === 'under_review',
                                    }">
                                        {{ locationDetails.status }}
                                    </span>

                                </td>
                            </tr>

                            <tr>
                                <th class=" text-muted fw-normal w-25">Verification Mode</th>
                                <td class="fw-semibold">{{ locationDetails.verification_mode }}</td>
                            </tr>

                            <tr>
                                <th class="text-muted fw-normal w-25">Verified At</th>
                                <td class="fw-semibold">{{ locationDetails.verified_at }}</td>
                            </tr>

                            <tr>
                                <th class="text-muted fw-normal w-25">Verified By</th>
                                <td class="fw-semibold">{{ locationDetails.verified_by }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal w-25">Review Comment</th>
                                <td class="fw-semibold">{{ locationDetails.review_comment }}</td>
                            </tr>

                            <tr>
                                <th class="text-muted fw-normal w-25">Is Expired</th>
                                <td class="fw-semibold"
                                    :class="locationDetails.is_expired ? 'text-danger' : 'text-success'">
                                    {{ locationDetails.is_expired ? 'Yes' : 'No' }}</td>
                            </tr>

                            <tr>
                                <th class="text-muted fw-normal w-25">Expired At</th>
                                <td class="fw-semibold">{{ locationDetails.expired_at }}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>

                <!-- ================= DEPOTS =================-->
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
                                <th class="text-muted fw-normal">Location Details</th>
                                <th class="text-muted fw-normal">Depot Details</th>
                                <th class="text-muted fw-normal">Action</th>

                            </tr>
                        </thead>
                        <tbody>

                            <tr v-for="(depot, i) in locationDetails.depots" :key="depot.id">
                                <td>{{ i + 1 }} </td>
                                <td><span :class="['badge', depot.is_primary ? 'bg-success' : 'bg-secondary']"> {{
                                    depot.is_primary ? "Yes" : "No" }} </span></td>
                                <td>
                                    {{ depot?.fulfillment_location?.fl_code }}
                                    <br>{{ depot?.fulfillment_location?.name }}
                                    <br>{{ depot?.fulfillment_location?.type }}
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
    <BaseModal ref="locationDepotModal" icon="fas fa-map-marker-alt">
        <template #title>
            Assign New Depot
        </template>

        <form id="depotForm" @submit.prevent="submitDepotForm">
            <div class="col-md-6">
                <BaseInput label="FL Code" v-model="locationDetails.fl_code" readonly />
                <BaseInput label="Location Id" v-model="locationDepotForm.fulfillment_location_id" readonly hidden />
            </div>
            <div class="col-md-12">
                <BaseAutoCompleteSelect label="Depots" v-model="locationDepotForm.depot_id" :options="depotList"
                    :label-key="['zone.state.name', 'code', 'name', 'zone.name']" :value-key="'id'"
                    placeholder="Select depot" required />
            </div>
            <div class=" border rounded-3 p-3 bg-light">
                <label class="form-label fw-semibold mb-2">Status</label>

                <div class="d-flex align-items-center justify-content-between">
                    <span class="text-muted">
                        Charge Level is
                        <b :class="locationDepotForm.is_primary ? 'text-success' : 'text-danger'">
                            {{ locationDepotForm.is_primary ? "Primary" : "Not" }}
                        </b>
                    </span>

                    <!-- TOGGLE -->
                    <div class="status-toggle" :class="{ active: locationDepotForm.is_primary }"
                        @click="locationDepotForm.is_primary = !locationDepotForm.is_primary">
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
import { fetchFulfillmentLocationDetails, updateFulfillmentLocation, addFulfillmentLocationDepot, removeFulfillmentLocationDepot } from "@/core/repos/admin/common/fulfillmentLocationRepos";
import { useRoute } from "vue-router";
import { fetchDepots } from "@/core/repos/admin/master/masterRepos";
import { fetchAllEnums } from "@/core/repos/utils/utilsRepos";


import BaseCotainer from "@/components/common/cards/BaseContainer.vue";
import BaseModal from "@/components/common/modal/BaseModal.vue";

import BaseButton from "@/components/common/buttons/BaseButton.vue";
import BaseInput from "@/components/common/inputs/BaseInput.vue";
import BaseAutoCompleteSelect from "@/components/common/inputs/BaseAutoCompleteSelect.vue";

import { showConfirmDialog } from "@/core/utils/uiHelpers/swalUtils.js";


import router from "@/router";
/* ---------------- STATE ---------------- */
const uiStore = useUIStore();
const route = useRoute();

const locationId = ref(route.params.id);
const locationDetails = ref([]);

const locationDepotModal = ref(null);
const kycModal = ref(null);

const depotList = ref([]);
const kycStatusList = ref([]);

const locationDepotForm = ref({
    id: null,
    fulfillment_location_id: "",
    depot_id: "",
    is_primary: false,
});

const resetlocationDepotForm = ref({
    id: null,
    fulfillment_location_id: "",
    depot_id: "",
    is_primary: false,
});

const a = ref(0);
const b = ref(0);
const confirmAnswer = ref("");

const generateCaptcha = () => {
    a.value = Math.floor(Math.random() * 9) + 1; // 1–9
    b.value = Math.floor(Math.random() * 9) + 1; // 1–9
    confirmAnswer.value = "";
};


const isConfirmValid = computed(() =>
    Number(confirmAnswer.value) === a.value + b.value
);



/* ---------------- INIT ---------------- */
onMounted(() => {
    loadDetails();
    generateCaptcha();
});

/* ---------------- LOAD ---------------- */
async function loadDetails() {
    const data = await fetchFulfillmentLocationDetails(locationId.value);

    if (!data) {
        return;
    }

    locationDetails.value = data;

}



/* ---------------- DEPOT MODAL ---------------- */

async function openDepotModal() {
    depotList.value = await fetchDepots({ is_active: true });
    locationDepotForm.value = {
        fulfillment_location_id: locationDetails.value.id,
    };
    locationDepotModal.value.show();
}

function closeDepotModal() {
    locationDepotModal.value.hide();
    resetlocationDepotForm.value = { ...resetlocationDepotForm.value };
}

const submitDepotForm = async () => {
    await addFulfillmentLocationDepot(locationDepotForm.value);
    closeDepotModal();
    // locationDetails.value = [];
    await loadDetails(locationId.value);
};

const removeDepotAction = async (id) => {
    const confirmed = await showConfirmDialog(
        "Remove Depot",
        "Are you sure you want to remove this depot?"
    );
    if (!confirmed) return;
    await removeFulfillmentLocationDepot(id);
    locationDetails.value = [];
    await loadDetails(locationId.value);
}

const userKycForm = ref({
    id: null,
    status: null,
    review_comment: "",
});

const resetUserKycForm = ref({
    id: null,
    status: "",
    review_comment: "",
});



/* ---------------- KYC MODAL ---------------- */

// true false is depot exist or not so can sue for multiplue places

const hasDepots = computed(() => {
    return Array.isArray(locationDetails.value?.depots) &&
        locationDetails.value.depots.length > 0;
});

const canKycStatusUpdate = computed(() => {
    return uiStore.isSuperAdminGroup() || locationDetails.value.status === 'under_review';
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
    resetUserKycForm.value = { ...resetUserKycForm.value };
    generateCaptcha();


    kycStatusList.value = data.kyc_statuses;
    userKycForm.value.status = locationDetails.value.status;
    userKycForm.value.review_comment = locationDetails.value.review_comment;

    // Remove the status which currenly set to avoid reselecting same status
    kycStatusList.value = kycStatusList.value.filter((status => status.value !== locationDetails.value.status));

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


    await updateFulfillmentLocation(locationId.value, userKycForm.value);
    closeKycModal();
    resetUserKycForm.value = { ...resetUserKycForm.value };
    locationDetails.value = [];
    await loadDetails(locationId.value);
}


</script>