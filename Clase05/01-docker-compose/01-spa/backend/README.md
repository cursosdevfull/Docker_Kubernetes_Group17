# API de Usuarios - CRUD con Express y MySQL

Esta es una API REST construida con Node.js, Express y MySQL que proporciona operaciones CRUD para la entidad User.

## Características

- ✅ CRUD completo para usuarios (Create, Read, Update, Delete)
- ✅ Conexión a MySQL con pool de conexiones
- ✅ CORS habilitado para conexiones desde cualquier dominio
- ✅ Endpoint de healthcheck
- ✅ Endpoint para crear tabla de usuarios
- ✅ Validaciones de datos
- ✅ Manejo de errores
- ✅ Logging de requests

## Entidad User

La entidad User tiene los siguientes campos:

```json
{
  "id": "number (PRIMARY KEY, AUTO_INCREMENT)",
  "name": "string (required)",
  "lastname": "string (required)", 
  "age": "number (required, integer >= 0)",
  "created_at": "timestamp (auto)",
  "updated_at": "timestamp (auto)"
}
```

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno (ya está configurado para el compose.yml):
```
DB_HOST=localhost
DB_PORT=3320
DB_USER=user
DB_PASSWORD=user_password
DB_NAME=course_docker
PORT=3000
```

3. Asegurarse de que MySQL esté corriendo:
```bash
docker-compose up -d mysql-server
```

4. Ejecutar la aplicación:
```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## Endpoints

### General
- `GET /api` - Información de la API y endpoints disponibles
- `GET /api/healthcheck` - Verificar estado de la aplicación y conexión DB (respuesta JSON)
- `GET /api/health` - Healthcheck simple (solo códigos HTTP 200/500)
- `POST /api/create-table` - Crear tabla users en la base de datos

### CRUD de Usuarios
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:id` - Obtener usuario por ID
- `POST /api/users` - Crear nuevo usuario
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario
- `GET /api/users/stats` - Obtener estadísticas (total de usuarios)

## Ejemplos de uso

### Crear usuario
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan",
    "lastname": "Pérez",
    "age": 25
  }'
```

### Obtener todos los usuarios
```bash
curl http://localhost:3000/api/users
```

### Obtener usuario por ID
```bash
curl http://localhost:3000/api/users/1
```

### Actualizar usuario
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Carlos",
    "lastname": "Pérez García",
    "age": 26
  }'
```

### Eliminar usuario
```bash
curl -X DELETE http://localhost:3000/api/users/1
```

### Healthcheck
```bash
# Healthcheck completo (respuesta JSON)
curl http://localhost:3000/api/healthcheck

# Healthcheck simple (solo código HTTP)
curl http://localhost:3000/api/health
# Devuelve 200 si todo está OK, 500 si hay problemas
```

### Crear tabla
```bash
curl -X POST http://localhost:3000/api/create-table
```

## Respuestas de la API

Todas las respuestas siguen el siguiente formato:

### Éxito
```json
{
  "success": true,
  "data": { /* datos */ },
  "message": "Descripción del resultado"
}
```

### Error
```json
{
  "success": false,
  "message": "Descripción del error"
}
```

## Estructura del proyecto

```
backend/
├── src/
│   ├── config/
│   │   └── database.js      # Configuración de MySQL
│   ├── controllers/
│   │   └── UserController.js # Controlador de usuarios
│   ├── models/
│   │   └── User.js          # Modelo de usuario
│   ├── routes/
│   │   ├── index.js         # Rutas principales
│   │   └── userRoutes.js    # Rutas de usuarios
│   └── index.js             # Archivo principal
├── .env                     # Variables de entorno
├── package.json
└── README.md
```

## Dependencias

- **express**: Framework web para Node.js
- **mysql2**: Cliente MySQL con soporte para promesas
- **cors**: Middleware para habilitar CORS
- **dotenv**: Cargar variables de entorno
- **nodemon**: Reinicio automático en desarrollo (devDependency)

## Notas

- La aplicación se conecta automáticamente a MySQL usando la configuración del `compose.yml`
- El puerto por defecto es 3000, pero se puede cambiar con la variable `PORT`
- CORS está configurado para permitir conexiones desde cualquier dominio
- La tabla `users` se crea automáticamente al iniciar la aplicación
- Incluye manejo de errores y validaciones de datos
