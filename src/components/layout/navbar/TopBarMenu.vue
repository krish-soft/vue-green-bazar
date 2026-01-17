<!-- TopBarMenu.vue -->
<template>
  <ul class="navbar-nav me-auto">
    <GuestMenu v-if="!isAuth" />
    <AuthMenu v-else />
  </ul>
</template>

<script setup>
import GuestMenu from "./GuestMenu.vue";
import AuthMenu from "./AuthMenu.vue";

defineProps({
  isAuth: Boolean,
});
</script>
