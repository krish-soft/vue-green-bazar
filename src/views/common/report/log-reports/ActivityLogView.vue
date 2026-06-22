<template>
  <BaseContainer heading="Activity Logs">
    <template #headerActions>
      <div class="d-flex gap-2 flex-wrap">
        <BaseButton variant="secondary" icon="fas fa-rotate" @click="loadLogs">
          Refresh
        </BaseButton>
        <BaseButton variant="primary" icon="fas fa-file-export" @click="exportLogs" :disabled="rows.length === 0">
          Export
        </BaseButton>
      </div>
    </template>

    <template #body>
      <div class="report-toolbar mb-3">
        <div class="row g-2 align-items-end">
          <div class="col-lg-2 col-md-4">
            <label class="form-label">Start Date</label>
            <input v-model="filters.start_date" type="date" class="form-control" />
          </div>

          <div class="col-lg-2 col-md-4">
            <label class="form-label">End Date</label>
            <input v-model="filters.end_date" type="date" class="form-control" />
          </div>

          <div class="col-lg-2 col-md-4">
            <label class="form-label">Actor Code</label>
            <input v-model="filters.actor_code" type="text" class="form-control" placeholder="Actor code" />
          </div>

          <div class="col-lg-2 col-md-4">
            <label class="form-label">Event</label>
            <input v-model="filters.event" type="text" class="form-control" placeholder="Event" />
          </div>

          <div class="col-lg-2 col-md-4">
            <label class="form-label">IP Address</label>
            <input v-model="filters.ip_address" type="text" class="form-control" placeholder="IP" />
          </div>

          <div class="col-lg-2 col-md-4">
            <label class="form-label">Search</label>
            <input v-model="filters.search" type="text" class="form-control" placeholder="Any keyword" />
          </div>

          <div class="col-lg-2 col-md-6">
            <BaseButton variant="primary" class="w-100" icon="fas fa-search" @click="loadLogs">
              Apply Filters
            </BaseButton>
          </div>

          <div class="col-lg-2 col-md-6">
            <BaseButton variant="outline-primary" class="w-100" @click="resetFilters">
              Reset
            </BaseButton>
          </div>
        </div>
      </div>

      <div class="text-muted small mb-2">
        Showing {{ rows.length }} logs from {{ filters.start_date }} to {{ filters.end_date }}
      </div>

      <div class="table-responsive">
        <table class="table table-sm table-bordered table-striped align-middle mb-0">
          <thead class="table-dark">
            <tr>
              <th>#</th>
              <th>Timestamp</th>
              <th>Event</th>
              <th>Actor Type</th>
              <th>Actor Code</th>
              <th>Subject Type</th>
              <th>Subject ID</th>
              <th>IP Address</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in rows" :key="row.id || index">
              <td>{{ index + 1 }}</td>
              <td>{{ formatDateTime(row.created_at) }}</td>
              <td>{{ row.event || '-' }}</td>
              <td>{{ row.actor_type || '-' }}</td>
              <td>{{ row.actor_code || '-' }}</td>
              <td>{{ row.subject_type || '-' }}</td>
              <td>{{ row.subject_id || '-' }}</td>
              <td>{{ row.ip_address || '-' }}</td>
            </tr>

            <tr v-if="rows.length === 0">
              <td colspan="8" class="text-center text-muted py-3">No activity logs found for selected filters</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </BaseContainer>
</template>

<script setup>
import { onMounted, ref } from "vue";
import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import { fetchActivityLogs } from "@/core/repos/admin/common/reportRepos";

const rows = ref([]);
const filters = ref(defaultDateRange());

function defaultDateRange() {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const formatDate = (d) => d.toISOString().slice(0, 10);

  return {
    start_date: formatDate(yesterday),
    end_date: formatDate(today),
    actor_code: "",
    event: "",
    ip_address: "",
    search: "",
  };
}

async function loadLogs() {
  const data = await fetchActivityLogs({ ...filters.value });
  rows.value = data?.rows || [];

  if (data?.start_date) {
    filters.value.start_date = data.start_date;
  }

  if (data?.end_date) {
    filters.value.end_date = data.end_date;
  }
}

function resetFilters() {
  filters.value = defaultDateRange();
  loadLogs();
}

async function exportLogs() {
  const fileUrl = await fetchActivityLogs({
    ...filters.value,
    is_export: 1,
  });

  if (!fileUrl) return;
  window.open(fileUrl, "_blank");
}

function formatDateTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString();
}

onMounted(() => {
  loadLogs();
});
</script>

<style scoped>
.report-toolbar {
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 14px;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
}
</style>
