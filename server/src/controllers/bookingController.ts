// src/controllers/bookingController.ts
import { Request, Response } from 'express';
import Booking from '../models/bookingModel';

import sendConfirmationEmail from '../utils/emailSender'; // Importamos el servicio de envío de emails

// Crear una nueva reserva
export const createBooking = async (req: Request, res: Response) => {
  const { name, phone, email, fieldType, fieldOption, timeSlot, paymentMethod } = req.body;

  try {
    const newBooking = new Booking({
      name,
      phone,
      email,
      fieldType,
      fieldOption,
      timeSlot,
      paymentMethod,
    });

    const savedBooking = await newBooking.save();

    // Enviar el correo de confirmación
    await sendConfirmationEmail(email, name, fieldType, timeSlot, fieldOption);

    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la reserva', error });
  }
};


// Obtener todas las reservas
export const getBookings = async (_req: Request, res: Response) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las reservas', error });
  }
};
