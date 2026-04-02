<template>
    <span class="badge status-badge" :class="badgeClass">
        {{ formattedStatus }}
    </span>
</template>

<script setup>
import { computed } from 'vue'

const { status } = defineProps({
    status: { type: String, default: '' }
})

/*
|--------------------------------------------------------------------------
| STATUS VISUAL ENGINE
|--------------------------------------------------------------------------
*/

const STATUS_GROUP = {

    /* ---------- NEUTRAL ---------- */
    pending: 'neutral',
    grouped: 'neutral',

    /* ---------- QUEUE / WAIT ---------- */
    requested: 'queue',
    assigned: 'queue',
    ready_for_pickup: 'queue',
    pickup: 'queue',

    /* ---------- PROGRESS FLOW ---------- */
    accepted: 'progress',
    picked_up: 'progress',
    in_transit: 'progress',
    dispatched: 'progress',
    dispatched_from_depot: 'progress',
    dispatch: 'progress',
    shipped: 'progress',
    processing: 'progress',

    /* ---------- EVENTS ---------- */
    arrived_at_depot: 'event',

    /* ---------- SUCCESS ---------- */
    completed: 'success',
    delivered: 'success',
    confirmed: 'success',
    settled: 'success',
    verified: 'success',
    active: 'success',
    approve: 'success',
    approved: 'success',
    fulfilled: 'success',

    /* ---------- FINANCE ---------- */
    refunded: 'finance',
    paid: 'finance',

    /* ---------- INVENTORY ---------- */
    out_of_stock: 'inventory',
    price_changed: 'inventory',
    invoiced: 'inventory',

    /* ---------- SECURITY ---------- */
    locked: 'secure',
    accounted: 'secure',

    /* ---------- DANGER ---------- */
    cancelled: 'danger',
    damaged: 'danger',
    lost: 'danger',
    returned: 'danger',
    failed_payment: 'danger',
    rejected: 'danger',
    inactive: 'danger',
    not_picked_up: 'danger',
}

const GROUP_STYLE = {
    neutral: 'badge-neutral',
    queue: 'badge-queue',
    progress: 'badge-progress',
    event: 'badge-event',
    success: 'badge-success',
    danger: 'badge-danger',
    secure: 'badge-secure',
    finance: 'badge-finance',
    inventory: 'badge-inventory'
}

const badgeClass = computed(() => {
    const group = STATUS_GROUP[status] || 'neutral'
    return GROUP_STYLE[group]
})

const formattedStatus = computed(() => {
    // return status.replaceAll('_', ' ')
    return status;
})
</script>

<style scoped>
/* base */
.status-badge {
    font-weight: 600;
    letter-spacing: .4px;
    text-transform: capitalize;
}

/* ---------- NEUTRAL ---------- */
.badge-neutral {
    background: #6c757d;
}

/* ---------- QUEUE ---------- */
.badge-queue {
    background: linear-gradient(135deg, #ffc107, #ffda6a);
    color: #000;
}

/* ---------- PROGRESS ---------- */
.badge-progress {
    background: repeating-linear-gradient(45deg,
            #0d6efd,
            #0d6efd 10px,
            #3d8bfd 10px,
            #3d8bfd 20px);
}

/* ---------- EVENT ---------- */
.badge-event {
    background: #0dcaf0;
    color: #000;
}

/* ---------- SUCCESS ---------- */
.badge-success {
    background: linear-gradient(135deg, #198754, #20c997);
}

/* ---------- DANGER ---------- */
.badge-danger {
    background: linear-gradient(135deg, #dc3545, #ff6b6b);
}

/* ---------- SECURE ---------- */
.badge-secure {
    background: repeating-linear-gradient(45deg,
            #6f42c1,
            #6f42c1 6px,
            #8a63d2 6px,
            #8a63d2 12px);
}

/* ---------- FINANCE ---------- */
.badge-finance {
    background: linear-gradient(135deg, #20c997, #0dcaf0);
}

/* ---------- INVENTORY ---------- */
.badge-inventory {
    background: linear-gradient(135deg, #6610f2, #4c6ef5);
}
</style>



<!-- 
case PENDING = 'pending'; case REQUESTED = 'requested'; case ASSIGNED = 'assigned'; case ACCEPTED = 'accepted'; case IN_TRANSIT = 'in_transit'; case COMPLETED = 'completed'; case CANCELLED = 'cancelled'; case PENDING = 'pending'; case READY_TO_PICKUP = 'ready_for_pickup'; case PICKED_UP = 'picked_up'; case IN_TRANSIT = 'in_transit'; case ARRIVED_AT_DEPOT = 'arrived_at_depot'; case DISPATCHED_FROM_DEPOT = 'dispatched_from_depot'; case DISPATCHED = 'dispatched'; case SHIPPED = 'shipped'; case DELIVERED = 'delivered'; case RETURNED = 'returned'; case CANCELLED = 'cancelled'; case DAMAGED = 'damaged'; case LOST = 'lost'; case ASSIGNED = 'assigned'; // grouping status case PICKUP = 'pickup'; case DISPATCH = 'dispatch'; case GROUPED = 'grouped'; case PENDING = 'pending'; case SETTLED = 'settled'; case CANCELLED = 'cancelled'; case PENDING = 'pending'; case CONFIRMED = 'confirmed'; case PROCESSING = 'processing'; case CANCELLED = 'cancelled'; case FAILED_PAYMENT = 'failed_payment'; case REFUNDED = 'refunded'; // Keeping for future use case SHIPPED = 'shipped'; case COMPLETED = 'completed'; case PENDING = 'pending'; case VERIFIED = 'verified'; case REJECTED = 'rejected'; case LOCKED = 'locked'; case APPROVE = 'approve'; case ACTIVE = 'active'; case OUT_OF_STOCK = 'out_of_stock'; case PRICE_CHANGED = 'price_changed'; case CONFIRMED = 'confirmed'; -->