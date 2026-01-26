<!--SignInView  -->
<template>
  <div class="row justify-content-center mt-5">


    <div class="col-md-4 col-sm-10">

      <div class="card shadow-sm border-0">
        <div class="card-body p-4">

          <!-- LOGO -->
          <div class="row align-items-center mb-3">

            <!-- TITLE -->
            <div class="col-md-6 text-center">
              <h1 class="fw-semibold mb-1">Sign In</h1>
              <h6 class="text-muted mb-0 mt-2">Admin Access</h6>
            </div>


            <!-- LOGO -->
            <div class="col-md-6 d-flex justify-content-center">
              <img :src="APP_LOGO" alt="Logo" class="img-fluid" style="max-height:120px" />
            </div>



          </div>

          <hr class="my-3">

          <!-- TITLE -->
          <form @submit.prevent="handleLogin">

            <!-- Email -->
            <div class="mb-3">
              <label class="form-label fw-semibold">Email</label>
              <input type="email" class="form-control" v-model.trim="form.email" placeholder="admin@example.com" />
            </div>

            <!-- Password -->
            <div class="mb-3">
              <label class="form-label fw-semibold">Password</label>
              <input type="password" class="form-control" v-model="form.password" placeholder="••••••••" />
            </div>

            <!-- SUBMIT -->
            <div class="d-grid mt-4">
              <button type="submit" class="btn btn-success" :disabled="uiStore.isLoading">
                <span v-if="uiStore.isLoading" class="spinner-border spinner-border-sm me-2"></span>
                {{ uiStore.isLoading ? "Signing in..." : "Sign In" }}
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { APP_LOGO } from "@/core/utils/constants/assets";


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
    uiStore.errorMessages = ["Something went wrong:\n " + e.message];
  } finally {
    uiStore.isLoading = false;
  }
  uiStore.isLoading = false;
};
</script>
