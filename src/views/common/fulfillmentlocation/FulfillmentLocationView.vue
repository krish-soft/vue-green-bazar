<template>
    <BaseContainer heading="FulfillmentLocation List">

        <template #headerActions>
        </template>

        <template #body>

            <div class="table-responsive">
                <table class="table table-bordered table-striped table-hover" id="datatable">
                    <thead class="table-dark">
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Location Name</th>
                            <th>Code</th>

                            <th>Status</th>
                            <th>Verification Mode</th>
                            <th>Verified By</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, i) in fulfillmentLocationList" :key="row.id">
                            <td>{{ i + 1 }}</td>
                            <td>{{ row?.user?.user_code }} | {{ row?.user?.name }}</td>
                            <td>{{ row.name }}</td>
                            <td>{{ row.fl_code }}</td>
                            <td>
                                <span class="badge" :class="{
                                    'bg-secondary': row.status === 'pending',
                                    'bg-success': row.status === 'approved',
                                    'bg-danger': row.status === 'rejected',
                                    'bg-info': row.status === 'request_for_review',
                                }">
                                    {{ row.status }}
                                </span>

                            </td>
                            <td>{{ row.verification_mode }}</td>
                            <td>{{ row.verified_by }}</td>
                            <td>
                                <BaseButton iconOnly variant="sky me-2" icon="fas fa-eye "
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
import { ref, onMounted } from "vue";
import { useUIStore } from "@/core/utils/stores/uiStore";
import { fetchFulfillmentLocationsList } from "@/core/repos/admin/common/fulfillmentLocationRepos";

import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import BaseInput from "@/components/common/inputs/BaseInput.vue";

import router from "@/router";
/* ---------------- STATE ---------------- */
const uiStore = useUIStore();

const fulfillmentLocationList = ref([]);

/* ---------------- INIT ---------------- */
onMounted(loadList);

/* ---------------- LOAD ---------------- */
async function loadList() {
    const data = await fetchFulfillmentLocationsList();

    if (!data) {
        return;
    }

    fulfillmentLocationList.value = data;

}

function showItemById(id) {
    router.push({ name: "fulfillmentlocationdetails", params: { id } });
}


</script>