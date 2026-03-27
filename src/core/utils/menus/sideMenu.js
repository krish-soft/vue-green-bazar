import { AppModuleEnum } from "../enums/AppModuleEnum";

export const sideMenu = [
  {
    label: "Home",
    icon: "fas fa-home",
    module: null,
    to: { name: "home" },
    match: "exact",
  },



  // Seller/Farmer menu
  {
    label: "Seller",
    icon: "fas fa-store",
    module: AppModuleEnum.SELLERS,
    match: "children",
    children: [
      {
        label: "Product Listings",
        icon: "fas fa-list",
        to: { name: "productlisting" },
        // module: AppModuleEnum.LISTINGS,
        match: "exact",
      },

      {
        label: "Market Orders",
        icon: "fas fa-shopping-bag",
        to: { name: "marketorderlist" },
        // module: AppModuleEnum.ORDERS,
        match: "exact",
      },

    ],
  },
  // Buyer/Trader menu
  {
    label: "Buyer",
    icon: "fas fa-shopping-cart",
    module: AppModuleEnum.BUYERS,
    match: "children",
    children: [

      {
        label: "Orders",
        icon: "fas fa-shopping-bag",
        to: { name: "orderlist" },
        // module: AppModuleEnum.ORDERS,
        match: "exact",
      },

      {
        label: "Demand Orders",
        icon: "fas fa-shopping-basket",
        to: { name: "demandorderlist" },
        // module: AppModuleEnum.ORDERS,
        match: "exact",
      },


    ],
  },

  // {
  //   label: "Market",
  //   icon: "fas fa-store-alt",
  //   module: AppModuleEnum.ORDERS,
  //   match: "children",
  //   children: [



  //   ],
  // },

  // Shipping menu
  {
    label: "Shipping",
    icon: "fas fa-truck",
    module: AppModuleEnum.SHIPMENTS,
    match: "children",
    children: [
      {
        label: "Summary",
        icon: "fas fa-clipboard-list",
        to: { name: "shipmentsummary" },
        match: "exact",
      },
      {
        label: "Shipments & Groups",
        icon: "fas fa-boxes",
        to: { name: "shipmentandgroup" },
        match: "exact",
      },
      {
        label: "Driver Shipment Assignment",
        icon: "fas fa-truck-moving",
        to: { name: "drivershipment" },
        match: "exact",
      },

    ],
  },

  {
    label: "Customer",
    icon: "fas fa-user",
    module: AppModuleEnum.CUSTOMERS,
    match: "children",
    children: [
      {
        label: "Customer Details",
        icon: "fas fa-user-edit",
        to: { name: "customerdetails" },
        match: "exact",
      },
      {
        label: "Customer Onboarding",
        // icon: "fas fa-gavel",
        icon: "fas fa-user-check",
        match: "children",
        children: [
          {
            label: "New Customer",
            icon: "fas fa-user-plus",
            to: { name: "newcustomer" },
            match: "exact",
          },
          {
            label: "User KYC Verification",
            icon: "fas fa-id-card",
            to: { name: "userkyc" },
            match: "exact",
          },
          {
            label: "Vehicle KYC Verification",
            icon: "fas fa-id-card",
            to: { name: "vehiclekyc" },
            match: "exact",
          },

          {
            label: "Fulfillment Location Verification",
            icon: "fas fa-map-marker-alt",
            to: { name: "fulfillmentlocation" },
            match: "exact",
          },

        ],
      },

    ],
  },

  // Legal Menu


  // Accounting menu
  {
    label: "Accounting",
    icon: "fas fa-calculator",
    module: AppModuleEnum.ACCOUNTINGS,
    match: "children",
    children: [
      {
        label: "Payments",
        icon: "fas fa-credit-card",
        to: { name: "paymentlist" },
        match: "exact",
      },
      {
        label: "Invoices",
        icon: "fas fa-file-invoice",
        to: { name: "invoicelist" },
        match: "exact",
      },

      {
        label: "Account Summary",
        icon: "fas fa-chart-pie",
        to: { name: "accountsummary" },
        match: "exact",
      },
      {
        label: "Accounts & Ledgers",
        icon: "fas fa-book",
        to: { name: "accountlist" },
        match: "exact",
      },
      {
        label: "Settlement",
        icon: "fas fa-hand-holding-usd",
        match: "children",
        children: [
          {
            label: "Settlement Preview",
            icon: "fas fa-money-check-alt",
            to: { name: "settlementpreview" },
            match: "exact",
          },
          {
            label: "Settlement Batch",
            icon: "fas fa-money-check",
            to: { name: "settlementbatch" },
            match: "exact",
          },
        ]
      }


    ],
  },

  // Master Menu
  {
    label: "Master",
    icon: "fas fa-seedling",
    module: AppModuleEnum.MASTERS,
    match: "children",
    children: [
      {
        label: "CMD Control",
        icon: "fas fa-cogs",
        to: { name: "cmdcontrol" },
        match: "exact",
      },
      {
        label: "Product",
        icon: "fas fa-box",
        match: "children",
        // module: AppModuleEnum.PRODUCTS,
        children: [
          {
            label: "Categories",
            icon: "fas fa-tags",
            to: { name: "mstproductcategory" },
            match: "exact",
          },
          {
            label: "Products",
            icon: "fas fa-box-open",
            to: { name: "mstproduct" },
            match: "exact",
          },
          {
            label: "Product Variants",
            icon: "fas fa-boxes",
            to: { name: "mstproductvariant" },
            match: "exact",
          },
          {
            label: "Product Packaging",
            icon: "fas fa-dolly",
            to: { name: "mstproductpackaging" },
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
            to: { name: "mstcharge" },
            match: "exact",
          },
          {
            label: "Charge Levels",
            icon: "fas fa-level-up-alt",
            to: { name: "mstchargelevel" },
            match: "exact",
          },
          {
            label: "Minimum Order Charge Rule",
            icon: "fas fa-file-invoice-dollar",
            to: { name: "mstminimumorderchargerule" },
            match: "exact",
          },
          {
            label: "Delivery Charge Rule",
            icon: "fas fa-truck-loading",
            to: { name: "mstdeliverychargerule" },
            match: "exact",
          },

        ],
      },

      {
        label: "Price",
        icon: "fas fa-money-bill-wave",
        match: "children",
        children: [
          {
            label: "Product Prices",
            icon: "fas fa-money-bill-wave",
            to: { name: "mstprice" },
            match: "exact",
          },
          {
            label: "Product Price Rules",
            icon: "fas fa-gavel",
            to: { name: "mstproductpricerule" },
            match: "exact",
          },
        ],

      },

      {
        label: "Geography",
        icon: "fas fa-earth-americas",
        match: "children",
        children: [
          {
            label: "States",
            icon: "fas fa-flag",
            to: { name: "mststate" },
            match: "exact",
          },
          {
            label: "Zones",
            icon: "fas fa-map-marked-alt",
            to: { name: "mstzone" },
            match: "exact",
          },
          {
            label: "Depots",
            icon: "fas fa-warehouse",
            to: { name: "mstdepot" },
            match: "exact",
          },

        ],
      },
      {
        label: "Settings",
        icon: "fas fa-cogs",
        match: "children",
        children: [
          {
            label: "Financial Years",
            icon: "fas fa-calendar-alt",
            to: { name: "mstfinanceyear" },
            match: "exact",
          },
          {
            label: "Finance/Currency Setting",
            icon: "fas fa-money-bill-wave",
            to: { name: "mstfinancesetting" },
            match: "exact",
          },
          {
            label: "App Setting",
            icon: "fas fa-cogs",
            to: { name: "mstappsetting" },
            match: "exact",
          },

          {
            label: "Payment Setting",
            icon: "fas fa-credit-card",
            to: { name: "mstpaymentsetting" },
            match: "exact",
          },
          {
            label: "Business Setting",
            icon: "fas fa-briefcase",
            to: { name: "mstbusinesssetting" },
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
      {
        label: "Admin",
        icon: "fa-solid fa-user-shield",
        match: "children",
        children: [
          {
            label: "Users",
            icon: "fas fa-users",
            to: { name: "adminuserlist" },
            match: "exact",
          },

        ],
      },




      //
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
