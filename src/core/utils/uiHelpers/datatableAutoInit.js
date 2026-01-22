import $ from "jquery";

const TABLE_ID = "#datatable";
let initialized = false;
let currentRowCount = 0;
let observer = null;

function initDatatable(force = false) {
  const table = $(TABLE_ID);
  if (!table.length) return;

  const rows = table.find("tbody tr").length;

  // ❌ no data yet
  if (rows === 0) return;

  // ✅ already initialized & no data change → STOP
  if ($.fn.DataTable.isDataTable(TABLE_ID) && !force) {
    return;
  }

  // 🔁 destroy only when forced (API refresh)
  if ($.fn.DataTable.isDataTable(TABLE_ID)) {
    table.DataTable().destroy();
  }

  currentRowCount = rows;

  table.DataTable({
    paging: true,
    searching: true,
    ordering: true,
    lengthChange: true,
    pageLength: 10,
    responsive: true,
    autoWidth: false,
  });

  // 🛑 VERY IMPORTANT: stop observing after init
  if (observer) {
    observer.disconnect();
    observer = null;
  }
}

export function registerDatatableAutoInit() {
  if (initialized) return;
  initialized = true;

  observer = new MutationObserver(() => {
    initDatatable();
  });

  // ✅ Observe ONLY table body, not whole document
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Fallback safety init
  setTimeout(() => initDatatable(true), 300);
}
