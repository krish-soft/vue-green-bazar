export function normalizeAccessModules(accessModules) {
  if (!accessModules) return [];

  // Full access
  if (
    accessModules === "*" ||
    (Array.isArray(accessModules) &&
      accessModules.length === 1 &&
      accessModules[0] === "*")
  ) {
    return "*";
  }

  // If already array like [101,102]
  if (Array.isArray(accessModules)) {
    return accessModules.map(Number).filter(Boolean);
  }

  // If string like "101,102"
  if (typeof accessModules === "string") {
    return accessModules
      .split(",")
      .map(v => Number(v.trim()))
      .filter(Boolean);
  }

  return [];
}
// export function normalizeAccessModules(accessModules) {
//   if (!accessModules) return [];

//   // Full access
//   if (accessModules === "*" || (Array.isArray(accessModules) && accessModules.length === 1 && accessModules[0] === "*")) return "*";

//   // "101,103,205"
//   if (typeof accessModules === "string") {
//     return accessModules
//       .split(",")
//       .map((v) => Number(v.trim()))
//       .filter(Boolean);
//   }

//   // [101,103]
//   if (Array.isArray(accessModules)) {
//     return accessModules.map(Number);
//   }

//   return [];
// }

export function filterSideMenu(menu, rawAccessModules) {
  const accessModules = normalizeAccessModules(rawAccessModules);

  // "*" = show everything
  if (accessModules === "*") {
    return menu;
  }

  return menu.map((item) => filterItem(item, accessModules)).filter(Boolean);
}

function filterItem(item, accessModules) {
  // HOME or default
  if (!item.module) {
    return item;
  }

  // No access
  if (!accessModules.includes(item.module)) {
    return null;
  }

  // Handle children
  if (item.children) {
    const children = item.children
      .map((child) => filterItem(child, accessModules))
      .filter(Boolean);

    if (children.length === 0) return null;

    return { ...item, children };
  }

  return item;
}
