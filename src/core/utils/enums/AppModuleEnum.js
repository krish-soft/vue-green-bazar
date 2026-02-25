export const AppModuleEnum = {
  // Users & Auth (100–199)
  USERS: 101, // Login, OTP, KYC, roles, permissions
  CUSTOMERS: 102, // Buyer and seller profiles

  // Catalog & Supply (200–299)
  CATEGORIES: 201,
  PRODUCTS: 202,
  INVENTORY: 203,
  LISTINGS: 204, // Farmer crop listings
  PRICING_BIDDING: 205, // Fixed price / auction / negotiation

  // Orders & Transactions (300–399)
  CARTS: 301,
  ORDERS: 302,
  ORDER_ITEMS: 303,
  PAYMENTS: 304,
  WALLETS: 305,
  SETTLEMENTS: 306,
  REFUNDS: 307,
  COMMISSIONS: 308,
  ACCOUNTINGS: 309, // New module for accounting features


  // Logistics & Delivery (400–499)
  DRIVERS: 401,
  VEHICLES: 402,
  SHIPMENTS: 403,
  ROUTES: 404,
  TRACKING: 405,

  // Engagement & Trust (500–599)
  NOTIFICATIONS: 501,
  REVIEWS: 502,
  RATINGS: 503,
  DISPUTES: 504,

  // Reports & Analytics (600–699)
  REPORTS: 601,
  ANALYTICS: 602,
  DASHBOARDS: 603,

  // System & Configuration (700–799)
  MASTERS: 701,
  SETTINGS: 702,
  CMS: 703,
  LEGALS: 704,
  GEOGRAPHY: 705,

  // Admin & Operations (800–899)
  ADMIN: 801,
  AUDIT_LOGS: 802,

  SELLERS: 900,
  BUYERS: 901,
  DELIVERY_PARTNERS: 902,
  AFFILIATES: 903,

};
