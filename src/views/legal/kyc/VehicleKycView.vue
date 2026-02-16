<template>
    <BaseContainer heading="Vehicle KYC List">

        <template #body>

            <div class="table-responsive">
                <table class="table table-bordered table-striped table-hover" id="datatable">
                    <thead class="table-dark">
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Vehicle KYC Code</th>

                            <th>License Plate Number</th>
                            <th>Driving License Number</th>
                            <th>Registration Number</th>

                            <th>Vehicle Maker</th>
                            <th>Vehicle Model</th>

                            <th>Status</th>
                            <th>Verification Mode</th>
                            <th>Verified By</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, i) in kycList" :key="row.id">
                            <td>{{ i + 1 }}</td>
                            <td>{{ row?.user?.user_code }} | {{ row?.user?.nickname }}</td>
                            <td>{{ row.vehicle_kyc_code }}</td>

                            <td>{{ row.license_plate_number }}</td>
                            <td>{{ row.driving_license_number }}</td>
                            <td>{{ row.registration_number }}</td>

                            <td>{{ row.vehicle_maker }}</td>
                            <td>{{ row.vehicle_model }}</td>



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
import { fetchVehicleKycList } from "@/core/repos/admin/legal/legalRepos";

import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import BaseInput from "@/components/common/inputs/BaseInput.vue";

import router from "@/router";
/* ---------------- STATE ---------------- */
const uiStore = useUIStore();

const kycList = ref([]);

/* ---------------- INIT ---------------- */
onMounted(loadKycList);

/* ---------------- LOAD ---------------- */
async function loadKycList() {
    const data = await fetchVehicleKycList();

    if (!data) {
        return;
    }

    kycList.value = data;
}

function showItemById(id) {
    router.push({ name: "vehiclekycdetails", params: { id } });
}


</script>