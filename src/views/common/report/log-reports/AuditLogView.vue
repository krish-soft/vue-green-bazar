<template>
  <BaseContainer heading="Audit Logs">
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
            <label class="form-label">User Code</label>
            <input v-model="filters.user_code" type="text" class="form-control" placeholder="User code" />
          </div>

          <div class="col-lg-2 col-md-4">
            <label class="form-label">Action</label>
            <input v-model="filters.action" type="text" class="form-control" placeholder="Action" />
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
              <th>User Code</th>
              <th>Action</th>
              <th>Auditable Type</th>
              <th>Auditable ID</th>
              <th>Old Values</th>
              <th>New Values</th>
              <th>IP Address</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in rows" :key="row.id || index">
              <td>{{ index + 1 }}</td>
              <td>{{ formatDateTime(row.created_at) }}</td>
              <td>{{ row.user_code || '-' }}</td>
              <td>{{ row.action || '-' }}</td>
              <td>{{ row.auditable_type || '-' }}</td>
              <td>{{ row.auditable_id || '-' }}</td>
              <td>
                <details v-if="hasJson(row.old_values)">
                  <summary class="json-toggle">View</summary>
                  <pre class="json-block">{{ stringifyJson(row.old_values) }}</pre>
                </details>
                <span v-else>-</span>
              </td>
              <td>
                <details v-if="hasJson(row.new_values)">
                  <summary class="json-toggle">View</summary>
                  <pre class="json-block">{{ stringifyJson(row.new_values) }}</pre>
                </details>
                <span v-else>-</span>
              </td>
              <td>{{ row.ip_address || '-' }}</td>
              <td>{{ row.reason || '-' }}</td>
            </tr>

            <tr v-if="rows.length === 0">
              <td colspan="10" class="text-center text-muted py-3">No audit logs found for selected filters</td>
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
import { fetchAuditLogs } from "@/core/repos/admin/common/reportRepos";

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
    user_code: "",
    action: "",
    ip_address: "",
    search: "",
  };
}

async function loadLogs() {
  const data = await fetchAuditLogs({ ...filters.value });
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
  const fileUrl = await fetchAuditLogs({
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

function hasJson(value) {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  return true;
}

function stringifyJson(value) {
  if (value === null || value === undefined) return "-";

  if (typeof value === "string") {
    try {
      return JSON.stringify(JSON.parse(value), null, 2);
    } catch {
      return value;
    }
  }

  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
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

.json-toggle {
  cursor: pointer;
  color: #0d6efd;
  font-weight: 600;
}

.json-block {
  max-width: 340px;
  max-height: 180px;
  overflow: auto;
  margin: 8px 0 0;
  padding: 8px;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  font-size: 12px;
}
</style>
