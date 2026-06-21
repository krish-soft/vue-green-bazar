<template>
  <BaseContainer heading="Accounting Balance Report">
    <template #body>
      <div class="row g-3">
        <div class="col-md-4">
          <BaseInput v-model="filters.query" label="Search" placeholder="Account, owner, code" />
        </div>

        <div class="col-md-2">
          <label class="form-label">Balance Type</label>
          <select v-model="filters.scope" class="form-select">
            <option value="all">All</option>
            <option value="negative">Negative</option>
            <option value="positive">Positive</option>
            <option value="zero">Zero</option>
          </select>
        </div>

        <div class="col-md-2">
          <label class="form-label">Owner Type</label>
          <select v-model="filters.owner_type" class="form-select">
            <option value="all">All</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
            <option value="delivery">Delivery</option>
          </select>
        </div>

        <div class="col-md-2">
          <label class="form-label">Export</label>
          <select v-model.number="filters.is_pdf_export" class="form-select">
            <option :value="0">No</option>
            <option :value="1">Yes (PDF)</option>
          </select>
        </div>

        <div class="col-md-2">
          <br />
          <BaseButton @click="loadReport" variant="primary" class="mt-2">
            Filter
          </BaseButton>
        </div>

        <div class="col-md-2">
          <br />
          <BaseButton @click="resetFilters" variant="outline-primary" class="mt-2">
            Reset
          </BaseButton>
        </div>
      </div>

      <hr />

      <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover">
          <thead class="table-dark">
            <tr>
              <th>#</th>
              <th>Account Code</th>
              <th>Account Name</th>
              <th>Owner Type</th>
              <th>Owner</th>
              <th>Currency</th>
              <th>Available Balance</th>
              <th>Hold Balance</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in accountsData" :key="row.id || i">
              <td>{{ i + 1 }}</td>
              <td>{{ row.accnt_code }}</td>
              <td>{{ row.name }}</td>
              <td>{{ row.owner_type }}</td>
              <td>
                <b>Name:</b> {{ row?.user?.name || '-' }}<br />
                <b>Code:</b> {{ row?.user?.user_code || '-' }}<br />
                <b>Nick.:</b> {{ row?.user?.nickname || '-' }}
              </td>
              <td>{{ row.currency }}</td>
              <td>{{ row.available_balance }}</td>
              <td>{{ row.hold_balance }}</td>
              <td>
                <span class="badge" :class="row.is_active ? 'bg-success' : 'bg-secondary'">
                  {{ row.is_active ? 'Active' : 'Inactive' }}
                </span>
              </td>
            </tr>

            <tr v-if="accountsData.length === 0">
              <td colspan="9" class="text-center">No Data Found</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </BaseContainer>
</template>

<script setup>
import { ref, onMounted } from "vue";
import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import BaseInput from "@/components/common/inputs/BaseInput.vue";
import { fetchAccountsList } from "@/core/repos/admin/common/accountingRepos";

const accountsData = ref([]);

const filters = ref({
  query: "",
  scope: "all",
  owner_type: "all",
  is_pdf_export: 0,
});

onMounted(loadReport);

async function loadReport() {
  const payload = {
    query: filters.value.query,
    owner_type: filters.value.owner_type,
    scope: filters.value.scope,
    fetch_all: 1,
    is_pdf_export: filters.value.is_pdf_export,
  };

  const data = await fetchAccountsList(payload);
  if (!data) {
    return;
  }

  if (filters.value.is_pdf_export) {
    window.open(data, "_blank");
    return;
  }

  accountsData.value = data.user_accounts || [];
}

function resetFilters() {
  filters.value = {
    query: "",
    scope: "all",
    owner_type: "all",
    is_pdf_export: 0,
  };

  loadReport();
}
</script>