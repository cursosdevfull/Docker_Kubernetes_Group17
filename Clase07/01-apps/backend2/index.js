const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Sample products data for backend2
const products = [
    {
        id: 3,
        name: "Tablet Samsung Galaxy",
        price: 299.99,
        category: "Electronics",
        stock: 15,
        description: "Tablet Android de 10 pulgadas"
    },
    {
        id: 4,
        name: "Audífonos Sony WH-1000XM4",
        price: 349.99,
        category: "Electronics",
        stock: 8,
        description: "Audífonos inalámbricos con cancelación de ruido"
    },
    {
        id: 5,
        name: "Smartwatch Apple Watch",
        price: 399.99,
        category: "Electronics",
        stock: 12,
        description: "Reloj inteligente con múltiples funciones"
    },
    {
        id: 6,
        name: "Cámara Canon EOS",
        price: 899.99,
        category: "Photography",
        stock: 5,
        description: "Cámara DSLR profesional"
    }
];

// Root route for Kubernetes compatibility
app.get('/', (req, res) => {
    res.json({
        service: 'Backend2',
        status: 'running',
        message: 'Backend2 service is operational',
        timestamp: new Date().toISOString()
    });
});

// Health check route
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Get all products
app.get('/products', (req, res) => {
    res.json({
        success: true,
        data: products,
        total: products.length,
        source: 'backend2'
    });
});

// Get product by ID
app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }

    res.json({
        success: true,
        data: product,
        source: 'backend2'
    });
});

app.listen(PORT, () => {
    console.log(`Backend2 server running on port ${PORT}`);
    console.log(`Health check available at: http://localhost:${PORT}/health`);
    console.log(`Products API available at: http://localhost:${PORT}/products`);
});
