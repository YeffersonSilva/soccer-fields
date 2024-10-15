// src/utils/emailSender.ts
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { bookingConfirmationTemplate } from './emailTemplates';

dotenv.config();

const sendConfirmationEmail = async (to: string, name: string, fieldType: string, timeSlot: number, fieldOption: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // O el servicio que uses
      auth: {
        user: process.env.EMAIL_USER, // Tu dirección de correo
        pass: process.env.EMAIL_PASS, // Tu contraseña o contraseña de aplicación
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: 'Confirmación de Reserva de Cancha',
      html: bookingConfirmationTemplate(name, fieldType, timeSlot, fieldOption), // Usamos la plantilla HTML
    };

    await transporter.sendMail(mailOptions);
    console.log('Correo de confirmación enviado a:', to);
  } catch (error) {
    console.error('Error enviando correo:', error);
  }
};

export default sendConfirmationEmail;
