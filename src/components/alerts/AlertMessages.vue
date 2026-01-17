<template>
  <div class="toast-container">
    <!-- Success Toast -->
    <transition name="fade">
      <div v-if="showSuccess" class="toast-message alert alert-success">
        <span class="toast-icon">✅</span>
        <span class="toast-text">{{ successMessage }}</span>
        <!-- <button
          type="button"
          class="toast-close"
          @click="closeToast('success')"
        >
          ✖
        </button> -->
      </div>
    </transition>

    <!-- Warning Toast -->
    <transition name="fade">
      <div v-if="showWarning" class="toast-message alert alert-warning">
        <span class="toast-icon">⚠️</span>
        <span class="toast-text">
          <ul v-if="Array.isArray(warningMessages)">
            <li v-for="(warning, index) in warningMessages" :key="index">
              {{ warning }}
            </li>
          </ul>
          <p v-else>{{ warningMessages }}</p>
        </span>
        <!-- <button
          type="button"
          class="toast-close"
          @click="closeToast('warning')"
        >
          ✖
        </button> -->
      </div>
    </transition>

    <!-- Error Toast -->
    <transition name="fade">
      <div v-if="showError" class="toast-message alert alert-danger">
        <span class="toast-icon">❌</span>
        <span class="toast-text">
          <ul v-if="Array.isArray(errorMessages)">
            <li v-for="(error, index) in errorMessages" :key="index">
              {{ error }}
            </li>
          </ul>
          <p v-else>{{ errorMessages }}</p>
        </span>
        <!-- <button type="button" class="toast-close" @click="closeToast('error')">
          ✖
        </button> -->
      </div>
    </transition>

    <!-- Error Toast -->
    <transition name="fade">
      <div v-if="showStoreError" class="toast-message alert alert-danger">
        <span class="toast-icon">❌</span>
        <span class="toast-text">
          <ul v-if="Array.isArray(errStoreMessages)">
            <li v-for="(error, index) in errStoreMessages" :key="index">
              {{ error }}
            </li>
          </ul>
          <p v-else>{{ errStoreMessages }}</p>
        </span>
        <!-- <button type="button" class="toast-close" @click="closeToast('error')">
          ✖
        </button> -->
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useErrorStore } from "@/utils/stores/errorStore"; // Import Pinia store

export default {
  props: {
    successMessage: { type: String, default: "" },
    warningMessages: { type: [Array, String], default: () => [] },
    errorMessages: { type: [Array, String], default: () => [] },
  },
  setup(props) {
    const showSuccess = ref(false);
    const showWarning = ref(false);
    const showError = ref(false);
    const showStoreError = ref(false);
    const errStoreMessages = ref([]);

    const errorStore = useErrorStore(); // Access the Pinia store for error messages

    const autoDismiss = (type, duration) => {
      setTimeout(() => {
        if (type === "success") showSuccess.value = false;
        if (type === "warning") showWarning.value = false;
        if (type === "error") showError.value = false;
        if (type === "error") showStoreError.value = false;
      }, duration);
    };

    const closeToast = (type) => {
      if (type === "success") showSuccess.value = false;
      if (type === "warning") showWarning.value = false;
      if (type === "error") showError.value = false;
      if (type === "error") showStoreError.value = false;

    };

    watch(
      () => props.successMessage,
      (newMessage) => {
        if (newMessage) {
          showSuccess.value = true;
          autoDismiss("success", 2500); // Auto dismiss in 2 seconds
        }
      }
    );

    watch(
      () => props.warningMessages,
      (newMessages) => {
        if (
          newMessages &&
          (Array.isArray(newMessages) ? newMessages.length : newMessages)
        ) {
          showWarning.value = true;
          autoDismiss("warning", 2500); // Auto dismiss in 2.5 seconds
        }
      }
    );

    watch(
      () => props.errorMessages,
      (newErrors) => {
        if (
          newErrors &&
          (Array.isArray(newErrors) ? newErrors.length : newErrors)
        ) {
          showError.value = true;
          autoDismiss("error", 3000); // Auto dismiss in 3 seconds
        }
      }
    );

    watch(
      () => errorStore.getErrors, // ✅ Correct way to watch
      (newStErrors) => {
        if (
          newStErrors &&
          (Array.isArray(newStErrors) ? newStErrors.length : newStErrors)
        ) {
          errStoreMessages.value = newStErrors;
          showStoreError.value = true;
          autoDismiss("error", 1500); // Auto dismiss in 3 seconds
        }
      }
    );

    return {
      showSuccess,
      showWarning,
      showError,
      closeToast,
      showStoreError,
      errStoreMessages,
    };
  },
};
</script>

<style scoped>
/* Toast Container (Top-Right Position) */
.toast-container {
  position: fixed;
  top: 21px;
  right: 20px;
  z-index: 1050;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Toast Message Styling */
.toast-message {
  min-width: 300px;
  max-width: 400px;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  opacity: 0.95;
  transition: all 0.3s ease-in-out;
  font-weight: 500;
  position: relative;
}

/* Close Button (Always Visible) */
.toast-close {
  font-size: 14px;
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  color: #333;
  font-weight: bold;
}
.toast-close:hover {
  opacity: 1;
}

/* Toast Text & Icons */
.toast-text {
  flex: 1;
  padding-left: 8px;
}
.toast-icon {
  font-size: 18px;
}

/* Fade Animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
