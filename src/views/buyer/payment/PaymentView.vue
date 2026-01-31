<template>

    <BaseContainer heading="Payments List">

        <template #headerActions>
        </template>

        <template #body>

            <div class="table-responsive">
                <table class="table table-bordered table-striped table-hover" id="datatable">
                    <thead class="table-dark">
                        <tr>
                            <th>#</th>
                            <th>User/Buyer</th>
                            <th>Payment Date</th>
                            <th>Payment Code</th>
                            <th>Payment Status</th>

                            <th>Source Type</th>
                            <th>Source Code</th>
                            <th>Amount </th>

                            <th>Gateway</th>
                            <th>Gateway Order ID</th>

                            <th>Paid Via</th>
                            <th>Failure Reason</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, index) in paymentsList" :key="row.id" @click="showOrderById(row.id)"
                            style="cursor: pointer;">
                            <td>{{ index + 1 }}</td>
                            <td>
                                <b>Code: </b>{{ row?.user?.user_code }}
                                <br /><b>Nick.: </b> {{ row?.user?.nickname }}
                            </td>
                            <td>{{ new Date(row?.payment_date).toLocaleDateString() }}</td>
                            <td>{{ row.payment_code }}</td>
                            <td>
                                <span class="badge" :class="`bg-${row.status}`">
                                    {{ row.status }}
                                </span>
                            </td>
                            <td>{{ row.source_type.split(/[\\/]/).pop() }}</td>
                            <td>{{ row.source_code }}</td>

                            <td> {{ row.currency }}<br /> {{ row.amount }}</td>

                            <td>{{ row.gateway }}</td>
                            <td>{{ row.gateway_order_id }}</td>

                            <td>{{ row.paid_via }}</td>
                            <td>{{ row.failure_reason }}</td>
                            <td>{{ new Date(row.created_at).toString() }}</td>
                            <td>
                                <!-- <BaseButton iconOnly variant="sky me-2" icon="fas fa-eye "
                                    @click="showItemById(row.id)" /> -->
                                <BaseButton v-if="isReconcileEnabled(row)" iconOnly variant="warning" icon="fas fa-sync"
                                    @click="reconcilePaymentById(row.payment_code)" title="Reconcile window active" />

                                <span v-else class="text-muted">
                                    <i class="fas fa-clock  fa-lg text-primary"
                                        title="Reconcile window expired or already paid"></i>
                                </span>

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

import { fetchPaymentsList, reconcilePayment } from "@/core/repos/admin/common/buyerRepos";

/* ---------------- STATE ---------------- */
const uiStore = useUIStore();

const paymentsList = ref([]);

/* ---------------- INIT ---------------- */
onMounted(loadList);

/* ---------------- LOAD ---------------- */
async function loadList() {
    const data = await fetchPaymentsList();
    if (!data) {
        return;
    }
    paymentsList.value = data;
}

function showItemById(id) {
    // router.push({ name: "paymentdetails", params: { id } });
}

//  Reconcile Payment

const isReconcileEnabled = (payment) => {
    if (!payment) return false
    if (payment.status === 'paid') return false
    if (!payment.created_at) return false

    const createdAt = new Date(payment.created_at)
    const now = new Date()

    return (now - createdAt) / 60000 < 15
}
async function reconcilePaymentById(paymentCode) {

    const data = await reconcilePayment({ payment_code: paymentCode });

    if (data) {
        loadList();
    }

}

</script>