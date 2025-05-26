// backend/server.js
// Import packages
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

// Import routes
import authRoutes from './server/routes/authRoutes.js'
import productRoutes from './server/routes/productRoutes.js';
import orderRoutes from './server/routes/orderRoutes.js';

const app = express();
dotenv.config({ path: '../.env' });

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();

// Routes
app.post('/auth/test', (req, res) => {
  res.json({ message: "Test route hit!" });
});

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Basic endpoint
app.get('/', (req, res) => {
  res.send('Farm-to-Table Server Running');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`SERVER CONNECTED ON ==> http://localhost:${PORT}/`);
});