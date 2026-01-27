<template>
    <BaseContainer heading="Product Listing">

        <template #headerActions>
        </template>

        <template #body>

            <div class="table-responsive">
                <table class="table table-bordered table-striped table-hover" id="datatable">
                    <thead class="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Listing Status</th>
                            <th>Listing Code</th>
                            <th>Doc No</th>
                            <th>Doc Date</th>

                            <th>Seller</th>
                            <th>Pickup Location</th>
                            <th>Sell To Market</th>
                            <th>Seller Deliver</th>
                            <th>Sold</th>
                            <th>Partial</th>
                            <th>Locked</th>
                            <th>Expired</th>


                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, i) in productListingList" :key="row.id">
                            <td>{{ i + 1 }}</td>
                            <td>
                                <span class="badge" :class="row.is_active ? 'bg-success' : 'bg-danger'">
                                    {{ row.is_active ? "Active" : "Inactive" }}
                                </span>
                            </td>
                            <td>{{ row.listing_code }}</td>
                            <td>{{ row.doc_no }}</td>
                            <td>{{ new Date(row.doc_date).toISOString().slice(0, 10) }}</td>

                            <td>
                                <b> Code:</b> {{ row?.seller?.user_code }}
                                <br /> <b>Nick Name:</b> {{ row?.seller?.nickname }}
                            </td>
                            <td>
                                <b> Code:</b> {{ row?.fulfillment_location?.fl_code }}
                                <br /> <b> Type:</b> {{ row?.fulfillment_location?.type }}
                            </td>

                            <td> <span class="badge" :class="row.is_sell_to_market ? 'bg-success' : 'bg-danger'">{{
                                row.is_sell_to_market ? "Yes" : "No" }}
                                </span>
                            </td>
                            <td>
                                <span class="badge" :class="row.is_seller_deliver_items ? 'bg-success' : 'bg-danger'">{{
                                    row.is_seller_deliver_items ? "Yes" : "No" }}
                                </span>
                            </td>
                            <td>
                                <i class="fas fa-shopping-cart text-success" v-if="row.is_sold"></i>
                                <i class="fas fa-cart-plus text-danger" v-else></i>
                            </td>

                            <td>
                                <i class="fas fa-percent text-warning" v-if="row.is_partial"></i>
                                <i class="fas fa-minus-circle text-danger" v-else></i>
                            </td>

                            <td>
                                <i class="fas fa-shield-alt text-success" v-if="row.is_locked"></i>
                                <i class="fas fa-lock-open text-danger" v-else></i>
                            </td>
                            <td>
                                <i class="fas fa-hourglass-end text-danger" v-if="row.is_expired"></i>
                                <i class="fas fa-hourglass-start text-success" v-else></i>
                            </td>

                            <td>
                                <BaseButton iconOnly variant="sky me-2" icon="fas fa-eye "
                                    @click="showItemById(row.id)" />

                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>

        </template>
    </BaseContainer>


</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUIStore } from "@/core/utils/stores/uiStore";
import { fetchProductListingsList } from "@/core/repos/admin/common/productListingRepos";

import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import BaseInput from "@/components/common/inputs/BaseInput.vue";

import router from "@/router";
/* ---------------- STATE ---------------- */
const uiStore = useUIStore();

const productListingList = ref([]);

/* ---------------- INIT ---------------- */
onMounted(loadList);

/* ---------------- LOAD ---------------- */
async function loadList() {
    const data = await fetchProductListingsList();
    if (!data) {
        return;
    }
    productListingList.value = data;
}

function showItemById(id) {
    router.push({ name: "productlistingdetails", params: { id } });
}


</script>