<template>

    <BaseContainer heading="Customer Search">
        <template #body>
            <div class="row">
                <div class="col-md-5">
                    <CustomerSearchComponent v-model="selectedCustomer" required />
                </div>

                <div class="col-md-2">
                    <br>
                    <BaseButton class="mt-2" @click="searchCustomerDetails" :disabled="!selectedCustomer">
                        View Details
                    </BaseButton>
                </div>
            </div>

        </template>
    </BaseContainer>


    <BaseContainer heading="Customer Details" v-if="customerDetails">

        <template #body>

            <!-- ================= USER INFO ================= -->
            <div class="mb-4">
                <div class="d-flex justify-content-between align-items-center border-bottom pb-1 mb-2">
                    <h6 class="fw-semibold text-muted mb-0">Customer Details</h6>

                    <BaseButton size="sm" variant="secondary" @click="openEditUserModal()">
                        Edit Customer
                    </BaseButton>
                </div>

                <table class="table table-sm table-borderless mb-0">
                    <tbody>
                        <tr>
                            <th class="w-25 text-muted fw-normal">User Code</th>
                            <td>{{ customerDetails?.user_code }}</td>
                        </tr>
                        <tr>
                            <th class="text-muted fw-normal">User Nick Name</th>
                            <td>{{ customerDetails?.nickname }}</td>
                        </tr>
                        <tr>
                            <th class="text-muted fw-normal">User Name</th>
                            <td>{{ customerDetails?.name }}</td>
                        </tr>
                        <tr>
                            <th class="text-muted fw-normal">User Role</th>
                            <td>
                                <span :class="`role-${customerDetails?.role}`">
                                    {{ customerDetails?.role }}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <th class="text-muted fw-normal">User Type</th>
                            <td>
                                <span :class="`role-${customerDetails?.user_type}`">
                                    {{ customerDetails?.user_type }}
                                </span>
                            </td>
                        </tr>

                        <tr>
                            <th class="text-muted fw-normal">Status</th>
                            <td>
                                <StatusBadge :status="customerDetails?.is_active ? 'active' : 'inactive'" />
                                <br> <span v-if="!customerDetails.is_active">{{ customerDetails?.inactive_reason
                                }}</span>
                            </td>
                        </tr>
                        <tr>
                            <th class="text-muted fw-normal">Last Login</th>
                            <td>{{ customerDetails?.last_login }}</td>
                        </tr>

                        <tr>
                            <th class="text-muted fw-normal">Last Login IP</th>
                            <td>{{ customerDetails?.last_login_ip }}</td>
                        </tr>

                    </tbody>
                </table>
            </div>

            <!-- ================= User Summary =================-->
            <div class="mb-4">
                <div class="d-flex justify-content-between align-items-center border-bottom pb-1 mb-2">
                    <h6 class="fw-semibold text-muted mb-0">Summary</h6>
                </div>

                <table class="table table-sm table-borderless mb-0">
                    <tbody>
                        <tr>
                            <th class="w-25 text-muted fw-normal">Total Orders</th>
                            <td class="fw-semibold text-dark">{{ customerDetails?.summary?.total_orders }}</td>
                        </tr>
                        <tr>
                            <th class="w-25 text-muted fw-normal">Total Product Listings</th>
                            <td class="fw-semibold text-dark">{{ customerDetails?.summary?.total_product_listings }}
                            </td>
                        </tr>
                        <tr>
                            <th class="w-25 text-muted fw-normal">Total Deliveries</th>
                            <td class="fw-semibold text-dark">{{ customerDetails?.summary?.total_deliveries }}
                            </td>
                        </tr>
                        <hr>

                        <tr>
                            <th class="w-25 text-muted fw-normal">Depot Assigned</th>
                            <td class="fw-semibold">{{ customerDetails?.is_depot_assigned ? "Yes" : "No" }}
                            </td>
                        </tr>

                        <tr>
                            <th class="w-25 text-muted fw-normal">Fulfillment Location Exist</th>
                            <td class="fw-semibold">{{ customerDetails?.is_fulfillment_location_exist ? "Yes" :
                                "No" }}
                            </td>
                        </tr>

                        <tr>
                            <th class="w-25 text-muted fw-normal">KYC Approved</th>
                            <td class="fw-semibold">{{ customerDetails?.is_kyc_approved ? "Yes" : "No" }}
                            </td>
                        </tr>

                        <tr>
                            <th class="w-25 text-muted fw-normal">Bank Verified</th>
                            <td class="fw-semibold">{{ customerDetails?.is_bank_verified ? "Yes" : "No" }}
                            </td>
                        </tr>
                        <tr>
                            <th class="w-25 text-muted fw-normal">Test User</th>
                            <td class="fw-semibold">{{ customerDetails?.is_test_user ? "Yes" : "No" }}
                            </td>
                        </tr>
                        <tr>
                            <th class="w-25 text-muted fw-normal">Important User</th>
                            <td class="fw-semibold">{{ customerDetails?.is_important ? "Yes" : "No" }}
                            </td>
                        </tr>

                    </tbody>
                </table>


            </div>

            <!-- ================= ADDRESS ================= -->
            <div class="mb-4">
                <div class="d-flex justify-content-between align-items-center border-bottom pb-1 mb-2">
                    <h6 class="fw-semibold text-muted mb-0">User Address Details</h6>
                </div>

                <table v-if="customerDetails.address" class="table table-sm table-borderless align-middle mb-0">
                    <tbody>
                        <!-- Address Name / Type -->
                        <tr v-if="customerDetails.address.addr_name">
                            <th class="text-muted fw-normal w-25">Address Name</th>
                            <td>{{ customerDetails.address.addr_name }}</td>
                        </tr>

                        <!-- Address Lines -->
                        <tr>
                            <th class="text-muted fw-normal">Address Line 1</th>
                            <td>{{ customerDetails.address.address_line1 || "N/A" }}</td>
                        </tr>

                        <tr v-if="customerDetails.address.address_line2">
                            <th class="text-muted fw-normal">Address Line 2</th>
                            <td>{{ customerDetails.address.address_line2 }}</td>
                        </tr>

                        <!-- Locality -->
                        <tr v-if="customerDetails.address.landmark">
                            <th class="text-muted fw-normal">Landmark</th>
                            <td>{{ customerDetails.address.landmark }}</td>
                        </tr>

                        <tr v-if="customerDetails.address.village">
                            <th class="text-muted fw-normal">Village</th>
                            <td>{{ customerDetails.address.village }}</td>
                        </tr>

                        <tr v-if="customerDetails.address.taluka">
                            <th class="text-muted fw-normal">Taluka</th>
                            <td>{{ customerDetails.address.taluka }}</td>
                        </tr>

                        <tr v-if="customerDetails.address.district">
                            <th class="text-muted fw-normal">District</th>
                            <td>{{ customerDetails.address.district }}</td>
                        </tr>

                        <!-- City / State -->
                        <tr>
                            <th class="text-muted fw-normal">City</th>
                            <td>{{ customerDetails.address.city || "N/A" }}</td>
                        </tr>

                        <tr>
                            <th class="text-muted fw-normal">State</th>
                            <td>
                                {{ customerDetails.address.state || "N/A" }}
                                <span v-if="customerDetails.address.state_iso" class="text-muted">
                                    ({{ customerDetails.address.state_iso }})
                                </span>
                            </td>
                        </tr>

                        <tr>
                            <th class="text-muted fw-normal">Postal Code</th>
                            <td>{{ customerDetails.address.postal_code || "N/A" }}</td>
                        </tr>

                        <!-- Country -->
                        <tr v-if="customerDetails.address.country">
                            <th class="text-muted fw-normal">Country</th>
                            <td>
                                {{ customerDetails.address.country }}
                                <span v-if="customerDetails.address.country_iso" class="text-muted">
                                    ({{ customerDetails.address.country_iso }})
                                </span>
                            </td>
                        </tr>

                        <!-- Contact -->
                        <tr v-if="customerDetails.address.contact_name">
                            <th class="text-muted fw-normal">Contact Name</th>
                            <td>{{ customerDetails.address.contact_name }}</td>
                        </tr>

                        <tr v-if="customerDetails.address.phone_number">
                            <th class="text-muted fw-normal">Phone</th>
                            <td>
                                <span v-if="customerDetails.address.dial_code">
                                    +{{ customerDetails.address.dial_code }}
                                </span>
                                <span class="masked-value"> {{ customerDetails.address.phone_number }}</span>
                            </td>
                        </tr>

                        <tr v-if="customerDetails.address.email">
                            <th class="text-muted fw-normal">Email</th>
                            <td class="text-break"><span class="masked-value">{{ customerDetails.address.email }}</span>
                            </td>
                        </tr>

                        <!-- Geo -->
                        <tr v-if="customerDetails.address.latitude && customerDetails.address.longitude">
                            <th class="text-muted fw-normal">Coordinates</th>
                            <td>
                                {{ customerDetails.address.latitude }},
                                {{ customerDetails.address.longitude }}
                            </td>
                        </tr>

                        <!-- Status -->
                        <tr>
                            <th class="text-muted fw-normal">Status</th>
                            <td>
                                <span class="badge"
                                    :class="customerDetails.address.is_active ? 'bg-success' : 'bg-danger'">
                                    {{ customerDetails.address.is_active ? "Active" : "Inactive" }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div v-else class="text-muted small">
                    No address information available.
                </div>

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
                            <th class="text-muted fw-normal">User Details</th>
                            <th class="text-muted fw-normal">Depot Details</th>
                            <th class="text-muted fw-normal">Action</th>

                        </tr>
                    </thead>
                    <tbody>

                        <tr v-for="(depot, i) in customerDetails.depots" :key="depot.id">
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


            <!-- ================= Fulfillment Locations =================-->
            <div class="mb-4">
                <div class="d-flex justify-content-between align-items-center border-bottom pb-1 mb-2">
                    <h6 class="fw-semibold text-muted mb-0">Fulfillment Locations</h6>
                </div>

                <table class="table table-sm table-bordered align-middle mb-0">
                    <thead>
                        <tr>
                            <th class="text-muted fw-normal">#</th>
                            <th class="text-muted fw-normal">FL Code</th>
                            <th class="text-muted fw-normal">Name</th>
                            <th class="text-muted fw-normal">Type</th>
                            <th class="text-muted fw-normal">Address</th>
                            <th class="text-muted fw-normal">Status</th>


                        </tr>
                    </thead>
                    <tbody>

                        <tr v-for="(flLocation, i) in customerDetails.fulfillment_locations" :key="flLocation.id">
                            <td>{{ i + 1 }} </td>
                            <td>{{ flLocation.fl_code }}</td>
                            <td>{{ flLocation.name }}</td>
                            <td>{{ flLocation.type }}</td>
                            <td>
                                {{ flLocation.address.address_line1 }},
                                {{ flLocation.address.address_line2 }},
                                <br>
                                {{ flLocation.address.village }},
                                {{ flLocation.address.city }},
                                {{ flLocation.address.postal_code }},
                                {{ flLocation.address.state }}
                                <br>
                                C:{{ flLocation.address.contact_name }} <br>
                                P:{{ flLocation.address.phone_number }}

                            </td>
                            <td>
                                <StatusBadge :status="flLocation.status" />
                            </td>

                        </tr>

                    </tbody>
                </table>
            </div>





        </template>

    </BaseContainer>

    <!-- User Depot -->
    <BaseModal ref="userDepotModal" icon="fas fa-map-marker-alt">
        <template #title>
            Assign New Depot
        </template>

        <form id="depotForm" @submit.prevent="submitDepotForm">
            <div class="col-md-6">
                <BaseInput label="User Code" :model-value="customerDetails?.user_code" readonly />
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
                        Active Status is
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

    <!-- User Data -->
    <BaseModal ref="editUserModal" icon="fas fa-map-marker-alt">
        <template #title>
            Edit Customer Details
        </template>

        <form id="editUserForm" @submit.prevent="submitEditUserForm">


            <div class=" border rounded-3 p-3 bg-light">
                <label class="form-label fw-semibold mb-2">Status</label>

                <div class="d-flex align-items-center justify-content-between">
                    <span class="text-muted">
                        Charge Level is
                        <b :class="editUserForm.is_active ? 'text-success' : 'text-danger'">
                            {{ editUserForm.is_active ? "Active" : "Inactive" }}
                        </b>
                    </span>

                    <!-- TOGGLE -->
                    <div class="status-toggle" :class="{ active: editUserForm.is_active }"
                        @click="editUserForm.is_active = !editUserForm.is_active">
                        <span class="toggle-knob"></span>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <BaseInput v-if="!editUserForm.is_active" label="Inactive Reason" v-model="editUserForm.inactive_reason"
                    :required="!editUserForm.is_active" />
            </div>



            <div class=" border rounded-3 p-3 bg-light mt-3">
                <label class="form-label fw-semibold mb-2">Important Status</label>

                <div class="d-flex align-items-center justify-content-between">
                    <span class="text-muted">
                        Customer Is Important:
                        <b :class="editUserForm.is_important ? 'text-success' : 'text-danger'">
                            {{ editUserForm.is_important ? "Yes" : "No" }}
                        </b>
                    </span>

                    <!-- TOGGLE -->
                    <div class="status-toggle" :class="{ active: editUserForm.is_important }"
                        @click="editUserForm.is_important = !editUserForm.is_important">
                        <span class="toggle-knob"></span>
                    </div>
                </div>
            </div>
        </form>

        <template #footer>
            <BaseButton variant="secondary" @click="closeEditUserModal()">
                Cancel
            </BaseButton>
            <BaseButton variant="primary" type="submit" form="editUserForm" :loading="uiStore.isLoading">
                Save
            </BaseButton>
        </template>
    </BaseModal>


</template>

<script setup>
import { ref } from "vue";
import { useUIStore } from "@/core/utils/stores/uiStore";

import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import BaseInput from "@/components/common/inputs/BaseInput.vue";
import BaseModal from "@/components/common/modal/BaseModal.vue";
import BaseAutoCompleteSelect from "@/components/common/inputs/BaseAutoCompleteSelect.vue";
import CustomerSearchComponent from "@/components/common/forms/CustomerSearchComponent.vue";
import StatusBadge from "@/components/common/badge/StatusBadge.vue";

import { showConfirmDialog } from "@/core/utils/uiHelpers/swalUtils.js";
import { fetchDepots } from "@/core/repos/admin/master/masterRepos";

import {
    getCustomDetailsByCode,
    addCustomerDepot,
    removeCustomerDepot,
    updateCustomer
} from "@/core/repos/admin/customer/customerRepos";

/* =========================================================
   STORE
========================================================= */
const uiStore = useUIStore();

/* =========================================================
   STATE
========================================================= */
const selectedCustomer = ref(null);
const customerDetails = ref(null);

const userDepotModal = ref(null);
const depotList = ref([]);

/* =========================================================
   FORM DEFAULTS (Stable Object Shape)
========================================================= */
const defaultDepotForm = {
    id: null,
    user_id: null,
    depot_id: null,
    is_primary: false,
};

const userDepotForm = ref({ ...defaultDepotForm });

/* =========================================================
   CUSTOMER LOAD
========================================================= */
const loadCustomerDetails = async (userCode) => {
    if (!userCode) return;

    const data = await getCustomDetailsByCode({
        user_code: userCode,
    });

    if (data) {
        customerDetails.value = data;
    }
};

const searchCustomerDetails = async () => {
    if (!selectedCustomer.value) {
        uiStore.showToast("Please select a customer first.", "warning");
        return;
    }

    customerDetails.value = null;

    await loadCustomerDetails(selectedCustomer.value.user_code);
};

/* =========================================================
   DEPOT MODAL
========================================================= */
async function openDepotModal() {
    depotList.value = await fetchDepots({ is_active: true });

    userDepotForm.value = {
        ...defaultDepotForm,
        user_id: customerDetails.value?.id,
    };

    userDepotModal.value?.show();
}

function closeDepotModal() {
    userDepotModal.value?.hide();
    userDepotForm.value = { ...defaultDepotForm };
}

/* =========================================================
   DEPOT ACTIONS
========================================================= */
const submitDepotForm = async () => {
    await addCustomerDepot(userDepotForm.value);

    closeDepotModal();

    await loadCustomerDetails(customerDetails.value?.user_code);
};

const removeDepotAction = async (id) => {
    const confirmed = await showConfirmDialog(
        "Remove Depot",
        "Are you sure you want to remove this depot?"
    );

    if (!confirmed) return;

    await removeCustomerDepot(id);

    await loadCustomerDetails(customerDetails.value?.user_code);
};


// =================================================
// Edit User Modal

const editUserModal = ref(null);

const editUserForm = ref({
    user_id: null,
    is_active: true,
    inactive_reason: "",
    is_important: false,
});

const editUserFormReset = ref({
    user_id: null,
    is_active: true,
    inactive_reason: "",
    is_important: false,
});

function openEditUserModal() {
    editUserForm.value = {
        user_id: customerDetails.value?.id,
        is_active: customerDetails.value?.is_active,
        inactive_reason: customerDetails.value?.inactive_reason,
        is_important: customerDetails.value?.is_important,
    };

    editUserModal.value?.show();
}

function closeEditUserModal() {
    editUserForm.value = { ...editUserFormReset.value };
    editUserModal.value?.hide();
}


const submitEditUserForm = async () => {

    await updateCustomer(editUserForm.value.user_id, editUserForm.value);

    closeEditUserModal();

    await loadCustomerDetails(customerDetails.value?.user_code);
};







</script>