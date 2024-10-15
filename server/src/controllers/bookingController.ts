import { Request, Response } from 'express';
import Booking from '../models/bookingModel';
import sendConfirmationEmail from '../utils/emailSender'; // Importamos el servicio de envío de emails

// Crear una nueva reserva
export const createBooking = async (req: Request, res: Response): Promise<void> => {
  const { name, phone, email, fieldType, fieldOption, timeSlot, paymentMethod, bookingDate } = req.body;

  try {
    // Verificar si ya existe una reserva en la misma cancha y horario
    const existingBooking = await Booking.findOne({
      fieldType,
      fieldOption,
      bookingDate: new Date(bookingDate), // Compara la fecha y hora exacta
    });

    if (existingBooking) {
      res.status(400).json({ message: 'Ya existe una reserva para esta cancha en la fecha y hora seleccionadas.' });
      return;
    }

    // Crear la nueva reserva
    const newBooking = new Booking({
      name,
      phone,
      email,
      fieldType,
      fieldOption,
      timeSlot,
      paymentMethod,
      bookingDate: new Date(bookingDate),
    });

    const savedBooking = await newBooking.save();

    // Enviar un correo de confirmación al cliente
    await sendConfirmationEmail(email, name, fieldType, timeSlot, fieldOption);

    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la reserva', error });
  }
};

// Obtener todas las reservas
export const getBookings = async (_req: Request, res: Response): Promise<void> => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las reservas', error });
  }
};
