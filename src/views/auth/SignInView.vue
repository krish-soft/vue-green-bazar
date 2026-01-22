<!--SignInView  -->
<template>
  <div class="row justify-content-center mt-5">
    <div class="col-md-4 col-sm-10">
      <BaseContainer heading="Sign In" subHeading="Admin Access">
        <template #body>
          <form @submit.prevent="handleLogin">
            <!-- Email -->
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input type="email" class="form-control" v-model.trim="form.email" placeholder="admin@example.com" />
            </div>

            <!-- Password -->
            <div class="mb-3">
              <label class="form-label">Password</label>
              <input type="password" class="form-control" v-model="form.password" placeholder="••••••••" />
            </div>

            <!-- Submit -->
            <div class="d-grid">
              <button type="submit" class="btn btn-success" :disabled="uiStore.isLoading">
                <span v-if="uiStore.isLoading">Signing in...</span>
                <span v-else>Sign In</span>
              </button>
            </div>
          </form>
        </template>
      </BaseContainer>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";

import BaseContainer from "@/components/common/cards/BaseContainer.vue";
import { useUIStore } from "@/core/utils/stores/uiStore";
import { useAuthStore } from "@/core/utils/stores/authStore";
import apiRouteService from "@/core/services/apiRoutes/apiRouteService.js";
import { useUserStore } from "@/core/utils/stores/userStore";
import { getDeviceId } from "@/core/utils/deviceUtils.js";
/* -----------------------
 | STORES
 ----------------------- */
const uiStore = useUIStore();
const authStore = useAuthStore();
const router = useRouter();
const userStore = useUserStore();

/* -----------------------
 | FORM STATE
 ----------------------- */
const form = reactive({
  email: "",
  password: "",
});

onMounted(() => {
  // check login then redirect to home
  if (authStore.isLoggedIn) {
    router.push({ name: "home" });
  }
});

/* -----------------------
 | VALIDATION
 ----------------------- */
const validateForm = () => {
  const errors = [];

  if (!form.email) {
    errors.push("Email is required");
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.push("Invalid email address");
  }

  if (!form.password) {
    errors.push("Password is required");
  }

  if (errors.length) {
    uiStore.errorMessages = errors;
    return false;
  }

  return true;
};

/* -----------------------
 | LOGIN HANDLER
 ----------------------- */
const handleLogin = async () => {
  uiStore.resetMessages();

  if (!validateForm()) return;

  try {
    uiStore.isLoading = true;
    // uiStore.isCenterLoading = true;

    const resp = await apiRouteService.login({
      email: form.email,
      password: form.password,
      device_id: getDeviceId(),
    });

    if (!resp || resp.isSuccess === false) {
      uiStore.errorMessages = [resp?.message || "Login failed"];
      return;
    }

    // Save auth token
    authStore.setAuthTokenData(
      resp.data.access_token,
      resp.data.expires_at
    );

    // Save user data
    userStore.setUserMetaData(resp.data.meta_data);

    uiStore.successMessage = "Login successful";
    router.push({ name: "home" });
  } catch (e) {
    uiStore.errorMessages = ["Something went wrong. " + e.message];
  } finally {
    uiStore.isLoading = false;
  }
  uiStore.isLoading = false;
};
</script>
