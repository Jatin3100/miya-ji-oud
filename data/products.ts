export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  category?: string;
  volume?: string;
}

export const SITE_CONFIG = {
  name: "MIYA JI OUD",
  subtitle: "",
  tagline: "Luxury Perfumes & Attars",
  fullName: "Miya Ji Oud | Luxury Perfumes & Attars",
  description:
    "Buy luxury perfumes from our boutique stores. Inspired by the scent of natural flowers and rare natural resources.",
};

export const TOP_SELLERS: Product[] = [
  {
    id: "jannat-e-zuhur",
    name: "Jannat E Zuhur (100ml)",
    price: "₹ 6,290.00 /-",
    image: "/assets/Jannat-e-zuhur-1.jpg",
    volume: "100ml",
  },
  {
    id: "voice-of-the-soul",
    name: "Voice of the soul (100ml)",
    price: "₹ 6,290.00 /-",
    image: "/assets/380106563_733516658642350_5647525499345431176_n.png",
    volume: "100ml",
  },
  {
    id: "nadeem",
    name: "NADEEM (100ml)",
    price: "₹ 6,290.00 /-",
    image: "/assets/image3.jpg",
    volume: "100ml",
  },
  {
    id: "dakhoon",
    name: "Dakhoon (100ml)",
    price: "₹ 5,990.00 /-",
    image: "/assets/Dakhoon.jpg",
    volume: "100ml",
  },
  {
    id: "mukhtalif",
    name: "MUKHTALIF (100ml)",
    price: "₹ 6,290.00 /-",
    image: "/assets/image2.jpg",
    volume: "100ml",
  },
  {
    id: "pure-oud",
    name: "Pure Oud",
    price: "₹ 6,290.00 /-",
    image: "/assets/433C27EE-DD11-4D88-B8E0-595214854924.jpg",
  },
];

export const CATEGORIES = [
  {
    id: "perfumes",
    title: "PERFUMES",
    image: "/assets/Snapinsta.app_363778411_18053786449452294_2148762455076118183_n_1080.jpg",
    href: "/collections/perfumes",
  },
  {
    id: "attars",
    title: "ATTARS",
    image: "/assets/C1_1.png",
    href: "/collections/attars",
  },
];

export const BAKHOOR_PRODUCT: Product = {
  id: "bakhoor-set",
  name: "Bakhoor Set (Gold Brass) (50 gms)",
  price: "₹ 4,990.00 /-",
  image: "/assets/WhatsApp-Image-2021-01-18-at-12.25.35-PM-1.jpg",
};

export const FEATURED_GALLERY = [
  {
    id: "gallery-1",
    image: "/assets/Snapinsta.app_373297080_18058625173452294_7210085031108326647_n_1080.jpg",
    alt: "Oud Arabia Perfume Bottle in Sunlight",
  },
  {
    id: "gallery-2",
    image: "/assets/Snapinsta.app_361915919_18052701916452294_5908369295422948022_n_1080_1.jpg",
    alt: "Luxury Fragrance Duo Display",
  },
];
