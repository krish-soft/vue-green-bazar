<template>

    <!-- ================= FILTER ================= -->
    <BaseContainer heading="Settlement Batch List">

        <template #body>



            <div class="row g-3">

                <div class="col-md-4">
                    <BaseInput v-model="filters.start_date" type="date" label="Start Date" required />
                </div>
                <div class="col-md-4">
                    <BaseInput v-model="filters.end_date" type="date" label="End Date" required />
                </div>
                <div class="col-md-4">
                    <br />
                    <BaseButton @click="loadSettlementBatches" variant="primary" class="mt-2">
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
                            <th>Bactch No</th>
                            <th>Batch Date</th>
                            <th>CutOff Date</th>
                            <th>Status</th>

                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, i) in batchList" :key="row.id">
                            <td>{{ i + 1 }}</td>
                            <td>{{ row.batch_no }}</td>
                            <td>{{ row.batch_date }}</td>
                            <td>{{ row.cutoff_date }}</td>
                            <td>
                                <StatusBadge :status="row.status" />
                            </td>

                            <td>
                                <BaseButton iconOnly variant="sky me-2" icon="fas fa-eye"
                                    @click="showItemById(row.id)" />
                            </td>

                        </tr>
                    </tbody>
                </table>

            </div>

        </template>

    </BaseContainer>





</template>

<script setup>

import { ref, computed, watch, onMounted } from "vue";

import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import BaseModal from "@/components/common/modal/BaseModal.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import BaseInput from "@/components/common/inputs/BaseInput.vue";
import BaseAutoCompleteSelect from "@/components/common/inputs/BaseAutoCompleteSelect.vue";
import StatusBadge from "@/components/common/badge/StatusBadge.vue";

import {
    fetchSettlementBatchList,
} from "@/core/repos/admin/common/accountingRepos";

import router from "@/router";

const today = new Date();
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);

const formatDate = (d) => d.toISOString().slice(0, 10);


const batchList = ref([]);
const filters = ref({
    start_date: formatDate(yesterday),
    end_date: formatDate(today),
});

onMounted(loadSettlementBatches);

async function loadSettlementBatches() {
    const data = await fetchSettlementBatchList(filters.value);
    if (!data) return;
    batchList.value = data;
}

const showItemById = (id) => {
    // Implement the logic to show item details by ID 
    router.push({ name: "settlementbatchdetails", params: { id } });

}


</script>
