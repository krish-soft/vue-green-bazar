<template>

    <BaseContainer heading="Platform Accounts List">
        <template #body>

            <!-- Platform Accounts -->
            <div class="table-responsive">
                <table class="table table-bordered table-striped table-hover">
                    <thead class="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Account Code</th>
                            <th>Account Name</th>
                            <!-- <th>Accnt Type</th> -->
                            <th>Owner Type</th>
                            <!-- <th>Owner</th> -->
                            <th>Currency</th>
                            <th>Available Balance</th>
                            <th>Hold Balance</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, i) in platformAccountData" :key="row.id">
                            <td>{{ i + 1 }}</td>
                            <td>{{ row.accnt_code }}</td>
                            <td>{{ row.name }}</td>
                            <!-- <td>{{ row.type }}</td> -->
                            <td>{{ row.owner_type }}</td>
                            <!-- <td>
                                <b>Code:</b>{{ row?.user?.user_code }} <br />
                                <b>Nick.:</b>{{ row?.user?.nickname }}
                            </td> -->

                            <td>{{ row.currency }}</td>
                            <td>{{ row.available_balance }}</td>
                            <td>{{ row.hold_balance }}</td>
                            <td>
                                <span class="badge" :class="{
                                    'bg-success': row.is_active,
                                    'bg-danger': !row.is_active,
                                }">
                                    {{ row.is_active ? 'Active' : 'Inactive' }}
                                </span>
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

    <BaseContainer heading="User Accounts List" class="mt-4">
        <template #body>
            <!-- User Accounts  -->
            <div class="table-responsive">
                <table class="table table-bordered table-striped table-hover" id="datatable">
                    <thead class="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Account Code</th>
                            <th>Account Name</th>
                            <!-- <th>Accnt Type</th> -->
                            <th>Owner Type</th>
                            <th>Owner</th>
                            <th>Currency</th>
                            <th>Credit Status</th>
                            <th>Credit Limit</th>
                            <th>Available Balance</th>
                            <th>Hold Balance</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, i) in listData" :key="row.id">
                            <td>{{ i + 1 }}</td>
                            <td>{{ row.accnt_code }}</td>
                            <td>{{ row.name }}</td>
                            <!-- <td>{{ row.type }}</td> -->
                            <td><span :class="`role-${row?.owner_type.toLowerCase()}`">{{ row.owner_type }}</span></td>
                            <td>
                                <b>Code:</b>{{ row?.user?.user_code }} <br />
                                <b>Nick.:</b>{{ row?.user?.nickname }}

                            </td>

                            <td>{{ row.currency }}</td>
                            <td>
                                <span class="badge" :class="{
                                    'bg-success': row.is_credit_enabled,
                                    'bg-danger': !row.is_credit_enabled,
                                }">
                                    {{ row.is_credit_enabled ? 'Enabled' : 'Disabled' }}
                                </span>

                            </td>
                            <td>

                                {{ row.credit_limit }}
                            </td>

                            <td>{{ row.available_balance }}</td>
                            <td>{{ row.hold_balance }}</td>
                            <td>
                                <span class="badge" :class="{
                                    'bg-success': row.is_active,
                                    'bg-danger': !row.is_active,
                                }">
                                    {{ row.is_active ? 'Active' : 'Inactive' }}
                                </span>
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


import { ref, onMounted } from "vue";
import { useUIStore } from "@/core/utils/stores/uiStore";
import { fetchAccountsList } from "@/core/repos/admin/common/accountingRepos";

import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import BaseInput from "@/components/common/inputs/BaseInput.vue";

import router from "@/router";
/* ---------------- STATE ---------------- */
const uiStore = useUIStore();

const listData = ref([]);
const platformAccountData = ref([]);

/* ---------------- INIT ---------------- */
onMounted(loadList);

/* ---------------- LOAD ---------------- */
async function loadList() {
    const data = await fetchAccountsList();

    if (!data) {
        return;
    }

    listData.value = data.user_accounts || [];
    platformAccountData.value = data.platform_accounts || [];

}

function showItemById(id) {
    router.push({ name: "accountdetails", params: { id } });
}



</script>