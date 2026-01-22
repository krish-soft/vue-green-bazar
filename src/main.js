// src/main.js
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";

/* ===============================
   BOOTSTRAP 5 (CSS + JS)
=============================== */
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap";


/* ===============================
   FONT AWESOME
=============================== */
import "@fortawesome/fontawesome-free/css/all.min.css";

/* ===============================
   jQuery (ONLY FOR DATATABLES)
=============================== */
import $ from "jquery";
window.$ = window.jQuery = $;

/* ===============================
   DATATABLES (BS5 STYLE)
=============================== */
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-fixedcolumns-bs5/css/fixedColumns.bootstrap5.min.css";

import "datatables.net";
import "datatables.net-bs5";
import "datatables.net-fixedcolumns";
import "datatables.net-fixedcolumns-bs5";

/* ===============================
   APP GLOBAL STYLES
=============================== */
import "./assets/main.css";

/* ===============================
   DATATABLE AUTO INIT
=============================== */
import { registerDatatableAutoInit } from "@/core/utils/uiHelpers/datatableAutoInit.js";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

registerDatatableAutoInit();
