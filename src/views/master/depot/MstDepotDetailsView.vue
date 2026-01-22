<template>
    <BaseContainer heading="Depot Details">
        <template #body>
            <div v-if="depotDetails" class="container-fluid px-0">

                <!-- ================= BASIC INFO ================= -->
                <div class="mb-4">
                    <div class="border-bottom pb-1 mb-2">
                        <h6 class="fw-semibold text-muted mb-0">Basic Information</h6>
                    </div>

                    <table class="table table-sm table-borderless align-middle mb-0">
                        <tbody>
                            <tr>
                                <th class="text-muted fw-normal w-25">Depot Name</th>
                                <td class="fw-semibold">{{ depotDetails.name || "N/A" }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal">Depot Code</th>
                                <td>{{ depotDetails.code || "N/A" }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal">Other Code</th>
                                <td>{{ depotDetails.other_code || "N/A" }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal">Address Code</th>
                                <td>{{ depotDetails.addr_code || "N/A" }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal">Status</th>
                                <td>
                                    <span class="badge" :class="depotDetails.is_active ? 'bg-success' : 'bg-danger'">
                                        {{ depotDetails.is_active ? "Active" : "Inactive" }}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- ================= CAPACITY ================= -->
                <div class="mb-4">
                    <div class="border-bottom pb-1 mb-2">
                        <h6 class="fw-semibold text-muted mb-0">Capacity & Cut-off Timing</h6>
                    </div>

                    <table class="table table-sm table-borderless align-middle mb-0">
                        <tbody>
                            <tr>
                                <th class="text-muted fw-normal w-25">Max Capacity (KG)</th>
                                <td>{{ depotDetails.max_capacity_kg || "N/A" }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal">Current Load (KG)</th>
                                <td>{{ depotDetails.current_load_kg || "N/A" }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal">Buyer Cut-off</th>
                                <td>{{ depotDetails.buyer_cutoff_time || "N/A" }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal">Seller Cut-off</th>
                                <td>{{ depotDetails.seller_cutoff_time || "N/A" }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- ================= ZONE ================= -->
                <div class="mb-4">
                    <div class="border-bottom pb-1 mb-2">
                        <h6 class="fw-semibold text-muted mb-0">Zone Information</h6>
                    </div>

                    <table class="table table-sm table-borderless align-middle mb-0">
                        <tbody>
                            <tr>
                                <th class="text-muted fw-normal w-25">Zone Name</th>
                                <td>{{ depotDetails.zone?.name || "N/A" }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal">Zone Code</th>
                                <td>{{ depotDetails.zone?.code || "N/A" }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal">State</th>
                                <td>{{ depotDetails.zone?.state?.name || "N/A" }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- ================= ADDRESS ================= -->
                <div class="mb-4">
                    <div class="d-flex justify-content-between align-items-center border-bottom pb-1 mb-2">
                        <h6 class="fw-semibold text-muted mb-0">Address Details</h6>

                        <BaseButton size="sm" variant="secondary" @click="manageAddress">
                            {{ depotDetails.address ? "Edit Address" : "Add Address" }}
                        </BaseButton>
                    </div>

                    <table v-if="depotDetails.address" class="table table-sm table-borderless align-middle mb-0">
                        <tbody>
                            <!-- Address Name / Type -->
                            <tr v-if="depotDetails.address.addr_name">
                                <th class="text-muted fw-normal w-25">Address Name</th>
                                <td>{{ depotDetails.address.addr_name }}</td>
                            </tr>

                            <!-- Address Lines -->
                            <tr>
                                <th class="text-muted fw-normal">Address Line 1</th>
                                <td>{{ depotDetails.address.address_line1 || "N/A" }}</td>
                            </tr>

                            <tr v-if="depotDetails.address.address_line2">
                                <th class="text-muted fw-normal">Address Line 2</th>
                                <td>{{ depotDetails.address.address_line2 }}</td>
                            </tr>

                            <!-- Locality -->
                            <tr v-if="depotDetails.address.landmark">
                                <th class="text-muted fw-normal">Landmark</th>
                                <td>{{ depotDetails.address.landmark }}</td>
                            </tr>

                            <tr v-if="depotDetails.address.village">
                                <th class="text-muted fw-normal">Village</th>
                                <td>{{ depotDetails.address.village }}</td>
                            </tr>

                            <tr v-if="depotDetails.address.taluka">
                                <th class="text-muted fw-normal">Taluka</th>
                                <td>{{ depotDetails.address.taluka }}</td>
                            </tr>

                            <tr v-if="depotDetails.address.district">
                                <th class="text-muted fw-normal">District</th>
                                <td>{{ depotDetails.address.district }}</td>
                            </tr>

                            <!-- City / State -->
                            <tr>
                                <th class="text-muted fw-normal">City</th>
                                <td>{{ depotDetails.address.city || "N/A" }}</td>
                            </tr>

                            <tr>
                                <th class="text-muted fw-normal">State</th>
                                <td>
                                    {{ depotDetails.address.state || "N/A" }}
                                    <span v-if="depotDetails.address.state_iso" class="text-muted">
                                        ({{ depotDetails.address.state_iso }})
                                    </span>
                                </td>
                            </tr>

                            <tr>
                                <th class="text-muted fw-normal">Postal Code</th>
                                <td>{{ depotDetails.address.postal_code || "N/A" }}</td>
                            </tr>

                            <!-- Country -->
                            <tr v-if="depotDetails.address.country">
                                <th class="text-muted fw-normal">Country</th>
                                <td>
                                    {{ depotDetails.address.country }}
                                    <span v-if="depotDetails.address.country_iso" class="text-muted">
                                        ({{ depotDetails.address.country_iso }})
                                    </span>
                                </td>
                            </tr>

                            <!-- Contact -->
                            <tr v-if="depotDetails.address.contact_name">
                                <th class="text-muted fw-normal">Contact Name</th>
                                <td>{{ depotDetails.address.contact_name }}</td>
                            </tr>

                            <tr v-if="depotDetails.address.phone_number">
                                <th class="text-muted fw-normal">Phone</th>
                                <td>
                                    <span v-if="depotDetails.address.dial_code">
                                        +{{ depotDetails.address.dial_code }}
                                    </span>
                                    {{ depotDetails.address.phone_number }}
                                </td>
                            </tr>

                            <tr v-if="depotDetails.address.email">
                                <th class="text-muted fw-normal">Email</th>
                                <td class="text-break">{{ depotDetails.address.email }}</td>
                            </tr>

                            <!-- Geo -->
                            <tr v-if="depotDetails.address.latitude && depotDetails.address.longitude">
                                <th class="text-muted fw-normal">Coordinates</th>
                                <td>
                                    {{ depotDetails.address.latitude }},
                                    {{ depotDetails.address.longitude }}
                                </td>
                            </tr>

                            <!-- Status -->
                            <tr>
                                <th class="text-muted fw-normal">Status</th>
                                <td>
                                    <span class="badge"
                                        :class="depotDetails.address.is_active ? 'bg-success' : 'bg-danger'">
                                        {{ depotDetails.address.is_active ? "Active" : "Inactive" }}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div v-else class="text-muted small">
                        No address information available.
                    </div>

                </div>

                <!-- ================= PICTURE ================= -->
                <div>
                    <div class="d-flex justify-content-between align-items-center border-bottom pb-1 mb-2">
                        <h6 class="fw-semibold text-muted mb-0">Depot Picture</h6>

                        <div class="d-flex gap-2">
                            <BaseButton size="sm" variant="secondary" @click="uploadPicture">
                                {{ depotDetails.picture ? "Change Picture" : "Add Picture" }}
                            </BaseButton>

                            <BaseButton v-if="depotDetails.picture" size="sm" variant="outline-danger"
                                @click="removePicture">
                                Remove
                            </BaseButton>
                        </div>
                    </div>

                    <img v-if="depotDetails.picture" :src="depotDetails.picture" class="img-thumbnail"
                        style="max-width:160px" />

                    <div v-else class="text-muted small">No picture uploaded.</div>
                </div>

            </div>

            <div v-else class="text-center py-4 text-muted">
                Loading depot details…
            </div>
        </template>
    </BaseContainer>

    <!-- ADDRESS MODAL -->
    <!-- ADDRESS MODAL -->
    <BaseModal ref="addressModal" icon="fas fa-map-marker-alt" size="modal-lg">
        <template #title>
            {{ addressForm.id ? "Edit Address" : "Add Address" }}
        </template>

        <form id="addressForm" @submit.prevent="submitAddress">
            <!-- Address Name -->
            <div class="row">
                <div class="col-md-6">
                    <BaseInput label="Address Name" v-model="addressForm.addr_name" placeholder="e.g. Main Warehouse"
                        required />
                </div>
            </div>

            <!-- Address Lines -->
            <div class="row">
                <div class="col-md-6">
                    <BaseInput label="Address Line 1" v-model="addressForm.address_line1" required />
                </div>
                <div class="col-md-6">
                    <BaseInput label="Address Line 2" v-model="addressForm.address_line2" />
                </div>
            </div>

            <!-- Locality -->
            <div class="row">
                <div class="col-md-4">
                    <BaseInput label="Village" v-model="addressForm.village" />
                </div>
                <div class="col-md-4">
                    <BaseInput label="Taluka" v-model="addressForm.taluka" />
                </div>
                <div class="col-md-4">
                    <BaseInput label="City" v-model="addressForm.city" required />
                </div>
            </div>

            <!-- State & Postal -->
            <div class="row">
                <div class="col-md-4">
                    <BaseInput label="State" v-model="addressForm.state" required />
                </div>
                <div class="col-md-4">
                    <BaseInput label="State ISO" v-model="addressForm.state_iso" required />
                </div>
                <div class="col-md-4">
                    <BaseInput label="Postal Code" v-model="addressForm.postal_code" required />
                </div>
            </div>

            <!-- Geo Location -->
            <div class="row">
                <div class="col-md-6">
                    <BaseInput label="Latitude" type="number" step="any" v-model="addressForm.latitude" required />
                </div>
                <div class="col-md-6">
                    <BaseInput label="Longitude" type="number" step="any" v-model="addressForm.longitude" required />
                </div>
            </div>

            <!-- Contact -->
            <div class="row">
                <div class="col-md-6">
                    <BaseInput label="Contact Name" v-model="addressForm.contact_name" />
                </div>
                <div class="col-md-6">
                    <BaseInput label="Phone Number" v-model="addressForm.phone_number" />
                </div>
            </div>
        </form>

        <template #footer>
            <BaseButton variant="secondary" @click="closeAddressModal">
                Cancel
            </BaseButton>
            <BaseButton variant="primary" type="submit" form="addressForm" :loading="uiStore.isLoading">
                Save Address
            </BaseButton>
        </template>
    </BaseModal>


</template>



<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useUIStore } from "@/core/utils/stores/uiStore";
import BaseContainer from "@/components/common/cards/BaseContainer.vue";

import BaseModal from "@/components/common/modal/BaseModal.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import BaseInput from "@/components/common/inputs/BaseInput.vue";

import { showDepotDetails } from "@/core/repos/admin/master/masterRepos.js";
import { saveDepotAddress } from "@/core/repos/admin/master/masterRepos.js";

const route = useRoute();
const uiStore = useUIStore();

const depotId = ref(route.params.id);
const depotDetails = ref(null);

/* LOAD DEPOT */
onMounted(async () => {
    if (!depotId.value) return;
    depotDetails.value = await showDepotDetails(depotId.value);
});

/* ADDRESS MODAL STATE */
const addressModal = ref(null);

const addressForm = ref({
    id: null,
    depot_id: null,

    addr_name: "",
    address_line1: "",
    address_line2: "",

    village: "",
    taluka: "",
    city: "",
    state: "",
    state_iso: "",
    postal_code: "",

    latitude: "",
    longitude: "",

    contact_name: "",
    phone_number: "",

    is_active: true,
});

/* RESET */
function resetAddressForm() {
    addressForm.value = {
        id: null,
        depot_id: depotId.value,

        addr_name: "",
        address_line1: "",
        address_line2: "",

        village: "",
        taluka: "",
        city: "",
        state: "",
        state_iso: "",
        postal_code: "",

        latitude: "",
        longitude: "",

        contact_name: "",
        phone_number: "",

        is_active: true,
    };
}

/* OPEN MODAL */
function manageAddress() {
    resetAddressForm();

    if (depotDetails.value?.address) {
        addressForm.value = {
            ...depotDetails.value.address,
            depot_id: depotId.value,
        };
    }

    addressModal.value.show();
}

/* CLOSE MODAL */
function closeAddressModal() {
    addressModal.value.hide();
    resetAddressForm();
}

/* SAVE */
async function submitAddress() {
    const payload = { ...addressForm.value };

    const result = await saveDepotAddress(depotId.value, payload);

    // ❌ STOP on failure
    if (result === null) {
        return; // UI store already shows validation errors
    }

    // ✅ Only execute on SUCCESS
    closeAddressModal();
    depotDetails.value = await showDepotDetails(depotId.value);
}



const uploadPicture = () => {
    alert("Upload Picture functionality to be implemented.");
};

</script>
