<template>
  <BaseContainer heading="System Logs" class="mb-3">
    <template #body>
      <div class="row g-3 align-items-end">
        <div class="col-md-3">
          <label class="form-label">Start Date</label>
          <input type="date" class="form-control" v-model="filters.start_date" />
        </div>

        <div class="col-md-3">
          <label class="form-label">End Date</label>
          <input type="date" class="form-control" v-model="filters.end_date" />
        </div>

        <div class="col-md-2">
          <label class="form-label">{{ actorFilterLabel }}</label>
          <select class="form-select" v-model="filters.user_type" :disabled="!userTypeOptions.length">
            <option value="">All</option>
            <option v-for="option in userTypeOptions" :key="option" :value="option">
              {{ formatUserType(option) }}
            </option>
          </select>
        </div>

        <div class="col-md-2">
          <label class="form-label">Search</label>
          <input
            type="text"
            class="form-control"
            v-model.trim="filters.search"
            placeholder="Event, code, type, reason"
          />
        </div>

        <div class="col-md-2">
          <BaseButton variant="primary" class="w-100" @click="loadLogs">
            Search
          </BaseButton>
        </div>
      </div>
    </template>
  </BaseContainer>

  <ul class="nav nav-tabs mb-3">
    <li class="nav-item">
      <button class="nav-link" :class="{ active: selectedLogType === 'all' }" @click="switchType('all')">
        All Logs
      </button>
    </li>
    <li class="nav-item">
      <button class="nav-link" :class="{ active: selectedLogType === 'activity' }" @click="switchType('activity')">
        Activity Logs
      </button>
    </li>
    <li class="nav-item">
      <button class="nav-link" :class="{ active: selectedLogType === 'audit' }" @click="switchType('audit')">
        Audit Logs
      </button>
    </li>
  </ul>

  <BaseContainer :heading="titleByType[selectedLogType]" :subHeading="summaryText">
    <template #body>
      <div class="table-responsive">
        <table id="logs-datatable" class="table table-sm table-bordered table-hover align-middle">
          <thead class="table-dark">
            <tr>
              <th style="width: 160px;">Date</th>
              <th style="width: 90px;">Type</th>
              <th>Action / Event</th>
              <th>User</th>
              <th>Target</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!logs.length">
              <td colspan="6" class="text-center text-muted py-4">
                No logs found for the selected filters.
              </td>
            </tr>

            <tr v-for="row in logs" :key="row.id">
              <td>
                <div class="fw-semibold">{{ formatDateTime(row.created_at) }}</div>
              </td>
              <td>
                <span class="badge text-uppercase" :class="row.log_type === 'audit' ? 'bg-warning text-dark' : 'bg-info text-dark'">
                  {{ row.log_type }}
                </span>
              </td>
              <td>
                <div class="fw-semibold">
                  {{ row.event || row.action }}
                </div>
                <div class="small text-muted" v-if="row.reason">
                  {{ row.reason }}
                </div>
              </td>
              <td>
                <div class="fw-semibold">
                  {{ row.actor_name || row.user_code || row.actor_code || 'System' }}
                </div>
                <div class="small text-muted" v-if="row.actor_type || row.user_group">
                  {{ row.actor_type || row.user_group }}
                </div>
              </td>
              <td>
                <div class="small fw-semibold">{{ row.subject_type || row.auditable_type || '-' }}</div>
                <div class="small text-muted" v-if="row.subject_code || row.auditable_id">
                  {{ row.subject_code || row.auditable_id }}
                </div>
              </td>
              <td>
                <pre class="mb-0 small bg-light p-2 rounded border log-meta">{{ formatMeta(row) }}</pre>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </BaseContainer>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";

import {
  fetchActivityLogs,
  fetchAuditLogs,
  fetchLogsSummary,
} from "@/core/repos/admin/common/reportRepos";
import { destroyBootstrapDatatable, initBootstrapDatatable } from "@/core/utils/uiHelpers/bootstrapDatatable";

const route = useRoute();
const router = useRouter();

const titleByType = {
  all: "All System Logs",
  activity: "Activity Logs",
  audit: "Audit Logs",
};

const selectedLogType = ref(resolveType(route.name));
const logs = ref([]);
const summary = ref({});
const userTypeOptions = ref([]);
const actorFilterLabel = ref("User Type");
const tableId = "logs-datatable";

const filters = reactive({
  start_date: defaultStartDate(),
  end_date: defaultEndDate(),
  user_type: "",
  search: "",
});

function defaultStartDate() {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return date.toISOString().split("T")[0];
}

function defaultEndDate() {
  return new Date().toISOString().split("T")[0];
}

function resolveType(routeName) {
  if (routeName === "logaudit") return "audit";
  if (routeName === "logactivity") return "activity";
  return "all";
}

function formatDateTime(value) {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

function formatMeta(row) {
  const meta = row.meta || {};

  if (row.log_type === "audit") {
    return JSON.stringify(
      {
        old_values: row.old_values ?? null,
        new_values: row.new_values ?? null,
      },
      null,
      2
    );
  }

  return JSON.stringify(meta, null, 2);
}

function formatUserType(value) {
  if (!value) return "All";
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

const summaryText = computed(() => {
  const activity = summary.value.activity_count ?? 0;
  const audit = summary.value.audit_count ?? 0;
  const total = summary.value.total_count ?? 0;
  return `Total: ${total} | Activity: ${activity} | Audit: ${audit}`;
});

async function loadLogs() {
  destroyBootstrapDatatable(tableId);

  const commonFilters = {
    start_date: filters.start_date,
    end_date: filters.end_date,
    search: filters.search || undefined,
  };

  let result = {
    logs: [],
    summary: {},
    user_type_options: [],
    actor_filter_label: "User Type",
    filters: {
      ...commonFilters,
      user_type: filters.user_type,
    },
  };

  if (selectedLogType.value === "audit") {
    const [auditRes, summaryRes] = await Promise.all([
      fetchAuditLogs({
        ...commonFilters,
        user_code: filters.user_type || undefined,
      }),
      fetchLogsSummary({
        ...commonFilters,
        log_type: "audit",
      }),
    ]);

    result.logs = (auditRes?.rows || []).map((row) => ({
      ...row,
      log_type: "audit",
      actor_name: row.user_code,
      actor_code: row.user_code,
      actor_type: row.user_group,
      subject_type: row.auditable_type,
      subject_code: row.auditable_id,
      event: row.action,
    }));
    result.summary = summaryRes || {};
  } else if (selectedLogType.value === "activity") {
    const [activityRes, summaryRes] = await Promise.all([
      fetchActivityLogs({
        ...commonFilters,
        actor_code: filters.user_type || undefined,
      }),
      fetchLogsSummary({
        ...commonFilters,
        log_type: "activity",
      }),
    ]);

    result.logs = (activityRes?.rows || []).map((row) => ({
      ...row,
      log_type: "activity",
      actor_name: row.actor_code,
      subject_code: row.subject_id,
      action: row.event,
      meta: {
        ip_address: row.ip_address,
        subject_id: row.subject_id,
      },
    }));
    result.summary = summaryRes || {};
  } else {
    const [auditRes, activityRes, summaryRes] = await Promise.all([
      fetchAuditLogs({
        ...commonFilters,
        user_code: filters.user_type || undefined,
      }),
      fetchActivityLogs({
        ...commonFilters,
        actor_code: filters.user_type || undefined,
      }),
      fetchLogsSummary({
        ...commonFilters,
        log_type: "all",
      }),
    ]);

    const auditRows = (auditRes?.rows || []).map((row) => ({
      ...row,
      log_type: "audit",
      actor_name: row.user_code,
      actor_code: row.user_code,
      actor_type: row.user_group,
      subject_type: row.auditable_type,
      subject_code: row.auditable_id,
      event: row.action,
    }));

    const activityRows = (activityRes?.rows || []).map((row) => ({
      ...row,
      log_type: "activity",
      actor_name: row.actor_code,
      subject_code: row.subject_id,
      action: row.event,
      meta: {
        ip_address: row.ip_address,
        subject_id: row.subject_id,
      },
    }));

    result.logs = [...auditRows, ...activityRows].sort((a, b) => {
      const tA = new Date(a.created_at || 0).getTime();
      const tB = new Date(b.created_at || 0).getTime();
      return tB - tA;
    });
    result.summary = summaryRes || {};
  }

  logs.value = result?.logs ?? [];
  summary.value = result?.summary ?? {};
  userTypeOptions.value = result?.user_type_options ?? [];
  actorFilterLabel.value = result?.actor_filter_label || "User Type";

  if (result?.filters) {
    filters.start_date = result.filters.start_date || filters.start_date;
    filters.end_date = result.filters.end_date || filters.end_date;
    filters.user_type = result.filters.user_type || "";
    filters.search = result.filters.search || "";
  }

  await nextTick();

  if (logs.value.length) {
    initBootstrapDatatable(tableId, {
      responsive: false,
      disableSortColumns: [5],
      override: {
        order: [[0, "desc"]],
      },
    });
  } else {
    destroyBootstrapDatatable(tableId);
  }
}

async function switchType(type) {
  if (selectedLogType.value === type) {
    await loadLogs();
    return;
  }

  selectedLogType.value = type;
  const routeName = type === "audit" ? "logaudit" : type === "activity" ? "logactivity" : "logsall";
  await router.push({
    name: routeName,
    query: {
      start_date: filters.start_date,
      end_date: filters.end_date,
      user_type: filters.user_type || undefined,
      search: filters.search || undefined,
    },
  });
}

watch(
  () => route.name,
  async (name) => {
    selectedLogType.value = resolveType(name);

    if (route.query.start_date) filters.start_date = String(route.query.start_date);
    if (route.query.end_date) filters.end_date = String(route.query.end_date);
    filters.user_type = route.query.user_type ? String(route.query.user_type) : filters.user_type;
    filters.search = route.query.search ? String(route.query.search) : filters.search;

    await loadLogs();
  }
);

onMounted(async () => {
  if (route.query.start_date) filters.start_date = String(route.query.start_date);
  if (route.query.end_date) filters.end_date = String(route.query.end_date);
  if (route.query.user_type) filters.user_type = String(route.query.user_type);
  if (route.query.search) filters.search = String(route.query.search);

  await loadLogs();
});

onBeforeUnmount(() => {
  destroyBootstrapDatatable(tableId);
});
</script>

<style scoped>
.log-meta {
  max-height: 160px;
  overflow: auto;
  white-space: pre-wrap;
  word-break: break-word;
}
</style>