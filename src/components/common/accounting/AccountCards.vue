<template>
    <div class="row">
        <div class="col-12">
            <h5 class="fw-bold mb-3">{{ title }}</h5>
            <div class="row">
                <div v-for="(row, i) in rows" :key="i" class="col-xl-3 col-md-4 col-sm-6 mb-3">

                    <div class="card shadow-sm border-0 h-100 summary-card">
                        <div class="card-body">

                            <div class="fw-semibold text-muted small">
                                {{ row.accnt_code }}
                            </div>

                            <h6 class="fw-bold mb-3">{{ row.name }}</h6>

                            <div class="summary-line">
                                <span>Available</span>
                                <b class="text-success">{{ row.available_balance }}</b>
                            </div>

                            <div class="summary-line">
                                <span>Hold</span>
                                <b class="text-warning">{{ row.hold_balance }}</b>
                            </div>

                            <div class="summary-line total">
                                <span>Total</span>
                                <b>{{ row.total_balance }}</b>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: String,
    rows: Array
});
</script>

<style scoped>
.summary-card {
    border-radius: 12px;
}

.summary-line {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
    font-size: 14px;
}

.summary-line.total {
    border-top: 1px solid #eee;
    padding-top: 6px;
    margin-top: 8px;
    font-weight: 600;
}
</style>
