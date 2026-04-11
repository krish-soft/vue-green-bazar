<template>

    <BaseContainer heading="Shipping Report by Buyer" class="mb-3">

        <template #body>

            <div class="row g-3 align-items-end">

                <div class="col-md-3">
                    <label class="form-label">Start Date</label>
                    <input type="date" class="form-control" v-model="filters.start_date">
                </div>

                <div class="col-md-3">
                    <label class="form-label">End Date</label>
                    <input type="date" class="form-control" v-model="filters.end_date">
                </div>

                <div class="col-md-3">
                    <label class="form-label">Export PDF</label>
                    <select class="form-select" v-model="filters.is_pdf_export">
                        <option :value="0">No</option>
                        <option :value="1">Yes</option>
                    </select>
                </div>

                <div class="col-md-3">
                    <BaseButton variant="primary" @click="loadReport">
                        Load Report
                    </BaseButton>
                </div>

            </div>

        </template>
    </BaseContainer>


    <ul class="nav nav-tabs mb-3">

        <li class="nav-item">
            <button class="nav-link" :class="{ active: activeTab === 'buyer' }" @click="activeTab = 'buyer'">
                Buyer Report
            </button>
        </li>

        <li class="nav-item">
            <button class="nav-link" :class="{ active: activeTab === 'product' }" @click="activeTab = 'product'">
                Product Summary
            </button>
        </li>

        <li class="nav-item">
            <button class="nav-link" :class="{ active: activeTab === 'total' }" @click="activeTab = 'total'">
                Grand Totals
            </button>
        </li>

    </ul>



    <!-- BUYER REPORT -->

    <div v-if="activeTab === 'buyer'" class="card shadow-sm">

        <BaseContainer heading="Buyer Shipping Details">

            <template #body>

                <div class="table-responsive">

                    <table class="table table-sm table-bordered table-hover">

                        <thead class="table-dark">

                            <tr>

                                <th>Buyer</th>
                                <th>Source</th>
                                <th>Order</th>

                                <th>Product Code</th>
                                <th>Product</th>

                                <th>Pack</th>
                                <th>Type</th>
                                <th>Unit</th>

                                <th class="text-end">Rate</th>

                                <th class="text-end">Qty</th>
                                <th class="text-end text-success">Shipped</th>

                                <th class="text-end">Weight</th>
                                <th class="text-end">Amount</th>

                            </tr>

                        </thead>


                        <tbody>

                            <template v-for="buyer in report.buyer_reports">

                                <tr v-for="item in buyer.items" :key="buyer.buyer.id + item.product.product_code">

                                    <td class="fw-semibold">

                                        {{ buyer.buyer.name }}

                                        <div class="small text-muted">
                                            {{ buyer.buyer.user_code }} | {{ buyer.buyer.nickname }}
                                        </div>

                                    </td>

                                    <td>{{ item.source_type }}</td>

                                    <td>{{ item.source_number }}</td>

                                    <td>{{ item.product.product_code }}</td>

                                    <td>{{ item.product.name }}</td>

                                    <td>{{ item.pack_size }}</td>

                                    <td>{{ item.pack_type_unit }}</td>

                                    <td>{{ item.pack_unit }}</td>

                                    <td class="text-end">
                                        {{ num(item.rate) }}
                                    </td>

                                    <td class="text-end fw-bold">
                                        {{ num(item.qty) }}
                                    </td>

                                    <td class="text-end text-success">
                                        {{ num(item.shipped_qty) }}
                                    </td>

                                    <td class="text-end">
                                        {{ num(item.weight) }}
                                    </td>

                                    <td class="text-end">
                                        {{ num(item.amount) }}
                                    </td>

                                </tr>



                                <tr v-for="t in buyer.total" :key="'t' + buyer.buyer.id"
                                    class="table-secondary fw-bold">

                                    <td>
                                        TOTAL — {{ buyer.buyer.name }}
                                    </td>

                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>

                                    <td></td>

                                    <td class="text-end">
                                        {{ num(t.qty) }}
                                    </td>

                                    <td class="text-end text-success">
                                        {{ num(t.shipped_qty) }}
                                    </td>

                                    <td class="text-end">
                                        {{ num(t.weight) }}
                                    </td>

                                    <td class="text-end">
                                        {{ num(t.amount) }}
                                    </td>

                                </tr>

                            </template>

                        </tbody>

                    </table>

                </div>

            </template>
        </BaseContainer>

    </div>



    <!-- PRODUCT SUMMARY -->

    <div v-if="activeTab === 'product'" class="card shadow-sm">

        <BaseContainer heading="Product Summary">

            <template #body>

                <div class="table-responsive">

                    <table class="table table-sm table-bordered">

                        <thead class="table-light">

                            <tr>

                                <th>Product Code</th>
                                <th>Product</th>
                                <th>Unit</th>

                                <th class="text-end">Qty</th>
                                <th class="text-end text-success">Shipped</th>

                                <th class="text-end">Weight</th>
                                <th class="text-end">Amount</th>

                            </tr>

                        </thead>

                        <tbody>

                            <tr v-for="p in report.product_summary" :key="p.product.product_code">

                                <td>{{ p.product.product_code }}</td>
                                <td>{{ p.product.name }}</td>
                                <td>{{ p.pack_unit }}</td>

                                <td class="text-end fw-bold">
                                    {{ num(p.qty) }}
                                </td>

                                <td class="text-end text-success">
                                    {{ num(p.shipped_qty) }}
                                </td>

                                <td class="text-end">
                                    {{ num(p.weight) }}
                                </td>

                                <td class="text-end">
                                    {{ num(p.amount) }}
                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </template>
        </BaseContainer>

    </div>



    <!-- GRAND TOTAL -->

    <div v-if="activeTab === 'total'" class="card shadow-sm">

        <BaseContainer heading="Grand Totals">

            <template #body>

                <div class="table-responsive">

                    <table class="table table-bordered text-center">

                        <thead class="table-light">

                            <tr>

                                <th>Unit</th>
                                <th>Qty</th>
                                <th class="text-success">Shipped</th>
                                <th>Weight</th>
                                <th>Amount</th>

                            </tr>

                        </thead>

                        <tbody>

                            <tr v-for="g in report.grand_totals" :key="g.pack_unit" class="fw-bold">

                                <td>{{ g.pack_unit }}</td>

                                <td>{{ num(g.qty) }}</td>

                                <td class="text-success">
                                    {{ num(g.shipped_qty) }}
                                </td>

                                <td>{{ num(g.weight) }}</td>

                                <td>{{ num(g.amount) }}</td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </template>
        </BaseContainer>

    </div>

</template>



<script setup>

import { ref, onMounted } from "vue"
import BaseContainer from "@/components/common/cards/BaseContainer.vue"
import BaseButton from "@/components/common/buttons/BaseButton.vue"

import { fetchShippingReportByBuyer } from "@/core/repos/admin/common/reportRepos"



const today = new Date()
const yesterday = new Date()
yesterday.setDate(today.getDate() - 1)


const filters = ref({
    start_date: yesterday.toISOString().slice(0, 10),
    end_date: today.toISOString().slice(0, 10),
    is_pdf_export: 0
})


const report = ref({
    product_summary: [],
    buyer_reports: [],
    grand_totals: []
})


const activeTab = ref("buyer")


const loadReport = async () => {

    const payload = filters.value

    const data = await fetchShippingReportByBuyer(payload)

    if (!data) return


    if (payload.is_pdf_export) {

        window.open(data, "_blank")
        return

    }

    report.value = data

}


const num = (v) => Number(v || 0).toLocaleString()


onMounted(() => {
    loadReport()
})

</script>