<template>

    <BaseContainer heading="Sales Report" class="mb-3">

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
                    <BaseButton variant="primary" @click="loadReport">
                        Load Report
                    </BaseButton>
                </div>

            </div>

        </template>

    </BaseContainer>



    <ul class="nav nav-tabs mb-3">

        <li class="nav-item">
            <button class="nav-link" :class="{ active: activeTab === 'summary' }" @click="activeTab = 'summary'">
                Summary
            </button>
        </li>

        <li class="nav-item">
            <button class="nav-link" :class="{ active: activeTab === 'orders' }" @click="activeTab = 'orders'">
                Order Products
            </button>
        </li>

        <li class="nav-item">
            <button class="nav-link" :class="{ active: activeTab === 'demand' }" @click="activeTab = 'demand'">
                Demand Order Products
            </button>
        </li>

        <li class="nav-item">
            <button class="nav-link" :class="{ active: activeTab === 'overall' }" @click="activeTab = 'overall'">
                Overall Products
            </button>
        </li>

        <li class="nav-item">
            <button class="nav-link" :class="{ active: activeTab === 'totals' }" @click="activeTab = 'totals'">
                Totals by Unit
            </button>
        </li>

    </ul>



    <!-- SUMMARY -->

    <div v-if="activeTab === 'summary'" class="card shadow-sm">

        <BaseContainer heading="Sales Summary">

            <template #body>

                <div class="row g-4">

                    <div class="col-md-6">

                        <h6>Order Status</h6>

                        <table class="table table-sm table-bordered">

                            <tr v-for="s in report?.status_summary?.orders || []" :key="s.status">
                                <td>{{ s.status }}</td>
                                <td class="text-end fw-bold">{{ num(s.count) }}</td>
                            </tr>

                        </table>

                    </div>



                    <div class="col-md-6">

                        <h6>Demand Order Status</h6>

                        <table class="table table-sm table-bordered">

                            <tr v-for="s in report?.status_summary?.demand_orders || []" :key="s.status">
                                <td>{{ s.status }}</td>
                                <td class="text-end fw-bold">{{ num(s.count) }}</td>
                            </tr>

                        </table>

                    </div>



                    <div class="col-md-6">

                        <h6>Order Totals</h6>

                        <table class="table table-bordered">

                            <tr>
                                <td>Total Orders</td>
                                <td class="text-end">{{ num(report?.amount_summary?.orders?.order_count) }}</td>
                            </tr>

                            <tr>
                                <td>Base Amount</td>
                                <td class="text-end">{{ num(report?.amount_summary?.orders?.base_amount) }}</td>
                            </tr>

                            <tr>
                                <td>Tax</td>
                                <td class="text-end">{{ num(report?.amount_summary?.orders?.tax_amount) }}</td>
                            </tr>

                            <tr class="fw-bold">
                                <td>Total Sales</td>
                                <td class="text-end">{{ num(report?.amount_summary?.orders?.total_amount) }}</td>
                            </tr>

                        </table>

                    </div>



                    <div class="col-md-6">

                        <h6>Demand Order Totals</h6>

                        <table class="table table-bordered">

                            <tr>
                                <td>Total Orders</td>
                                <td class="text-end">{{ num(report?.amount_summary?.demand_orders?.order_count) }}</td>
                            </tr>

                            <tr>
                                <td>Base Amount</td>
                                <td class="text-end">{{ num(report?.amount_summary?.demand_orders?.base_amount) }}</td>
                            </tr>

                            <tr>
                                <td>Tax</td>
                                <td class="text-end">{{ num(report?.amount_summary?.demand_orders?.tax_amount) }}</td>
                            </tr>

                            <tr class="fw-bold">
                                <td>Total Sales</td>
                                <td class="text-end">{{ num(report?.amount_summary?.demand_orders?.total_amount) }}</td>
                            </tr>

                        </table>

                    </div>

                </div>

            </template>

        </BaseContainer>

    </div>



    <!-- ORDER PRODUCTS -->

    <div v-if="activeTab === 'orders'" class="card shadow-sm">

        <BaseContainer heading="Order Product Summary">

            <template #body>

                <table class="table table-sm table-bordered">

                    <thead class="table-dark">

                        <tr>
                            <th>Product Code</th>
                            <th>Product</th>
                            <th>Pack</th>
                            <th>Unit</th>
                            <th class="text-end">Qty</th>
                            <th class="text-end">Weight</th>
                            <th class="text-end">Amount</th>
                        </tr>

                    </thead>

                    <tbody>

                        <tr v-for="p in report?.product_summary?.orders || []" :key="p.product.product_code">

                            <td>{{ p.product.product_code }}</td>
                            <td>{{ p.product.name }}</td>
                            <td>{{ p.pack_size }}</td>
                            <td>{{ p.pack_unit }}</td>

                            <td class="text-end fw-bold">{{ num(p.qty) }}</td>
                            <td class="text-end">{{ num(p.weight) }}</td>
                            <td class="text-end">{{ num(p.amount) }}</td>

                        </tr>

                    </tbody>

                </table>

            </template>

        </BaseContainer>

    </div>



    <!-- DEMAND PRODUCTS -->

    <div v-if="activeTab === 'demand'" class="card shadow-sm">

        <BaseContainer heading="Demand Order Product Summary">

            <template #body>

                <table class="table table-sm table-bordered">

                    <thead class="table-dark">

                        <tr>
                            <th>Product Code</th>
                            <th>Product</th>
                            <th>Pack</th>
                            <th>Unit</th>
                            <th class="text-end">Qty</th>
                            <th class="text-end">Weight</th>
                            <th class="text-end">Amount</th>
                        </tr>

                    </thead>

                    <tbody>

                        <tr v-for="p in report?.product_summary?.demand_orders || []" :key="p.product.product_code">

                            <td>{{ p.product.product_code }}</td>
                            <td>{{ p.product.name }}</td>
                            <td>{{ p.pack_size }}</td>
                            <td>{{ p.pack_unit }}</td>

                            <td class="text-end fw-bold">{{ num(p.qty) }}</td>
                            <td class="text-end">{{ num(p.weight) }}</td>
                            <td class="text-end">{{ num(p.amount) }}</td>

                        </tr>

                    </tbody>

                </table>

            </template>

        </BaseContainer>

    </div>



    <!-- OVERALL PRODUCTS WITH TOTALS -->

    <div v-if="activeTab === 'overall'" class="card shadow-sm">

        <BaseContainer heading="Overall Product Summary">

            <template #body>

                <table class="table table-sm table-bordered">

                    <thead class="table-dark">

                        <tr>
                            <th>Product Code</th>
                            <th>Product</th>
                            <th>Pack</th>
                            <th>Unit</th>
                            <th class="text-end">Qty</th>
                            <th class="text-end">Weight</th>
                            <th class="text-end">Amount</th>
                        </tr>

                    </thead>

                    <tbody>

                        <template v-for="(rows, unit) in groupedProducts" :key="unit">

                            <tr v-for="p in rows" :key="p.product.product_code + p.pack_size">

                                <td>{{ p.product.product_code }}</td>
                                <td>{{ p.product.name }}</td>
                                <td>{{ p.pack_size }}</td>
                                <td>{{ p.pack_unit }}</td>

                                <td class="text-end fw-bold">{{ num(p.qty) }}</td>
                                <td class="text-end">{{ num(p.weight) }}</td>
                                <td class="text-end">{{ num(p.amount) }}</td>

                            </tr>


                            <tr class="table-secondary fw-bold">

                                <td colspan="4">
                                    TOTAL {{ unit.toUpperCase() }}
                                </td>

                                <td class="text-end">{{ num(sum(rows, 'qty')) }}</td>
                                <td class="text-end">{{ num(sum(rows, 'weight')) }}</td>
                                <td class="text-end">{{ num(sum(rows, 'amount')) }}</td>

                            </tr>

                        </template>

                    </tbody>

                </table>

            </template>

        </BaseContainer>

    </div>



    <!-- TOTALS BY UNIT -->

    <div v-if="activeTab === 'totals'" class="card shadow-sm">

        <BaseContainer heading="Totals by Unit">

            <template #body>

                <table class="table table-bordered">

                    <thead>
                        <tr>
                            <th>Unit</th>
                            <th class="text-end">Qty</th>
                            <th class="text-end">Weight</th>
                            <th class="text-end">Amount</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr v-for="t in report?.product_summary?.totals_by_unit || []" :key="t.pack_unit">

                            <td>{{ t.pack_unit }}</td>
                            <td class="text-end fw-bold">{{ num(t.qty) }}</td>
                            <td class="text-end">{{ num(t.weight) }}</td>
                            <td class="text-end">{{ num(t.amount) }}</td>

                        </tr>

                    </tbody>

                </table>

            </template>

        </BaseContainer>

    </div>

</template>



<script setup>

import { ref, onMounted, computed } from "vue"
import BaseContainer from "@/components/common/cards/BaseContainer.vue"
import BaseButton from "@/components/common/buttons/BaseButton.vue"
import { fetchSalesReport } from "@/core/repos/admin/common/reportRepos"



const today = new Date()
const yesterday = new Date()
yesterday.setDate(today.getDate() - 1)



const filters = ref({
    start_date: yesterday.toISOString().slice(0, 10),
    end_date: today.toISOString().slice(0, 10),
    depot_id: null
})



const report = ref({})
const activeTab = ref("summary")



const overallProducts = computed(() => {

    const orders = report.value?.product_summary?.orders || []
    const demand = report.value?.product_summary?.demand_orders || []

    return [...orders, ...demand]

})



const groupedProducts = computed(() => {

    const rows = overallProducts.value

    return rows.reduce((acc, row) => {

        const unit = row.pack_unit

        if (!acc[unit]) acc[unit] = []

        acc[unit].push(row)

        return acc

    }, {})

})



const sum = (rows, key) => rows.reduce((t, r) => t + (Number(r[key]) || 0), 0)



const loadReport = async () => {

    const data = await fetchSalesReport(filters.value)

    if (!data) return

    report.value = data

}



const num = (v) => Number(v || 0).toLocaleString()



onMounted(() => loadReport())

</script>