<template>
  <div class="dropdown position-relative" ref="dropdownRef">
    <!-- Trigger -->
    <button
      class="btn btn-link nav-link dropdown-toggle text-white"
      data-bs-toggle="dropdown"
      aria-expanded="true"
    >
      <i class="fas fa-user-circle fs-5"></i>
    </button>

    <!-- Dropdown -->
    <ul class="dropdown-menu dropdown-menu-end">
      <li class="dropdown-header small text-muted">
        {{ userName }}
      </li>

      <li><hr class="dropdown-divider" /></li>

      <li>
        <RouterLink class="dropdown-item" to="/settings">
          <i class="fas fa-cog me-2"></i>
          Settings
        </RouterLink>
      </li>

      <li>
        <button class="dropdown-item" type="button" @click="showPasswordForm = true">
          <i class="fas fa-key me-2"></i>
          Change Password
        </button>
      </li>

      <li>
        <button class="dropdown-item text-danger" type="button" @click="logout">
          <i class="fas fa-power-off me-2"></i>
          Logout
        </button>
      </li>
    </ul>

    <!-- Password Popup -->
    <div
      v-if="showPasswordForm"
      class="card shadow-lg position-absolute bg-white password-card"
    >
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h6 class="mb-0 fw-bold">Change Password</h6>
        <button class="btn-close btn-sm" @click="showPasswordForm = false"></button>
      </div>

      <!-- Current Password -->
      <div class="input-group mb-3">
        <input
          v-model="passwordForm.current_password"
          :type="showCurrent ? 'text' : 'password'"
          class="form-control"
          placeholder="Current Password"
        />
        <span class="input-group-text eye-btn" @click="showCurrent = !showCurrent">
          <i :class="showCurrent ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
        </span>
      </div>

      <!-- New Password -->
      <div class="input-group mb-3">
        <input
          v-model="passwordForm.new_password"
          :type="showNew ? 'text' : 'password'"
          class="form-control"
          placeholder="New Password"
        />
        <span class="input-group-text eye-btn" @click="showNew = !showNew">
          <i :class="showNew ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
        </span>
      </div>

      <!-- Confirm Password -->
      <div class="input-group mb-3">
        <input
          v-model="passwordForm.new_password_confirmation"
          :type="showConfirm ? 'text' : 'password'"
          class="form-control"
          placeholder="Confirm Password"
        />
        <span class="input-group-text eye-btn" @click="showConfirm = !showConfirm">
          <i :class="showConfirm ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
        </span>
      </div>

      <button class="btn update-btn w-100" @click="submitPassword">
        Update Password
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { useAuthStore } from "@/core/utils/stores/authStore";
import { useUserStore } from "@/core/utils/stores/userStore";
import { useUIStore } from "@/core/utils/stores/uiStore";
import apiRouteService from "@/core/services/apiRoutes/apiRouteService.js";

const authStore = useAuthStore();
const userStore = useUserStore();
const uiStore = useUIStore();
const router = useRouter();

const userName = userStore.userName;

const showPasswordForm = ref(false);
const showCurrent = ref(false);
const showNew = ref(false);
const showConfirm = ref(false);
const dropdownRef = ref(null);

const passwordForm = reactive({
  current_password: "",
  new_password: "",
  new_password_confirmation: "",
});

const logout = async () => {
  uiStore.isLoading = true;
  try {
    await apiRouteService.logout();
  } catch (_) {
  } finally {
    authStore.forceLogout();
    router.push({ name: "signin" });
  }
  uiStore.isLoading = false;
};

const submitPassword = async () => {
  try {
    await apiRouteService.changePassword(passwordForm);

    alert("Password changed successfully");
    showPasswordForm.value = false;

    passwordForm.current_password = "";
    passwordForm.new_password = "";
    passwordForm.new_password_confirmation = "";
  } catch (error) {
    console.log(error);
    alert(error.response?.data?.message || "Failed to change password");
  }
};

// Outside click close
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    showPasswordForm.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.password-card {
  width: 360px;
  right: 0;
  top: 50px;
  z-index: 9999;
  border-radius: 16px;
  padding: 20px;
}

.update-btn {
  background: #1f5c42;
  color: white;
  border: none;
  font-weight: 600;
}

.update-btn:hover {
  background: #174833;
  color: white;
}

.eye-btn {
  cursor: pointer;
  background: white;
}
</style>