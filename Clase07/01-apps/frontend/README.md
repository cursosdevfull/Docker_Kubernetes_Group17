# Frontend - Products Store Web Application

Modern web application built with Express.js, Bootstrap, and vanilla JavaScript that displays products from multiple backend services.

## Features

- Modern responsive UI with Bootstrap 5
- Product catalog with beautiful cards
- Statistics dashboard showing products from different backends
- Health check monitoring for all services
- CORS enabled for API integration
- Dockerized application
- Environment variable configuration

## Routes

- `GET /` - Main application page
- `GET /health` - Health check (returns 200 OK)
- `GET /api/backend1-url` - Get Backend1 URL configuration
- Static assets served from `/css` and `/js`

## Environment Variables

- `PORT` - Server port (default: 3000)
- `BACKEND1_URL` - Backend1 service URL (default: http://localhost:3001)

## Features

### Product Display
- Beautiful product cards with hover effects
- Source identification (Backend1 vs Backend2)
- Stock level indicators
- Category badges
- Price highlighting

### Statistics Dashboard
- Total products count
- Products count by backend source
- Real-time updates

### Health Monitoring
- Check status of Frontend and Backend1 services
- Visual status indicators
- Modal popup with detailed status

## Running the Application

### Local Development
```bash
npm install
npm start
```

### With Backend1 URL
```bash
BACKEND1_URL=http://backend1:3001 npm start
```

### Using Docker
```bash
docker build -t frontend .
docker run -p 3000:3000 -e PORT=3000 -e BACKEND1_URL=http://backend1:3001 frontend
```

## Usage

1. Open http://localhost:3000 in your browser
2. Click "Load Products" to fetch products from backends
3. View product details by clicking "View Details" on any product card
4. Check health status by clicking "Health Check" in the navigation

## Architecture

The frontend communicates with Backend1, which in turn fetches additional products from Backend2, creating a chain of microservices that aggregate product data from multiple sources.
