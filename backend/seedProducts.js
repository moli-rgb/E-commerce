const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

// Sample product data
const products = [
  {
    title: "Wireless Bluetooth Headphones",
    description: "Premium noise-cancelling headphones with 30-hour battery life and crystal-clear sound quality.",
    price: 129.99,
    stockQuantity: 45,
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"],
    variations: [{ color: "Black" }, { color: "Silver" }],
  },
  {
    title: "Smart Watch Pro",
    description: "Advanced fitness tracking, heart rate monitoring, and smartphone notifications on your wrist.",
    price: 299.99,
    stockQuantity: 30,
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"],
    variations: [{ color: "Black" }, { color: "Rose Gold" }],
  },
  {
    title: "Laptop Backpack",
    description: "Durable water-resistant backpack with padded laptop compartment and multiple pockets.",
    price: 49.99,
    stockQuantity: 60,
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"],
    variations: [{ color: "Black" }, { color: "Gray" }, { color: "Navy" }],
  },
  {
    title: "Mechanical Keyboard RGB",
    description: "Gaming keyboard with customizable RGB lighting and tactile mechanical switches.",
    price: 89.99,
    stockQuantity: 25,
    images: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500"],
    variations: [{ color: "Black" }],
  },
  {
    title: "Wireless Mouse",
    description: "Ergonomic wireless mouse with precision tracking and long battery life.",
    price: 34.99,
    stockQuantity: 80,
    images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500"],
    variations: [{ color: "Black" }, { color: "White" }],
  },
  {
    title: "USB-C Hub Adapter",
    description: "7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and power delivery.",
    price: 39.99,
    stockQuantity: 50,
    images: ["https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500"],
  },
  {
    title: "Portable SSD 1TB",
    description: "Ultra-fast external SSD with USB-C connectivity and shock-resistant design.",
    price: 149.99,
    stockQuantity: 35,
    images: ["https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500"],
  },
  {
    title: "Webcam 1080p HD",
    description: "Full HD webcam with auto-focus and built-in noise-cancelling microphone.",
    price: 69.99,
    stockQuantity: 40,
    images: ["https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=500"],
  },
  {
    title: "Phone Stand Adjustable",
    description: "Aluminum phone stand with adjustable angle for desk or bedside use.",
    price: 24.99,
    stockQuantity: 100,
    images: ["https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500"],
    variations: [{ color: "Silver" }, { color: "Black" }],
  },
  {
    title: "LED Desk Lamp",
    description: "Modern LED desk lamp with touch control and adjustable brightness levels.",
    price: 44.99,
    stockQuantity: 55,
    images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500"],
    variations: [{ color: "White" }, { color: "Black" }],
  },
  {
    title: "Wireless Charger Pad",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
    price: 29.99,
    stockQuantity: 70,
    images: ["https://images.unsplash.com/photo-1591290619762-c588f7e8e86f?w=500"],
  },
  {
    title: "Bluetooth Speaker",
    description: "Portable waterproof speaker with 360° sound and 12-hour battery life.",
    price: 79.99,
    stockQuantity: 45,
    images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500"],
    variations: [{ color: "Black" }, { color: "Blue" }, { color: "Red" }],
  },
  {
    title: "Gaming Mouse Pad XXL",
    description: "Extra-large gaming mouse pad with smooth surface and anti-slip rubber base.",
    price: 19.99,
    stockQuantity: 90,
    images: ["https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500"],
  },
  {
    title: "Monitor Stand Riser",
    description: "Wooden monitor stand with storage space for keyboard and office supplies.",
    price: 34.99,
    stockQuantity: 40,
    images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500"],
    variations: [{ material: "Bamboo" }, { material: "Walnut" }],
  },
  {
    title: "Cable Management Box",
    description: "Organize and hide messy cables with this sleek cable management solution.",
    price: 22.99,
    stockQuantity: 65,
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500"],
  },
  {
    title: "Laptop Cooling Pad",
    description: "Laptop cooling pad with dual fans and adjustable height for better airflow.",
    price: 39.99,
    stockQuantity: 50,
    images: ["https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500"],
  },
  {
    title: "Screen Protector Set",
    description: "Tempered glass screen protector with installation kit, pack of 3.",
    price: 14.99,
    stockQuantity: 120,
    images: ["https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500"],
  },
  {
    title: "Ergonomic Wrist Rest",
    description: "Memory foam wrist rest for keyboard and mouse to reduce strain.",
    price: 18.99,
    stockQuantity: 75,
    images: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500"],
  },
  {
    title: "HDMI Cable 4K",
    description: "High-speed HDMI 2.1 cable supporting 4K@120Hz and 8K@60Hz.",
    price: 16.99,
    stockQuantity: 100,
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500"],
  },
  {
    title: "Phone Case Premium",
    description: "Slim protective case with military-grade drop protection and wireless charging support.",
    price: 24.99,
    stockQuantity: 85,
    images: ["https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500"],
    variations: [{ color: "Clear" }, { color: "Black" }, { color: "Blue" }],
  },
  {
    title: "Tablet Stand Foldable",
    description: "Portable foldable stand for tablets and e-readers with multiple viewing angles.",
    price: 19.99,
    stockQuantity: 60,
    images: ["https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=500"],
  },
  {
    title: "Power Bank 20000mAh",
    description: "High-capacity portable charger with fast charging and dual USB ports.",
    price: 49.99,
    stockQuantity: 55,
    images: ["https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500"],
  },
  {
    title: "Microphone USB Condenser",
    description: "Professional USB microphone for podcasting, streaming, and voice recording.",
    price: 89.99,
    stockQuantity: 30,
    images: ["https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500"],
  },
  {
    title: "Ring Light 10 inch",
    description: "LED ring light with tripod stand for photography and video calls.",
    price: 39.99,
    stockQuantity: 45,
    images: ["https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500"],
  },
  {
    title: "Graphics Tablet",
    description: "Digital drawing tablet with pressure-sensitive pen for artists and designers.",
    price: 199.99,
    stockQuantity: 20,
    images: ["https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=500"],
  },
  {
    title: "Laptop Sleeve 15 inch",
    description: "Padded laptop sleeve with extra pocket for accessories and documents.",
    price: 29.99,
    stockQuantity: 70,
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"],
    variations: [{ color: "Gray" }, { color: "Black" }, { color: "Navy" }],
  },
  {
    title: "Smart Plug WiFi",
    description: "WiFi-enabled smart plug with voice control and scheduling features.",
    price: 24.99,
    stockQuantity: 80,
    images: ["https://images.unsplash.com/photo-1558089687-e5c0c9e0f8c7?w=500"],
  },
  {
    title: "Desk Organizer Set",
    description: "5-piece desk organizer set with pen holder, tray, and storage compartments.",
    price: 34.99,
    stockQuantity: 50,
    images: ["https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=500"],
    variations: [{ material: "Wood" }, { material: "Metal" }],
  },
  {
    title: "Blue Light Glasses",
    description: "Computer glasses that block blue light to reduce eye strain and improve sleep.",
    price: 29.99,
    stockQuantity: 65,
    images: ["https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500"],
  },
  {
    title: "Noise Cancelling Earbuds",
    description: "True wireless earbuds with active noise cancellation and touch controls.",
    price: 149.99,
    stockQuantity: 40,
    images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500"],
    variations: [{ color: "White" }, { color: "Black" }],
  },
  {
    title: "Smart Thermostat",
    description: "WiFi smart thermostat compatible with Alexa and Google Home for energy savings.",
    price: 129.99,
    stockQuantity: 40,
    images: ["https://images.unsplash.com/photo-1565514020125-027532f2f700?w=500"],
  },
  {
    title: "Robot Vacuum Cleaner",
    description: "Smart robot vacuum with mapping technology and app control for automated cleaning.",
    price: 249.99,
    stockQuantity: 25,
    images: ["https://images.unsplash.com/photo-1563456020-569d47225e3f?w=500"],
  },
  {
    title: "Air Purifier",
    description: "HEPA air purifier for large rooms, removes 99.97% of dust and allergens.",
    price: 89.99,
    stockQuantity: 35,
    images: ["https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=500"],
  },
  {
    title: "Electric Toothbrush",
    description: "Sonic electric toothbrush with 3 modes and 2-minute timer for dental care.",
    price: 49.99,
    stockQuantity: 60,
    images: ["https://images.unsplash.com/photo-1559676169-727906524140?w=500"],
    variations: [{ color: "White" }, { color: "Black" }],
  },
  {
    title: "Fitness Tracker Band",
    description: "Slim fitness tracker with step counting, sleep monitoring, and 7-day battery.",
    price: 29.99,
    stockQuantity: 100,
    images: ["https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500"],
    variations: [{ color: "Black" }, { color: "Blue" }, { color: "Purple" }],
  },
  {
    title: "Instant Camera",
    description: "Analog instant camera with built-in flash and selfie mirror.",
    price: 69.99,
    stockQuantity: 30,
    images: ["https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500"],
    variations: [{ color: "Blue" }, { color: "Pink" }, { color: "White" }],
  },
];

// Connect to MongoDB and seed products
const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce');
    console.log('MongoDB Connected');

    // Drop the collection to avoid duplicate key errors
    await mongoose.connection.db.dropCollection('products');
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    const createdProducts = await Product.insertMany(products);
    console.log(`✅ Successfully added ${createdProducts.length} products!`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
