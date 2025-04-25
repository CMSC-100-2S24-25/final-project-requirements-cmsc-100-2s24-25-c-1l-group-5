import express from 'express';

// setup the server and added parser to read incoming requests
const app = express();

// Below acts as a plugin in order to read JSON contents of incoming request messages (Middleware)
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

// Connect to Database
// connectDB();

// Routes 
// app.use('/api/products', productRoutes); (placeholder for later)

// Basic GET endpoint
app.get('/', (req, res) => {
  res.send('Farm-to-Table Server Running');
});

const PORT = 3000;
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)});