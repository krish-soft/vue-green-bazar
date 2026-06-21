<template>
  <BaseContainer heading="Accounting Balance Report">
    <template #headerActions>
      <div class="d-flex gap-2 flex-wrap">
        <BaseButton variant="secondary" icon="fas fa-rotate" @click="loadReport" :disabled="!hasSubmitted">
          Refresh
        </BaseButton>
        <BaseButton variant="primary" icon="fas fa-file-pdf" @click="exportPdf" :disabled="!hasSubmitted">
          Export PDF
        </BaseButton>
      </div>
    </template>

    <template #body>
      <div class="report-toolbar mb-3 no-print">
        <div class="row g-2 align-items-end">
          <div class="col-lg-4 col-md-6">
            <BaseInput v-model="filters.query" placeholder="Search account, owner, code" />
          </div>

          <div class="col-lg-3 col-md-6">
            <select v-model="filters.scope" class="form-select">
              <option value="all">All Balances</option>
              <option value="negative">Negative (Collection)</option>
              <option value="positive">Positive (Payable)</option>
              <option value="zero">Zero Balance</option>
            </select>
          </div>

          <div class="col-lg-3 col-md-6">
            <select v-model="filters.owner_type" class="form-select">
              <option value="all">All Owner Types</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="delivery">Delivery</option>
            </select>
          </div>

          <div class="col-lg-2 col-md-6">
            <BaseButton variant="primary" class="w-100" icon="fas fa-search" @click="loadReport">
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

      <div class="report-note no-print mb-3">
        Negative balance means the account owes the platform and appears under Collection.
        Positive balance means the platform owes the account and appears under Payable.
      </div>

      <div v-if="!hasSubmitted" class="alert alert-info mb-0">
        Select filters and click <b>Apply Filters</b> to load accounts.
      </div>

      <template v-else>
        <div class="active-filter mb-3 d-flex justify-content-between align-items-center">
          <span class="badge bg-dark">Balance Filter: {{ activeScopeLabel }}</span>
          <span class="badge bg-secondary">Rows: {{ tableRows.length }}</span>
        </div>

      <div class="print-head only-print">
        <h2>Accounting Balance Report</h2>
        <p>Generated at {{ formatDateTime(generatedAt) }}</p>
      </div>

        <div class="section-block">
          <div class="table-responsive">
            <table id="datatable" class="table table-bordered table-striped table-sm align-middle mb-0">
              <thead class="table-dark">
                <tr>
                  <th>#</th>
                  <th>Account Code</th>
                  <th>Account Name</th>
                  <th>Owner</th>
                  <th>Owner Type</th>
                  <th>Currency</th>
                  <th>Balance Type</th>
                  <th class="text-end">Available Balance</th>
                  <th class="text-end">Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, i) in tableRows" :key="row.id || row.accnt_code || i">
                  <td>{{ i + 1 }}</td>
                  <td>{{ row.accnt_code || '-' }}</td>
                  <td>{{ row.name || '-' }}</td>
                  <td>
                    <small class="text-muted">{{ ownerLabel(row) || '-' }}</small>
                  </td>
                  <td>{{ row.owner_type || '-' }}</td>
                  <td>{{ row.currency || '-' }}</td>
                  <td>
                    <span class="badge" :class="balanceTypeClass(row)">
                      {{ balanceTypeLabel(row) }}
                    </span>
                  </td>
                  <td class="text-end" :class="balanceNumberClass(row)">
                    {{ f(normalizedBalance(row)) }}
                  </td>
                  <td class="text-end fw-bold" :class="balanceNumberClass(row)">
                    {{ f(Math.abs(normalizedBalance(row))) }}
                  </td>
                  <td>
                    <span class="badge" :class="row.is_active ? 'bg-success' : 'bg-secondary'">
                      {{ row.is_active ? 'Active' : 'Inactive' }}
                    </span>
                  </td>
                </tr>

                <tr v-if="tableRows.length === 0">
                  <td colspan="10" class="text-center text-muted py-3">No accounts found for selected filters</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>
    </template>
  </BaseContainer>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, ref } from "vue";
import $ from "jquery";
import "datatables.net-bs5";
import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import BaseInput from "@/components/common/inputs/BaseInput.vue";
import { fetchAccountsList } from "@/core/repos/admin/common/accountingRepos";

const accountsData = ref([]);
const generatedAt = ref(new Date().toISOString());
const hasSubmitted = ref(false);
let dtInstance = null;
const BALANCE_DISPLAY_EPSILON = 0.005;

const filters = ref({
  query: "",
  scope: "all",
  owner_type: "all",
});

const appliedFilters = ref({
  query: "",
  scope: "all",
  owner_type: "all",
});

const tableRows = computed(() => {
  return (accountsData.value || [])
    .filter((row) => {
      if (!row?.id && !row?.accnt_code) return false;

      const availableBalance = normalizedBalance(row);
      if (!Number.isFinite(availableBalance)) return false;

      return true;
    });
});

const activeScopeLabel = computed(() => {
  const scope = appliedFilters.value.scope;
  if (scope === "negative" || scope === "collect") return "Negative (Collection)";
  if (scope === "positive" || scope === "pay") return "Positive (Payable)";
  if (scope === "zero") return "Zero";
  return "All";
});

async function loadReport() {
  destroyDataTable();

  hasSubmitted.value = true;
  generatedAt.value = new Date().toISOString();

  const payload = {
    query: filters.value.query,
    owner_type: filters.value.owner_type,
    scope: filters.value.scope,
    fetch_all: 1,
  };

  appliedFilters.value = { ...payload };

  const data = await fetchAccountsList(payload);
  if (!data) return;

  accountsData.value = data.user_accounts || [];

  await nextTick();
  initDataTable();
}

function resetFilters() {
  filters.value = {
    query: "",
    scope: "all",
    owner_type: "all",
  };
  hasSubmitted.value = false;
  accountsData.value = [];
  appliedFilters.value = {
    query: "",
    scope: "all",
    owner_type: "all",
  };
  destroyDataTable();
}

async function exportPdf() {
  if (!hasSubmitted.value) return;

  const fileUrl = await fetchAccountsList({
    query: appliedFilters.value.query,
    owner_type: appliedFilters.value.owner_type,
    scope: appliedFilters.value.scope,
    fetch_all: 1,
    is_pdf_export: 1,
  });

  if (!fileUrl) return;
  window.open(fileUrl, "_blank");
}

function ownerLabel(row) {
  const parts = [];
  if (row?.user?.name) parts.push(`Name: ${row.user.name}`);
  if (row?.user?.user_code) parts.push(`Code: ${row.user.user_code}`);
  if (row?.user?.nickname) parts.push(`Nick: ${row.user.nickname}`);
  return parts.join(" | ");
}

function f(value) {
  const num = Number(value || 0);
  return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatDateTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString();
}

function balanceTypeLabel(row) {
  const balance = normalizedBalance(row);
  if (balance <= -BALANCE_DISPLAY_EPSILON) return "Collection";
  if (balance >= BALANCE_DISPLAY_EPSILON) return "Payable";
  return "Zero";
}

function balanceTypeClass(row) {
  const balance = normalizedBalance(row);
  if (balance <= -BALANCE_DISPLAY_EPSILON) return "bg-danger";
  if (balance >= BALANCE_DISPLAY_EPSILON) return "bg-primary";
  return "bg-secondary";
}

function balanceNumberClass(row) {
  const balance = normalizedBalance(row);
  if (balance <= -BALANCE_DISPLAY_EPSILON) return "text-danger";
  if (balance >= BALANCE_DISPLAY_EPSILON) return "text-primary";
  return "";
}

function normalizedBalance(row) {
  const value = row?.available_balance;

  let raw = Number.NaN;
  if (typeof value === "number") {
    raw = value;
  } else if (typeof value === "string") {
    const normalized = value.replace(/,/g, "").trim();
    raw = Number(normalized);
  } else if (value === null || value === undefined) {
    raw = 0;
  }

  if (!Number.isFinite(raw)) return Number.NaN;

  if (Math.abs(raw) < BALANCE_DISPLAY_EPSILON) return 0;
  return raw;
}

function initDataTable() {
  const tableSelector = "#datatable";
  if (!$(tableSelector).length) return;

  destroyDataTable();

  dtInstance = $(tableSelector).DataTable({
    paging: true,
    searching: true,
    ordering: true,
    info: true,
    autoWidth: false,
    pageLength: 25,
    lengthMenu: [10, 25, 50, 100],
    language: {
      emptyTable: "No accounts found for selected filters",
    },
  });
}

function destroyDataTable() {
  const tableSelector = "#datatable";
  if ($.fn.dataTable && $.fn.dataTable.isDataTable(tableSelector)) {
    $(tableSelector).DataTable().destroy();
  }
  dtInstance = null;
}

onBeforeUnmount(() => {
  destroyDataTable();
});
</script>

<style scoped>
.report-toolbar {
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 14px;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
}

.report-note {
  border-left: 4px solid #0d6efd;
  padding: 10px 12px;
  background: #f8f9fa;
  border-radius: 8px;
  color: #495057;
}

.section-block {
  border: 1px solid #e9ecef;
  border-radius: 14px;
  padding: 14px;
  background: #fff;
}

.section-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.only-print {
  display: none;
}

@media print {
  .no-print {
    display: none !important;
  }

  .only-print {
    display: block !important;
    margin-bottom: 16px;
  }

  .section-block {
    break-inside: avoid;
    page-break-inside: avoid;
    box-shadow: none;
  }

  .table {
    font-size: 12px;
  }
}

@media (max-width: 575px) {
  .section-head {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>