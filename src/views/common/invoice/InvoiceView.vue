<template>

    <BaseContainer heading="Invoices List">

        <template #headerActions>
            <BaseButton variant="primary" @click="createNewInvoice">
                + Create Invoice
            </BaseButton>
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
                            <th>Invoice Date</th>
                            <th>Invoice Number</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Total Amount</th>

                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(invoice, index) in invoicesList" :key="invoice.id"
                            @click="showInvoiceById(invoice.id)" style="cursor: pointer;">
                            <td>{{ index + 1 }}</td>

                            <td>{{ new Date(invoice.invoice_date).toDateString() }}</td>
                            <td>{{ invoice.invoice_number }}</td>
                            <td>
                                <StatusBadge :status="invoice.invoice_type" />
                            </td>

                            <td>
                                <StatusBadge :status="invoice.status" />
                            </td>
                            <td class="text-end">{{ invoice.total_amount }}</td>
                            <td>
                                <BaseButton iconOnly variant="success me-2" icon="fas fa-edit"
                                    @click="editByItemId(invoice.id)" />

                                <BaseButton iconOnly variant="sky me-2" icon="fas fa-eye"
                                    @click="showItemById(invoice.id)" />
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

import { fetchInvoicesList } from "@/core/repos/admin/common/invoiceRepos";
import StatusBadge from "@/components/common/badge/StatusBadge.vue";

/* ---------------- STATE ---------------- */
const uiStore = useUIStore();

const invoicesList = ref([]);

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
    const data = await fetchInvoicesList(filters.value);
    if (!data) {
        return;
    }
    invoicesList.value = data;
}

function showItemById(id) {
    // router.push({ name: "invoicedetails", params: { id } });
}

function editByItemId(id) {
    router.push({ name: "invoiceedit", params: { id } });
}

function createNewInvoice() {
    router.push({ name: "invoicecreate" });
}

</script>
