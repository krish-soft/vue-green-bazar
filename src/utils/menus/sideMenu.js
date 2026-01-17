export const sideMenu = [
  {
    label: "Home",
    icon: "fas fa-home",
    module: null,
    to: { name: "home" },
    match: "exact",
  },

  {
    label: "Master",
    icon: "fas fa-seedling",
    module: 200,
    match: "children",
    children: [
      {
        label: "Products",
        icon: "fas fa-box",
        module: 203,
        to: { name: "signin" },
        match: "exact",
      },
      {
        label: "Units",
        icon: "fas fa-ruler",
        module: 204,
        to: { name: "msunit" },
        match: "exact",
      },
      {
        label: "Advanced",
        icon: "fas fa-sitemap",
        module: 205,
        match: "children",
        children: [
          {
            label: "Categories",
            module: 206,
            to: { name: "home" },
            match: "exact",
          },
          {
            label: "Brands",
            module: 207,
            to: { name: "home" },
            match: "exact",
          },
        ],
      },
    ],
  },
];

// export const sideMenu = [
//   {
//     label: "Home",
//     icon: "fas fa-home",
//     module: null,
//     to: "/",
//     match: "exact", // 👈 only /
//   },

//   {
//     label: "Master",
//     icon: "fas fa-seedling",
//     module: 200,
//     match: "children", // 👈 active only if child active
//     children: [
//       {
//         label: "Products",
//         icon: "fas fa-box",
//         module: 203,
//         to: "/master/products",
//         match: "prefix", // /master/products/*
//       },
//       {
//         label: "Units",
//         icon: "fas fa-ruler",
//         module: 204,
//         to: "/master/msunit",
//         match: "exact",
//       },
//       {
//         label: "Advanced",
//         icon: "fas fa-sitemap",
//         module: 205,
//         match: "children",
//         children: [
//           {
//             label: "Categories",
//             module: 206,
//             to: "/master/categories",
//             match: "prefix",
//           },
//           {
//             label: "Brands",
//             module: 207,
//             to: "/master/brands",
//             match: "prefix",
//           },
//         ],
//       },
//     ],
//   },
// ];
