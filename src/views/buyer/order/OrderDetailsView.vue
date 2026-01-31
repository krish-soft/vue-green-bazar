<template>

    <BaseContainer heading="Order Details">

        <template #body>

            <div v-if="orderDetails" class="container-fluid px-0">

                <!-- ================= BASIC INFO ================= -->
                <div class="mb-4">
                    <div class="d-flex justify-content-between align-items-center border-bottom pb-1 mb-2">
                        <h6 class="fw-semibold text-muted mb-0">Basic Information</h6>
                    </div>
                    <table class="table table-sm table-borderless align-middle mb-0">
                        <tbody>
                            <tr>
                                <th class="text-muted fw-normal w-25">Buyer</th>
                                <td class="fw-semibold">
                                    <b>Customer Code:</b> {{ orderDetails?.buyer?.user_code }}
                                    <!-- <br /><b>Name:</b> {{ orderDetails?.buyer?.name }} -->
                                    <br /><b>NickName:</b> {{ orderDetails?.buyer?.nickname }}
                                    <br /> <span class="mt-2" :class="`role-${orderDetails?.buyer?.role}`">
                                        {{ orderDetails?.buyer?.role }}
                                    </span>

                                </td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal w-25">Order Number</th>
                                <td class="fw-semibold">{{ orderDetails.order_number }}</td>
                            </tr>

                            <tr>
                                <th class="text-muted fw-normal w-25">Order Date</th>
                                <td class="fw-semibold">{{ new Date(orderDetails.order_date).toDateString() }}</td>
                            </tr>

                            <tr>
                                <th class="text-muted fw-normal w-25">Order Status</th>
                                <td class="fw-semibold"><span class="badge"
                                        :class="`bg-${orderDetails.order_status}`">{{ orderDetails.order_status
                                        }}</span></td>
                            </tr>

                            <tr>
                                <th class="text-muted fw-normal w-25">Payment Status</th>
                                <td class="fw-semibold"> <span class="badge"
                                        :class="`bg-${orderDetails.payment_status}`">{{ orderDetails.payment_status
                                        }}</span></td>
                            </tr>

                            <tr>
                                <th class="text-muted fw-normal w-25">Payment Reference [Gateway]</th>
                                <td class="fw-semibold">{{ orderDetails.payment_reference }}</td>
                            </tr>

                            <tr>
                                <th class="text-muted fw-normal w-25">Reference [Payment]</th>
                                <td class="fw-semibold">{{ orderDetails.reference }}</td>
                            </tr>

                            <tr>
                                <th class="text-muted fw-normal w-25">remarks</th>
                                <td class="fw-semibold">{{ orderDetails.remarks }}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>

                <div class="mb-4">
                    <div class="d-flex justify-content-between align-items-center border-bottom pb-1 mb-2">
                        <h6 class="fw-semibold text-muted mb-0">Order Information</h6>
                    </div>
                    <table class="table table-sm table-borderless align-middle mb-0">
                        <tbody>
                            <tr>
                                <th class="text-muted fw-normal w-25">Currency</th>
                                <td class="fw-semibold">{{ orderDetails.currency }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal w-25">Sub Total</th>
                                <td class="fw-semibold">{{ orderDetails.subtotal }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal w-25">Tax Total</th>
                                <td class="fw-semibold">{{ orderDetails.tax_amount }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal w-25">Total Amount</th>
                                <td class="fw-semibold">{{ orderDetails.total_amount }}</td>
                            </tr>


                        </tbody>
                    </table>
                </div>

                <div class="mb-4 mt-4">
                    <div class="d-flex justify-content-between align-items-center border-bottom pb-1 mb-2">
                        <h6 class="fw-semibold text-muted mb-0">Order Items Information</h6>
                    </div>
                    <table class="table table-sm table-bordered table-striped align-middle mb-0">
                        <thead class="table-dark">
                            <tr>
                                <th>#</th>
                                <th class="text-muted fw-normal">Product Code</th>
                                <th class="text-muted fw-normal">Product Name</th>
                                <th class="text-muted fw-normal">Order Qty</th>
                                <th class="text-muted fw-normal">Ship Qty</th>
                                <th class="text-muted fw-normal">Pack Size</th>
                                <th class="text-muted fw-normal">Pack Unit</th>
                                <th class="text-muted fw-normal">Pack Type Unit</th>
                                <th class="text-muted fw-normal">Pack Price</th>
                                <th class="text-muted fw-normal">Per Unit Price</th>
                                <th class="text-muted fw-normal">Taxable Amount</th>
                                <th class="text-muted fw-normal">Tax Amount</th>
                                <th class="text-muted fw-normal">Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in orderDetails.order_items" :key="item.id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.product_code }}</td>
                                <td>{{ item.product_name }}</td>

                                <td class="text-end">{{ item.order_qty }}</td>
                                <td class="text-end">{{ item.ship_qty }}</td>

                                <td class="text-end">{{ item.pack_size }}</td>
                                <td>{{ item.pack_unit }}</td>
                                <td>{{ item.pack_type_unit }}</td>

                                <td class="text-end">{{ item.pack_price }}</td>
                                <td class="text-end">{{ item.per_unit_price }}</td>

                                <td class="text-end">{{ item.taxable_amount }}</td>
                                <td class="text-end">{{ item.tax_amount }}</td>
                                <td class="text-end">{{ item.total_amount }}</td>
                            </tr>
                            <!-- TOTAL ROW -->
                            <tr class="fw-bold">
                                <td colspan="10" class="text-end">Total</td>
                                <td class="text-end">{{ orderItemsTotals.taxable }}</td>
                                <td class="text-end">{{ orderItemsTotals.tax }}</td>
                                <td class="text-end">{{ orderItemsTotals.total }}</td>
                            </tr>


                        </tbody>
                    </table>
                </div>

                <div class="mb-4">
                    <div class="d-flex justify-content-between align-items-center border-bottom pb-1 mb-2">
                        <h6 class="fw-semibold text-muted mb-0">Order Charges Information</h6>
                    </div>
                    <table class="table table-sm table-bordered table-striped align-middle mb-0">
                        <thead class="table-dark">
                            <tr>
                                <th>#</th>
                                <th class="text-muted fw-normal">Charge Code</th>
                                <th class="text-muted fw-normal">Charge Name</th>
                                <th class="text-muted fw-normal">Rule Type</th>
                                <th class="text-muted fw-normal">Rule No</th>
                                <th class="text-muted fw-normal">Rule Desc</th>

                                <th class="text-muted fw-normal">Taxable Amount</th>
                                <th class="text-muted fw-normal">Tax Amount</th>
                                <th class="text-muted fw-normal">Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(charge, index) in orderDetails.order_charges" :key="charge.id">
                                <td>{{ index + 1 }}</td>
                                <td>{{ charge.charge_code }}</td>
                                <td>{{ charge.charge_name }}</td>
                                <td>{{ charge.rule_type }}</td>
                                <td>{{ charge.rule_no }}</td>
                                <td>{{ charge.rule_desc }}</td>
                                <td class="text-end">{{ charge.taxable_amount }}</td>
                                <td class="text-end">{{ charge.tax_amount }}</td>
                                <td class="text-end">{{ charge.total_amount }}</td>
                            </tr>
                            <!-- TOTAL ROW -->
                            <tr class="fw-bold">
                                <td colspan="6" class="text-end">Total</td>
                                <td class="text-end">{{ orderChargesTotals.taxable }}</td>
                                <td class="text-end">{{ orderChargesTotals.tax }}</td>
                                <td class="text-end">{{ orderChargesTotals.total }}</td>
                            </tr>


                        </tbody>
                    </table>
                </div>



            </div>
        </template>
    </BaseContainer>



</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useUIStore } from "@/core/utils/stores/uiStore";
import { useRoute } from "vue-router";
import router from "@/router";

import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import BaseInput from "@/components/common/inputs/BaseInput.vue";
import BaseModal from "@/components/common/modal/BaseModal.vue";

import { fetchOrderDetails } from "@/core/repos/admin/common/buyerRepos";



/* ---------------- STATE ---------------- */
const uiStore = useUIStore();
const route = useRoute();

const orderId = ref(route.params.id);
const orderDetails = ref([]);

/* ---------------- INIT ---------------- */
onMounted(loadDetails);

/* ---------------- LOAD ---------------- */
async function loadDetails() {
    // Fetch order details by ID
    const data = await fetchOrderDetails(orderId.value);
    if (!data) {
        return;
    }
    orderDetails.value = data;
}



const orderChargesTotals = computed(() => {

    const charges = orderDetails.value.order_charges || []

    const acc = charges.reduce(
        (acc, c) => {
            acc.taxable += Number(c.taxable_amount || 0)
            acc.tax += Number(c.tax_amount || 0)
            acc.total += Number(c.total_amount || 0)
            return acc
        },
        { taxable: 0, tax: 0, total: 0 }
    )

    return {
        taxable: acc.taxable.toFixed(2),
        tax: acc.tax.toFixed(2),
        total: acc.total.toFixed(2)
    }
})



const orderItemsTotals = computed(() => {

    const items = orderDetails.value.order_items || []

    const acc = items.reduce(
        (acc, c) => {
            acc.taxable += Number(c.taxable_amount || 0)
            acc.tax += Number(c.tax_amount || 0)
            acc.total += Number(c.total_amount || 0)
            return acc
        },
        { taxable: 0, tax: 0, total: 0 }
    )

    return {
        taxable: acc.taxable.toFixed(2),
        tax: acc.tax.toFixed(2),
        total: acc.total.toFixed(2)
    }
})


</script>