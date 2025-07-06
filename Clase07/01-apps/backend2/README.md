# Backend2 - Products API

Backend service that provides products data through a REST API.

## Features

- REST API for products management
- CORS enabled for cross-origin requests
- Health check endpoint
- Kubernetes-compatible root route
- Dockerized application

## API Endpoints

- `GET /` - Service status and information
- `GET /health` - Health check (returns 200 OK)
- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID

## Environment Variables

- `PORT` - Server port (default: 3002)

## Sample Products

This backend serves products with IDs 3-6:
- Tablet Samsung Galaxy
- Audífonos Sony WH-1000XM4  
- Smartwatch Apple Watch
- Cámara Canon EOS

## Running the Application

### Local Development
```bash
npm install
npm start
```

### Using Docker
```bash
docker build -t backend2 .
docker run -p 3002:3002 -e PORT=3002 backend2
```

## Testing

```bash
# Health check
curl http://localhost:3002/health

# Get all products
curl http://localhost:3002/products

# Get specific product
curl http://localhost:3002/products/3
```
