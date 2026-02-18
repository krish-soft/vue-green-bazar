<template>
    <div class="col-lg-4 mb-4">
        <div class="card shadow-sm border-0 h-100">

            <div class="card-header fw-bold">
                {{ title }}
            </div>

            <div class="card-body p-0">
                <table class="table table-sm mb-0">
                    <thead class="table-light">
                        <tr>
                            <th>Status</th>
                            <th>Available</th>
                            <th>Hold</th>
                            <th>Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="(row, i) in rows" :key="i">

                            <td>
                                <span class="badge" :class="statusClass(row.status)">
                                    {{ row.status }}
                                </span>
                            </td>

                            <td class="text-success fw-semibold">
                                {{ row.total_available_balance }}
                            </td>

                            <td class="text-warning fw-semibold">
                                {{ row.total_hold_balance }}
                            </td>

                            <td class="fw-bold">
                                {{ row.total_balance }}
                            </td>

                        </tr>

                        <tr v-if="!rows || rows.length === 0">
                            <td colspan="4" class="text-center text-muted py-3">No Data</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</template>

<script setup>

defineProps({
    title: String,
    rows: Array
});

function statusClass(status) {
    if (status === 'available') return 'bg-success';
    if (status === 'hold') return 'bg-warning';
    return 'bg-secondary';
}
</script>
