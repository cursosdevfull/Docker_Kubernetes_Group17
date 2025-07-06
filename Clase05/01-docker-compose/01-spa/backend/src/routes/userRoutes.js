const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

// Rutas para CRUD de usuarios
router.get('/', UserController.getAllUsers);           // GET /api/users
router.get('/stats', UserController.getUserStats);     // GET /api/users/stats
router.get('/:id', UserController.getUserById);        // GET /api/users/:id
router.post('/', UserController.createUser);           // POST /api/users
router.put('/:id', UserController.updateUser);         // PUT /api/users/:id
router.delete('/:id', UserController.deleteUser);      // DELETE /api/users/:id

module.exports = router;
