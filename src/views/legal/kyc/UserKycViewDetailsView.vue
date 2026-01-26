<template>
    <BaseCotainer :heading="'User KYC Details : ' + kycDetails?.kyc_code">

        <template #headerActions>
        </template>

        <template #body>

            <div v-if="kycDetails" class="container-fluid px-0">

                <!-- ================= BASIC INFO ================= -->
                <div class="mb-4">
                    <div class="border-bottom pb-1 mb-2">
                        <h6 class="fw-semibold text-muted mb-0">Basic Information</h6>
                    </div>

                    <table class="table table-sm table-borderless align-middle mb-0">
                        <tbody>
                            <tr>
                                <th class="text-muted fw-normal w-25">KYC Code</th>
                                <td class="fw-semibold">{{ kycDetails.kyc_code }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal w-25">Legal Name</th>
                                <td class="fw-semibold">{{ kycDetails.legal_name }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal w-25">Father Name</th>
                                <td class="fw-semibold">{{ kycDetails.father_name }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal w-25">Mother Name</th>
                                <td class="fw-semibold">{{ kycDetails.mother_name }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal w-25">Aadhaar Last 4</th>
                                <td class="fw-semibold">{{ kycDetails.aadhaar_last4 }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal w-25">Date of Birth</th>
                                <td class="fw-semibold "> <span :class="kycDetails.dob ? 'masked-value' : ''">
                                        {{ kycDetails.dob }}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal w-25">Gender</th>
                                <td class="fw-semibold "> <span :class="kycDetails.gender ? 'masked-value' : ''">{{
                                    kycDetails.gender }}</span></td>
                            </tr>

                        </tbody>
                    </table>
                </div>

                <div class="mb-4">
                    <div class="border-bottom pb-1 mb-2">
                        <h6 class="fw-semibold text-muted mb-0">Verification</h6>
                    </div>

                    <table class="table table-sm table-borderless align-middle mb-0">
                        <tbody>
                            <tr>
                                <th class="text-muted fw-normal w-25">KYC Status</th>
                                <td class="fw-semibold ">
                                    <span class="badge" :class="{
                                        'bg-secondary': kycDetails.status === 'pending',
                                        'bg-success': kycDetails.status === 'approved',
                                        'bg-danger': kycDetails.status === 'rejected',
                                        'bg-info': kycDetails.status === 'request_for_review',
                                    }">
                                        {{ kycDetails.status }}
                                    </span>

                                </td>
                            </tr>

                            <tr>
                                <th class=" text-muted fw-normal w-25">Verification Mode</th>
                                <td class="fw-semibold">{{ kycDetails.verification_mode }}</td>
                            </tr>

                            <tr>
                                <th class="text-muted fw-normal w-25">Verified At</th>
                                <td class="fw-semibold">{{ kycDetails.verified_at }}</td>
                            </tr>

                            <tr>
                                <th class="text-muted fw-normal w-25">Verified By</th>
                                <td class="fw-semibold">{{ kycDetails.verified_by }}</td>
                            </tr>
                            <tr>
                                <th class="text-muted fw-normal w-25">Review Comment</th>
                                <td class="fw-semibold">{{ kycDetails.review_comment }}</td>
                            </tr>

                            <tr>
                                <th class="text-muted fw-normal w-25">Is Expired</th>
                                <td class="fw-semibold">{{ kycDetails.is_expired ? 'Yes' : 'No' }}</td>
                            </tr>

                            <tr>
                                <th class="text-muted fw-normal w-25">Expired At</th>
                                <td class="fw-semibold">{{ kycDetails.expired_at }}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>

                <div class="mb-4">
                    <div class="border-bottom pb-1 mb-2">
                        <h6 class="fw-semibold text-muted mb-0">Documents</h6>
                    </div>

                    <table class="table table-sm table-bordered align-middle mb-0">
                        <thead>
                            <tr>
                                <th class="text-muted fw-normal">#</th>
                                <th class="text-muted fw-normal">Document Code</th>
                                <th class="text-muted fw-normal">Document Type</th>
                                <th class="text-muted fw-normal">Document Number Last 4 Digits</th>
                                <th class="text-muted fw-normal w-25">Document Front File</th>
                                <th class="text-muted fw-normal w-25">Document Back File</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr v-for="(docFile, i) in kycDetails.legal_documents" :key="docFile.id">
                                <td>{{ i + 1 }} </td>
                                <td>{{ docFile.legal_doc_code }}</td>
                                <td>{{ docFile.document_type }}</td>
                                <td>{{ docFile.document_number_last4 }}</td>
                                <td>
                                    <!-- <img v-if="docFile.document_url_front" :src="docFile.document_url_front"
                                        alt="Document Front" width="50" class="zoom-thumb"
                                        @click="openZoom(docFile.document_url_front)" /> -->

                                    <ImageZoomViewer v-if="!docFile.is_verified" :src="docFile.document_url_front"
                                        :thumbWidth="75" />
                                    <span v-else class="text-success">Verified</span>

                                </td>
                                <td>
                                    <ImageZoomViewer v-if="!docFile.is_verified" :src="docFile.document_url_back"
                                        :thumbWidth="75" />
                                    <span v-else class="text-success">Verified</span>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>






            </div>

        </template>
    </BaseCotainer>

    <!-- <div v-if="zoomImage" class="zoom-overlay" @click="zoomImage = null">
        <img :src="zoomImage" class="zoomed-image" />
    </div> -->

</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUIStore } from "@/core/utils/stores/uiStore";
import { fetchKycDetails, updateKycStatus } from "@/core/repos/admin/legal/legalRepos";
import { useRoute } from "vue-router";

import BaseCotainer from "@/components/common/cards/BaseContainer.vue";
import BaseButton from "@/components/common/buttons/BaseButton.vue";
import BaseInput from "@/components/common/inputs/BaseInput.vue";
import ImageZoomViewer from "../../../components/common/other/ImageZoomViewer.vue";

/* ---------------- STATE ---------------- */
const uiStore = useUIStore();
const route = useRoute();


const kycId = ref(route.params.id);
const kycDetails = ref([]);
const zoomImage = ref(null);

const openZoom = (src) => {
    zoomImage.value = src;
};

/* ---------------- INIT ---------------- */
onMounted(() => loadKycDetails(kycId.value));

/* ---------------- LOAD ---------------- */
async function loadKycDetails(id) {
    const data = await fetchKycDetails(id);
    if (!data) {
        return;
    }

    kycDetails.value = data;
}


</script>