const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

// Read URI from .env or .env.local
const envPath = fs.existsSync(path.join(__dirname, '..', '.env'))
  ? path.join(__dirname, '..', '.env')
  : path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const lines = envContent.split(/\r?\n/);
let uri = '';
for (const line of lines) {
  const trimmed = line.trim();
  if (trimmed.startsWith('#')) continue;
  if (trimmed.startsWith('MONGODB_URI=')) {
    uri = trimmed.substring('MONGODB_URI='.length).trim().replace(/^["']|["']$/g, '');
    break;
  }
}

if (!uri.includes('retryWrites')) {
  uri = uri.replace(/\/?$/, '/?retryWrites=true&w=majority');
}

console.log('Connecting to MongoDB Atlas...');
const storePath = path.join(__dirname, '..', 'data', 'store.json');
const storeData = JSON.parse(fs.readFileSync(storePath, 'utf-8'));

async function seed() {
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 15000 });
  await client.connect();
  console.log('✅ Connected to MongoDB Atlas successfully!');
  
  const db = client.db('miya_ji_oud');
  
  // 1. Products
  const productsColl = db.collection('products');
  await productsColl.deleteMany({});
  await productsColl.insertMany(storeData.products);
  console.log(`✅ Seeded ${storeData.products.length} products into 'miya_ji_oud.products'`);

  // 2. Categories
  const categoriesColl = db.collection('categories');
  await categoriesColl.deleteMany({});
  await categoriesColl.insertMany(storeData.categories);
  console.log(`✅ Seeded ${storeData.categories.length} categories into 'miya_ji_oud.categories'`);

  // 3. Featured Gallery
  const featuredColl = db.collection('featuredGallery');
  await featuredColl.deleteMany({});
  await featuredColl.insertMany(storeData.featuredGallery);
  console.log(`✅ Seeded ${storeData.featuredGallery.length} featured gallery items into 'miya_ji_oud.featuredGallery'`);

  // 4. Site Config
  const configColl = db.collection('siteConfig');
  await configColl.updateOne({ configId: 'main' }, { $set: { configId: 'main', ...storeData.siteConfig } }, { upsert: true });
  console.log(`✅ Seeded site configuration into 'miya_ji_oud.siteConfig'`);

  // 5. Cart
  const cartColl = db.collection('cart');
  await cartColl.deleteMany({});
  if (storeData.cart && storeData.cart.length > 0) {
    await cartColl.insertMany(storeData.cart);
  }
  console.log(`✅ Seeded cart collection into 'miya_ji_oud.cart'`);

  // 6. Subscribers
  const subColl = db.collection('subscribers');
  await subColl.deleteMany({});
  if (storeData.subscribers && storeData.subscribers.length > 0) {
    await subColl.insertMany(storeData.subscribers);
  }
  console.log(`✅ Seeded ${storeData.subscribers.length} subscribers into 'miya_ji_oud.subscribers'`);

  // 7. Contact Messages
  const contactColl = db.collection('contactMessages');
  await contactColl.deleteMany({});
  if (storeData.contactMessages && storeData.contactMessages.length > 0) {
    await contactColl.insertMany(storeData.contactMessages);
  }
  console.log(`✅ Seeded ${storeData.contactMessages.length} contact messages into 'miya_ji_oud.contactMessages'`);

  // List all databases now
  const dbs = await client.db().admin().listDatabases();
  console.log('\n📊 Databases in your Cluster now:');
  dbs.databases.forEach(d => console.log(`   - ${d.name} (${(d.sizeOnDisk / 1024 / 1024).toFixed(2)} MB)`));

  await client.close();
  console.log('\n🎉 ALL DATA HAS BEEN SUCCESSFULLY SEEDED INTO MONGODB ATLAS!');
}

seed().catch(err => {
  console.error('❌ Error during seeding:', err);
  process.exit(1);
});
