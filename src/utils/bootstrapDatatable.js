// src/utils/bootstrapDatatable.js

// src/utils/bootstrapDatatable.js
import $ from "jquery";

/**
 * Initialize Bootstrap 5 DataTable (Fully Customizable)
 *
 * @param {string} tableId
 * @param {object} options
 */
export function initBootstrapDatatable(tableId = "datatable", options = {}) {
  const selector = `#${tableId}`;
  const $table = $(selector);

  if (!$table.length) return null;

  // Destroy existing instance safely
  if ($.fn.DataTable.isDataTable(selector)) {
    $table.DataTable().destroy();
  }

  // Defaults
  const config = {
    paging: true,
    searching: true,
    ordering: true,
    lengthChange: true,
    pageLength: 10,
    autoWidth: false,

    // IMPORTANT: responsive conflicts with frozen columns
    responsive: options.responsive ?? false,

    language: {
      search: "Search:",
      lengthMenu: "_MENU_ entries per page",
      info: "Showing _START_ to _END_ of _TOTAL_ entries",
      paginate: {
        previous: "‹",
        next: "›",
      },
    },
  };

  /* ===============================
     SCROLLING
  =============================== */
  if (options.scrollX) {
    config.scrollX = true;
    config.scrollCollapse = true;
  }

  /* ===============================
     FIXED COLUMNS (FREEZE)
  =============================== */
  if (options.freezeLeft || options.freezeRight) {
    config.fixedColumns = {
      left: options.freezeLeft || 0,
      right: options.freezeRight || 0,
    };
  }

  /* ===============================
     COLUMN DEFINITIONS
  =============================== */
  if (options.disableSortColumns?.length) {
    config.columnDefs = [
      {
        targets: options.disableSortColumns,
        orderable: false,
      },
    ];
  }

  if (options.columnWidths?.length) {
    config.columnDefs = [
      ...(config.columnDefs || []),
      ...options.columnWidths.map((w) => ({
        targets: w.target,
        width: w.width,
      })),
    ];
  }

  /* ===============================
     FINAL INIT
  =============================== */
  return $table.DataTable({
    ...config,
    ...options.override, // advanced escape hatch
  });
}

/**
 * Destroy DataTable
 */
export function destroyBootstrapDatatable(tableId = "datatable") {
  const selector = `#${tableId}`;

  if ($.fn.DataTable.isDataTable(selector)) {
    $(selector).DataTable().destroy();
  }
}

// Sampel to use with freeze columns
// OnMounted(async () => {
//   await nextTick();

//   initBootstrapDatatable("datatable", {
//     scrollX: true,
//     freezeLeft: 2,       // # + Name
//     freezeRight: 1,      // Action column
//     pageLength: 10,
//     responsive: false,

//     disableSortColumns: [0, 4], // # & Action
//     columnWidths: [
//       { target: 0, width: "60px" },
//       { target: 4, width: "140px" },
//     ],
//   });
// });

// //  ORG WITHOUT FREEZE COLUMNS
// import $ from "jquery";

// /**
//  * Initialize Bootstrap 5 DataTable
//  * Default ID: datatable
//  */
// export function initBootstrapDatatable(tableId = "datatable", options = {}) {
//   const selector = `#${tableId}`;

//   // Table not found → silently skip
//   if (!$(selector).length) return null;

//   // Destroy existing instance (Vue safety)
//   if ($.fn.DataTable.isDataTable(selector)) {
//     $(selector).DataTable().destroy();
//   }

//   return $(selector).DataTable({
//     paging: true,
//     searching: true,
//     ordering: true,
//     lengthChange: true,
//     pageLength: 10,
//     responsive: true,
//     autoWidth: false,

//     language: {
//       search: "Search:",
//       lengthMenu: "Show _MENU_ entries",
//       info: "Showing _START_ to _END_ of _TOTAL_ entries",
//       paginate: {
//         previous: "‹",
//         next: "›",
//       },
//     },

//     ...options,
//   });
// }

// /**
//  * Destroy Bootstrap DataTable
//  * Default ID: datatable
//  */
// export function destroyBootstrapDatatable(tableId = "datatable") {
//   const selector = `#${tableId}`;

//   if ($.fn.DataTable.isDataTable(selector)) {
//     $(selector).DataTable().destroy();
//   }
// }
