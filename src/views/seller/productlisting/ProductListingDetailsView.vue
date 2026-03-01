<template>
    <BaseContainer heading="Product Listing Details">

        <template #body>

            <div v-if="listingDetails" class="container-fluid px-0">

                <!-- ================= BASIC INFO ================= -->
                <div class="mb-4">
                    <div class="d-flex justify-content-between align-items-center border-bottom pb-1 mb-2">
                        <h6 class="fw-semibold text-muted mb-0">Basic Information</h6>

                        <BaseButton
                            :disabled="!listingDetails.is_active || listingDetails.is_sold || listingDetails.is_expired"
                            size="sm" variant="danger" @click="opencancelListingModal()">
                            Cancel Listing
                        </BaseButton>
                    </div>
                    <table class="table table-sm table-borderless align-middle mb-0">
                        <tbody>
                            <tr>
                                <th class="text-muted fw-normal w-25">Seller</th>
                                <td class="fw-semibold">
                                    <b>Customer Code:</b> {{ listingDetails?.seller?.user_code }}
                                    <!-- <br /><b>Name:</b> {{ listingDetails?.seller?.name }} -->
                                    <br /><b>NickName:</b> {{ listingDetails?.seller?.nickname }}
                                    <br /> <span :class="`role-${listingDetails?.seller?.role}`">
                                        {{ listingDetails?.seller?.role }}
                                    </span>

                                </td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal w-25">Listing Code</th>
                                <td class="fw-semibold">{{ listingDetails.listing_code }}</td>
                            </tr>

                            <tr>
                                <th class="text-muted fw-normal w-25">Active/Inactive Status</th>
                                <td class="fw-semibold"><span class="badge"
                                        :class="listingDetails.is_active ? 'bg-success' : 'bg-danger'"> {{
                                            listingDetails.is_active ? 'Active' : 'Inactive' }} </span> </td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal w-25">Inactive Reason</th>
                                <td class="fw-semibold">{{ listingDetails.inactive_reason || "N/A" }}</td>
                            </tr>

                            <!-- Different Status -->
                            <tr>
                                <th class="text-muted fw-normal w-25">Sold Status</th>
                                <td class="fw-semibold"><span class="badge"
                                        :class="listingDetails.is_sold ? 'bg-success' : 'bg-warning'"> {{
                                            listingDetails.is_sold ? 'Sold' : 'Available' }} </span> </td>
                            </tr>

                            <!-- <tr>
                                <th class="text-muted fw-normal w-25">Partial Status</th>
                                <td class="fw-semibold"><span class="badge"
                                        :class="listingDetails.is_partial ? 'bg-success' : 'bg-secondary'"> {{
                                            listingDetails.is_partial ? 'Partial' : 'not' }} </span> </td>
                            </tr>

                            <tr>
                                <th class="text-muted fw-normal w-25">Locked Status</th>
                                <td class="fw-semibold"><span class="badge"
                                        :class="listingDetails.is_locked ? 'bg-success' : 'bg-secondary'"> {{
                                            listingDetails.is_locked ? 'Locked' : 'not' }} </span> </td>
                            </tr> -->

                            <tr>
                                <th class="text-muted fw-normal w-25">Expire Status</th>
                                <td class="fw-semibold"><span class="badge"
                                        :class="listingDetails.is_expired ? 'bg-danger' : 'bg-secondary'"> {{
                                            listingDetails.is_expired ? 'Expired' : 'not' }} </span> </td>
                            </tr>

                            <tr>
                                <th class="text-muted   fw-normal w-25">View Invoice</th>
                                <td class="fw-semibold">
                                    <BaseButton v-if="listingDetails?.product_listing_invoice?.invoice_url"
                                        @click="viewInvoice(listingDetails?.product_listing_invoice?.invoice_url)"
                                        size="sm" variant="primary">
                                        View Invoice
                                    </BaseButton>
                                    <span v-else class="text-muted">No invoice available</span>
                                </td>
                            </tr>


                        </tbody>
                    </table>
                </div>


                <!-- ================= ADDRESS ================= -->
                <div class="mb-4">
                    <div class="d-flex justify-content-between align-items-center border-bottom pb-1 mb-2">
                        <h6 class="fw-semibold text-muted mb-0">Pickup Fulfillment Location Address Details</h6>

                        <!-- <BaseButton size="sm" variant="secondary" @click="manageAddress">
                            {{ listingDetails.address ? "Edit Address" : "Add Address" }}
                        </BaseButton> -->
                    </div>

                    <table v-if="listingDetails.address" class="table table-sm table-borderless align-middle mb-0">
                        <tbody>
                            <!-- Address Name / Type -->
                            <tr v-if="listingDetails.address.addr_name">
                                <th class="text-muted fw-normal w-25">Address Name</th>
                                <td>{{ listingDetails.address.addr_name }}</td>
                            </tr>

                            <!-- Address Lines -->
                            <tr>
                                <th class="text-muted fw-normal">Address Line 1</th>
                                <td>{{ listingDetails.address.address_line1 || "N/A" }}</td>
                            </tr>

                            <tr v-if="listingDetails.address.address_line2">
                                <th class="text-muted fw-normal">Address Line 2</th>
                                <td>{{ listingDetails.address.address_line2 }}</td>
                            </tr>

                            <!-- Locality -->
                            <tr v-if="listingDetails.address.landmark">
                                <th class="text-muted fw-normal">Landmark</th>
                                <td>{{ listingDetails.address.landmark }}</td>
                            </tr>

                            <tr v-if="listingDetails.address.village">
                                <th class="text-muted fw-normal">Village</th>
                                <td>{{ listingDetails.address.village }}</td>
                            </tr>

                            <tr v-if="listingDetails.address.taluka">
                                <th class="text-muted fw-normal">Taluka</th>
                                <td>{{ listingDetails.address.taluka }}</td>
                            </tr>

                            <tr v-if="listingDetails.address.district">
                                <th class="text-muted fw-normal">District</th>
                                <td>{{ listingDetails.address.district }}</td>
                            </tr>

                            <!-- City / State -->
                            <tr>
                                <th class="text-muted fw-normal">City</th>
                                <td>{{ listingDetails.address.city || "N/A" }}</td>
                            </tr>

                            <tr>
                                <th class="text-muted fw-normal">State</th>
                                <td>
                                    {{ listingDetails.address.state || "N/A" }}
                                    <span v-if="listingDetails.address.state_iso" class="text-muted">
                                        ({{ listingDetails.address.state_iso }})
                                    </span>
                                </td>
                            </tr>

                            <tr>
                                <th class="text-muted fw-normal">Postal Code</th>
                                <td>{{ listingDetails.address.postal_code || "N/A" }}</td>
                            </tr>

                            <!-- Country -->
                            <tr v-if="listingDetails.address.country">
                                <th class="text-muted fw-normal">Country</th>
                                <td>
                                    {{ listingDetails.address.country }}
                                    <span v-if="listingDetails.address.country_iso" class="text-muted">
                                        ({{ listingDetails.address.country_iso }})
                                    </span>
                                </td>
                            </tr>

                            <!-- Contact -->
                            <tr v-if="listingDetails.address.contact_name">
                                <th class="text-muted fw-normal">Contact Name</th>
                                <td>{{ listingDetails.address.contact_name }}</td>
                            </tr>

                            <tr v-if="listingDetails.address.phone_number">
                                <th class="text-muted fw-normal">Phone</th>
                                <td>
                                    <span v-if="listingDetails.address.dial_code">
                                        +{{ listingDetails.address.dial_code }}
                                    </span>
                                    {{ listingDetails.address.phone_number }}
                                </td>
                            </tr>

                            <tr v-if="listingDetails.address.email">
                                <th class="text-muted fw-normal">Email</th>
                                <td class="text-break">{{ listingDetails.address.email }}</td>
                            </tr>

                            <!-- Geo -->
                            <tr v-if="listingDetails.address.latitude && listingDetails.address.longitude">
                                <th class="text-muted fw-normal">Coordinates</th>
                                <td>
                                    {{ listingDetails.address.latitude }},
                                    {{ listingDetails.address.longitude }}
                                </td>
                            </tr>

                            <!-- Status -->
                            <tr>
                                <th class="text-muted fw-normal">Status</th>
                                <td>
                                    <span class="badge"
                                        :class="listingDetails.address.is_active ? 'bg-success' : 'bg-danger'">
                                        {{ listingDetails.address.is_active ? "Active" : "Inactive" }}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div v-else class="text-muted small">
                        No address information available.
                    </div>

                </div>

                <!-- Listing Items & Packages -->

                <div class="mb-4">
                    <div class="d-flex justify-content-between align-items-center border-bottom pb-1 mb-3">
                        <h6 class="fw-semibold text-muted mb-0">
                            Listing Items / Packages Details
                        </h6>
                    </div>

                    <div v-if="listingDetails.listing_items?.length">
                        <div v-for="(item, index) in listingDetails.listing_items" :key="item.id || index" class="mb-3">
                            <!-- ITEM HEADER -->
                            <div class="d-flex justify-content-between align-items-center p-2 rounded border bg-light cursor-pointer"
                                @click="item.expanded = !item.expanded">
                                <div class="small">
                                    <b class="text-dark">Item-{{ index + 1 }}</b>
                                    <span class="text-muted mx-1">|</span>
                                    <span class="text-primary">{{ item?.product?.product_code }}</span>
                                    <span class="text-muted mx-1">|</span>
                                    <span>{{ item?.product?.name }}</span>
                                </div>

                                <i class="fas fa-chevron-down transition" :class="{ 'rotate-180': item.expanded }"></i>
                            </div>

                            <!-- ITEM CONTENT -->
                            <div v-show="item.expanded" class="border border-top-0 rounded-bottom p-3 bg-white">
                                <table class="table table-sm table-bordered align-middle mb-0">
                                    <thead class="table-light">
                                        <tr>
                                            <th>#</th>
                                            <th>Pkg Size</th>
                                            <th>Pkg Unit</th>
                                            <th>Pkg Type Unit</th>
                                            <th>Pkg Price</th>
                                            <th>Qty</th>
                                            <th>Sold Qty</th>
                                            <th>Reverse Qty</th>

                                            <th>Status</th>
                                            <!-- <th>Action</th> -->
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr v-for="(pkg, j) in item.listing_packages" :key="pkg.id">

                                            <td>{{ j + 1 }}</td>
                                            <td>{{ pkg.pack_size }}</td>
                                            <td>{{ pkg.pack_unit }}</td>
                                            <td>{{ pkg.pack_type_unit }}</td>
                                            <td class="fw-bolder">{{ pkg.pack_price }}</td>
                                            <td class="text-end fw-bolder text-success">{{ pkg.qty }}</td>
                                            <td class="text-end fw-bolder text-primary">{{ pkg.sold_qty }}</td>
                                            <td class="text-end fw-bolder text-danger">{{ pkg.reverse_qty }}</td>
                                            <td class="text-center"><span class="badge"
                                                    :class="pkg.is_locked ? 'bg-danger' : pkg.is_sold ? 'bg-success' : 'bg-warning'">
                                                    {{ pkg.is_locked ? 'Locked' : (pkg.is_sold
                                                        ? 'Sold' : 'Available') }} </span>
                                            </td>
                                            <!-- <td>
                                                <BaseButton iconOnly size="sm" variant="primary" icon="fas fa-edit"
                                                    @click="() => { packageForm.package_id = pkg.id, packageForm.user_id = listingDetails?.seller?.id; openPackageModal(); }" />


                                            </td> -->
                                        </tr>

                                        <tr v-if="!item.listing_packages?.length">
                                            <td colspan="4" class="text-center text-muted small">
                                                No packages available
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div v-else class="text-muted small">
                        No listing items available.
                    </div>
                </div>



                <!-- Shipment Packages -->
                <div class="mb-4">
                    <div class="d-flex justify-content-between align-items-center border-bottom pb-1 mb-2">
                        <h6 class="fw-semibold text-muted mb-0">Shipment Packages Information</h6>
                    </div>
                    <table class="table table-sm table-bordered table-striped align-middle mb-0">
                        <thead class="table-info">
                            <tr>
                                <th>#</th>
                                <th class="text-muted fw-normal">Order Number</th>
                                <th class="text-muted fw-normal">Shipment Package Number</th>
                                <th class="text-muted fw-normal">Package Number</th>

                                <th class="text-muted fw-normal">Qty</th>
                                <th class="text-muted fw-normal">Pack Size</th>
                                <th class="text-muted fw-normal">Pack Unit</th>
                                <th class="text-muted fw-normal">Pack Type Unit</th>
                                <th class="text-muted fw-normal">Main Status</th>
                                <th class="text-muted fw-normal">Seller Status</th>
                                <th class="text-muted fw-normal">Buyer Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(pack, index) in listingDetails?.shipment_packages" :key="pack.id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ pack?.order?.order_number ?? pack?.market_order?.market_order_number }}</td>
                                <td>{{ pack.shipment_package_number }}</td>
                                <td>{{ pack.package_number }}</td>
                                <td class="text-end">{{ pack.qty }}</td>
                                <td class="text-end">{{ pack.pack_size }}</td>
                                <td>{{ pack.pack_unit }}</td>
                                <td>{{ pack.pack_type_unit }}</td>
                                <td>
                                    <StatusBadge :status="pack.status" />
                                </td>
                                <td>
                                    <StatusBadge :status="pack.seller_status" />
                                </td>
                                <td>
                                    <StatusBadge :status="pack.buyer_status" />
                                </td>

                            </tr>



                        </tbody>
                    </table>
                </div>



            </div>
        </template>
    </BaseContainer>


    <!-- Cancel Listing Modal -->
    <BaseModal ref="cancelListingModal" icon="fas fa-id-card">
        <template #title>
            Cancel Listing
        </template>

        <form id="cancelListingForm" @submit.prevent="submitCancelListingForm">

            <div class="col-md-12">

                <h5 class="mb-3 text-danger"> Once you cancel, this action cannot be undone.</h5>

                <BaseInput label="Review Comment" v-model="cancelListingForm.reason" placeholder="Enter Reason/Comment"
                    required />
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
            <BaseButton variant="secondary" @click="closecancelListingModal()">
                Cancel
            </BaseButton>
            <BaseButton variant="primary" type="submit" form="cancelListingForm" :loading="uiStore.isLoading">
                Save
            </BaseButton>
        </template>
    </BaseModal>

    <BaseModal ref="packageModal" icon="fas fa-id-card">
        <template #title>
            Update Package
        </template>

        <form id="packageForm" @submit.prevent="submitPackageForm">

            <div class="col-md-12">

                <BaseInput label="Qty" v-model="packageForm.qty" placeholder="Enter Qty" type="number" step="1" min="0"
                    required />

                <BaseInput label="Review Comment" v-model="packageForm.reason" placeholder="Enter Reason/Comment"
                    required />
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
            <BaseButton variant="secondary" @click="closePackageModal()">
                Cancel
            </BaseButton>
            <BaseButton variant="primary" type="submit" form="packageForm" :loading="uiStore.isLoading">
                Save
            </BaseButton>
        </template>
    </BaseModal>


</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useUIStore } from "@/core/utils/stores/uiStore";
import { fetchProductListingDetails, cancelProductListing, updateListingPackage } from "@/core/repos/admin/common/sellerRepos";
import { useRoute } from "vue-router";
import router from "@/router";

import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import BaseInput from "@/components/common/inputs/BaseInput.vue";
import BaseModal from "@/components/common/modal/BaseModal.vue";
import StatusBadge from "@/components/common/badge/StatusBadge.vue";

/* ---------------- STATE ---------------- */
const uiStore = useUIStore();
const route = useRoute();

const listingId = ref(route.params.id);
const listingDetails = ref([]);

const cancelListingModal = ref(null);
const packageModal = ref(null);

const selectedPackage = ref(null);


/* ---------------- INIT ---------------- */
onMounted(loadDetails);

/* ---------------- LOAD ---------------- */
async function loadDetails() {
    const data = await fetchProductListingDetails(listingId.value);
    if (!data) {
        return;
    }
    listingDetails.value = data;
}

const cancelListingForm = ref({
    listing_id: null,
    reason: "",
});

const resetcancelListingForm = ref({
    listing_id: null,
    reason: "",
});

const packageForm = ref({
    package_id: "",
    user_id: "",
    qty: "",
    reason: "",
});

const resetPackageForm = ref({
    package_id: "",
    user_id: "",
    qty: "",
    reason: "",
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


async function opencancelListingModal() {
    generateCaptcha();
    cancelListingForm.value = { ...resetcancelListingForm.value };
    cancelListingModal.value.show();
}

function closecancelListingModal() {
    cancelListingForm.value = { ...resetcancelListingForm.value };
    generateCaptcha();
    cancelListingModal.value.hide();
}



async function submitCancelListingForm() {

    if (!isConfirmValid.value) {
        uiStore.errorMessages = ["Confirmation failed. Please solve the sum."];
        generateCaptcha();
        return;
    }

    await cancelProductListing(listingId.value, cancelListingForm.value);
    closecancelListingModal();

    cancelListingForm.value = { ...resetcancelListingForm.value };
    listingDetails.value = [];
    await loadDetails(listingId.value);
};

// ================ PACKAGE MODAL ================

async function openPackageModal() {
    generateCaptcha();
    // packageForm.value = { ...resetPackageForm.value }; // selecting package id is already set
    packageModal.value.show();
}

function closePackageModal() {
    packageForm.value = { ...resetPackageForm.value };
    generateCaptcha();
    packageModal.value.hide();
}

async function submitPackageForm() {

    if (!isConfirmValid.value) {
        uiStore.errorMessages = ["Confirmation failed. Please solve the sum."];
        generateCaptcha();
        return;
    }

    await updateListingPackage(packageForm.value.package_id, packageForm.value);
    closePackageModal();

    packageForm.value = { ...resetPackageForm.value };
    listingDetails.value = [];
    await loadDetails(listingId.value);
};

const viewInvoice = (url) => {
    window.open(url, "_blank");
}



</script>

<style scoped>
.cursor-pointer {
    cursor: pointer;
}

.transition {
    transition: transform 0.2s ease;
}

.rotate-180 {
    transform: rotate(180deg);
}
</style>