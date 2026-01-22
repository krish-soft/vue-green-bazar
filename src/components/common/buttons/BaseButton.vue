<template>
  <button
    :type="type"
    :form="form"
    class="base-btn"
    :class="[variantClass, sizeClass, iconOnlyClass]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <!-- LOADING -->
    <span v-if="loading" class="spinner"></span>

    <!-- LEFT ICON -->
    <i
      v-if="!loading && icon && iconPosition === 'left'"
      :class="icon"
      class="btn-icon"
    />

    <!-- TEXT -->
    <span v-if="!iconOnly">
      <slot />
    </span>

    <!-- RIGHT ICON -->
    <i
      v-if="!loading && icon && iconPosition === 'right'"
      :class="icon"
      class="btn-icon"
    />
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "primary",
  },

  /* IMPORTANT: native button type */
  type: {
    type: String,
    default: "button", // button | submit | reset
  },

  /* IMPORTANT: forward form attribute */
  form: {
    type: String,
    default: null, // e.g. "vehicleForm"
  },

  icon: {
    type: String,
    default: null,
  },
  iconPosition: {
    type: String,
    default: "left",
  },
  iconOnly: Boolean,
  size: {
    type: String,
    default: "sm",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: Boolean,
});

const emit = defineEmits(["click"]);

/*
  DO NOT emit click for submit buttons.
  Native form submit must handle validation.
*/
const handleClick = (e) => {
  if (props.type === "submit") return;
  emit("click", e);
};

const variantClass = computed(() => `btn-${props.variant}`);
const sizeClass = computed(() => `btn-${props.size}`);
const iconOnlyClass = computed(() =>
  props.iconOnly ? "btn-icon-only" : ""
);
</script>

<style scoped>
/* ===============================
   BASE BUTTON
=============================== */
.base-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  padding: 0.55rem 1rem;
  border-radius: 8px;
  border: none;

  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;

  color: #ffffff;
  background-color: transparent;

  transition: background-color 0.15s ease, opacity 0.15s ease;
}

.base-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ===============================
   SIZES
=============================== */
.btn-xs {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
}

.btn-sm {
  padding: 0.35rem 0.75rem;
  font-size: 0.85rem;
}

.btn-lg {
  padding: 0.7rem 1.25rem;
  font-size: 1rem;
}

/* ===============================
   ICON SUPPORT
=============================== */
.btn-icon {
  font-size: 0.95em;
}

.btn-icon-only {
  padding: 0.25rem;
  width: 32px;
  height: 32px;
}

.btn-icon-only .btn-icon {
  margin: 0;
}

/* =====================================================
   COLOR VARIANTS
===================================================== */
.btn-primary {
  background-color: #13522F;
}
.btn-primary:hover {
  background-color: #15803D;
}

.btn-secondary {
  background-color: #374151;
}
.btn-secondary:hover {
  background-color: #1f2937;
}

.btn-warning {
  background-color: #f59e0b;
  color: #111827;
}
.btn-warning:hover {
  background-color: #d97706;
}

.btn-danger {
  background-color: #dc2626;
}
.btn-danger:hover {
  background-color: #b91c1c;
}

.btn-success {
  background-color: #4ade80;
}
.btn-success:hover {
  background-color: #22c55e;
}

.btn-info {
  background-color: #14b8a6;
}
.btn-info:hover {
  background-color: #0d9488;
}

.btn-gray {
  background-color: #6b7280;
}
.btn-gray:hover {
  background-color: #4b5563;
}

.btn-earth {
  background-color: #92400e;
}
.btn-earth:hover {
  background-color: #78350f;
}

.btn-leaf {
  background-color: #4d7c0f;
}
.btn-leaf:hover {
  background-color: #3f6212;
}

.btn-sky {
  background-color: #0284c7;
}
.btn-sky:hover {
  background-color: #0369a1;
}

/* ===============================
   LOADING SPINNER
=============================== */
.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
