<template>

    <BaseContainer heading="Shipping Report by Seller" class="mb-3">

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

                <!-- <div class="col-md-3">
                    <label class="form-label">Status</label>
                    <select class="form-select" v-model="filters.status">
                        <option value="*">All</option>
                        <option value="1">Open / Pending</option>
                    </select>
                </div> -->

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
            <button class="nav-link" :class="{ active: activeTab === 'seller' }" @click="activeTab = 'seller'">
                Seller Report
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



    <!-- SELLER DETAILS -->

    <div v-if="activeTab === 'seller'" class="card shadow-sm">

        <BaseContainer heading="Seller Shipping Details">

            <template #body>
                <div class="table-responsive">

                    <table class="table table-sm table-bordered table-hover" id="datatable">

                        <thead class="table-dark">

                            <tr>

                                <th>Seller</th>
                                <th>Product Code</th>
                                <th>Product</th>
                                <th>Pack Size</th>
                                <th>Pack Type</th>
                                <th>Unit</th>

                                <th class="text-end">Qty</th>
                                <th class="text-end text-primary">Sold Qty</th>
                                <th class="text-end text-success">Shipped Qty</th>
                                <th class="text-end text-warning">Pending</th>

                                <th class="text-end">Listed Wt</th>
                                <th class="text-end">Sold Wt</th>
                                <th class="text-end">Shipped Wt</th>

                            </tr>

                        </thead>

                        <tbody>

                            <template v-for="seller in report.seller_reports">

                                <tr v-for="item in seller.items" :key="seller.seller.id + item.product.product_code">

                                    <td class="fw-semibold">

                                        {{ seller.seller.name }}

                                        <div class="small text-muted">
                                            {{ seller.seller.user_code }} | {{ seller.seller.nickname }}
                                        </div>

                                    </td>

                                    <td>{{ item.product.product_code }}</td>

                                    <td>{{ item.product.name }}</td>

                                    <td>{{ item.pack_size }}</td>

                                    <td>{{ item.pack_type_unit }}</td>

                                    <td>{{ item.pack_unit }}</td>

                                    <td class="text-end fw-bold">
                                        {{ num(item.qty) }}
                                    </td>

                                    <td class="text-end text-primary">
                                        {{ num(item.sold_qty) }}
                                    </td>

                                    <td class="text-end text-success">
                                        {{ num(item.shipped_qty) }}
                                    </td>

                                    <td class="text-end text-warning fw-bold">
                                        {{ num(item.sold_qty - item.shipped_qty) }}
                                    </td>

                                    <td class="text-end">
                                        {{ num(item.listed_weight) }}
                                    </td>

                                    <td class="text-end">
                                        {{ num(item.sold_weight) }}
                                    </td>

                                    <td class="text-end">
                                        {{ num(item.shipped_weight) }}
                                    </td>

                                </tr>


                                <tr v-for="t in seller.total" :key="'t' + seller.seller.id"
                                    class="table-secondary fw-bold">

                                    <td>
                                        TOTAL — {{ seller.seller.name }}
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>

                                    <td class="text-end">
                                        {{ num(t.qty) }}
                                    </td>

                                    <td class="text-end text-primary">
                                        {{ num(t.sold_qty) }}
                                    </td>

                                    <td class="text-end text-success">
                                        {{ num(t.shipped_qty) }}
                                    </td>

                                    <td class="text-end text-warning">
                                        {{ num(t.sold_qty - t.shipped_qty) }}
                                    </td>

                                    <td class="text-end">
                                        {{ num(t.listed_weight) }}
                                    </td>

                                    <td class="text-end">
                                        {{ num(t.sold_weight) }}
                                    </td>

                                    <td class="text-end">
                                        {{ num(t.shipped_weight) }}
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


        <BaseContainer heading="Product-wise Summary">

            <template #body>

                <div class="table-responsive">

                    <table class="table table-sm table-bordered">

                        <thead class="table-light">

                            <tr>

                                <th>Product Code</th>
                                <th>Product</th>
                                <th>Unit</th>

                                <th class="text-end">Qty</th>
                                <th class="text-end text-primary">Sold</th>
                                <th class="text-end text-success">Shipped</th>
                                <th class="text-end text-warning">Pending</th>

                                <th class="text-end">Listed Wt</th>
                                <th class="text-end">Sold Wt</th>
                                <th class="text-end">Shipped Wt</th>

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

                                <td class="text-end text-primary">
                                    {{ num(p.sold_qty) }}
                                </td>

                                <td class="text-end text-success">
                                    {{ num(p.shipped_qty) }}
                                </td>

                                <td class="text-end text-warning fw-bold">
                                    {{ num(p.sold_qty - p.shipped_qty) }}
                                </td>

                                <td class="text-end">
                                    {{ num(p.listed_weight) }}
                                </td>

                                <td class="text-end">
                                    {{ num(p.sold_weight) }}
                                </td>

                                <td class="text-end">
                                    {{ num(p.shipped_weight) }}
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
                                <th class="text-primary">Sold</th>
                                <th class="text-success">Shipped</th>
                                <th class="text-warning">Pending</th>

                                <th>Listed Wt</th>
                                <th>Sold Wt</th>
                                <th>Shipped Wt</th>

                            </tr>

                        </thead>

                        <tbody>

                            <tr v-for="g in report.grand_totals" :key="g.pack_unit" class="fw-bold">

                                <td>{{ g.pack_unit }}</td>

                                <td>{{ num(g.qty) }}</td>

                                <td class="text-primary">
                                    {{ num(g.sold_qty) }}
                                </td>

                                <td class="text-success">
                                    {{ num(g.shipped_qty) }}
                                </td>

                                <td class="text-warning">
                                    {{ num(g.sold_qty - g.shipped_qty) }}
                                </td>

                                <td>{{ num(g.listed_weight) }}</td>

                                <td>{{ num(g.sold_weight) }}</td>

                                <td>{{ num(g.shipped_weight) }}</td>

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
import { fetchShippingReportBySeller } from "@/core/repos/admin/common/reportRepos"


const today = new Date()
const yesterday = new Date()
yesterday.setDate(today.getDate() - 1)

const filters = ref({
    start_date: yesterday.toISOString().slice(0, 10),
    end_date: today.toISOString().slice(0, 10),
    status: "*",
    is_pdf_export: 0

})


const report = ref({
    product_summary: [],
    seller_reports: [],
    grand_totals: []
})


const activeTab = ref("seller")

const loadReport = async () => {

    const payload = filters.value;

    const data = await fetchShippingReportBySeller(payload);

    if (!data) return;

    if (payload.is_pdf_export) {
        console.log("Exporting PDF...");
        console.log(data);
        window.open(data, "_blank");
        return;
    }

    report.value = data;
};


const num = (v) => Number(v || 0).toLocaleString()


onMounted(() => {
    loadReport()
})

</script>