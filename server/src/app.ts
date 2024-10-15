// src/app.ts
import express from 'express';
import cors from 'cors';  // Importa CORS
import dotenv from 'dotenv';
import connectDB from './config/db';
import bookingRoutes from './routes/bookingRoutes';

dotenv.config();

// Conecta a MongoDB
connectDB();

const app = express();

// Habilita CORS para todas las solicitudes
app.use(cors());  // Aplica CORS como middleware

// Middlewares
app.use(express.json());

// Rutas
app.use('/api', bookingRoutes);

// Ruta de prueba
app.post('/test', (req, res) => {
  res.send('¡Ruta de prueba funcionando!');
});
app.get('/', (req, res) => {
    res.send('¡Servidor Express funcionando!');
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
