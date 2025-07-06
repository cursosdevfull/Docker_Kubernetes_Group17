# Backend1 - Products API with Backend2 Integration

Main backend service that aggregates products from local storage and Backend2.

## Features

- REST API for products management
- Integration with Backend2 service
- CORS enabled for cross-origin requests
- Health check endpoint
- Kubernetes-compatible root route
- Dockerized application
- Automatic fallback when Backend2 is unavailable

## API Endpoints

- `GET /` - Service status and Backend2 URL information
- `GET /health` - Health check (returns 200 OK)
- `GET /products` - Get all products (local + Backend2)
- `GET /products/:id` - Get product by ID (searches local first, then Backend2)

## Environment Variables

- `PORT` - Server port (default: 3001)
- `BACKEND2_URL` - Backend2 service URL (default: http://localhost:3002)

## Sample Products

This backend serves local products with IDs 1-2:
- Laptop Dell XPS 13
- Mouse Logitech MX Master

It also fetches and serves products from Backend2 (IDs 3-6).

## Running the Application

### Local Development
```bash
npm install
npm start
```

### With Backend2 URL
```bash
BACKEND2_URL=http://backend2:3002 npm start
```

### Using Docker
```bash
docker build -t backend1 .
docker run -p 3001:3001 -e PORT=3001 -e BACKEND2_URL=http://backend2:3002 backend1
```

## Testing

```bash
# Health check
curl http://localhost:3001/health

# Get all products (local + backend2)
curl http://localhost:3001/products

# Get specific product
curl http://localhost:3001/products/1
```
