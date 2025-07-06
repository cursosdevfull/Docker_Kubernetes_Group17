const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3001;
const BACKEND2_URL = process.env.BACKEND2_URL || 'http://localhost:3002';

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Sample products data for backend1
const localProducts = [
    {
        id: 1,
        name: "Laptop Dell XPS 13",
        price: 999.99,
        category: "Electronics",
        stock: 10,
        description: "Laptop ultraliviana con procesador Intel i7"
    },
    {
        id: 2,
        name: "Mouse Logitech MX Master",
        price: 79.99,
        category: "Electronics",
        stock: 25,
        description: "Mouse ergonómico inalámbrico"
    }
];

// Root route for Kubernetes compatibility
app.get('/', (req, res) => {
    res.json({
        service: 'Backend1',
        status: 'running',
        message: 'Backend1 service is operational',
        backend2_url: BACKEND2_URL,
        timestamp: new Date().toISOString()
    });
});

// Health check route
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Get all products (combining local and backend2 products)
app.get('/products', async (req, res) => {
    try {
        let allProducts = [...localProducts];

        // Fetch products from backend2
        try {
            const response = await fetch(`${BACKEND2_URL}/products`);
            if (response.ok) {
                const backend2Data = await response.json();
                if (backend2Data.success && backend2Data.data) {
                    allProducts = allProducts.concat(backend2Data.data);
                }
            } else {
                console.warn('Backend2 not available, returning only local products');
            }
        } catch (error) {
            console.error('Error fetching from backend2:', error.message);
            console.warn('Returning only local products');
        }

        res.json({
            success: true,
            data: allProducts,
            total: allProducts.length,
            sources: {
                backend1: localProducts.length,
                backend2: allProducts.length - localProducts.length
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: error.message
        });
    }
});

// Get product by ID (search in local first, then backend2)
app.get('/products/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        // Check local products first
        const localProduct = localProducts.find(p => p.id === id);
        if (localProduct) {
            return res.json({
                success: true,
                data: localProduct,
                source: 'backend1'
            });
        }

        // If not found locally, check backend2
        try {
            const response = await fetch(`${BACKEND2_URL}/products/${id}`);
            if (response.ok) {
                const backend2Data = await response.json();
                if (backend2Data.success) {
                    return res.json(backend2Data);
                }
            }
        } catch (error) {
            console.error('Error fetching from backend2:', error.message);
        }

        // Product not found in either backend
        res.status(404).json({
            success: false,
            message: 'Product not found'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching product',
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Backend1 server running on port ${PORT}`);
    console.log(`Backend2 URL configured as: ${BACKEND2_URL}`);
    console.log(`Health check available at: http://localhost:${PORT}/health`);
    console.log(`Products API available at: http://localhost:${PORT}/products`);
});
