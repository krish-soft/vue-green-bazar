<template>
    <BaseCotainer heading="Product Listing Details">

        <template #body>

            <div v-if="listingDetails" class="container-fluid px-0">

                <!-- ================= BASIC INFO ================= -->
                <div class="mb-4">
                    <div class="border-bottom pb-1 mb-2">
                        <h6 class="fw-semibold text-muted mb-0">Basic Information</h6>
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

                            <tr>
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
                            </tr>

                            <tr>
                                <th class="text-muted fw-normal w-25">Expire Status</th>
                                <td class="fw-semibold"><span class="badge"
                                        :class="listingDetails.is_expired ? 'bg-danger' : 'bg-secondary'"> {{
                                            listingDetails.is_expired ? 'Expired' : 'not' }} </span> </td>
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

                                            <th>Status</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr v-for="(pkg, j) in item.listing_packages" :key="pkg.id">

                                            <td>{{ j + 1 }}</td>
                                            <td>{{ pkg.pack_size }}</td>
                                            <td>{{ pkg.pack_unit }}</td>
                                            <td>{{ pkg.pack_type_unit }}</td>
                                            <td>{{ pkg.pack_price }}</td>
                                            <td class="text-end">{{ pkg.qty }}</td>
                                            <td class="text-end">{{ pkg.sold_qty }}</td>
                                            <td class="text-center"><span class="badge"
                                                    :class="pkg.is_sold ? 'bg-success' : 'bg-warning'">
                                                    {{ pkg.is_sold
                                                        ? 'Sold' : 'Available' }} </span> </td>
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


            </div>



        </template>

    </BaseCotainer>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUIStore } from "@/core/utils/stores/uiStore";
import { fetchProductListingDetails } from "@/core/repos/admin/common/productListingRepos";
import { useRoute } from "vue-router";
import router from "@/router";
import BaseCotainer from "@/components/common/cards/BaseContainer.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import BaseInput from "@/components/common/inputs/BaseInput.vue";

/* ---------------- STATE ---------------- */
const uiStore = useUIStore();
const route = useRoute();

const listingId = ref(route.params.id);
const listingDetails = ref([]);

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