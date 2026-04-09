<template>
    <BaseContainer heading="Product Listing">

        <template #headerActions>
        </template>

        <template #body>

            <div class="row g-3">

                <div class="col-md-2">
                    <BaseInput v-model="filters.start_date" type="date" label="Start Date" required />
                </div>
                <div class="col-md-2">
                    <BaseInput v-model="filters.end_date" type="date" label="End Date" required />
                </div>
                <div class="col-md-2">
                    <br />
                    <BaseButton @click="loadList" variant="primary" class="mt-2">
                        Filter
                    </BaseButton>
                </div>
            </div>

            <hr>


            <div class="table-responsive">
                <table class="table table-bordered table-striped table-hover" id="datatable">
                    <thead class="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Listing Status</th>
                            <th>Listing Code</th>
                            <th>Listing Date</th>

                            <th>Seller</th>
                            <th>Pickup Location</th>
                            <th>Status</th>
                            <th>Sell To Market</th>
                            <th>Seller Deliver</th>

                            <th>Cutoff</th>
                            <th>Locked</th>
                            <th>Expired</th>
                            <th>Flags</th>


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
                            <td>{{ new Date(row.listing_date).toISOString().slice(0, 10) }}</td>

                            <td>
                                <b> Code:</b> {{ row?.seller?.user_code }}
                                <br /> <b>Nick.:</b> {{ row?.seller?.nickname }}
                            </td>
                            <td>
                                <b> Code:</b> {{ row?.fulfillment_location?.fl_code }}
                                <br /> <b> Type:</b> {{ row?.fulfillment_location?.type }}
                            </td>
                            <td>{{ row?.status }}</td>

                            <td> <span class="badge" :class="row.is_sell_to_market ? 'bg-success' : 'bg-danger'">{{
                                row.is_sell_to_market ? "Yes" : "No" }}
                                </span>
                            </td>
                            <td>
                                <span class="badge" :class="row.is_seller_dropoff ? 'bg-success' : 'bg-danger'">{{
                                    row.is_seller_dropoff ? "Yes" : "No" }}
                                </span>
                            </td>

                            <td>
                                <i class="fas fa-check text-success" v-if="row.is_cutoff"></i>
                                <i class="fas fa-times text-danger" v-else></i>
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
                                <div v-if="row.flags && row.flags.length > 0">
                                    <i class="fas fa-flag text-danger"></i>
                                    <ol>
                                        <li v-for="(flag, i) in row.flags" :key="i">
                                            {{ flag }}
                                        </li>
                                    </ol>

                                </div>
                                <div v-else>
                                    <i class="fas fa-flag text-success"></i>
                                </div>
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
import { fetchProductListingsList } from "@/core/repos/admin/common/sellerRepos";

import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import BaseInput from "@/components/common/inputs/BaseInput.vue";

import router from "@/router";
/* ---------------- STATE ---------------- */
const uiStore = useUIStore();

const productListingList = ref([]);

// Filter dates
const today = new Date();
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);
const formatDate = (d) => d.toISOString().slice(0, 10);

const filters = ref({
    start_date: formatDate(yesterday),
    end_date: formatDate(today),
});


/* ---------------- INIT ---------------- */
onMounted(loadList);

/* ---------------- LOAD ---------------- */
async function loadList() {
    const data = await fetchProductListingsList(filters.value);
    if (!data) {
        return;
    }
    productListingList.value = data;
}

function showItemById(id) {
    router.push({ name: "productlistingdetails", params: { id } });
}


</script>