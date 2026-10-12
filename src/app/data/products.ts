export interface ProductItem {
  id: number;
  name: string;
  description: string;
  price: number;
  sku: string;
  stock_quantity: number;
  category_id: number;
  image_url: string;
  status: number;

  // Optional frontend helper fields for UI compatibility
  img?: string;
  category?: string;
  desc?: string;
  oldPrice?: string;
  sizes?: string[];
  specs?: { label: string; value: string }[];
}

export const allProducts: ProductItem[] = [
  {
    id: 1,
    name: "Pujyama Mix Floral Dhoop Sticks",
    description: "Elicit the feeling of Spiritual Calm & Transformation with Pujya Aama Mix Floral Dhoop Sticks. 100% Charcoal-Free, made with a pure natural base and eco-friendly ingredients. Comes with a complimentary ceramic stand.",
    price: 149.0,
    sku: "PUJYA-FLORAL-001",
    stock_quantity: 100,
    category_id: 1,
    image_url: "/assets/products/mix-floral-front.jpg",
    status: 1,
    img: "/assets/products/mix-floral-front.jpg",
    category: "Floral Dhoop",
    desc: "Elicit the feeling of Spiritual Calm & Transformation with Pujya Aama Mix Floral Dhoop Sticks. 100% Charcoal-Free, made with a pure natural base and eco-friendly ingredients. Comes with a complimentary ceramic stand.",
    oldPrice: "₹199.00",
    sizes: ["100g Box (approx. 50 sticks)", "200g Saver Pack", "400g Mega Pack"],
    specs: [
      { label: "Fragrance", value: "Natural Mix Floral Botanical Essence" },
      { label: "Features", value: "100% Charcoal-Free, Natural Base, Eco-Friendly" },
      { label: "Benefits", value: "Elicit the feeling of Spiritual Calm & Transformation" },
      { label: "Package Inclusions", value: "Dhoop Sticks Box + 1 Free Ceramic Stand" },
      { label: "Origin", value: "Made in India" },
      { label: "Marketed By", value: "GuruKripa Trader's, A-223, Sector 43, Noida - 201301" },
    ],
  },
  {
    id: 2,
    name: "Pujyama Gulab (Rose) Dhoop Sticks",
    description: "Gulab Dhoop offers a sweet, refreshing rose fragrance that creates a soothing atmosphere and enhances spiritual practices like meditation and puja. Features relaxing aroma, calming ambience, and long-lasting freshness.",
    price: 149.0,
    sku: "PUJYA-GULAB-002",
    stock_quantity: 80,
    category_id: 2,
    image_url: "/assets/products/gulab-benefits.jpg",
    status: 1,
    img: "/assets/products/gulab-benefits.jpg",
    category: "Rose (Gulab) Dhoop",
    desc: "Gulab Dhoop offers a sweet, refreshing rose fragrance that creates a soothing atmosphere and enhances spiritual practices like meditation and puja. Features relaxing aroma, calming ambience, and long-lasting freshness.",
    oldPrice: "₹199.00",
    sizes: ["100g Box (approx. 50 sticks)", "200g Saver Pack", "400g Mega Pack"],
    specs: [
      { label: "Fragrance", value: "Sweet, Refreshing Rose (Gulab) Extracts" },
      { label: "Mental & Physical Wellness", value: "Relaxing Aroma, Calming Ambience, Fresh Surroundings" },
      { label: "Spiritual Benefits", value: "Enhanced Meditation, Divine Atmosphere, Long-Lasting Aroma" },
      { label: "Features", value: "100% Charcoal-Free, Non-toxic, Bamboo-less" },
      { label: "Inclusions", value: "Sealed Dhoop Pack + Complimentary Ceramic Stand" },
      { label: "Marketed By", value: "GuruKripa Trader's, A-223, Sector 43, Noida - 201301" },
    ],
  },
  {
    id: 3,
    name: "Pujyama Parfum 1M Luxury Dhoop Sticks",
    description: "Premium French perfume-inspired incense dhoop sticks (Smells Like Perfume). Rich aromatic blend designed for an exquisite, luxurious temple fragrance experience in your sacred home.",
    price: 175.0,
    sku: "PUJYA-PARFUM-003",
    stock_quantity: 60,
    category_id: 3,
    image_url: "/assets/products/dhoop-sticks-packet.jpg",
    status: 1,
    img: "/assets/products/dhoop-sticks-packet.jpg",
    category: "Luxury Parfum",
    desc: "Premium French perfume-inspired incense dhoop sticks (Smells Like Perfume). Rich aromatic blend designed for an exquisite, luxurious temple fragrance experience in your sacred home.",
    oldPrice: "₹230.00",
    sizes: ["1 Pack (approx. 40 sticks)", "3 Pack Saver Bundle", "6 Pack Devotee Carton"],
    specs: [
      { label: "Fragrance Profile", value: "Luxury 1M Fine Parfum Blend" },
      { label: "Stick Type", value: "Premium Thick Dhoop Sticks (Bamboo-less)" },
      { label: "Burn Time", value: "Approx. 45-50 Minutes per stick" },
      { label: "Free Accessory", value: "1 Stone / Ceramic Dhoop Stand included in every box" },
      { label: "Origin", value: "Made in India" },
      { label: "Marketed By", value: "GuruKripa Trader's, Noida" },
    ],
  },
  {
    id: 4,
    name: "Pujyama Pure Chandan (Sandalwood) Dhoop Sticks",
    description: "Authentic pure Mysore Sandalwood aroma formulated with 100% charcoal-free natural base. Perfect for daily temple seva, evening aarti, and deep spiritual meditation.",
    price: 160.0,
    sku: "PUJYA-CHANDAN-004",
    stock_quantity: 75,
    category_id: 4,
    image_url: "/assets/products/box-features.jpg",
    status: 1,
    img: "/assets/products/box-features.jpg",
    category: "Sandalwood (Chandan)",
    desc: "Authentic pure Mysore Sandalwood aroma formulated with 100% charcoal-free natural base. Perfect for daily temple seva, evening aarti, and deep spiritual meditation.",
    oldPrice: "₹210.00",
    sizes: ["100g Box (approx. 50 sticks)", "200g Saver Pack", "400g Mega Pack"],
    specs: [
      { label: "Fragrance", value: "Pure Sacred Sandalwood (Chandan) Dust & Essential Oils" },
      { label: "Smoke Quality", value: "Mild, soothing, purified white smoke without soot" },
      { label: "Features", value: "100% Charcoal-Free, Eco-Friendly, Natural Base" },
      { label: "Inclusions", value: "Dhoop Sticks Pack + Ceramic Stand" },
      { label: "Marketed By", value: "GuruKripa Trader's, Noida" },
    ],
  },
  {
    id: 5,
    name: "Pujyama Mogra Blossom Divine Dhoop Sticks",
    description: "Captivating fresh Mogra (Indian Jasmine) floral fragrance that fills your sacred home with divine energy and positive vibrations. Handcrafted with non-toxic botanical extracts.",
    price: 149.0,
    sku: "PUJYA-MOGRA-005",
    stock_quantity: 50,
    category_id: 1,
    image_url: "/assets/products/mix-floral.png",
    status: 1,
    img: "/assets/products/mix-floral.png",
    category: "Floral Dhoop",
    desc: "Captivating fresh Mogra (Indian Jasmine) floral fragrance that fills your sacred home with divine energy and positive vibrations. Handcrafted with non-toxic botanical extracts.",
    oldPrice: "₹199.00",
    sizes: ["100g Box (approx. 50 sticks)", "200g Saver Pack", "400g Mega Pack"],
    specs: [
      { label: "Fragrance", value: "Fresh Mogra & Bela Natural Flower Extracts" },
      { label: "Features", value: "100% Charcoal-Free, Natural Herb Base, Non-irritating" },
      { label: "Usage", value: "Morning Puja, Meditation, Yoga, Evening Aarti" },
      { label: "Inclusions", value: "1 Box + 1 Free Ceramic Dhoop Stand" },
      { label: "Marketed By", value: "GuruKripa Trader's, Noida" },
    ],
  },
  {
    id: 6,
    name: "Pujyama 4-in-1 Divine Dhoop Samriddhi Combo Box",
    description: "The ultimate devotional gift box containing Mix Floral, Pure Gulab, Chandan, and Parfum Dhoop packs along with 2 ceramic stands. Perfect for festive celebrations, housewarming, and daily puja rituals.",
    price: 499.0,
    sku: "PUJYA-COMBO-006",
    stock_quantity: 40,
    category_id: 5,
    image_url: "/assets/products/combo-pack.png",
    status: 1,
    img: "/assets/products/combo-pack.png",
    category: "Combo Packs",
    desc: "The ultimate devotional gift box containing Mix Floral, Pure Gulab, Chandan, and Parfum Dhoop packs along with 2 ceramic stands. Perfect for festive celebrations, housewarming, and daily puja rituals.",
    oldPrice: "₹699.00",
    sizes: ["Assorted 4-Pack (400g Total)", "Festival Gift Set (800g Total)"],
    specs: [
      { label: "Package Content", value: "Mix Floral (100g), Gulab (100g), Chandan (100g), Parfum (100g)" },
      { label: "Accessories", value: "2 Reusable Ceramic Dhoop Stands included" },
      { label: "Features", value: "100% Charcoal Free, Eco-Friendly, Premium Rigid Box" },
      { label: "Ideal For", value: "Diwali, Navratri, Janmashtami gifting, Home temples" },
      { label: "Marketed By", value: "GuruKripa Trader's, Noida" },
    ],
  },
];

export function getProductById(id: number | string | null | undefined): ProductItem {
  if (!id) return allProducts[0];
  const numId = typeof id === "string" ? parseInt(id, 10) : id;
  const found = allProducts.find((p) => p.id === numId);
  return found || allProducts[0];
}

export function getRelatedProducts(currentId: number, limit = 3): ProductItem[] {
  return allProducts.filter((p) => p.id !== currentId).slice(0, limit);
}
