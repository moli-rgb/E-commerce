const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('URI:', process.env.MONGO_URI ? 'Defined' : 'Undefined');
    
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000 
    });
    
    console.log('MongoDB Connected Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    console.error('Full Error:', error);
    process.exit(1);
  }
};

connectDB();
