// useDataSortingFiltering.js
import { ref, computed } from "vue";

export function useDataSortingFiltering(dataList) {
  // if (dataList.value.length === 0) {
  //     return { searchQuery: ref(""), filteredList: computed(() => []), sortData: () => { }, getSortIcon: () => { } };
  // }

  const searchQuery = ref("");
  const sortColumn = ref("id"); // Default sorting by 'id'
  const sortDirection = ref("asc"); // Default sort order is ascending

  // const filteredList = computed(() => {
  //     let filtered = dataList.value.filter((item) => {
  //         return (
  //             item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
  //             item.category_code
  //                 .toLowerCase()
  //                 .includes(searchQuery.value.toLowerCase())
  //         );
  //     });

  //     // Sorting logic
  //     if (sortDirection.value === "asc") {
  //         filtered.sort((a, b) =>
  //             a[sortColumn.value] > b[sortColumn.value] ? 1 : -1
  //         );
  //     } else {
  //         filtered.sort((a, b) =>
  //             a[sortColumn.value] < b[sortColumn.value] ? 1 : -1
  //         );
  //     }

  //     return filtered;
  // });

  const filteredList = computed(() => {
    if (!dataList.value || !Array.isArray(dataList.value)) {
      return []; // Return empty array if dataList is undefined or not an array
    }

    // let filtered = dataList.value.filter((item) => {
    //     return (
    //         item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    //         item.category_code
    //             .toLowerCase()
    //             .includes(searchQuery.value.toLowerCase())
    //     );
    // });

    let filtered = dataList.value.filter((item) => {
      return Object.keys(item).some((key) => {
        // You can dynamically check any field (you can also filter out fields you don't want)
        if (
          typeof item[key] === "string" &&
          item[key].toLowerCase().includes(searchQuery.value.toLowerCase())
        ) {
          return true;
        }
        return false;
      });
    });

    // Sorting logic did to DESC due to ASC not showing latest entry on top
    filtered.sort((a, b) => {
      const aValue = a[sortColumn.value];
      const bValue = b[sortColumn.value];

      // Handle null or empty values
      if (aValue === null || aValue === "")
        return sortDirection.value === "desc" ? -1 : 1;
      if (bValue === null || bValue === "")
        return sortDirection.value === "desc" ? 1 : -1;

      // Compare based on type of value
      if (typeof aValue === "boolean") {
        return sortDirection.value === "desc"
          ? aValue === bValue
            ? 0
            : aValue
              ? -1
              : 1
          : aValue === bValue
            ? 0
            : aValue
              ? 1
              : -1;
      }

      // Default sorting for numbers or strings
      if (sortDirection.value === "desc") {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });

    return filtered;
  });

  const sortData = (column) => {
    if (sortColumn.value === column) {
      sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
    } else {
      sortColumn.value = column;
      sortDirection.value = "asc";
    }
  };

  const getSortIcon = (column) => {
    if (sortColumn.value === column) {
      return sortDirection.value === "asc" ? "fa-sort-up" : "fa-sort-down";
    }
    return "fa-sort";
  };

  return { searchQuery, filteredList, sortData, getSortIcon };
}
