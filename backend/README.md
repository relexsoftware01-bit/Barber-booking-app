# Barber Booking App Backend

## Models

1. **User**
   - `id`: Integer, Primary Key
   - `name`: String
   - `email`: String, Unique
   - `password`: String

2. **Appointment**
   - `id`: Integer, Primary Key
   - `userId`: Integer, Foreign Key
   - `serviceId`: Integer, Foreign Key
   - `dateTime`: DateTime

3. **Service**
   - `id`: Integer, Primary Key
   - `name`: String
   - `duration`: Integer (in minutes)
   - `price`: Float

4. **Availability**
   - `id`: Integer, Primary Key
   - `barberId`: Integer, Foreign Key
   - `date`: Date
   - `startTime`: Time
   - `endTime`: Time

## Routes

1. **Auth**
   - `POST /auth/register`
   - `POST /auth/login`

2. **Appointments**
   - `GET /appointments`
   - `POST /appointments`
   - `DELETE /appointments/:id`

3. **Barbers**
   - `GET /barbers`
   - `GET /barbers/:id`

4. **Availability**
   - `GET /availability`
   - `POST /availability`

## server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/barberbooking', { useNewUrlParser: true, useUnifiedTopology: true });

const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
}));

// Add additional models' definitions here (Appointment, Service, Availability)

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

## .env

DB_URI=mongodb://localhost:27017/barberbooking
PORT=3000
