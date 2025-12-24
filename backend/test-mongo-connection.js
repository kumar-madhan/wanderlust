import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://127.0.0.1:27017/wanderlust';

async function testConnection() {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connection successful');
    mongoose.connection.close();
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
  }
}

testConnection();