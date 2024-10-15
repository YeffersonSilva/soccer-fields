// src/routes/bookingRoutes.ts
import express from 'express';
import { createBooking, getBookings } from '../controllers/bookingController';

const router = express.Router();

// Rutas
router.post('/bookings', createBooking); // Crear reserva
router.get('/bookings', getBookings); // Obtener todas las reservas

export default router;
