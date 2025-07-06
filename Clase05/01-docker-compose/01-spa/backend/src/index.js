const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar rutas
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/userRoutes');

// Importar configuración de base de datos
const { testConnection, createUsersTable } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({
    origin: '*', // Permitir conexiones desde cualquier dominio
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware para logging de requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Rutas
app.use('/api', indexRoutes);
app.use('/api/users', userRoutes);

// Middleware para manejar rutas no encontradas
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint no encontrado',
        path: req.originalUrl,
        method: req.method
    });
});

// Middleware global para manejo de errores
app.use((error, req, res, next) => {
    console.error('Error global:', error);
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno'
    });
});

// Función para inicializar la aplicación
async function initializeApp() {
    try {
        console.log('🚀 Iniciando aplicación...');

        // Probar conexión a la base de datos
        const dbConnected = await testConnection();
        if (!dbConnected) {
            console.log('⚠️  Continuando sin conexión a MySQL...');
        }

        // Crear tabla de usuarios si no existe
        if (dbConnected) {
            await createUsersTable();
        }

        // Iniciar servidor
        app.listen(PORT, () => {
            console.log(`✅ Servidor corriendo en puerto ${PORT}`);
            console.log(`📍 URL: http://localhost:${PORT}`);
            console.log(`🏥 Healthcheck: http://localhost:${PORT}/api/healthcheck`);
            console.log(`👥 API Users: http://localhost:${PORT}/api/users`);
            console.log('─'.repeat(50));
        });

    } catch (error) {
        console.error('❌ Error iniciando la aplicación:', error.message);
        process.exit(1);
    }
}

// Manejo de señales para cierre graceful
process.on('SIGTERM', () => {
    console.log('🛑 Señal SIGTERM recibida. Cerrando servidor...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('🛑 Señal SIGINT recibida. Cerrando servidor...');
    process.exit(0);
});

// Inicializar aplicación
initializeApp();
