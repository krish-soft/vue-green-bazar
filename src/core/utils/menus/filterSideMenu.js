export function normalizeAccessModules(accessModules) {
  if (!accessModules) return [];

  // Full access
  if (accessModules === "*") return "*";

  // "101,103,205"
  if (typeof accessModules === "string") {
    return accessModules
      .split(",")
      .map((v) => Number(v.trim()))
      .filter(Boolean);
  }

  // [101,103]
  if (Array.isArray(accessModules)) {
    return accessModules.map(Number);
  }

  return [];
}

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
