const express = require('express');
const { testConnection, createUsersTable } = require('../config/database');

const router = express.Router();

// Healthcheck endpoint
router.get('/healthcheck', async (req, res) => {
    try {
        const dbConnected = await testConnection();

        if (dbConnected) {
            res.status(200).json({
                success: true,
                status: 'healthy',
                message: 'API funcionando correctamente',
                timestamp: new Date().toISOString(),
                database: 'connected'
            });
        } else {
            res.status(503).json({
                success: false,
                status: 'unhealthy',
                message: 'Error de conexión a la base de datos',
                timestamp: new Date().toISOString(),
                database: 'disconnected'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            status: 'error',
            message: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

// Healthcheck simple - solo códigos HTTP
router.get('/health', async (req, res) => {
    try {
        const dbConnected = await testConnection();

        if (dbConnected) {
            res.status(200).end(); // 200 OK - todo funcionando
        } else {
            res.status(500).end(); // 500 Error - problema con DB
        }
    } catch (error) {
        res.status(500).end(); // 500 Error - cualquier otro error
    }
});

// Endpoint para crear tabla de usuarios
router.post('/create-table', async (req, res) => {
    try {
        const tableCreated = await createUsersTable();

        if (tableCreated) {
            res.status(200).json({
                success: true,
                message: 'Tabla users creada exitosamente o ya existe',
                timestamp: new Date().toISOString()
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Error creando la tabla users',
                timestamp: new Date().toISOString()
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

// Información de la API
router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'API de usuarios - CRUD con Express y MySQL',
        version: '1.0.0', endpoints: {
            healthcheck: 'GET /api/healthcheck (JSON response)',
            health: 'GET /api/health (HTTP codes only)',
            createTable: 'POST /api/create-table',
            users: {
                getAll: 'GET /api/users',
                getById: 'GET /api/users/:id',
                create: 'POST /api/users',
                update: 'PUT /api/users/:id',
                delete: 'DELETE /api/users/:id',
                stats: 'GET /api/users/stats'
            }
        },
        timestamp: new Date().toISOString()
    });
});

module.exports = router;
