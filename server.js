'use strict';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware setups
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/barberbooking', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Socket.io real-time features
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Routes
app.use('/api/auth', require('./routes/auth')); // Authentication routes
app.use('/api/appointments', require('./routes/appointments')); // Appointment management routes
app.use('/api/barbers', require('./routes/barbers')); // Barber profiles routes
app.use('/api/availability', require('./routes/availability')); // Availability management routes

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
