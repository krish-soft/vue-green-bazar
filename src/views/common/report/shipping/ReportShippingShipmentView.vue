<template>

    <BaseContainer heading="Shipment Logistics Report" class="mb-3">
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
            <button class="nav-link" :class="{ active: activeTab === 'summary' }" @click="activeTab = 'summary'">
                Shipment Summary
            </button>
        </li>

        <li class="nav-item">
            <button class="nav-link" :class="{ active: activeTab === 'product' }" @click="activeTab = 'product'">
                Product Movement
            </button>
        </li>

        <li class="nav-item">
            <button class="nav-link" :class="{ active: activeTab === 'flow' }" @click="activeTab = 'flow'">
                Flow Summary
            </button>
        </li>

        <li class="nav-item">
            <button class="nav-link" :class="{ active: activeTab === 'details' }" @click="activeTab = 'details'">
                Flow Details
            </button>
        </li>

        <li class="nav-item">
            <button class="nav-link" :class="{ active: activeTab === 'pickup' }" @click="activeTab = 'pickup'">
                Pickup Summary
            </button>
        </li>

        <li class="nav-item">
            <button class="nav-link" :class="{ active: activeTab === 'delivery' }" @click="activeTab = 'delivery'">
                Delivery Summary
            </button>
        </li>

    </ul>



    <!-- SHIPMENT SUMMARY -->

    <div v-if="activeTab === 'summary'" class="card shadow-sm">

        <BaseContainer heading="Shipment Type + Status">

            <template #body>

                <table class="table table-sm table-bordered">

                    <thead class="table-dark">
                        <tr>
                            <th>Type</th>
                            <th>Status</th>
                            <th class="text-end">Shipments</th>
                            <th class="text-end">Packages</th>
                            <th class="text-end">Qty</th>
                            <th class="text-end">Weight</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr v-for="s in report.shipment_summary" :key="s.shipment_type + s.status">

                            <td>{{ s.shipment_type }}</td>
                            <td>
                                <StatusBadge :status="s.status" />
                            </td>

                            <td class="text-end">{{ num(s.shipments) }}</td>
                            <td class="text-end">{{ num(s.packages) }}</td>
                            <td class="text-end">{{ num(s.qty) }}</td>
                            <td class="text-end">{{ num(s.weight) }}</td>

                        </tr>

                    </tbody>

                </table>

            </template>
        </BaseContainer>

    </div>



    <!-- PRODUCT SUMMARY -->

    <div v-if="activeTab === 'product'" class="card shadow-sm">

        <BaseContainer heading="Product Movement By Shipment Type">

            <template #body>

                <div v-for="group in report.product_summary" :key="group.shipment_type" class="mb-4">

                    <h6 class="fw-bold text-primary">
                        {{ group.shipment_type?.toUpperCase() }}
                    </h6>

                    <table class="table table-sm table-bordered">

                        <thead class="table-dark">
                            <tr>
                                <th>Product</th>
                                <th>Pack</th>
                                <th>Unit</th>
                                <th class="text-end">Packages</th>
                                <th class="text-end">Qty</th>
                                <th class="text-end">Weight</th>
                            </tr>
                        </thead>

                        <tbody>

                            <tr v-for="p in group.products" :key="p.product?.product_code + p.pack_size">

                                <td>{{ p.product?.name }}</td>
                                <td>{{ p.pack_size }}</td>
                                <td>{{ p.pack_unit }}</td>

                                <td class="text-end">{{ num(p.packages) }}</td>
                                <td class="text-end">{{ num(p.qty) }}</td>
                                <td class="text-end">{{ num(p.weight) }}</td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </template>
        </BaseContainer>

    </div>



    <!-- FLOW SUMMARY -->

    <div v-if="activeTab === 'flow'" class="card shadow-sm">

        <BaseContainer heading="Location Flow">

            <template #body>

                <table class="table table-sm table-bordered">

                    <thead class="table-dark">
                        <tr>
                            <th>From</th>
                            <th>To</th>
                            <th class="text-end">Shipments</th>
                            <th class="text-end">Packages</th>
                            <th class="text-end">Qty</th>
                            <th class="text-end">Weight</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr v-for="f in report.flow_summary" :key="f.from + f.to">

                            <td>{{ f.from }}</td>
                            <td>{{ f.to }}</td>

                            <td class="text-end">{{ num(f.shipments) }}</td>
                            <td class="text-end">{{ num(f.packages) }}</td>
                            <td class="text-end">{{ num(f.qty) }}</td>
                            <td class="text-end">{{ num(f.weight) }}</td>

                        </tr>

                    </tbody>

                </table>

            </template>
        </BaseContainer>

    </div>



    <!-- FLOW DETAILS -->

    <div v-if="activeTab === 'details'" class="card shadow-sm">

        <BaseContainer heading="Shipment Flow Details">

            <template #body>

                <div v-for="flow in report.flow_details" :key="flow.from?.addr_name + flow.to?.addr_name" class="mb-4">

                    <h6 class="fw-bold">
                        <span class="text-primary fw-bolder"> {{ flow.from?.addr_name }}</span> → <span
                            class="text-danger fw-bolder">{{
                                flow.to?.addr_name }} </span>
                    </h6>

                    <div v-for="s in flow.shipments" :key="s.shipment_number" class="mb-3">

                        <div class="fw-bold mb-1">
                            <span class="text-danger"> {{ s.shipment_number }} </span>|
                            <span class="text-secondary"> {{ s.shipment_date }} </span> |
                            <StatusBadge :status="s.status" />
                        </div>

                        <table class="table table-sm table-bordered">

                            <thead class="table-light">
                                <tr>
                                    <th>Product</th>
                                    <th>Pack</th>
                                    <th>Unit</th>
                                    <th class="text-end">Qty</th>
                                    <th class="text-end">Weight</th>
                                </tr>
                            </thead>

                            <tbody>

                                <tr v-for="i in s.items" :key="i.product?.product_code + i.pack_size">

                                    <td>{{ i.product?.name }}</td>
                                    <td>{{ i.pack_size }}</td>
                                    <td>{{ i.pack_unit }}</td>

                                    <td class="text-end">{{ num(i.qty) }}</td>
                                    <td class="text-end">{{ num(i.weight) }}</td>

                                </tr>

                                <tr class="table-secondary fw-bold">

                                    <td colspan="3">Shipment Total</td>

                                    <td class="text-end">{{ num(s.total.qty) }}</td>
                                    <td class="text-end">{{ num(s.total.weight) }}</td>

                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

            </template>
        </BaseContainer>

    </div>



    <!-- PICKUP SUMMARY -->

    <div v-if="activeTab === 'pickup'" class="card shadow-sm">

        <BaseContainer heading="Pickup Summary (From Location)">

            <template #body>

                <div v-for="loc in report.from_location_summary" :key="loc.location" class="mb-4">

                    <h6 class="fw-bold">{{ loc.location }}</h6>

                    <table class="table table-sm table-bordered">

                        <thead class="table-dark">
                            <tr>
                                <th>Product</th>
                                <th>Pack</th>
                                <th>Unit</th>
                                <th class="text-end">Qty</th>
                                <th class="text-end">Weight</th>
                            </tr>
                        </thead>

                        <tbody>

                            <tr v-for="p in loc.products" :key="p.product?.product_code + p.pack_size">

                                <td>{{ p.product?.name }}</td>
                                <td>{{ p.pack_size }}</td>
                                <td>{{ p.pack_unit }}</td>

                                <td class="text-end">{{ num(p.qty) }}</td>
                                <td class="text-end">{{ num(p.weight) }}</td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </template>
        </BaseContainer>

    </div>



    <!-- DELIVERY SUMMARY -->

    <div v-if="activeTab === 'delivery'" class="card shadow-sm">

        <BaseContainer heading="Delivery Summary (To Location)">

            <template #body>

                <div v-for="loc in report.to_location_summary" :key="loc.location" class="mb-4">

                    <h6 class="fw-bold">{{ loc.location }}</h6>

                    <table class="table table-sm table-bordered">

                        <thead class="table-dark">
                            <tr>
                                <th>Product</th>
                                <th>Pack</th>
                                <th>Unit</th>
                                <th class="text-end">Qty</th>
                                <th class="text-end">Weight</th>
                            </tr>
                        </thead>

                        <tbody>

                            <tr v-for="p in loc.products" :key="p.product?.product_code + p.pack_size">

                                <td>{{ p.product?.name }}</td>
                                <td>{{ p.pack_size }}</td>
                                <td>{{ p.pack_unit }}</td>

                                <td class="text-end">{{ num(p.qty) }}</td>
                                <td class="text-end">{{ num(p.weight) }}</td>

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
import StatusBadge from "@/components/common/badge/StatusBadge.vue"

import { fetchShippingReportByShipment } from "@/core/repos/admin/common/reportRepos"


const today = new Date()
const yesterday = new Date()
yesterday.setDate(today.getDate() - 1)

const filters = ref({
    start_date: yesterday.toISOString().slice(0, 10),
    end_date: today.toISOString().slice(0, 10),
    is_pdf_export: 0
})

const report = ref({
    shipment_summary: [],
    product_summary: [],
    flow_summary: [],
    flow_details: [],
    from_location_summary: [],
    to_location_summary: []
})

const activeTab = ref("summary")

const loadReport = async () => {

    const payload = filters.value

    const data = await fetchShippingReportByShipment(payload)

    if (!data) return

    if (payload.is_pdf_export) {
        window.open(data, "_blank")
        return
    }

    report.value = data

}

const num = (v) => Number(v || 0).toLocaleString()

onMounted(() => loadReport())

</script>