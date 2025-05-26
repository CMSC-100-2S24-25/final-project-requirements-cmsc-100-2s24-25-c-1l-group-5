import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes.js';  // <-- make sure this exists and is imported

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);

const mongoURI = 'mongodb+srv://sample:sample123@farm2table-dev.ohvxv2a.mongodb.net/?retryWrites=true&w=majority&appName=farm2table-dev';

mongoose.connect(mongoURI)
  .then(() => {
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
