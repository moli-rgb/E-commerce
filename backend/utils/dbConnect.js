const mongoose = require('mongoose');

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  // Check if we have a connection; if so, use it
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      return;
    }
    await mongoose.disconnect();
  }

  const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';

  const db = await mongoose.connect(mongoURI, {
    serverSelectionTimeoutMS: 5000,
  });

  connection.isConnected = db.connections[0].readyState;
  console.log('✅ MongoDB Connected via dbConnect');
}

module.exports = dbConnect;
