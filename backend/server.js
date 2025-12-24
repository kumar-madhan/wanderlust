import 'dotenv/config';   // MUST BE FIRST

import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import connectDB from './config/db.js';
import { PORT } from './config/utils.js';
import authRouter from './routes/auth.js';
import postsRouter from './routes/posts.js';

import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/wanderlust';

const app = express();
const port = PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(compression());

connectDB();

app.use('/api/posts', postsRouter);
app.use('/api/auth', authRouter);

app.get('/', (_, res) => {
  res.send('Backend of Wanderlust is running');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('dotenv loaded:', dotenv.config());

export default app;
