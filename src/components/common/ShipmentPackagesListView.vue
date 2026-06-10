<template>
    <div class="shipment-wrapper">

        <table class="table table-sm table-bordered align-middle">

            <thead class="table-light">
                <tr>
                    <th>#</th>
                    <th>Shipment Number</th>
                    <th>Shipment Type</th>
                    <th>Shipment Status</th>
                    <!-- <th>Shipment Package Number</th> -->
                    <th>Package Type</th>
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
                        <template v-if="allowStatusEdit && getShipment(pack)?.id">
                            <div class="status-inline-editor">
                                <StatusBadge :status="getShipment(pack)?.status ?? '-'" />
                                <select
                                    v-model="shipmentStatusDrafts[getShipment(pack)?.id]"
                                    class="form-select form-select-sm status-select"
                                    :disabled="loadingShipmentIds[getShipment(pack)?.id]"
                                >
                                    <option value="">Select status</option>
                                    <option
                                        v-for="status in shipmentStatusOptions"
                                        :key="`shipment-${status.value ?? status}`"
                                        :value="status.value ?? status"
                                    >
                                        {{ getStatusValue(status) }}
                                    </option>
                                </select>
                                <BaseButton
                                    size="xs"
                                    variant="primary"
                                    :loading="loadingShipmentIds[getShipment(pack)?.id]"
                                    :disabled="!canSaveShipmentStatus(getShipment(pack))"
                                    @click="saveShipmentStatusValue(getShipment(pack))"
                                >
                                    Save
                                </BaseButton>
                            </div>
                        </template>
                        <StatusBadge v-else :status="getShipment(pack)?.status ?? '-'" />



                    </td>

                    <!-- <td>{{ pack.shipment_package_number ?? '-' }}</td> -->
                    <td>{{ pack.package_type ?? '-' }}</td>

                    <td>{{ pack.package_number ?? '-' }}</td>

                    <td>{{ pack.package_number_seller ?? '-' }}</td>

                    <td>{{ pack.package_number_buyer ?? '-' }}</td>

                    <td>{{ pack.package_number_market ?? '-' }}</td>

                    <td class="text-end">{{ pack.qty ?? '-' }}</td>

                    <td class="text-end">{{ pack.pack_size ?? '-' }}</td>

                    <td>{{ pack.pack_unit ?? '-' }}</td>

                    <td>{{ pack.pack_type_unit ?? '-' }}</td>

                    <td>
                        <template v-if="allowStatusEdit && pack?.id">
                            <div class="status-inline-editor">
                                <StatusBadge :status="pack.status" />
                                <select
                                    v-model="packageStatusDrafts[pack.id]"
                                    class="form-select form-select-sm status-select"
                                    :disabled="loadingPackageIds[pack.id]"
                                >
                                    <option value="">Select status</option>
                                    <option
                                        v-for="status in shipmentStatusOptions"
                                        :key="`package-${status.value ?? status}`"
                                        :value="status.value ?? status"
                                    >
                                        {{ getStatusValue(status) }}
                                    </option>
                                </select>
                                <BaseButton
                                    size="xs"
                                    variant="primary"
                                    :loading="loadingPackageIds[pack.id]"
                                    :disabled="!canSavePackageStatus(pack)"
                                    @click="savePackageStatusValue(pack)"
                                >
                                    Save
                                </BaseButton>
                            </div>
                        </template>
                        <StatusBadge v-else :status="pack.status" />
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

import { computed, onMounted, ref, watch } from "vue"
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import StatusBadge from "@/components/common/badge/StatusBadge.vue";
import {
    updateShipmentPackageStatus,
    updateShipmentStatus,
} from "@/core/repos/admin/common/shippingRepos";
import { fetchAllEnums } from "@/core/repos/utils/utilsRepos";

const props = defineProps({
    packages: {
        type: Array,
        default: () => []
    },
    shipmentKey: {
        type: String,
        default: "shipment"
    },
    allowStatusEdit: {
        type: Boolean,
        default: false
    }
})

const shipmentStatusOptions = ref([])
const shipmentStatusDrafts = ref({})
const packageStatusDrafts = ref({})
const loadingShipmentIds = ref({})
const loadingPackageIds = ref({})

onMounted(async () => {
    if (!props.allowStatusEdit) {
        return
    }

    const enums = await fetchAllEnums()
    shipmentStatusOptions.value = Array.isArray(enums?.shipment_statuses)
        ? enums.shipment_statuses
        : []
})

watch(
    () => props.packages,
    (packages) => {
        shipmentStatusDrafts.value = Object.fromEntries(
            (packages || [])
                .map(pack => pack?.[props.shipmentKey])
                .filter(shipment => shipment?.id)
                .map(shipment => [shipment.id, shipment.status ?? ""])
        )

        packageStatusDrafts.value = Object.fromEntries(
            (packages || [])
                .filter(pack => pack?.id)
                .map(pack => [pack.id, pack.status ?? ""])
        )
    },
    { immediate: true }
)


const getShipment = (pack) => {
    return pack?.[props.shipmentKey] || null
}

const getStatusValue = (status) => {
    if (!status) {
        return "-"
    }

    return status.value ?? status
}

const setLoadingState = (target, id, value) => {
    target.value = {
        ...target.value,
        [id]: value,
    }
}

const canSaveShipmentStatus = (shipment) => {
    if (!shipment?.id) {
        return false
    }

    const status = shipmentStatusDrafts.value[shipment.id]
    return !!status && shipment.status !== status
}

const canSavePackageStatus = (pack) => {
    if (!pack?.id) {
        return false
    }

    const status = packageStatusDrafts.value[pack.id]
    return !!status && pack.status !== status
}

const saveShipmentStatusValue = async (shipment) => {
    const status = shipmentStatusDrafts.value[shipment?.id]

    if (!shipment?.id || !status || shipment.status === status) {
        return
    }

    setLoadingState(loadingShipmentIds, shipment.id, true)

    try {
        await updateShipmentStatus(shipment.id, { status })
        shipment.status = status
    } finally {
        setLoadingState(loadingShipmentIds, shipment.id, false)
    }
}

const savePackageStatusValue = async (pack) => {
    const status = packageStatusDrafts.value[pack?.id]

    if (!pack?.id || !status || pack.status === status) {
        return
    }

    setLoadingState(loadingPackageIds, pack.id, true)

    try {
        await updateShipmentPackageStatus(pack.id, { status })
        pack.status = status
    } finally {
        setLoadingState(loadingPackageIds, pack.id, false)
    }
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

.status-select {
    min-width: 160px;
}

.status-inline-editor {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
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