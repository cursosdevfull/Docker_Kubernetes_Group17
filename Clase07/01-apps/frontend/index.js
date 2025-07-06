const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const BACKEND1_URL = process.env.BACKEND1_URL || 'http://localhost:3001';

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Serve static files
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));
app.use('/js', express.static(path.join(__dirname, 'public', 'js')));

// Health check route
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// API route to get backend1 URL
app.get('/api/backend1-url', (req, res) => {
    res.json({
        success: true,
        backend1_url: BACKEND1_URL
    });
});

// Main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Frontend server running on port ${PORT}`);
    console.log(`Backend1 URL configured as: ${BACKEND1_URL}`);
    console.log(`Health check available at: http://localhost:${PORT}/health`);
    console.log(`Application available at: http://localhost:${PORT}`);
});
