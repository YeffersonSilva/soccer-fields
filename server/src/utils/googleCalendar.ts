// src/utils/googleCalendar.ts
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import fs from 'fs';
import path from 'path';
import readline from 'readline';

const credentialsPath = path.join(__dirname, '../../credentials.json');
const TOKEN_PATH = path.join(__dirname, '../../token.json');

const SCOPES = ['https://www.googleapis.com/auth/calendar.events'];

const authorize = (credentials: any, callback: Function, bookingData: any) => {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);

  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback, bookingData);
    oAuth2Client.setCredentials(JSON.parse(token.toString()));
    callback(oAuth2Client, bookingData);
  });
};

const getAccessToken = (oAuth2Client: OAuth2Client, callback: Function, bookingData: any) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token!);
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
      });
      callback(oAuth2Client, bookingData);
    });
  });
};

const addEventToCalendar = async (bookingData: any) => {
  fs.readFile(credentialsPath, (err, content) => {
    if (err) return console.error('Error loading client secret file:', err);
    authorize(JSON.parse(content.toString()), createEvent, bookingData);
  });
};

const createEvent = (auth: any, bookingData: any) => {
  const calendar = google.calendar({ version: 'v3', auth });
  const event = {
    summary: `Reserva de cancha: ${bookingData.fieldType}`,
    description: `Reserva para ${bookingData.name}. Número: ${bookingData.phone}`,
    start: {
      dateTime: new Date(bookingData.bookingDate).toISOString(), // Convertir a formato ISO
      timeZone: 'America/Montevideo',
    },
    end: {
      dateTime: new Date(new Date(bookingData.bookingDate).getTime() + bookingData.timeSlot * 60 * 60 * 1000).toISOString(), // Convertir a formato ISO
      timeZone: 'America/Montevideo',
    },
  };

  calendar.events.insert(
    {
      calendarId: 'primary', // ID del calendario del administrador
      requestBody: event, // Aquí va el objeto de evento en el requestBody
    },
    (err: any, event: any) => {
      if (err) {
        console.error('Error creando el evento:', err);
        return;
      }
      console.log('Evento creado en Google Calendar:', event.data.htmlLink);
    }
  );
};

export { addEventToCalendar };
