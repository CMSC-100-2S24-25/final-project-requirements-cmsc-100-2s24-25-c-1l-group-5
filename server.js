import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// setup the server and added parser to read incoming requests
const app = express();
dotenv.config();

// Below acts as a plugin in order to read JSON contents of incoming request messages (Middleware)
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

// Connect to Database
const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}${process.env.DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

connectDB();

// Routes 
// app.use('/api/products', productRoutes); (placeholder for later)

// Basic GET endpoint
app.get('/', (req, res) => {
  res.send('Farm-to-Table Server Running');
});

const PORT = 3000;
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)});