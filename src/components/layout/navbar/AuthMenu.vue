<!--  -->
<template>
  <!-- Home -->
  <!-- <li class="nav-item">
    <RouterLink class="nav-link" :to="{ name: 'home' }" exact>
      Home
    </RouterLink>
  </li> -->

  <!-- Master -->
  <!-- <li class="nav-item dropdown" :class="{ active: isMasterActive }">
    <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
      Master
    </a>

    <ul class="dropdown-menu">
      <li>
        <RouterLink class="dropdown-item" :to="{ name: 'msunit' }">
          Units
        </RouterLink>
      </li>

      <li>
        <RouterLink class="dropdown-item" to="/master/products">
          Products
        </RouterLink>
      </li>
    </ul>
  </li> -->
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const isMasterActive = computed(() =>
  route.path.startsWith("/master")
);
</script>
