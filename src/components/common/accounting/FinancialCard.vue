<template>
    <div class="col-xl-3 col-md-6 mb-3">
        <div class="card border-0 shadow-sm kpi-card" :class="'bg-' + color + '-subtle'">
            <div class="card-body">
                <div class="kpi-title">{{ title }}</div>
                <div class="kpi-value" :class="'text-' + color">
                    {{ value || 0 }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: String,
    value: String,
    color: String
});
</script>

<style scoped>
.kpi-card {
    border-radius: 14px;
}

.kpi-title {
    font-size: 13px;
    color: #6c757d;
}

.kpi-value {
    font-size: 22px;
    font-weight: 700;
}
</style>
