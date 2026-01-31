<template>

    <BaseContainer heading="Orders List">

        <template #headerActions>
        </template>

        <template #body>

            <div class="table-responsive">
                <table class="table table-bordered table-striped table-hover" id="datatable">
                    <thead class="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Order Date</th>
                            <th>Order Number</th>
                            <th>Order Status</th>
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
                            <td>{{ new Date(order.order_date).toDateString() }}</td>
                            <td>{{ order.order_number }}</td>
                            <td>
                                <span class="badge" :class="`bg-${order.order_status}`">
                                    {{ order.order_status }}
                                </span>
                            </td>
                            <td>
                                <span class="badge" :class="`bg-${order.payment_status}`">
                                    {{ order.payment_status }}
                                </span>
                            </td>
                            <td>
                                <b>Code:</b> {{ order?.buyer?.user_code }}
                                <br /> <b>Nick.:</b> {{ order?.buyer?.nickname }}
                            </td>
                            <td>
                                <b>Village:</b> {{ order?.shipping_fulfillment_location?.village }}
                                <br /> <b>City:</b> {{ order?.shipping_fulfillment_location?.city }}
                                <br /> <b>State:</b> {{ order?.shipping_fulfillment_location?.state }}
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

import { fetchOrdersList } from "@/core/repos/admin/common/buyerRepos";

/* ---------------- STATE ---------------- */
const uiStore = useUIStore();

const ordersList = ref([]);

/* ---------------- INIT ---------------- */
onMounted(loadList);

/* ---------------- LOAD ---------------- */
async function loadList() {
    const data = await fetchOrdersList();
    if (!data) {
        return;
    }
    ordersList.value = data;
}

function showItemById(id) {
    router.push({ name: "orderdetails", params: { id } });
}


</script>
