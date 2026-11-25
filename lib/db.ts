import fs from "fs";
import path from "path";
import crypto from "crypto";
import { getDatabase, isMongoConfigured } from "./mongodb";

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  salt: string;
  phone?: string;
  role: "customer" | "admin";
  createdAt: string;
}

export type SafeUser = Omit<User, "passwordHash" | "salt">;

export interface ProductNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  priceNumeric: number;
  image: string;
  category: "perfumes" | "attars" | "bakhoor" | string;
  volume: string;
  isTopSeller: boolean;
  isFeatured: boolean;
  stock: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  description: string;
  notes?: ProductNotes;
}

export interface Category {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  image: string;
  href: string;
  count: number;
  description: string;
}

export interface FeaturedItem {
  id: string;
  image: string;
  title: string;
  alt: string;
}

export interface SiteConfig {
  name: string;
  subtitle: string;
  tagline: string;
  fullName: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  currency: string;
  freeShippingThreshold: number;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
}

export interface CartSummary {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  currency: string;
}

export interface StoreData {
  products: Product[];
  categories: Category[];
  featuredGallery: FeaturedItem[];
  siteConfig: SiteConfig;
  cart: { productId: string; quantity: number }[];
  subscribers: { email: string; subscribedAt: string }[];
  contactMessages: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    message: string;
    createdAt: string;
  }[];
  users?: User[];
}

const STORE_PATH = path.join(process.cwd(), "data", "store.json");
const TMP_PATH = path.join("/tmp", "store.json");

// In-memory cache for serverless fallback
let memoryStore: StoreData | null = null;
let isMongoSeeded = false;

// Safe local file reader (Fallback if MongoDB not connected)
function readLocalStore(): StoreData {
  if (memoryStore) {
    return memoryStore;
  }

  try {
    if (fs.existsSync(TMP_PATH)) {
      const raw = fs.readFileSync(TMP_PATH, "utf-8");
      memoryStore = JSON.parse(raw);
      return memoryStore!;
    }

    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, "utf-8");
      memoryStore = JSON.parse(raw);
      return memoryStore!;
    }

    throw new Error(`store.json not found at ${STORE_PATH}`);
  } catch (err) {
    console.error("Error reading store.json:", err);
    throw err;
  }
}

// Safe local file writer
function writeLocalStore(data: StoreData): void {
  memoryStore = data;
  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2), "utf-8");
    return;
  } catch (err) {
    try {
      fs.writeFileSync(TMP_PATH, JSON.stringify(data, null, 2), "utf-8");
    } catch (tmpErr) {
      console.warn("Serverless disk write fallback to in-memory:", tmpErr);
    }
  }
}

// Auto-seed MongoDB with initial data from store.json if MongoDB collection is empty
async function ensureMongoSeeded(): Promise<void> {
  if (isMongoSeeded) return;
  try {
    const db = await getDatabase();
    if (!db) return;

    const productsColl = db.collection("products");
    const count = await productsColl.countDocuments();

    if (count === 0) {
      const local = readLocalStore();
      console.log("🌱 First-time seed: Migrating store.json into MongoDB Atlas...");

      if (local.products.length > 0) {
        await productsColl.insertMany(local.products.map((p) => ({ ...p })));
      }

      const categoriesColl = db.collection("categories");
      if (local.categories.length > 0) {
        await categoriesColl.insertMany(local.categories.map((c) => ({ ...c })));
      }

      const featuredColl = db.collection("featuredGallery");
      if (local.featuredGallery.length > 0) {
        await featuredColl.insertMany(local.featuredGallery.map((f) => ({ ...f })));
      }

      const configColl = db.collection("siteConfig");
      await configColl.updateOne(
        { configId: "main" },
        { $set: { configId: "main", ...local.siteConfig } },
        { upsert: true }
      );

      console.log("✅ MongoDB successfully seeded with Miya Ji Oud catalog data!");
    }
    isMongoSeeded = true;
  } catch (err) {
    console.warn("MongoDB auto-seed check skipped or failed:", err);
  }
}

// Check database connection status for health check
export async function getDatabaseStatus(): Promise<{
  provider: "mongodb" | "local_json";
  isConfigured: boolean;
  connected: boolean;
  counts: {
    products: number;
    categories: number;
    subscribers: number;
    cartItems: number;
  };
}> {
  const isConfigured = isMongoConfigured();
  if (isConfigured) {
    try {
      const db = await getDatabase();
      if (db) {
        await ensureMongoSeeded();
        const pCount = await db.collection("products").countDocuments();
        const cCount = await db.collection("categories").countDocuments();
        const sCount = await db.collection("subscribers").countDocuments();
        const cartCount = await db.collection("cart").countDocuments();

        return {
          provider: "mongodb",
          isConfigured: true,
          connected: true,
          counts: {
            products: pCount,
            categories: cCount,
            subscribers: sCount,
            cartItems: cartCount,
          },
        };
      }
    } catch (err) {
      console.warn("MongoDB status check failed:", err);
    }
  }

  const local = readLocalStore();
  return {
    provider: "local_json",
    isConfigured,
    connected: true,
    counts: {
      products: local.products.length,
      categories: local.categories.length,
      subscribers: (local.subscribers || []).length,
      cartItems: (local.cart || []).length,
    },
  };
}

// ================= PRODUCT SERVICES =================
export async function getProducts(options?: {
  type?: "top-sellers" | "featured" | "all";
  category?: string;
  search?: string;
  limit?: number;
}): Promise<Product[]> {
  try {
    const db = await getDatabase();
    if (db) {
      await ensureMongoSeeded();
      const filter: any = {};

      if (options?.type === "top-sellers") {
        filter.isTopSeller = true;
      } else if (options?.type === "featured") {
        filter.isFeatured = true;
      }

      if (options?.category) {
        filter.category = { $regex: new RegExp(`^${options.category}$`, "i") };
      }

      if (options?.search) {
        const regex = new RegExp(options.search, "i");
        filter.$or = [{ name: regex }, { description: regex }, { subtitle: regex }];
      }

      let cursor = db.collection<Product>("products").find(filter, { projection: { _id: 0 } });
      if (options?.limit && options.limit > 0) {
        cursor = cursor.limit(options.limit);
      }

      const products = await cursor.toArray();
      if (products.length > 0 || options?.search || options?.category) {
        return products;
      }
    }
  } catch (err) {
    console.warn("MongoDB getProducts failed, falling back to local:", err);
  }

  // Local fallback
  const store = readLocalStore();
  let list = [...store.products];

  if (options?.type === "top-sellers") {
    list = list.filter((p) => p.isTopSeller);
  } else if (options?.type === "featured") {
    list = list.filter((p) => p.isFeatured);
  }

  if (options?.category) {
    const cat = options.category.toLowerCase();
    list = list.filter((p) => p.category.toLowerCase() === cat);
  }

  if (options?.search) {
    const q = options.search.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q)
    );
  }

  if (options?.limit && options.limit > 0) {
    list = list.slice(0, options.limit);
  }

  return list;
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const db = await getDatabase();
    if (db) {
      await ensureMongoSeeded();
      const product = await db
        .collection<Product>("products")
        .findOne({ id }, { projection: { _id: 0 } });
      if (product) return product;
    }
  } catch (err) {
    console.warn("MongoDB getProductById failed, using local:", err);
  }

  const store = readLocalStore();
  return store.products.find((p) => p.id === id) || null;
}

export async function addProduct(
  productData: Omit<Product, "id"> & { id?: string }
): Promise<Product> {
  const id =
    productData.id ||
    productData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const newProduct: Product = { ...productData, id };

  try {
    const db = await getDatabase();
    if (db) {
      await ensureMongoSeeded();
      await db
        .collection("products")
        .updateOne({ id }, { $set: newProduct }, { upsert: true });
      return newProduct;
    }
  } catch (err) {
    console.warn("MongoDB addProduct failed, saving to local store:", err);
  }

  const store = readLocalStore();
  const existingIndex = store.products.findIndex((p) => p.id === id);
  if (existingIndex >= 0) {
    store.products[existingIndex] = newProduct;
  } else {
    store.products.push(newProduct);
  }
  writeLocalStore(store);
  return newProduct;
}

// ================= CATEGORY SERVICES =================
export async function getCategories(): Promise<Category[]> {
  try {
    const db = await getDatabase();
    if (db) {
      await ensureMongoSeeded();
      const cats = await db
        .collection<Category>("categories")
        .find({}, { projection: { _id: 0 } })
        .toArray();
      if (cats.length > 0) return cats;
    }
  } catch (err) {
    console.warn("MongoDB getCategories failed, using local:", err);
  }

  const store = readLocalStore();
  return store.categories;
}

// ================= BAKHOOR SERVICES =================
export async function getBakhoorProducts(): Promise<Product[]> {
  try {
    const db = await getDatabase();
    if (db) {
      await ensureMongoSeeded();
      const items = await db
        .collection<Product>("products")
        .find(
          { category: { $regex: /^bakhoor$/i } },
          { projection: { _id: 0 } }
        )
        .toArray();
      if (items.length > 0) return items;
    }
  } catch (err) {
    console.warn("MongoDB getBakhoorProducts failed, using local:", err);
  }

  const store = readLocalStore();
  return store.products.filter((p) => p.category === "bakhoor");
}

// ================= FEATURED GALLERY SERVICES =================
export async function getFeaturedGallery(): Promise<FeaturedItem[]> {
  try {
    const db = await getDatabase();
    if (db) {
      await ensureMongoSeeded();
      const gallery = await db
        .collection<FeaturedItem>("featuredGallery")
        .find({}, { projection: { _id: 0 } })
        .toArray();
      if (gallery.length > 0) return gallery;
    }
  } catch (err) {
    console.warn("MongoDB getFeaturedGallery failed, using local:", err);
  }

  const store = readLocalStore();
  return store.featuredGallery;
}

// ================= SITE CONFIG SERVICES =================
export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const db = await getDatabase();
    if (db) {
      await ensureMongoSeeded();
      const conf = await db
        .collection<SiteConfig & { configId: string }>("siteConfig")
        .findOne({ configId: "main" }, { projection: { _id: 0, configId: 0 } });
      if (conf) return conf as SiteConfig;
    }
  } catch (err) {
    console.warn("MongoDB getSiteConfig failed, using local:", err);
  }

  const store = readLocalStore();
  return store.siteConfig;
}

export async function updateSiteConfig(updates: Partial<SiteConfig>): Promise<SiteConfig> {
  try {
    const db = await getDatabase();
    if (db) {
      await ensureMongoSeeded();
      await db
        .collection("siteConfig")
        .updateOne({ configId: "main" }, { $set: updates }, { upsert: true });
      return getSiteConfig();
    }
  } catch (err) {
    console.warn("MongoDB updateSiteConfig failed, using local:", err);
  }

  const store = readLocalStore();
  store.siteConfig = { ...store.siteConfig, ...updates };
  writeLocalStore(store);
  return store.siteConfig;
}

// ================= CART SERVICES =================
export async function getCart(): Promise<CartSummary> {
  let cartRaw: { productId: string; quantity: number }[] = [];
  let allProducts: Product[] = [];
  let config: SiteConfig;

  try {
    const db = await getDatabase();
    if (db) {
      await ensureMongoSeeded();
      cartRaw = await db
        .collection<{ productId: string; quantity: number }>("cart")
        .find({}, { projection: { _id: 0 } })
        .toArray();
      allProducts = await db
        .collection<Product>("products")
        .find({}, { projection: { _id: 0 } })
        .toArray();
      config = await getSiteConfig();
    } else {
      const store = readLocalStore();
      cartRaw = store.cart || [];
      allProducts = store.products;
      config = store.siteConfig;
    }
  } catch (err) {
    console.warn("MongoDB getCart failed, using local:", err);
    const store = readLocalStore();
    cartRaw = store.cart || [];
    allProducts = store.products;
    config = store.siteConfig;
  }

  const items: CartItem[] = [];
  let subtotal = 0;

  for (const entry of cartRaw) {
    const product = allProducts.find((p) => p.id === entry.productId);
    if (product) {
      items.push({
        productId: entry.productId,
        product,
        quantity: entry.quantity,
      });
      subtotal += product.priceNumeric * entry.quantity;
    }
  }

  const freeShipping = config.freeShippingThreshold || 4999;
  const shipping = subtotal >= freeShipping || items.length === 0 ? 0 : 350;
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const total = subtotal + shipping + tax;
  const itemCount = items.reduce((acc, curr) => acc + curr.quantity, 0);

  return {
    items,
    itemCount,
    subtotal,
    shipping,
    tax,
    total,
    currency: config.currency || "₹",
  };
}

export async function addToCart(productId: string, quantity = 1): Promise<CartSummary> {
  try {
    const db = await getDatabase();
    if (db) {
      await ensureMongoSeeded();
      await db.collection("cart").updateOne(
        { productId },
        { $inc: { quantity } },
        { upsert: true }
      );
      return getCart();
    }
  } catch (err) {
    console.warn("MongoDB addToCart failed, using local store:", err);
  }

  const store = readLocalStore();
  store.cart = store.cart || [];
  const existing = store.cart.find((c) => c.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    store.cart.push({ productId, quantity });
  }
  writeLocalStore(store);
  return getCart();
}

export async function updateCartItem(productId: string, quantity: number): Promise<CartSummary> {
  try {
    const db = await getDatabase();
    if (db) {
      await ensureMongoSeeded();
      if (quantity <= 0) {
        await db.collection("cart").deleteOne({ productId });
      } else {
        await db.collection("cart").updateOne(
          { productId },
          { $set: { quantity } },
          { upsert: true }
        );
      }
      return getCart();
    }
  } catch (err) {
    console.warn("MongoDB updateCartItem failed, using local store:", err);
  }

  const store = readLocalStore();
  store.cart = store.cart || [];
  if (quantity <= 0) {
    store.cart = store.cart.filter((c) => c.productId !== productId);
  } else {
    const item = store.cart.find((c) => c.productId === productId);
    if (item) {
      item.quantity = quantity;
    } else {
      store.cart.push({ productId, quantity });
    }
  }
  writeLocalStore(store);
  return getCart();
}

export async function removeFromCart(productId: string): Promise<CartSummary> {
  try {
    const db = await getDatabase();
    if (db) {
      await ensureMongoSeeded();
      await db.collection("cart").deleteOne({ productId });
      return getCart();
    }
  } catch (err) {
    console.warn("MongoDB removeFromCart failed, using local store:", err);
  }

  const store = readLocalStore();
  store.cart = (store.cart || []).filter((c) => c.productId !== productId);
  writeLocalStore(store);
  return getCart();
}

export async function clearCart(): Promise<CartSummary> {
  try {
    const db = await getDatabase();
    if (db) {
      await ensureMongoSeeded();
      await db.collection("cart").deleteMany({});
      return getCart();
    }
  } catch (err) {
    console.warn("MongoDB clearCart failed, using local store:", err);
  }

  const store = readLocalStore();
  store.cart = [];
  writeLocalStore(store);
  return getCart();
}

// ================= NEWSLETTER SERVICES =================
export async function addSubscriber(
  email: string
): Promise<{ success: boolean; message: string; alreadySubscribed?: boolean }> {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return { success: false, message: "Please provide a valid email address." };
  }

  try {
    const db = await getDatabase();
    if (db) {
      await ensureMongoSeeded();
      const normalizedEmail = email.toLowerCase().trim();
      const existing = await db
        .collection("subscribers")
        .findOne({ email: normalizedEmail });

      if (existing) {
        return {
          success: true,
          alreadySubscribed: true,
          message: "You are already subscribed to the Royal Newsletter.",
        };
      }

      await db.collection("subscribers").insertOne({
        email: normalizedEmail,
        subscribedAt: new Date().toISOString(),
      });

      return {
        success: true,
        message: "Thank you for subscribing to the Miya Ji Oud Royal Circle.",
      };
    }
  } catch (err) {
    console.warn("MongoDB addSubscriber failed, using local store:", err);
  }

  const store = readLocalStore();
  store.subscribers = store.subscribers || [];
  const exists = store.subscribers.some(
    (s) => s.email.toLowerCase() === email.toLowerCase().trim()
  );
  if (exists) {
    return {
      success: true,
      alreadySubscribed: true,
      message: "You are already subscribed to the Royal Newsletter.",
    };
  }

  store.subscribers.push({
    email: email.trim(),
    subscribedAt: new Date().toISOString(),
  });
  writeLocalStore(store);

  return {
    success: true,
    message: "Thank you for subscribing to the Miya Ji Oud Royal Circle.",
  };
}

export async function getSubscribers(): Promise<
  { email: string; subscribedAt: string }[]
> {
  try {
    const db = await getDatabase();
    if (db) {
      await ensureMongoSeeded();
      return await db
        .collection<{ email: string; subscribedAt: string }>("subscribers")
        .find({}, { projection: { _id: 0 } })
        .toArray();
    }
  } catch (err) {
    console.warn("MongoDB getSubscribers failed, using local:", err);
  }

  const store = readLocalStore();
  return store.subscribers || [];
}

// ================= CONTACT MESSAGES =================
export async function addContactMessage(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}): Promise<{ success: boolean; id: string }> {
  const entry = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    name: data.name,
    email: data.email,
    phone: data.phone,
    message: data.message,
    createdAt: new Date().toISOString(),
  };

  try {
    const db = await getDatabase();
    if (db) {
      await ensureMongoSeeded();
      await db.collection("contactMessages").insertOne(entry);
      return { success: true, id: entry.id };
    }
  } catch (err) {
    console.warn("MongoDB addContactMessage failed, using local store:", err);
  }

  const store = readLocalStore();
  store.contactMessages = store.contactMessages || [];
  store.contactMessages.push(entry);
  writeLocalStore(store);
  return { success: true, id: entry.id };
}

export async function getContactMessages(): Promise<
  { id: string; name: string; email: string; phone?: string; message: string; createdAt: string }[]
> {
  try {
    const db = await getDatabase();
    if (db) {
      await ensureMongoSeeded();
      return await db
        .collection<{ id: string; name: string; email: string; phone?: string; message: string; createdAt: string }>(
          "contactMessages"
        )
        .find({}, { projection: { _id: 0 } })
        .toArray();
    }
  } catch (err) {
    console.warn("MongoDB getContactMessages failed, using local:", err);
  }

  const store = readLocalStore();
  return store.contactMessages || [];
}

// ================= USER AUTHENTICATION SERVICES =================
function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const normalizedEmail = email.toLowerCase().trim();

  try {
    const db = await getDatabase();
    if (db) {
      await ensureMongoSeeded();
      const user = await db
        .collection<User>("users")
        .findOne({ email: normalizedEmail }, { projection: { _id: 0 } });
      if (user) return user;
    }
  } catch (err) {
    console.warn("MongoDB findUserByEmail failed, using local:", err);
  }

  const store = readLocalStore();
  return (store.users || []).find((u) => u.email.toLowerCase() === normalizedEmail) || null;
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  phone?: string;
}): Promise<{ success: boolean; user?: SafeUser; error?: string }> {
  const normalizedEmail = data.email.toLowerCase().trim();
  const trimmedName = data.name.trim();

  if (!trimmedName || trimmedName.length < 2) {
    return { success: false, error: "Please enter your full name (at least 2 characters)." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!normalizedEmail || !emailRegex.test(normalizedEmail)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  if (!data.password || data.password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters long." };
  }

  const existing = await findUserByEmail(normalizedEmail);
  if (existing) {
    return { success: false, error: "An account with this email already exists. Please log in." };
  }

  const salt = crypto.randomBytes(16).toString("hex");
  const passwordHash = hashPassword(data.password, salt);
  const newUser: User = {
    id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: trimmedName,
    email: normalizedEmail,
    phone: data.phone?.trim() || "",
    passwordHash,
    salt,
    role: "customer",
    createdAt: new Date().toISOString(),
  };

  try {
    const db = await getDatabase();
    if (db) {
      await ensureMongoSeeded();
      await db.collection("users").insertOne(newUser);
      const { passwordHash: _, salt: __, ...safeUser } = newUser;
      return { success: true, user: safeUser };
    }
  } catch (err) {
    console.warn("MongoDB createUser failed, writing to local store:", err);
  }

  const store = readLocalStore();
  store.users = store.users || [];
  store.users.push(newUser);
  writeLocalStore(store);

  const { passwordHash: _, salt: __, ...safeUser } = newUser;
  return { success: true, user: safeUser };
}

export async function verifyUser(
  email: string,
  password: string
): Promise<{ success: boolean; user?: SafeUser; error?: string }> {
  const normalizedEmail = email.toLowerCase().trim();
  if (!normalizedEmail || !password) {
    return { success: false, error: "Email and password are required." };
  }

  const user = await findUserByEmail(normalizedEmail);
  if (!user) {
    return { success: false, error: "No account found with this email. Please check or sign up." };
  }

  const computedHash = hashPassword(password, user.salt);
  if (computedHash !== user.passwordHash) {
    return { success: false, error: "Incorrect password. Please try again." };
  }

  const { passwordHash: _, salt: __, ...safeUser } = user;
  return { success: true, user: safeUser };
}

export async function getUserById(id: string): Promise<SafeUser | null> {
  try {
    const db = await getDatabase();
    if (db) {
      await ensureMongoSeeded();
      const user = await db
        .collection<User>("users")
        .findOne({ id }, { projection: { _id: 0, passwordHash: 0, salt: 0 } });
      if (user) return user;
    }
  } catch (err) {
    console.warn("MongoDB getUserById failed, using local:", err);
  }

  const store = readLocalStore();
  const user = (store.users || []).find((u) => u.id === id);
  if (!user) return null;
  const { passwordHash: _, salt: __, ...safeUser } = user;
  return safeUser;
}
