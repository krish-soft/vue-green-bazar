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
        label: "Depots",
        icon: "fas fa-warehouse",
        to: { name: "mstdepot" },
        match: "exact",
      },
      {
        label: "Product",
        icon: "fas fa-box",
        match: "children",
        children: [
          {
            label: "Categories",
            icon: "fas fa-tags",
            to: { name: "productcategory" },
            match: "exact",
          },
          {
            label: "Products",
            icon: "fas fa-box-open",
            to: { name: "product" },
            match: "exact",
          },
          {
            label: "Product Variants",
            icon: "fas fa-boxes",
            to: { name: "productvariant" },
            match: "exact",
          },
          {
            label: "Product Packaging",
            icon: "fas fa-dolly",
            to: { name: "productpackaging" },
            match: "exact",
          },

        ],
      },
      {
        label: "Charge",
        icon: "fa-solid fa-hand-holding-dollar",
        match: "children",
        children: [
          {
            label: "Charges",
            icon: "fas fa-tag",
            to: { name: "charge" },
            match: "exact",
          },
          {
            label: "Charge Levels",
            icon: "fas fa-level-up-alt",
            to: { name: "chargelevel" },
            match: "exact",
          },
          {
            label: "Minimum Order Charge Rule",
            icon: "fas fa-file-invoice-dollar",
            to: { name: "minimumorderchargerule" },
            match: "exact",
          },
          {
            label: "Delivery Charge Rule",
            icon: "fas fa-truck-loading",
            to: { name: "deliverychargerule" },
            match: "exact",
          },

        ],
      },

      {
        label: "Other",
        icon: "fa-solid fa-ellipsis-h",
        match: "children",
        children: [
          {
            label: "Units",
            icon: "fas fa-ruler",

            to: { name: "msunit" },
            match: "exact",
          },
          {
            label: "Pack Types",
            icon: "fas fa-box",

            to: { name: "mstpacktype" },
            match: "exact",
          },
          {
            label: "Vehicles",
            icon: "fas fa-truck",

            to: { name: "mstvehicle" },
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
//
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
