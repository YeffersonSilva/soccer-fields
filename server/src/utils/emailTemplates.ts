// src/utils/emailTemplates.ts
export const bookingConfirmationTemplate = (name: string, fieldType: string, timeSlot: number, fieldOption: string) => {
    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
          }
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: #28a745;
            color: white;
            padding: 10px;
            text-align: center;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
          }
          .header h1 {
            margin: 0;
          }
          .content {
            margin: 20px 0;
          }
          .content h2 {
            color: #333;
          }
          .content p {
            font-size: 16px;
            color: #555;
            line-height: 1.5;
          }
          .footer {
            margin-top: 20px;
            text-align: center;
            color: #888;
            font-size: 12px;
          }
          .button {
            display: inline-block;
            background-color: #28a745;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>Confirmación de Reserva</h1>
          </div>
          <div class="content">
            <h2>Hola, ${name}</h2>
            <p>Gracias por realizar tu reserva en nuestro sistema. Aquí están los detalles de tu reserva:</p>
            <ul>
              <li><strong>Cancha:</strong> ${fieldType}</li>
              <li><strong>Opción de campo:</strong> ${fieldOption}</li>
              <li><strong>Duración:</strong> ${timeSlot} horas</li>
            </ul>
            <p>Estamos emocionados de recibirte y esperamos que disfrutes de tu tiempo en nuestras instalaciones. Si tienes alguna pregunta, no dudes en contactarnos.</p>
            <a href="https://mi-sitio.com/reservas" class="button">Ver más detalles</a>
          </div>
          <div class="footer">
            <p>&copy; 2024 Equipo de Reservas. Todos los derechos reservados.</p>
            <p>Este es un correo electrónico generado automáticamente, por favor no responda a este mensaje.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };
  