import express from 'express';
import { createBooking, getBookings } from '../controllers/bookingController'; // Importación correcta

const router = express.Router();

// Definir las rutas
router.post('/bookings', createBooking); // Para crear una reserva
router.get('/bookings', getBookings); // Para obtener todas las reservas

export default router;
