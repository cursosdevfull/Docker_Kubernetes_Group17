# User Manager Frontend - Angular 20

Frontend de la aplicación User Manager construida con Angular 20, que consume la API REST para la gestión de usuarios.

## Características

- ✅ **Angular 20** con componentes standalone
- ✅ **Signals** para manejo de estado reactivo (sin observables)
- ✅ **Zoneless Change Detection** para mejor rendimiento
- ✅ **CRUD completo** de usuarios
- ✅ **Routing** con lazy loading
- ✅ **Formularios reactivos** con validaciones
- ✅ **UI responsiva** con CSS moderno
- ✅ **Indicador de estado** del API
- ✅ **Manejo de errores** y estados de carga

## Instalación y Ejecución

### Prerequisitos
- Node.js 18+ 
- npm o yarn
- API Backend ejecutándose en `http://localhost:3000`

### Pasos

1. **Instalar dependencias:**
```bash
npm install
```

2. **Ejecutar en desarrollo:**
```bash
npm start
# o
ng serve
```

La aplicación estará disponible en `http://localhost:4200`

## Rutas Disponibles

- `/` → Redirige a `/users`
- `/users` → Lista de usuarios
- `/users/create` → Crear nuevo usuario
- `/users/:id` → Ver detalles del usuario
- `/users/:id/edit` → Editar usuario

## Funcionalidades Implementadas

### 🔍 Lista de Usuarios
- Tabla con todos los usuarios
- Botones para crear, ver, editar y eliminar
- Indicador de carga y manejo de errores
- Estadísticas en tiempo real

### ➕ Crear/Editar Usuario
- Formulario con validaciones (nombre, apellido, edad)
- Validación en tiempo real
- Modo crear y editar compartido

### 👁 Ver Detalles
- Vista completa del usuario
- Información personal y del sistema
- Acciones para editar/eliminar

### 🧭 Navegación
- Navbar con indicador de estado del API
- Enlaces principales

## Configuración del API

El frontend se conecta al backend en `http://localhost:3000/api`
Para cambiar la URL, modifica `src/app/services/user.service.ts`

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
