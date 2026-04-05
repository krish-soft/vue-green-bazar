<template>
    <div class="shipment-wrapper">

        <table class="table table-sm table-bordered align-middle">

            <thead class="table-light">
                <tr>
                    <th>#</th>
                    <th>Shipment Number</th>
                    <th>Shipment Type</th>
                    <th>Shipment Status</th>
                    <th>Shipment Package Number</th>
                    <th>Pack Number</th>
                    <th>Pack Number (Seller)</th>
                    <th>Pack Number (Buyer)</th>
                    <th>Pack Number (Market)</th>
                    <th class="text-end">Qty</th>
                    <th class="text-end">Pack Size</th>
                    <th>Pack Unit</th>
                    <th>Pack Type Unit</th>
                    <th>Pack Status</th>
                </tr>
            </thead>

            <tbody>

                <tr v-for="(pack, index) in packages" :key="pack.id ?? index">

                    <td>{{ index + 1 }}</td>

                    <td>
                        <span class="shipment-label" :style="shipmentStyle(getShipment(pack)?.shipment_number)">
                            {{ getShipment(pack)?.shipment_number ?? '-' }}
                        </span>

                    </td>

                    <td>
                        <!-- {{ getShipment(pack)?.shipment_type ?? '-' }} -->

                        <StatusBadge :status="getShipment(pack)?.shipment_type ?? '-'" />

                    </td>

                    <td>
                        <!-- {{ getShipment(pack)?.status ?? '-' }} -->

                        <StatusBadge :status="getShipment(pack)?.status ?? '-'" />



                    </td>

                    <td>{{ pack.shipment_package_number ?? '-' }}</td>

                    <td>{{ pack.package_number ?? '-' }}</td>

                    <td>{{ pack.package_number_seller ?? '-' }}</td>

                    <td>{{ pack.package_number_buyer ?? '-' }}</td>

                    <td>{{ pack.package_number_market ?? '-' }}</td>

                    <td class="text-end">{{ pack.qty ?? '-' }}</td>

                    <td class="text-end">{{ pack.pack_size ?? '-' }}</td>

                    <td>{{ pack.pack_unit ?? '-' }}</td>

                    <td>{{ pack.pack_type_unit ?? '-' }}</td>

                    <td>
                        <StatusBadge :status="pack.status" />
                    </td>

                </tr>

                <tr v-if="!packages?.length">
                    <td colspan="14" class="text-center text-muted py-3">
                        No shipment packages found
                    </td>
                </tr>

            </tbody>

        </table>

    </div>
</template>


<script setup>

import { computed } from "vue"
import StatusBadge from "@/components/common/badge/StatusBadge.vue";

const props = defineProps({
    packages: {
        type: Array,
        default: () => []
    },
    shipmentKey: {
        type: String,
        default: "shipment"
    }
})


const getShipment = (pack) => {
    return pack?.[props.shipmentKey] || null
}


/* Build shipment → color map */
const shipmentColorMap = computed(() => {

    const map = {}
    let index = 0

    props.packages.forEach(pack => {

        const shipment = getShipment(pack)?.shipment_number

        if (shipment && !map[shipment]) {

            /* distribute colors across 360 hue space */
            const hue = (index * 137) % 360   // golden angle distribution

            map[shipment] = `hsl(${hue},60%,92%)`

            index++

        }

    })

    return map

})


const shipmentStyle = (shipmentNumber) => {

    return {
        background: shipmentColorMap.value[shipmentNumber] || '#f8f9fa',
        border: '1px solid rgba(0,0,0,0.08)',
        padding: '3px 8px',
        borderRadius: '6px',
        fontSize: '12px',
        fontWeight: '600',
        display: 'inline-block'
    }

}

</script>


<style scoped>
.shipment-wrapper {
    overflow: auto;
}

.shipment-label {
    white-space: nowrap;
}

tbody tr:hover {
    background: #fafafa;
}
</style>

<!-- With Divider -->
<!-- <template>
    <div class="mb-4">

        <div class="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
            <h6 class="fw-semibold text-muted mb-0">
                {{ title }}
            </h6>
        </div>

        <table class="table table-sm table-bordered align-middle shipment-table">

            <thead class="table-light">
                <tr>
                    <th>#</th>
                    <th>Shipment Number</th>
                    <th>Shipment Type</th>
                    <th>Shipment Status</th>
                    <th>Shipment Package Number</th>
                    <th>Pack Number</th>
                    <th>Pack Number (Seller)</th>
                    <th>Pack Number (Buyer)</th>
                    <th>Pack Number (Market)</th>
                    <th class="text-end">Qty</th>
                    <th class="text-end">Pack Size</th>
                    <th>Pack Unit</th>
                    <th>Pack Type Unit</th>
                    <th>Pack Status</th>
                </tr>
            </thead>

            <tbody>

                <template v-for="(pack, index) in packages" :key="pack.id ?? index">

<tr v-if="isNewShipment(index)" class="shipment-divider">
                        <td colspan="14">
                            <span class="shipment-title">
                                {{ getShipment(pack)?.shipment_number }}
                            </span>
                        </td>
                    </tr>

<tr class="data-row">

                        <td>{{ index + 1 }}</td>

                        <td class="text-primary fw-semibold">
                            {{ getShipment(pack)?.shipment_number }}
                        </td>

                        <td>{{ getShipment(pack)?.shipment_type ?? '-' }}</td>

                        <td>{{ getShipment(pack)?.status ?? '-' }}</td>

                        <td>{{ pack.shipment_package_number ?? '-' }}</td>

                        <td>{{ pack.package_number ?? '-' }}</td>

                        <td>{{ pack.package_number_seller ?? '-' }}</td>

                        <td>{{ pack.package_number_buyer ?? '-' }}</td>

                        <td>{{ pack.package_number_market ?? '-' }}</td>

                        <td class="text-end">{{ pack.qty ?? '-' }}</td>

                        <td class="text-end">{{ pack.pack_size ?? '-' }}</td>

                        <td>{{ pack.pack_unit ?? '-' }}</td>

                        <td>{{ pack.pack_type_unit ?? '-' }}</td>

                        <td>
                            <StatusBadge :status="pack.status" />
                        </td>

                    </tr>

</template>

<tr v-if="!packages?.length">
                    <td colspan="14" class="text-center text-muted py-3">
                        No shipment packages found
                    </td>
                </tr>

</tbody>

</table>

</div>
</template>


<script setup>

const props = defineProps({

    packages: {
        type: Array,
        default: () => []
    },

    title: {
        type: String,
        default: "Shipment Packages Information"
    },

    shipmentKey: {
        type: String,
        default: "shipment"
    }

})


const getShipment = (pack) => {
    return pack?.[props.shipmentKey] || null
}


const isNewShipment = (index) => {

    if (index === 0) return true

    const prev = getShipment(props.packages[index - 1])
    const curr = getShipment(props.packages[index])

    return prev?.shipment_number !== curr?.shipment_number
}

</script>


<style scoped>
.shipment-table tbody tr.data-row:hover {
    background: #fafafa;
}

.shipment-divider td {
    background: #f6f8fb;
    border-top: 2px solid #d9dee7;
    padding: 8px 12px;
}

.shipment-title {
    font-weight: 600;
    color: #3a6df0;
    font-size: 13px;
    letter-spacing: .2px;
}
</style> -->