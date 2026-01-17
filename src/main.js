// src/main.js
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";

/* ✅ Bootstrap 5 (CSS + full JS bundle) */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

/* ✅ Font Awesome CSS (for <i class="fas ..."> icons) */
import "@fortawesome/fontawesome-free/css/all.min.css";

/* ✅ App global styles */
import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
