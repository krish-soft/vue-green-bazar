<template>

    <BaseContainer heading="Demand Orders List">

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
                            <th>Depot</th>
                            <th>Order Date</th>
                            <th>Order Number</th>
                            <th>Order Status</th>
                            <th>Delivery Status</th>
                            <th>Payment Status</th>
                            <th>Buyer</th>
                            <th>Ship To</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(order, index) in ordersList" :key="order.id" @click="showOrderById(order.id)"
                            style="cursor: pointer;">
                            <td>{{ index + 1 }}</td>
                            <td>
                                {{ order?.depot?.code }}<br />
                                {{ order?.depot?.name }}

                            </td>
                            <td>{{ new Date(order.order_date).toDateString() }}</td>
                            <td>{{ order.order_number }}</td>
                            <td>
                                <!-- <span class="badge" :class="`bg-${order.order_status}`">
                                    {{ order.order_status }}
                                </span> -->
                                <StatusBadge :status="order.order_status" />
                            </td>
                            <td>
                                <StatusBadge :status="order.delivery_status" />
                            </td>
                            <td>
                                <!-- <span class="badge" :class="`bg-${order.payment_status}`">
                                    {{ order.payment_status }}
                                </span> -->
                                <StatusBadge :status="order.payment_status" />
                            </td>
                            <td>
                                <b>Code:</b> {{ order?.buyer?.user_code }}
                                <br /> <b>Nick.:</b> {{ order?.buyer?.nickname }}
                            </td>
                            <td>
                                <b>Village:</b> {{ order?.shipping_fulfillment_location?.address?.village }}
                                <br /> <b>City:</b> {{ order?.shipping_fulfillment_location?.address?.city }}
                                <br /> <b>State:</b> {{ order?.shipping_fulfillment_location?.address?.state }}
                            </td>
                            <td>
                                <BaseButton iconOnly variant="sky me-2" icon="fas fa-eye "
                                    @click="showItemById(order.id)" />
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

import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import BaseInput from "@/components/common/inputs/BaseInput.vue";

import router from "@/router";

import { fetchDemandOrdersList } from "@/core/repos/admin/common/buyerRepos";
import StatusBadge from "@/components/common/badge/StatusBadge.vue";

/* ---------------- STATE ---------------- */
const uiStore = useUIStore();

const ordersList = ref([]);

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
    const data = await fetchDemandOrdersList(filters.value);
    if (!data) {
        return;
    }
    ordersList.value = data;
}

function showItemById(id) {
    router.push({ name: "demandorderdetails", params: { id } });
}


</script>
