<!-- HomeView -->
<template>
  <AuthView v-if="authStore.isLoggedIn" />
  <GuestView v-else />
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/core/utils/stores/authStore";

import AuthView from "@/components/layout/AuthView.vue";
import GuestView from "@/components/layout/GuestView.vue";

const authStore = useAuthStore();
</script>
