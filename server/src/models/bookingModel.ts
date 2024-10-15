import mongoose, { Document, Schema } from 'mongoose';

interface BookingDocument extends Document {
  name: string;
  phone: string;
  email: string;
  fieldType: string;
  fieldOption: string;
  timeSlot: number;
  paymentMethod: string;
}

const bookingSchema = new Schema<BookingDocument>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  fieldType: { type: String, required: true }, // Futbol 5, 7 o 11
  fieldOption: { type: String, required: true }, // Opciones de césped
  timeSlot: { type: Number, required: true }, // 1 hora, 1.5 horas, 2 horas
  paymentMethod: { type: String, required: true }, // Inmediato o Tarjeta
}, {
  timestamps: true
});

const Booking = mongoose.model<BookingDocument>('Booking', bookingSchema);

export default Booking;
