<template>
  <BaseContainer heading="Audit Logs">
    <template #body>
      <!-- Filters -->
      <div class="row g-3">
        <div class="col-md-3">
          <label class="form-label">Filter</label>
          <select v-model="filters.filter" class="form-select">
            <option value="">Today</option>
            <option value="last7days">Last 7 Days</option>
            <option value="last30days">Last 30 Days</option>
          </select>
        </div>

        <div class="col-md-3">
          <BaseInput
            v-model="filters.start_date"
            type="date"
            label="Start Date"
          />
        </div>

        <div class="col-md-3">
          <BaseInput
            v-model="filters.end_date"
            type="date"
            label="End Date"
          />
        </div>

        <div class="col-md-3">
          <BaseInput
            v-model="filters.user_code"
            label="User Code"
            placeholder="User Code"
          />
        </div>

        <div class="col-md-2">
          <BaseButton @click="fetchLogs" variant="primary" class="mt-4">
            Filter
          </BaseButton>
        </div>
      </div>

      <hr />

      <!-- Table -->
      <div class="table-responsive mt-3">
        <table class="table table-bordered table-hover custom-table">
          <thead>
            <tr>
              <th>#</th>
              <th>User Code</th>
              <th>User Name</th>
              <th>Action</th>
              <th>Created At</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(log, index) in logs" :key="log.id">
              <td>{{ index + 1 }}</td>
              <td>{{ log.user_code }}</td>
              <td>{{ log.user?.name || "-" }}</td>
              <td>{{ log.action }}</td>
              <td>{{ log.created_at }}</td>
            </tr>

            <tr v-if="logs.length === 0">
              <td colspan="5" class="text-center">No Data Found</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </BaseContainer>
</template>

<script>
import apiRouteService from "@/core/services/apiRoutes/apiRouteService.js";

import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import BaseInput from "@/components/common/inputs/BaseInput.vue";

export default {
  components: {
    BaseContainer,
    BaseButton,
    BaseInput,
  },

  data() {
    return {
      logs: [],
      filters: {
        filter: "",
        start_date: "",
        end_date: "",
        user_code: "",
      },
    };
  },

  mounted() {
    this.fetchLogs();
  },

  methods: {
    async fetchLogs() {
  try {
    const response = await apiRouteService.auditLog(this.filters);

    console.log("FULL RESPONSE =", response);
    console.log("response.data =", response.data);
    console.log("response.data.data =", response.data?.data);
    console.log("response.data.data.data =", response.data?.data?.data);

    this.logs = response.data?.data || [];
  } catch (error) {
    console.error(error);
  }
},
  },
};
</script>

<style scoped>
.custom-table thead tr {
  background-color: #0b4d33 !important;
}

.custom-table thead th {
  background-color: #0b4d33 !important;
  color: white !important;
  border-color: #0a3f2a !important;
}

.custom-table tbody td {
  vertical-align: middle;
}
</style>