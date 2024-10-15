import express from 'express';
import connectDB from './config/db';
import dotenv from 'dotenv';
//import bookingRoutes from './routes/bookingRoutes';

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(express.json());

// Rutas
//app.use('/api', bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});