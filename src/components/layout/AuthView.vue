<template>
    <div class="row">
        <!-- Greeting -->
        <div class="col-md-4">
            <BaseContainer class="mt-3">
                <template #body>
                    <div class="text-center">
                        <h2>
                            Hello,
                            <span class="text-dark-orange">
                                {{ userName || "User" }}
                            </span>
                        </h2>
                    </div>
                </template>
            </BaseContainer>
        </div>

        <!-- Notifications -->
        <div class="col-md-8">
            <BaseContainer class="mt-3">
                <template #body>
                    <p class="text-muted text-center">
                        No notifications yet
                    </p>
                </template>
            </BaseContainer>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/utils/stores/authStore";
import { useUserStore } from "@/utils/stores/userStore";
import { useRouter } from "vue-router";
import { watch } from "vue";

import BaseContainer from "@/components/common/cards/BaseContainer.vue";

const router = useRouter();

const authStore = useAuthStore();
const userStore = useUserStore();

const { isLoggedIn } = storeToRefs(authStore);
const { userName } = storeToRefs(userStore);

/* 🔐 Auto redirect if logged out */
watch(isLoggedIn, (val) => {
    if (!val) {
        // router.push({ name: "signin" });
    }
});
</script>
