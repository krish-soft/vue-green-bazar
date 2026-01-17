<template>

  <div class="guest-wrapper">
    <!-- Icon -->
    <div class="guest-icon">
      <i class="fas fa-store"></i>
    </div>

    <!-- Title -->
    <h2 class="guest-title">
      Welcome to <strong>Green Bazar</strong>
    </h2>

    <!-- Subtitle -->
    <p class="guest-subtitle">
      Admin Dashboard
    </p>

    <!-- Divider -->
    <div class="guest-divider"></div>

    <!-- Message -->
    <p class="guest-message">
      Please sign in to manage products, orders, and system settings.
    </p>

    <!-- Action -->
    <RouterLink class="btn btn-success btn-sm px-4 mt-3" :to="{ name: 'signin' }">
      Sign In
    </RouterLink>
  </div>

</template>

<script setup>
</script>

<style scoped>
.guest-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* Icon */
.guest-icon {
  font-size: 2.8rem;
  color: #198754;
  margin-bottom: 0.75rem;
}

/* Title */
.guest-title {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

/* Subtitle */
.guest-subtitle {
  font-size: 0.9rem;
  color: #6c757d;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* Divider */
.guest-divider {
  width: 40px;
  height: 3px;
  background-color: #198754;
  margin: 1rem 0;
  border-radius: 2px;
}

/* Message */
.guest-message {
  font-size: 0.95rem;
  color: #6c757d;
  max-width: 360px;
}
</style>
