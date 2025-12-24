import mongoose from 'mongoose';
const MONGODB_URI = 'mongodb://127.0.0.1:27017/wanderlust';
export default function connectDB() {
  try {
    console.log('Connecting to MongoDB with URI:', MONGODB_URI);
    mongoose.connect(MONGODB_URI);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  const dbConnection = mongoose.connection;

  dbConnection.once('open', () => {
    console.log(`Database connected: ${MONGODB_URI}`);
  });

  dbConnection.on('error', (err) => {
    console.error(`connection error: ${MONGODB_URI}`);
  });
  return;
}
