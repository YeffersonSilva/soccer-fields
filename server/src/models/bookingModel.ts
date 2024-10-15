// src/models/bookingModel.ts
import mongoose, { Document, Schema } from 'mongoose';

interface BookingDocument extends Document {
  name: string;
  phone: string;
  email: string;
  fieldType: string;
  fieldOption: string;
  timeSlot: number;
  paymentMethod: string;
  bookingDate: Date; // Nueva fecha de la reserva
}

const bookingSchema = new Schema<BookingDocument>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  fieldType: { type: String, required: true }, // Fútbol 5, 7 o 11
  fieldOption: { type: String, required: true }, // Césped natural o artificial
  timeSlot: { type: Number, required: true }, // 1, 1.5, o 2 horas
  paymentMethod: { type: String, required: true }, // Método de pago
  bookingDate: { type: Date, required: true } // Hora y fecha de la reserva
}, {
  timestamps: true
});

const Booking = mongoose.model<BookingDocument>('Booking', bookingSchema);

export default Booking;
