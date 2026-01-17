<template>
  <button
    :type="type"
    class="base-btn"
    :class="[variantClass, sizeClass, iconOnlyClass]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
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
  type: {
    type: String,
    default: "button",
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

defineEmits(["click"]);

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
  padding: 0.55rem;
  width: 38px;
  height: 38px;
}

.btn-icon-only .btn-icon {
  margin: 0;
}

/* =====================================================
   COLOR VARIANTS (10 TOTAL – THEME SAFE)
===================================================== */

/* 1️⃣ PRIMARY – Muted Bootstrap Blue (Dark Theme Safe) */
.btn-primary {
  background-color: #13522F; 
}
.btn-primary:hover {
  background-color: #15803D;
}

/* 2️⃣ SECONDARY – Neutral Dark (NOT darker than sidebar) */
.btn-secondary {
  background-color: #374151; /* dark gray-green */
}
.btn-secondary:hover {
  background-color: #1f2937;
}

/* 3️⃣ WARNING – Amber (Bootstrap feel, less loud) */
.btn-warning {
  background-color: #f59e0b;
  color: #111827; /* readable on amber */
}
.btn-warning:hover {
  background-color: #d97706;
}

/* 4️⃣ DANGER – Bootstrap Red (slightly muted) */
.btn-danger {
  background-color: #dc2626;
}
.btn-danger:hover {
  background-color: #b91c1c;
}


/* 5️⃣ SUCCESS – Soft Green */
.btn-success {
  background-color: #4ade80;
}
.btn-success:hover {
  background-color: #22c55e;
}

/* 6️⃣ INFO – Teal (farm-friendly, not blue) */
.btn-info {
  background-color: #14b8a6;
}
.btn-info:hover {
  background-color: #0d9488;
}

/* 7️⃣ NEUTRAL – Gray */
.btn-gray {
  background-color: #6b7280;
}
.btn-gray:hover {
  background-color: #4b5563;
}

/* 8️⃣ EARTH – Brown / Soil */
.btn-earth {
  background-color: #92400e;
}
.btn-earth:hover {
  background-color: #78350f;
}

/* 9️⃣ LEAF – Olive */
.btn-leaf {
  background-color: #4d7c0f;
}
.btn-leaf:hover {
  background-color: #3f6212;
}

/* 🔟 SKY – Muted Blue-Green (Safe Accent) */
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
