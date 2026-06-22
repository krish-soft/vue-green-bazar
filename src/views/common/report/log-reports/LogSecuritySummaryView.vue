<template>
  <BaseContainer heading="Logs Security Summary">
    <template #headerActions>
      <div class="d-flex gap-2 flex-wrap">
        <BaseButton
          :variant="isAutoRefreshEnabled ? 'danger' : 'outline-primary'"
          :icon="isAutoRefreshEnabled ? 'fas fa-pause' : 'fas fa-play'"
          @click="toggleAutoRefresh"
        >
          {{ isAutoRefreshEnabled ? "Stop Live" : "Start Live" }}
        </BaseButton>
        <BaseButton variant="secondary" icon="fas fa-rotate" @click="loadSummary">
          Refresh
        </BaseButton>
      </div>
    </template>

    <template #body>
      <div class="report-toolbar mb-3">
        <div class="row g-2 align-items-end">
          <div class="col-lg-3 col-md-6">
            <label class="form-label">Start Date</label>
            <input v-model="filters.start_date" type="date" class="form-control" />
          </div>

          <div class="col-lg-3 col-md-6">
            <label class="form-label">End Date</label>
            <input v-model="filters.end_date" type="date" class="form-control" />
          </div>

          <div class="col-lg-3 col-md-6">
            <label class="form-label">Log Type</label>
            <select v-model="filters.log_type" class="form-select">
              <option value="all">All</option>
              <option value="audit">Audit Only</option>
              <option value="activity">Activity Only</option>
            </select>
          </div>

          <div class="col-lg-3 col-md-6">
            <BaseButton variant="primary" class="w-100" icon="fas fa-search" @click="loadSummary">
              Apply Filters
            </BaseButton>
          </div>

          <div class="col-lg-3 col-md-6">
            <label class="form-label">Refresh (seconds)</label>
            <select v-model.number="refreshSeconds" class="form-select" :disabled="!isAutoRefreshEnabled">
              <option :value="10">10s</option>
              <option :value="20">20s</option>
              <option :value="30">30s</option>
              <option :value="60">60s</option>
            </select>
          </div>

          <div class="col-lg-3 col-md-6">
            <label class="form-label">Last Sync</label>
            <div class="sync-box">{{ lastSyncAt ? formatDateTime(lastSyncAt) : "-" }}</div>
          </div>
        </div>
      </div>

      <div class="alert mb-3" :class="alertClass">
        <div class="fw-semibold text-uppercase">Security Alert Level: {{ (summary.alert_level || 'low').toUpperCase() }}</div>
        <div class="small mt-1">
          Suspicious ratio: {{ summary.suspicious_ratio ?? 0 }}% | Last 15m suspicious: {{ summary.last_15m_suspicious ?? 0 }}
        </div>
      </div>

      <div class="row g-3 mb-3">
        <div class="col-lg-4 col-md-6">
          <div class="stat-card">
            <div class="label">Audit Log Count</div>
            <div class="value">{{ summary.audit_count || 0 }}</div>
          </div>
        </div>

        <div class="col-lg-4 col-md-6">
          <div class="stat-card">
            <div class="label">Activity Log Count</div>
            <div class="value">{{ summary.activity_count || 0 }}</div>
          </div>
        </div>

        <div class="col-lg-4 col-md-12">
          <div class="stat-card danger">
            <div class="label">Suspicious Signals</div>
            <div class="value">{{ summary.suspicious_count || 0 }}</div>
          </div>
        </div>

        <div class="col-lg-3 col-md-6">
          <div class="stat-card">
            <div class="label">Events in 15 Minutes</div>
            <div class="value small-value">{{ summary.last_15m_total || 0 }}</div>
          </div>
        </div>

        <div class="col-lg-3 col-md-6">
          <div class="stat-card">
            <div class="label">Events in 60 Minutes</div>
            <div class="value small-value">{{ summary.last_60m_total || 0 }}</div>
          </div>
        </div>

        <div class="col-lg-3 col-md-6">
          <div class="stat-card">
            <div class="label">Unknown Actor Events</div>
            <div class="value small-value">{{ summary.unknown_actor_events || 0 }}</div>
          </div>
        </div>

        <div class="col-lg-3 col-md-6">
          <div class="stat-card">
            <div class="label">Suspicious Ratio</div>
            <div class="value small-value">{{ summary.suspicious_ratio ?? 0 }}%</div>
          </div>
        </div>
      </div>

      <div class="row g-3 mb-3">
        <div class="col-lg-4">
          <div class="card h-100">
            <div class="card-header fw-semibold">Top Audit Actions</div>
            <div class="card-body p-0">
              <table class="table table-sm mb-0">
                <tbody>
                  <tr v-for="(row, index) in summary.top_audit_actions || []" :key="`audit-${index}`">
                    <td>{{ row.action || '-' }}</td>
                    <td class="text-end fw-semibold">{{ row.total || 0 }}</td>
                  </tr>
                  <tr v-if="!(summary.top_audit_actions || []).length">
                    <td colspan="2" class="text-center text-muted py-3">No data</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="card h-100">
            <div class="card-header fw-semibold">Top Activity Events</div>
            <div class="card-body p-0">
              <table class="table table-sm mb-0">
                <tbody>
                  <tr v-for="(row, index) in summary.top_activity_events || []" :key="`activity-${index}`">
                    <td>{{ row.event || '-' }}</td>
                    <td class="text-end fw-semibold">{{ row.total || 0 }}</td>
                  </tr>
                  <tr v-if="!(summary.top_activity_events || []).length">
                    <td colspan="2" class="text-center text-muted py-3">No data</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="card h-100">
            <div class="card-header fw-semibold">Top IP Addresses</div>
            <div class="card-body p-0">
              <table class="table table-sm mb-0">
                <tbody>
                  <tr v-for="(row, index) in summary.top_ip_addresses || []" :key="`ip-${index}`">
                    <td>{{ row.ip_address || '-' }}</td>
                    <td class="text-end fw-semibold">{{ row.total || 0 }}</td>
                  </tr>
                  <tr v-if="!(summary.top_ip_addresses || []).length">
                    <td colspan="2" class="text-center text-muted py-3">No data</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-3 mb-3">
        <div class="col-lg-6">
          <div class="card h-100">
            <div class="card-header fw-semibold">High Risk Users</div>
            <div class="card-body p-0">
              <table class="table table-sm mb-0">
                <thead>
                  <tr>
                    <th>User Code</th>
                    <th class="text-end">Suspicious Hits</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in summary.high_risk_users || []" :key="`hr-user-${index}`">
                    <td>{{ row.user_code || '-' }}</td>
                    <td class="text-end fw-semibold">{{ row.total || 0 }}</td>
                  </tr>
                  <tr v-if="!(summary.high_risk_users || []).length">
                    <td colspan="2" class="text-center text-muted py-3">No data</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="card h-100">
            <div class="card-header fw-semibold">High Risk IPs</div>
            <div class="card-body p-0">
              <table class="table table-sm mb-0">
                <thead>
                  <tr>
                    <th>IP Address</th>
                    <th class="text-end">Suspicious Hits</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in summary.high_risk_ips || []" :key="`hr-ip-${index}`">
                    <td>{{ row.ip_address || '-' }}</td>
                    <td class="text-end fw-semibold">{{ row.total || 0 }}</td>
                  </tr>
                  <tr v-if="!(summary.high_risk_ips || []).length">
                    <td colspan="2" class="text-center text-muted py-3">No data</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-3 mb-3">
        <div class="col-12">
          <div class="card">
            <div class="card-header fw-semibold">Recent Security Alerts</div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-sm table-bordered mb-0">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Source</th>
                      <th>Actor</th>
                      <th>IP</th>
                      <th>Signal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, index) in summary.recent_alerts || []" :key="`alert-${index}`">
                      <td>{{ formatDateTime(row.created_at) }}</td>
                      <td>
                        <span class="badge" :class="row.source === 'audit' ? 'bg-primary' : 'bg-secondary'">
                          {{ row.source || '-' }}
                        </span>
                      </td>
                      <td>{{ row.actor_code || '-' }}</td>
                      <td>{{ row.ip_address || '-' }}</td>
                      <td>{{ row.message || '-' }}</td>
                    </tr>
                    <tr v-if="!(summary.recent_alerts || []).length">
                      <td colspan="5" class="text-center text-muted py-3">No alerts</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-3">
        <div class="col-12">
          <div class="card">
            <div class="card-header fw-semibold">Live Timeline (5-minute buckets)</div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-sm table-bordered mb-0">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th class="text-end">Audit</th>
                      <th class="text-end">Activity</th>
                      <th class="text-end">Suspicious</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, index) in summary.timeline || []" :key="`timeline-${index}`">
                      <td>{{ row.time || '-' }}</td>
                      <td class="text-end">{{ row.audit_total || 0 }}</td>
                      <td class="text-end">{{ row.activity_total || 0 }}</td>
                      <td class="text-end fw-semibold" :class="(row.suspicious_total || 0) > 0 ? 'text-danger' : ''">
                        {{ row.suspicious_total || 0 }}
                      </td>
                    </tr>
                    <tr v-if="!(summary.timeline || []).length">
                      <td colspan="4" class="text-center text-muted py-3">No timeline data</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </BaseContainer>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import { fetchLogsSummary } from "@/core/repos/admin/common/reportRepos";

const summary = ref({});
const filters = ref(defaultDateRange());
const lastSyncAt = ref(null);
const isAutoRefreshEnabled = ref(true);
const refreshSeconds = ref(20);
let refreshTimer = null;

function defaultDateRange() {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const formatDate = (d) => d.toISOString().slice(0, 10);

  return {
    start_date: formatDate(yesterday),
    end_date: formatDate(today),
    log_type: "all",
  };
}

async function loadSummary() {
  const data = await fetchLogsSummary({ ...filters.value });
  summary.value = data || {};
  lastSyncAt.value = new Date().toISOString();

  if (data?.start_date) {
    filters.value.start_date = data.start_date;
  }

  if (data?.end_date) {
    filters.value.end_date = data.end_date;
  }
}

function toggleAutoRefresh() {
  isAutoRefreshEnabled.value = !isAutoRefreshEnabled.value;
  configureRefreshTimer();
}

function configureRefreshTimer() {
  if (refreshTimer) {
    clearInterval(refreshTimer);
    refreshTimer = null;
  }

  if (!isAutoRefreshEnabled.value) return;

  refreshTimer = setInterval(() => {
    loadSummary();
  }, Math.max(5, Number(refreshSeconds.value || 20)) * 1000);
}

const alertClass = computed(() => {
  const level = (summary.value?.alert_level || "low").toLowerCase();

  if (level === "critical") return "alert-danger";
  if (level === "high") return "alert-warning";
  if (level === "medium") return "alert-info";
  return "alert-success";
});

function formatDateTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString();
}

watch(refreshSeconds, () => {
  configureRefreshTimer();
});

watch(isAutoRefreshEnabled, () => {
  configureRefreshTimer();
});

onMounted(() => {
  loadSummary();
  configureRefreshTimer();
});

onBeforeUnmount(() => {
  if (refreshTimer) {
    clearInterval(refreshTimer);
    refreshTimer = null;
  }
});
</script>

<style scoped>
.report-toolbar {
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 14px;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
}

.sync-box {
  border: 1px solid #dee2e6;
  background: #fff;
  border-radius: 8px;
  min-height: 38px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-size: 13px;
}

.stat-card {
  border: 1px solid #dee2e6;
  border-radius: 10px;
  background: #ffffff;
  padding: 14px;
}

.stat-card .label {
  font-size: 12px;
  color: #6c757d;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

.stat-card .value {
  font-size: 28px;
  font-weight: 700;
  color: #212529;
}

.stat-card .value.small-value {
  font-size: 24px;
}

.stat-card.danger {
  border-color: #dc3545;
  background: #fff5f5;
}

.stat-card.danger .value {
  color: #dc3545;
}
</style>
