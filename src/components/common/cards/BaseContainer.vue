<template>
  <transition name="fade-scale" appear>
    <div class="card base-card shadow-sm">
      <!-- Header -->
      <div class="card-header" v-if="heading || subHeading || $slots.headerActions">
        <div class="row align-items-center">
          <div class="col-md-6 text-start">
            <h5 class="mb-0" v-if="heading">{{ heading }}</h5>
            <small v-if="subHeading" class="text-muted">
              {{ subHeading }}
            </small>
          </div>

          <div class="col-md-6 text-end">
            <slot name="headerActions"></slot>
          </div>
        </div>
      </div>

      <!-- Body -->
      <div class="card-body">
        <slot name="body"></slot>
      </div>

      <!-- Footer -->
      <div class="card-footer text-end" v-if="footer">
        {{ footer }}
      </div>
    </div>
  </transition>
</template>

<script setup>
/* -----------------------
 | PROPS (OLD STYLE)
 ----------------------- */
defineProps({
  heading: {
    type: String,
    default: "",
  },
  subHeading: {
    type: String,
    default: "",
  },
  footer: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
/* Card */
.base-card {
  border-radius: 0.5rem;
  border: 1px solid #dee2e6;
  background-color: #fff;
}

/* Header */
.card-header {
  background-color: #ffffff;
  border-bottom: 1px solid #dee2e6;
}

/* Footer */
.card-footer {
  background-color: #ffffff;
  border-top: 1px solid #dee2e6;
  font-size: 0.85rem;
}

/* Animation */
.fade-scale-enter-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.98);
}
</style>
