<template>
  <BaseContainer heading="Customer List">
    <template #body>
      <div class="row g-3">
        <div class="col-md-2">
          <BaseInput
            v-model="filters.start_date"
            type="date"
            label="Start Date"
            required
          />
        </div>
        <div class="col-md-2">
          <BaseInput
            v-model="filters.end_date"
            type="date"
            label="End Date"
            required
          />
        </div>
        <div class="col-md-2">
          <br />
          <BaseButton @click="loadList" variant="primary" class="mt-2">
            Filter
          </BaseButton>
        </div>
      </div>

            <hr>

        
        <div class="table-responsive">
            <table class="table table-bordered table-striped table-hover" id="datatable">
                <thead class="table-dark">
                    <tr>
                        <th>#</th>
                        <th>User Code</th>
                        <th>Name</th>
                        <th>Nickname</th>
                        
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Created At</th>
                    </tr>
                </thead>

          <tbody>
            <tr v-for="(customer, index) in customerList" :key="customer.id">
              <td>{{ index + 1 }}</td>
              <td>{{ customer.user_code }}</td>
              <td>{{ customer.name }}</td>
              <td>{{ customer.nickname }}</td>
              <td>{{ customer.email }}</td>
              <td>{{ customer.phone_number }}</td>
              <td>
                <span :class="`role-${customer?.role?.toLowerCase()}`">{{
                  customer.role
                }}</span>
              </td>
              <td>
                <StatusBadge
                  :status="customer.is_active ? 'active' : 'inactive'"
                />
              </td>
              <td>{{ customer.created_at_formatted }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </BaseContainer>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { fetchCustomerList } from "@/core/repos/admin/customer/customerRepos";
import { useUIStore } from "@/core/utils/stores/uiStore";

import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import BaseInput from "@/components/common/inputs/BaseInput.vue";

import router from "@/router";

import { fetchOrdersList } from "@/core/repos/admin/common/buyerRepos";
import StatusBadge from "@/components/common/badge/StatusBadge.vue";
const customerList = ref([]);

// Filter dates
const today = new Date();
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);
const formatDate = (d) => d.toISOString().slice(0, 10);

const filters = ref({
  start_date: formatDate(yesterday),
  end_date: formatDate(today),
});

onMounted(loadList);

/* ---------------- LOAD ---------------- */
async function loadList() {
  const data = await fetchCustomerList(filters.value);
  if (!data) {
    return;
  }
  customerList.value = [];
  await nextTick();

  customerList.value = data.data || data;
}

function showItemById(id) {
  router.push({ name: "orderdetails", params: { id } });
}
</script>
