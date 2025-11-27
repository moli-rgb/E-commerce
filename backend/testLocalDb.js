const mongoose = require('mongoose');

const connectLocalDB = async () => {
  try {
    console.log('Attempting to connect to Local MongoDB...');
    const localUri = 'mongodb://localhost:27017/ecommerce';
    console.log('URI:', localUri);
    
    await mongoose.connect(localUri, {
      serverSelectionTimeoutMS: 2000 
    });
    
    console.log('Local MongoDB Connected Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Local MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

connectLocalDB();
