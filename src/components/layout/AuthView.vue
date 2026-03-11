<template>

    <!-- GREETING -->
    <div class="row">

        <div class="col-md-12">

            <BaseContainer class="mt-3">

                <template #body>

                    <div class="d-flex justify-content-between align-items-center">

                        <div class="welcome">

                            <h2 class="mb-1">
                                Hello,
                                <span class="text-dark-orange">
                                    {{ userName || "User" }}
                                </span>
                            </h2>

                            <p class="text-muted mb-0">
                                Welcome back to Admin Dashboard
                            </p>

                        </div>

                        <!-- SYSTEM STATUS -->
                        <div class="system-status">

                            <span class="ripple"></span>

                            <span class="fw-semibold text-success">
                                System Online
                            </span>

                        </div>

                    </div>

                </template>

            </BaseContainer>

        </div>

    </div>


    <!-- DASHBOARD METRICS (SUPER ADMIN ONLY) -->
    <div v-if="isSuperAdmin && dashboardData" class="row mt-3">

        <div class="col-md-2">

            <BaseContainer>

                <template #body>

                    <div class="text-center">

                        <i class="fas fa-users fs-2 text-primary mb-2"></i>

                        <h6 class="text-muted">
                            Total Users
                        </h6>

                        <h3 class="fw-bold">
                            {{ dashboardData.users_summary.total_users }}
                        </h3>

                    </div>

                </template>

            </BaseContainer>

        </div>


        <div class="col-md-2">

            <BaseContainer>

                <template #body>

                    <div class="text-center">

                        <i class="fas fa-user-shield fs-2 text-warning mb-2"></i>

                        <h6 class="text-muted">
                            Admins
                        </h6>

                        <h3 class="fw-bold">
                            {{ dashboardData.users_summary.total_admins }}
                        </h3>

                    </div>

                </template>

            </BaseContainer>

        </div>


        <div class="col-md-2">

            <BaseContainer>

                <template #body>

                    <div class="text-center">

                        <i class="fas fa-user-tag fs-2 text-success mb-2"></i>

                        <h6 class="text-muted">
                            Buyers
                        </h6>

                        <h3 class="fw-bold">
                            {{ dashboardData.users_summary.total_buyers }}
                        </h3>

                    </div>

                </template>

            </BaseContainer>

        </div>


        <div class="col-md-2">

            <BaseContainer>

                <template #body>

                    <div class="text-center">

                        <i class="fas fa-store fs-2 text-danger mb-2"></i>

                        <h6 class="text-muted">
                            Sellers
                        </h6>

                        <h3 class="fw-bold">
                            {{ dashboardData.users_summary.total_sellers }}
                        </h3>

                    </div>

                </template>

            </BaseContainer>

        </div>


        <div class="col-md-2">

            <BaseContainer>

                <template #body>

                    <div class="text-center">

                        <i class="fas fa-truck fs-2 text-info mb-2"></i>

                        <h6 class="text-muted">
                            Drivers
                        </h6>

                        <h3 class="fw-bold">
                            {{ dashboardData.users_summary.total_drivers }}
                        </h3>

                    </div>

                </template>

            </BaseContainer>

        </div>

    </div>

</template>



<script setup>

import { ref, onMounted, computed } from "vue";
import { storeToRefs } from "pinia";

import BaseContainer from "@/components/common/cards/BaseContainer.vue";

import { useUserStore } from "@/core/utils/stores/userStore";

import { fetchDashboardData }
    from "@/core/repos/admin/common/adminUserRepos";


const userStore = useUserStore();

const { userName, userRole } = storeToRefs(userStore);


/* COMPUTED ROLE CHECK */
const isSuperAdmin = computed(() => userRole.value === "super_admin");


const dashboardData = ref(null);

const hasFetched = ref(false);


onMounted(() => {

    if (!isSuperAdmin.value) return;

    if (hasFetched.value) return;


    /* Delay loading so home renders instantly */

    setTimeout(async () => {

        try {

            dashboardData.value = await fetchDashboardData();

            hasFetched.value = true;

        } catch (error) {

            console.error("Dashboard API failed");

        }

    }, 2000);

});

</script>



<style>
.system-status {
    display: flex;
    align-items: center;
    gap: 10px;
}

/* Ripple animation */

.ripple {
    width: 12px;
    height: 12px;
    background: #28a745;
    border-radius: 50%;
    position: relative;
}

.ripple::before,
.ripple::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    border: 2px solid #28a745;
    top: -6px;
    left: -6px;
    right: -6px;
    bottom: -6px;
    animation: ripple 1.8s infinite;
}

.ripple::after {
    animation-delay: .9s;
}

@keyframes ripple {
    0% {
        transform: scale(.6);
        opacity: 1
    }

    100% {
        transform: scale(1.8);
        opacity: 0
    }
}


/* Greeting animation */

.welcome {
    animation: fadeSlide .6s ease;
}

@keyframes fadeSlide {
    0% {
        opacity: 0;
        transform: translateY(10px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>