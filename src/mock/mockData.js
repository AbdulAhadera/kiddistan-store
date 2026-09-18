
export const categories = [
  // Top-Level Categories
  {
    id: "cat-boys",
    name: "Boys",
    slug: "boys",
    parent_id: null,
    image_url: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800",
    sort_order: 1,
    is_active: true
  },
  {
    id: "cat-girls",
    name: "Girls",
    slug: "girls",
    parent_id: null,
    image_url: "https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?w=800",
    sort_order: 2,
    is_active: true
  },
  {
    id: "cat-shoes",
    name: "Shoes",
    slug: "shoes",
    parent_id: null,
    image_url: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800",
    sort_order: 3,
    is_active: true
  },
  // Sub-Categories
  {
    id: "cat-boys-eastern",
    name: "Eastern Wear",
    slug: "boys-eastern-wear",
    parent_id: "cat-boys",
    image_url: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=800",
    sort_order: 1,
    is_active: true
  },
  {
    id: "cat-boys-western",
    name: "Western Wear",
    slug: "boys-western-wear",
    parent_id: "cat-boys",
    image_url: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800",
    sort_order: 2,
    is_active: true
  },
  {
    id: "cat-girls-eastern",
    name: "Eastern Wear",
    slug: "girls-eastern-wear",
    parent_id: "cat-girls",
    image_url: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800",
    sort_order: 1,
    is_active: true
  },
  {
    id: "cat-girls-western",
    name: "Western Wear",
    slug: "girls-western-wear",
    parent_id: "cat-girls",
    image_url: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800",
    sort_order: 2,
    is_active: true
  },
  {
    id: "cat-shoes-traditional",
    name: "Khussas & Ethnic",
    slug: "traditional-shoes",
    parent_id: "cat-shoes",
    image_url: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800",
    sort_order: 1,
    is_active: true
  },
  {
    id: "cat-shoes-casual",
    name: "Casual Sneakers",
    slug: "casual-sneakers",
    parent_id: "cat-shoes",
    image_url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800",
    sort_order: 2,
    is_active: true
  }
];

export const sizes = [
  // Clothing Sizes
  { id: "sz-6-9m", label: "6-9M", sort_order: 1, applies_to: ["clothing"] },
  { id: "sz-12-18m", label: "12-18M", sort_order: 2, applies_to: ["clothing"] },
  { id: "sz-2y", label: "2Y", sort_order: 3, applies_to: ["clothing"] },
  { id: "sz-4y", label: "4Y", sort_order: 4, applies_to: ["clothing"] },
  { id: "sz-6y", label: "6Y", sort_order: 5, applies_to: ["clothing"] },
  { id: "sz-8y", label: "8Y", sort_order: 6, applies_to: ["clothing"] },
  // Shoe Sizes
  { id: "sz-eu24", label: "EU 24", sort_order: 1, applies_to: ["shoes"] },
  { id: "sz-eu26", label: "EU 26", sort_order: 2, applies_to: ["shoes"] },
  { id: "sz-eu28", label: "EU 28", sort_order: 3, applies_to: ["shoes"] },
  { id: "sz-eu30", label: "EU 30", sort_order: 4, applies_to: ["shoes"] }
];

export const colors = [
  { id: "clr-maroon", name: "Maroon", hex: "#7A1F2B" },
  { id: "clr-navy", name: "Navy Blue", hex: "#1B2A4A" },
  { id: "clr-offwhite", name: "Off White", hex: "#F5F2EB" },
  { id: "clr-emerald", name: "Emerald Green", hex: "#0F5257" },
  { id: "clr-dustyrose", name: "Dusty Rose", hex: "#C48B9F" },
  { id: "clr-mustard", name: "Mustard Yellow", hex: "#E5A93C" },
  { id: "clr-black", name: "Black", hex: "#111111" },
  { id: "clr-tan", name: "Tan Brown", hex: "#965A38" }
];

export const collections = [
  {
    id: "col-eid-2026",
    name: "Eid Collection 2026",
    slug: "eid-collection-2026",
    description: "Premium festive eastern wear crafted for Eid celebrations.",
    banner_image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200",
    is_active: true,
    start_date: "2026-03-01T00:00:00Z",
    end_date: "2026-04-15T23:59:59Z"
  },
  {
    id: "col-summer-2026",
    name: "Summer Vibes '26",
    slug: "summer-2026",
    description: "Lightweight, breathable cottons and lawn prints for daily comfort.",
    banner_image: "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=1200",
    is_active: true,
    start_date: "2026-04-01T00:00:00Z",
    end_date: "2026-09-30T23:59:59Z"
  },
  {
    id: "col-new-arrivals",
    name: "New Arrivals",
    slug: "new-arrivals",
    description: "Freshly added styles in store right now.",
    banner_image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=1200",
    is_active: true,
    start_date: null,
    end_date: null
  }
];

export const products = [
  // =========================================================
  // BABA PRODUCTS - 01 to 12
  // =========================================================

  {
    id: "prod-baba-01",
    name: "Baba Royal Embroidered Kurta Shalwar Set",
    slug: "baba-royal-embroidered-kurta-shalwar-set",
    description:
      "Premium embroidered kurta shalwar set designed for festive occasions.",
    product_type: "Sets",
    category_id: "cat-boys-eastern",
    price: 5490,
    compare_at_price: 6490,
    currency: "PKR",
    status: "active",
    attributes: {
      fabric: "Raw Silk Blend",
      occasion: "Festive / Eid",
      fit: "Regular Fit",
    },
    category: {
      id: "cat-boys-eastern",
      name: "Eastern Wear",
      slug: "boys-eastern-wear",
    },
    primary_image: "/samples/baba/sample1.1.png",
    collection_slugs: ["eid-collection-2026", "new-arrivals"],
    available_sizes: [
      { id: "sz-2y", label: "2Y" },
      { id: "sz-4y", label: "4Y" },
      { id: "sz-6y", label: "6Y" },
    ],
    images: [
      {
        id: "img-baba-01-1",
        url: "/samples/baba/sample1.1.png",
        is_primary: true,
      },
      {
        id: "img-baba-01-2",
        url: "/samples/baba/sample1.2.png",
        is_primary: false,
      },
    ],
  },

  {
    id: "prod-baba-02",
    name: "Baba Cotton Casual Kurta",
    slug: "baba-cotton-casual-kurta",
    description: "Soft cotton casual kurta for everyday wear.",
    product_type: "Top Wear",
    category_id: "cat-boys-eastern",
    price: 2890,
    compare_at_price: 3290,
    currency: "PKR",
    status: "active",
    attributes: {
      fabric: "Premium Cotton",
      occasion: "Casual",
      fit: "Regular Fit",
    },
    category: {
      id: "cat-boys-eastern",
      name: "Eastern Wear",
      slug: "boys-eastern-wear",
    },
    primary_image: "/samples/baba/sample2.1.png",
    collection_slugs: ["summer-2026", "new-arrivals"],
    available_sizes: [
      { id: "sz-4y", label: "4Y" },
      { id: "sz-6y", label: "6Y" },
      { id: "sz-8y", label: "8Y" },
    ],
    images: [
      {
        id: "img-baba-02-1",
        url: "/samples/baba/sample2.1.png",
        is_primary: true,
      },
      {
        id: "img-baba-02-2",
        url: "/samples/baba/sample2.2.png",
        is_primary: false,
      },
    ],
  },

  {
    id: "prod-baba-03",
    name: "Baba Denim Jacket & Tee Set",
    slug: "baba-denim-jacket-tee-set",
    description:
      "Washed denim jacket paired with a comfortable cotton tee.",
    product_type: "Sets",
    category_id: "cat-boys-western",
    price: 4250,
    compare_at_price: 4890,
    currency: "PKR",
    status: "active",
    attributes: {
      fabric: "Cotton Denim",
      occasion: "Casual",
      fit: "Regular Fit",
    },
    category: {
      id: "cat-boys-western",
      name: "Western Wear",
      slug: "boys-western-wear",
    },
    primary_image: "/samples/baba/sample1.1.png",
    collection_slugs: ["winter-2026", "new-arrivals"],
    available_sizes: [
      { id: "sz-4y", label: "4Y" },
      { id: "sz-6y", label: "6Y" },
      { id: "sz-8y", label: "8Y" },
    ],
    images: [
      {
        id: "img-baba-03-1",
        url: "/samples/baba/sample1.1.png",
        is_primary: true,
      },
      {
        id: "img-baba-03-2",
        url: "/samples/baba/sample1.2.png",
        is_primary: false,
      },
    ],
  },

  {
    id: "prod-baba-04",
    name: "Baba Cotton Chino Trousers",
    slug: "baba-cotton-chino-trousers",
    description:
      "Stretchable cotton chinos for smart casual outings.",
    product_type: "Bottom Wear",
    category_id: "cat-boys-western",
    price: 2450,
    compare_at_price: 2990,
    currency: "PKR",
    status: "active",
    attributes: {
      fabric: "Stretch Cotton",
      occasion: "Casual",
      fit: "Slim Fit",
    },
    category: {
      id: "cat-boys-western",
      name: "Western Wear",
      slug: "boys-western-wear",
    },
    primary_image: "/samples/baba/sample2.1.png",
    collection_slugs: ["summer-2026"],
    available_sizes: [
      { id: "sz-2y", label: "2Y" },
      { id: "sz-4y", label: "4Y" },
      { id: "sz-6y", label: "6Y" },
      { id: "sz-8y", label: "8Y" },
    ],
    images: [
      {
        id: "img-baba-04-1",
        url: "/samples/baba/sample2.1.png",
        is_primary: true,
      },
      {
        id: "img-baba-04-2",
        url: "/samples/baba/sample2.2.png",
        is_primary: false,
      },
    ],
  },

  {
    id: "prod-baba-05",
    name: "Baba Warm Puffer Jacket",
    slug: "baba-warm-puffer-jacket",
    description:
      "Insulated outerwear jacket designed for peak winter warmth.",
    product_type: "Outerwear",
    category_id: "cat-boys-western",
    price: 6200,
    compare_at_price: 7500,
    currency: "PKR",
    status: "active",
    attributes: {
      fabric: "Polyester / Down",
      occasion: "Winter",
      fit: "Regular Fit",
    },
    category: {
      id: "cat-boys-western",
      name: "Western Wear",
      slug: "boys-western-wear",
    },
    primary_image: "/samples/baba/sample1.1.png",
    collection_slugs: ["winter-2026"],
    available_sizes: [
      { id: "sz-6y", label: "6Y" },
      { id: "sz-8y", label: "8Y" },
      { id: "sz-10y", label: "10Y" },
    ],
    images: [
      {
        id: "img-baba-05-1",
        url: "/samples/baba/sample1.1.png",
        is_primary: true,
      },
      {
        id: "img-baba-05-2",
        url: "/samples/baba/sample1.2.png",
        is_primary: false,
      },
    ],
  },

  {
    id: "prod-baba-06",
    name: "Baba Velvet Jacquard Waistcoat",
    slug: "baba-velvet-jacquard-waistcoat",
    description:
      "Elegant jacquard patterned waistcoat for weddings and festive wear.",
    product_type: "Outerwear",
    category_id: "cat-boys-eastern",
    price: 3450,
    compare_at_price: 3990,
    currency: "PKR",
    status: "active",
    attributes: {
      fabric: "Velvet Jacquard",
      occasion: "Festive / Wedding",
      fit: "Tailored Fit",
    },
    category: {
      id: "cat-boys-eastern",
      name: "Eastern Wear",
      slug: "boys-eastern-wear",
    },
    primary_image: "/samples/baba/sample2.1.png",
    collection_slugs: ["eid-collection-2026", "winter-2026"],
    available_sizes: [
      { id: "sz-4y", label: "4Y" },
      { id: "sz-6y", label: "6Y" },
      { id: "sz-8y", label: "8Y" },
      { id: "sz-10y", label: "10Y" },
    ],
    images: [
      {
        id: "img-baba-06-1",
        url: "/samples/baba/sample2.1.png",
        is_primary: true,
      },
      {
        id: "img-baba-06-2",
        url: "/samples/baba/sample2.2.png",
        is_primary: false,
      },
    ],
  },

  {
    id: "prod-baba-07",
    name: "Baba Printed Lawn Kurta",
    slug: "baba-printed-lawn-kurta",
    description:
      "Lightweight lawn kurta with ethnic printed detailing.",
    product_type: "Top Wear",
    category_id: "cat-boys-eastern",
    price: 1950,
    compare_at_price: 2290,
    currency: "PKR",
    status: "active",
    attributes: {
      fabric: "Soft Lawn Cotton",
      occasion: "Casual",
      fit: "Regular Fit",
    },
    category: {
      id: "cat-boys-eastern",
      name: "Eastern Wear",
      slug: "boys-eastern-wear",
    },
    primary_image: "/samples/baba/sample1.1.png",
    collection_slugs: ["summer-2026"],
    available_sizes: [
      { id: "sz-2y", label: "2Y" },
      { id: "sz-4y", label: "4Y" },
      { id: "sz-6y", label: "6Y" },
    ],
    images: [
      {
        id: "img-baba-07-1",
        url: "/samples/baba/sample1.1.png",
        is_primary: true,
      },
      {
        id: "img-baba-07-2",
        url: "/samples/baba/sample1.2.png",
        is_primary: false,
      },
    ],
  },

  {
    id: "prod-baba-08",
    name: "Baba Classic White Cotton Shalwar",
    slug: "baba-classic-white-cotton-shalwar",
    description:
      "Breathable white cotton shalwar suitable for pairing with any kurta.",
    product_type: "Bottom Wear",
    category_id: "cat-boys-eastern",
    price: 1450,
    compare_at_price: 1750,
    currency: "PKR",
    status: "active",
    attributes: {
      fabric: "100% Cotton",
      occasion: "Festive / Casual",
      fit: "Relaxed Fit",
    },
    category: {
      id: "cat-boys-eastern",
      name: "Eastern Wear",
      slug: "boys-eastern-wear",
    },
    primary_image: "/samples/baba/sample2.1.png",
    collection_slugs: ["eid-collection-2026", "summer-2026"],
    available_sizes: [
      { id: "sz-2y", label: "2Y" },
      { id: "sz-4y", label: "4Y" },
      { id: "sz-6y", label: "6Y" },
      { id: "sz-8y", label: "8Y" },
    ],
    images: [
      {
        id: "img-baba-08-1",
        url: "/samples/baba/sample2.1.png",
        is_primary: true,
      },
      {
        id: "img-baba-08-2",
        url: "/samples/baba/sample2.2.png",
        is_primary: false,
      },
    ],
  },

  {
    id: "prod-baba-09",
    name: "Baba Royal Sherwani & Trouser Set",
    slug: "baba-royal-sherwani-trouser-set",
    description:
      "Hand-embroidered designer sherwani set for formal family celebrations.",
    product_type: "Sets",
    category_id: "cat-boys-eastern",
    price: 7850,
    compare_at_price: 8990,
    currency: "PKR",
    status: "active",
    attributes: {
      fabric: "Silk Blend",
      occasion: "Wedding / Formal",
      fit: "Tailored Fit",
    },
    category: {
      id: "cat-boys-eastern",
      name: "Eastern Wear",
      slug: "boys-eastern-wear",
    },
    primary_image: "/samples/baba/sample1.1.png",
    collection_slugs: ["eid-collection-2026", "new-arrivals"],
    available_sizes: [
      { id: "sz-4y", label: "4Y" },
      { id: "sz-6y", label: "6Y" },
      { id: "sz-8y", label: "8Y" },
      { id: "sz-10y", label: "10Y" },
    ],
    images: [
      {
        id: "img-baba-09-1",
        url: "/samples/baba/sample1.1.png",
        is_primary: true,
      },
      {
        id: "img-baba-09-2",
        url: "/samples/baba/sample1.2.png",
        is_primary: false,
      },
    ],
  },

  {
    id: "prod-baba-10",
    name: "Baba Linen Waistcoat & Kurta Set",
    slug: "baba-linen-waistcoat-kurta-set",
    description:
      "3-piece linen kurta set complete with matching waistcoat.",
    product_type: "Sets",
    category_id: "cat-boys-eastern",
    price: 4990,
    compare_at_price: 5690,
    currency: "PKR",
    status: "active",
    attributes: {
      fabric: "Linen Cotton",
      occasion: "Festive",
      fit: "Regular Fit",
    },
    category: {
      id: "cat-boys-eastern",
      name: "Eastern Wear",
      slug: "boys-eastern-wear",
    },
    primary_image: "/samples/baba/sample2.1.png",
    collection_slugs: ["summer-2026", "eid-collection-2026"],
    available_sizes: [
      { id: "sz-2y", label: "2Y" },
      { id: "sz-4y", label: "4Y" },
      { id: "sz-6y", label: "6Y" },
    ],
    images: [
      {
        id: "img-baba-10-1",
        url: "/samples/baba/sample2.1.png",
        is_primary: true,
      },
      {
        id: "img-baba-10-2",
        url: "/samples/baba/sample2.2.png",
        is_primary: false,
      },
    ],
  },

  {
    id: "prod-baba-11",
    name: "Baba Straight Fit Cotton Pyjama",
    slug: "baba-straight-fit-cotton-pyjama",
    description:
      "Soft off-white cotton straight pyjama for ethnic wear.",
    product_type: "Bottom Wear",
    category_id: "cat-boys-eastern",
    price: 1250,
    compare_at_price: 1500,
    currency: "PKR",
    status: "active",
    attributes: {
      fabric: "Cotton",
      occasion: "Casual / Festive",
      fit: "Straight Fit",
    },
    category: {
      id: "cat-boys-eastern",
      name: "Eastern Wear",
      slug: "boys-eastern-wear",
    },
    primary_image: "/samples/baba/sample1.1.png",
    collection_slugs: ["summer-2026"],
    available_sizes: [
      { id: "sz-4y", label: "4Y" },
      { id: "sz-6y", label: "6Y" },
      { id: "sz-8y", label: "8Y" },
    ],
    images: [
      {
        id: "img-baba-11-1",
        url: "/samples/baba/sample1.1.png",
        is_primary: true,
      },
      {
        id: "img-baba-11-2",
        url: "/samples/baba/sample1.2.png",
        is_primary: false,
      },
    ],
  },

  {
    id: "prod-baba-12",
    name: "Baba Embroidered Arabic Jubba",
    slug: "baba-embroidered-arabic-jubba",
    description:
      "Traditional full-length Arabic style thobe with collar embroidery.",
    product_type: "Dresses",
    category_id: "cat-boys-eastern",
    price: 3890,
    compare_at_price: 4490,
    currency: "PKR",
    status: "active",
    attributes: {
      fabric: "Polyester Cotton",
      occasion: "Religious / Festive",
      fit: "Loose Fit",
    },
    category: {
      id: "cat-boys-eastern",
      name: "Eastern Wear",
      slug: "boys-eastern-wear",
    },
    primary_image: "/samples/baba/sample2.1.png",
    collection_slugs: ["eid-collection-2026"],
    available_sizes: [
      { id: "sz-6y", label: "6Y" },
      { id: "sz-8y", label: "8Y" },
      { id: "sz-10y", label: "10Y" },
    ],
    images: [
      {
        id: "img-baba-12-1",
        url: "/samples/baba/sample2.1.png",
        is_primary: true,
      },
      {
        id: "img-baba-12-2",
        url: "/samples/baba/sample2.2.png",
        is_primary: false,
      },
    ],
  },

  // =========================================================
  // BABY PRODUCTS - 13 to 24
  // =========================================================

  {
    id: "prod-baby-01",
    name: "Baby Soft Cotton Kurta Set",
    slug: "baby-soft-cotton-kurta-set",
    description:
      "Soft and comfortable cotton kurta set designed for little ones.",
    product_type: "Sets",
    category_id: "cat-baby-eastern",
    price: 3190,
    compare_at_price: 3690,
    currency: "PKR",
    status: "active",
    attributes: {
      fabric: "Soft Cotton",
      occasion: "Festive / Casual",
      fit: "Comfort Fit",
    },
    category: {
      id: "cat-baby-eastern",
      name: "Eastern Wear",
      slug: "baby-eastern-wear",
    },
    primary_image: "/samples/baby/sample1.1.png",
    collection_slugs: ["new-arrivals", "eid-collection-2026"],
    available_sizes: [
      { id: "sz-0-6m", label: "0-6M" },
      { id: "sz-6-12m", label: "6-12M" },
      { id: "sz-1-2y", label: "1-2Y" },
    ],
    images: [
      {
        id: "img-baby-01-1",
        url: "/samples/baby/sample1.1.png",
        is_primary: true,
      },
      {
        id: "img-baby-01-2",
        url: "/samples/baby/sample1.2.png",
        is_primary: false,
      },
    ],
  },

  {
    id: "prod-baby-02",
    name: "Baby Embroidered Festive Suit",
    slug: "baby-embroidered-festive-suit",
    description:
      "Delicate embroidered outfit for festive family occasions.",
    product_type: "Sets",
    category_id: "cat-baby-eastern",
    price: 3990,
    compare_at_price: 4590,
    currency: "PKR",
    status: "active",
    attributes: {
      fabric: "Cotton Silk",
      occasion: "Festive",
      fit: "Comfort Fit",
    },
    category: {
      id: "cat-baby-eastern",
      name: "Eastern Wear",
      slug: "baby-eastern-wear",
    },
    primary_image: "/samples/baby/sample2.1.png",
    collection_slugs: ["eid-collection-2026"],
    available_sizes: [
      { id: "sz-0-6m", label: "0-6M" },
      { id: "sz-6-12m", label: "6-12M" },
      { id: "sz-1-2y", label: "1-2Y" },
    ],
    images: [
      {
        id: "img-baby-02-1",
        url: "/samples/baby/sample2.1.png",
        is_primary: true,
      },
      {
        id: "img-baby-02-2",
        url: "/samples/baby/sample2.2.png",
        is_primary: false,
      },
    ],
  },

  {
    id: "prod-baby-03",
    name: "Baby Printed Cotton Romper",
    slug: "baby-printed-cotton-romper",
    description:
      "Lightweight printed cotton romper for everyday comfort.",
    product_type: "Top Wear",
    category_id: "cat-baby-western",
    price: 2190,
    compare_at_price: 2590,
    currency: "PKR",
    status: "active",
    attributes: {
      fabric: "100% Cotton",
      occasion: "Casual",
      fit: "Relaxed Fit",
    },
    category: {
      id: "cat-baby-western",
      name: "Western Wear",
      slug: "baby-western-wear",
    },
    primary_image: "/samples/baby/sample1.1.png",
    collection_slugs: ["summer-2026", "new-arrivals"],
    available_sizes: [
      { id: "sz-0-6m", label: "0-6M" },
      { id: "sz-6-12m", label: "6-12M" },
      { id: "sz-1-2y", label: "1-2Y" },
    ],
    images: [
      {
        id: "img-baby-03-1",
        url: "/samples/baby/sample1.1.png",
        is_primary: true,
      },
      {
        id: "img-baby-03-2",
        url: "/samples/baby/sample1.2.png",
        is_primary: false,
      },
    ],
  },

  {
    id: "prod-baby-04",
    name: "Baby Linen Summer Set",
    slug: "baby-linen-summer-set",
    description:
      "Breathable linen-blend summer outfit designed for warm days.",
    product_type: "Sets",
    category_id: "cat-baby-western",
    price: 2790,
    compare_at_price: 3190,
    currency: "PKR",
    status: "active",
    attributes: {
      fabric: "Linen Cotton",
      occasion: "Summer",
      fit: "Regular Fit",
    },
    category: {
      id: "cat-baby-western",
      name: "Western Wear",
      slug: "baby-western-wear",
    },
    primary_image: "/samples/baby/sample2.1.png",
    collection_slugs: ["summer-2026"],
    available_sizes: [
      { id: "sz-0-6m", label: "0-6M" },
      { id: "sz-6-12m", label: "6-12M" },
      { id: "sz-1-2y", label: "1-2Y" },
    ],
    images: [
      {
        id: "img-baby-04-1",
        url: "/samples/baby/sample2.1.png",
        is_primary: true,
      },
      {
        id: "img-baby-04-2",
        url: "/samples/baby/sample2.2.png",
        is_primary: false,
      },
    ],
  },

  {
    id: "prod-baby-05",
    name: "Baby Soft Fleece Hoodie",
    slug: "baby-soft-fleece-hoodie",
    description:
      "Warm fleece hoodie made for cozy winter days.",
    product_type: "Outerwear",
    category_id: "cat-baby-western",
    price: 2990,
    compare_at_price: 3490,
    currency: "PKR",
    status: "active",
    attributes: {
      fabric: "Cotton Fleece",
      occasion: "Winter Casual",
      fit: "Relaxed Fit",
    },
    category: {
      id: "cat-baby-western",
      name: "Western Wear",
      slug: "baby-western-wear",
    },
    primary_image: "/samples/baby/sample1.1.png",
    collection_slugs: ["winter-2026"],
    available_sizes: [
      { id: "sz-6-12m", label: "6-12M" },
      { id: "sz-1-2y", label: "1-2Y" },
      { id: "sz-2-3y", label: "2-3Y" },
    ],
    images: [
      {
        id: "img-baby-05-1",
        url: "/samples/baby/sample1.1.png",
        is_primary: true,
      },
      {
        id: "img-baby-05-2",
        url: "/samples/baby/sample1.2.png",
        is_primary: false,
      },
    ],
  },

  {
    id: "prod-baby-06",
    name: "Baby Velvet Waistcoat Set",
    slug: "baby-velvet-waistcoat-set",
    description:
      "Festive waistcoat set with a soft velvet finish.",
    product_type: "Sets",
    category_id: "cat-baby-eastern",
    price: 3490,
    compare_at_price: 3990,
    currency: "PKR",
    status: "active",
    attributes: {
      fabric: "Velvet",
      occasion: "Festive / Wedding",
      fit: "Comfort Fit",
    },
    category: {
      id: "cat-baby-eastern",
      name: "Eastern Wear",
      slug: "baby-eastern-wear",
    },
    primary_image: "/samples/baby/sample2.1.png",
    collection_slugs: ["eid-collection-2026", "winter-2026"],
    available_sizes: [
      { id: "sz-6-12m", label: "6-12M" },
      { id: "sz-1-2y", label: "1-2Y" },
      { id: "sz-2-3y", label: "2-3Y" },
    ],
    images: [
      {
        id: "img-baby-06-1",
        url: "/samples/baby/sample2.1.png",
        is_primary: true,
      },
      {
        id: "img-baby-06-2",
        url: "/samples/baby/sample2.2.png",
        is_primary: false,
      },
    ],
  },

  {
    id: "prod-baby-07",
    name: "Baby Everyday Cotton Shirt",
    slug: "baby-everyday-cotton-shirt",
    description:
      "Breathable cotton shirt for everyday baby wear.",
    product_type: "Top Wear",
    category_id: "cat-baby-western",
    price: 1890,
    compare_at_price: 2190,
    currency: "PKR",
    status: "active",
    attributes: {
      fabric: "Cotton",
      occasion: "Casual",
      fit: "Regular Fit",
    },
    category: {
      id: "cat-baby-western",
      name: "Western Wear",
      slug: "baby-western-wear",
    },
    primary_image: "/samples/baby/sample1.1.png",
    collection_slugs: ["summer-2026", "new-arrivals"],
    available_sizes: [
      { id: "sz-0-6m", label: "0-6M" },
      { id: "sz-6-12m", label: "6-12M" },
      { id: "sz-1-2y", label: "1-2Y" },
    ],
    images: [
      {
        id: "img-baby-07-1",
        url: "/samples/baby/sample1.1.png",
        is_primary: true,
      },
      {
        id: "img-baby-07-2",
        url: "/samples/baby/sample1.2.png",
        is_primary: false,
      },
    ],
  },

  {
    id: "prod-baby-08",
    name: "Baby Cotton Trousers",
    slug: "baby-cotton-trousers",
    description:
      "Soft cotton trousers with an elastic waist for easy movement.",
    product_type: "Bottom Wear",
    category_id: "cat-baby-western",
    price: 1690,
    compare_at_price: 1990,
    currency: "PKR",
    status: "active",
    attributes: {
      fabric: "Cotton",
      occasion: "Casual",
      fit: "Relaxed Fit",
    },
    category: {
      id: "cat-baby-western",
      name: "Western Wear",
      slug: "baby-western-wear",
    },
    primary_image: "/samples/baby/sample2.1.png",
    collection_slugs: ["summer-2026"],
    available_sizes: [
      { id: "sz-0-6m", label: "0-6M" },
      { id: "sz-6-12m", label: "6-12M" },
      { id: "sz-1-2y", label: "1-2Y" },
    ],
    images: [
      {
        id: "img-baby-08-1",
        url: "/samples/baby/sample2.1.png",
        is_primary: true,
      },
      {
        id: "img-baby-08-2",
        url: "/samples/baby/sample2.2.png",
        is_primary: false,
      },
    ],
  },

  {
    id: "prod-baby-09",
    name: "Baby Festive Kurta Pajama",
    slug: "baby-festive-kurta-pajama",
    description:
      "Classic kurta pajama outfit for family gatherings and Eid.",
    product_type: "Sets",
    category_id: "cat-baby-eastern",
    price: 3290,
    compare_at_price: 3790,
    currency: "PKR",
    status: "active",
    attributes: {
      fabric: "Cotton Blend",
      occasion: "Festive / Eid",
      fit: "Comfort Fit",
    },
    category: {
      id: "cat-baby-eastern",
      name: "Eastern Wear",
      slug: "baby-eastern-wear",
    },
    primary_image: "/samples/baby/sample1.1.png",
    collection_slugs: ["eid-collection-2026", "new-arrivals"],
    available_sizes: [
      { id: "sz-0-6m", label: "0-6M" },
      { id: "sz-6-12m", label: "6-12M" },
      { id: "sz-1-2y", label: "1-2Y" },
    ],
    images: [
      {
        id: "img-baby-09-1",
        url: "/samples/baby/sample1.1.png",
        is_primary: true,
      },
      {
        id: "img-baby-09-2",
        url: "/samples/baby/sample1.2.png",
        is_primary: false,
      },
    ],
  },

  {
    id: "prod-baby-10",
    name: "Baby Lightweight Summer Romper",
    slug: "baby-lightweight-summer-romper",
    description:
      "Lightweight romper designed for cool and comfortable summer days.",
    product_type: "Dresses",
    category_id: "cat-baby-western",
    price: 2290,
    compare_at_price: 2690,
    currency: "PKR",
    status: "active",
    attributes: {
      fabric: "Soft Cotton",
      occasion: "Summer",
      fit: "Relaxed Fit",
    },
    category: {
      id: "cat-baby-western",
      name: "Western Wear",
      slug: "baby-western-wear",
    },
    primary_image: "/samples/baby/sample2.1.png",
    collection_slugs: ["summer-2026"],
    available_sizes: [
      { id: "sz-0-6m", label: "0-6M" },
      { id: "sz-6-12m", label: "6-12M" },
      { id: "sz-1-2y", label: "1-2Y" },
    ],
    images: [
      {
        id: "img-baby-10-1",
        url: "/samples/baby/sample2.1.png",
        is_primary: true,
      },
      {
        id: "img-baby-10-2",
        url: "/samples/baby/sample2.2.png",
        is_primary: false,
      },
    ],
  },

  {
    id: "prod-baby-11",
    name: "Baby Winter Knit Sweater",
    slug: "baby-winter-knit-sweater",
    description:
      "Soft knitted sweater designed for chilly winter mornings.",
    product_type: "Outerwear",
    category_id: "cat-baby-western",
    price: 2790,
    compare_at_price: 3290,
    currency: "PKR",
    status: "active",
    attributes: {
      fabric: "Acrylic Wool",
      occasion: "Winter Casual",
      fit: "Regular Fit",
    },
    category: {
      id: "cat-baby-western",
      name: "Western Wear",
      slug: "baby-western-wear",
    },
    primary_image: "/samples/baby/sample1.1.png",
    collection_slugs: ["winter-2026"],
    available_sizes: [
      { id: "sz-6-12m", label: "6-12M" },
      { id: "sz-1-2y", label: "1-2Y" },
      { id: "sz-2-3y", label: "2-3Y" },
    ],
    images: [
      {
        id: "img-baby-11-1",
        url: "/samples/baby/sample1.1.png",
        is_primary: true,
      },
      {
        id: "img-baby-11-2",
        url: "/samples/baby/sample1.2.png",
        is_primary: false,
      },
    ],
  },

  {
    id: "prod-baby-12",
    name: "Baby Classic Festive Outfit",
    slug: "baby-classic-festive-outfit",
    description:
      "Comfortable festive outfit combining traditional style with easy movement.",
    product_type: "Sets",
    category_id: "cat-baby-eastern",
    price: 3590,
    compare_at_price: 4190,
    currency: "PKR",
    status: "active",
    attributes: {
      fabric: "Cotton Silk",
      occasion: "Festive / Wedding",
      fit: "Comfort Fit",
    },
    category: {
      id: "cat-baby-eastern",
      name: "Eastern Wear",
      slug: "baby-eastern-wear",
    },
    primary_image: "/samples/baby/sample2.1.png",
    collection_slugs: ["eid-collection-2026", "new-arrivals"],
    available_sizes: [
      { id: "sz-6-12m", label: "6-12M" },
      { id: "sz-1-2y", label: "1-2Y" },
      { id: "sz-2-3y", label: "2-3Y" },
    ],
    images: [
      {
        id: "img-baby-12-1",
        url: "/samples/baby/sample2.1.png",
        is_primary: true,
      },
      {
        id: "img-baby-12-2",
        url: "/samples/baby/sample2.2.png",
        is_primary: false,
      },
    ],
  },
];


// export const products = [
  
//   {
//     id: "prod-baba-12",
//     name: "Baba Embroidered Arabic Jubba",
//     slug: "baba-embroidered-arabic-jubba",
//     description:
//       "Traditional full-length Arabic style thobe with collar embroidery.",
//     product_type: "Dresses",
//     category_id: "cat-boys-eastern",
//     price: 3890,
//     compare_at_price: 4490,
//     currency: "PKR",
//     status: "active",
//     attributes: {
//       fabric: "Polyester Cotton",
//       occasion: "Religious / Festive",
//       fit: "Loose Fit",
//     },
//     category: {
//       id: "cat-boys-eastern",
//       name: "Eastern Wear",
//       slug: "boys-eastern-wear",
//     },
//     primary_image: "/samples/baba/sample2.1.png",
//     collection_slugs: ["eid-collection-2026"],
//     available_sizes: [
//       { id: "sz-6y", label: "6Y" },
//       { id: "sz-8y", label: "8Y" },
//       { id: "sz-10y", label: "10Y" },
//     ],
//     images: [
//       {
//         id: "img-baba-12-1",
//         url: "/samples/baba/sample2.1.png",
//         is_primary: true,
//       },
//       {
//         id: "img-baba-12-2",
//         url: "/samples/baba/sample2.2.png",
//         is_primary: false,
//       },
//     ],
//   },

//   {
//     id: "prod-baby-01",
//     name: "Baby Soft Cotton Kurta Set",
//     slug: "baby-soft-cotton-kurta-set",
//     description:
//       "Soft and comfortable cotton kurta set designed for little ones.",
//     product_type: "Sets",
//     category_id: "cat-baby-eastern",
//     price: 3190,
//     compare_at_price: 3690,
//     currency: "PKR",
//     status: "active",
//     attributes: {
//       fabric: "Soft Cotton",
//       occasion: "Festive / Casual",
//       fit: "Comfort Fit",
//     },
//     category: {
//       id: "cat-baby-eastern",
//       name: "Eastern Wear",
//       slug: "baby-eastern-wear",
//     },
//     primary_image: "/samples/baby/sample1.1.png",
//     collection_slugs: ["new-arrivals", "eid-collection-2026"],
//     available_sizes: [
//       { id: "sz-0-6m", label: "0-6M" },
//       { id: "sz-6-12m", label: "6-12M" },
//       { id: "sz-1-2y", label: "1-2Y" },
//     ],
//     images: [
//       {
//         id: "img-baby-01-1",
//         url: "/samples/baby/sample1.1.png",
//         is_primary: true,
//       },
//       {
//         id: "img-baby-01-2",
//         url: "/samples/baby/sample1.2.png",
//         is_primary: false,
//       },
//     ],
//   },
// ]