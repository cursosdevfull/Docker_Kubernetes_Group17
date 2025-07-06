const User = require('../models/User');

class UserController {
    // GET /api/users - Obtener todos los usuarios
    static async getAllUsers(req, res) {
        try {
            const users = await User.getAll();
            res.status(200).json({
                success: true,
                data: users,
                message: 'Usuarios obtenidos exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // GET /api/users/:id - Obtener usuario por ID
    static async getUserById(req, res) {
        try {
            const { id } = req.params;

            if (!id || isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    message: 'ID de usuario inválido'
                });
            }

            const user = await User.getById(id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

            res.status(200).json({
                success: true,
                data: user,
                message: 'Usuario obtenido exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // POST /api/users - Crear nuevo usuario
    static async createUser(req, res) {
        try {
            const { name, lastname, age } = req.body;

            // Validaciones
            if (!name || !lastname || !age) {
                return res.status(400).json({
                    success: false,
                    message: 'Todos los campos son requeridos: name, lastname, age'
                });
            }

            if (typeof name !== 'string' || typeof lastname !== 'string') {
                return res.status(400).json({
                    success: false,
                    message: 'Name y lastname deben ser strings'
                });
            }

            if (!Number.isInteger(age) || age < 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Age debe ser un número entero positivo'
                });
            }

            const newUser = await User.create({ name, lastname, age });

            res.status(201).json({
                success: true,
                data: newUser,
                message: 'Usuario creado exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // PUT /api/users/:id - Actualizar usuario
    static async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { name, lastname, age } = req.body;

            if (!id || isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    message: 'ID de usuario inválido'
                });
            }

            // Validaciones
            if (!name || !lastname || !age) {
                return res.status(400).json({
                    success: false,
                    message: 'Todos los campos son requeridos: name, lastname, age'
                });
            }

            if (typeof name !== 'string' || typeof lastname !== 'string') {
                return res.status(400).json({
                    success: false,
                    message: 'Name y lastname deben ser strings'
                });
            }

            if (!Number.isInteger(age) || age < 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Age debe ser un número entero positivo'
                });
            }

            const updatedUser = await User.update(id, { name, lastname, age });

            if (!updatedUser) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

            res.status(200).json({
                success: true,
                data: updatedUser,
                message: 'Usuario actualizado exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // DELETE /api/users/:id - Eliminar usuario
    static async deleteUser(req, res) {
        try {
            const { id } = req.params;

            if (!id || isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    message: 'ID de usuario inválido'
                });
            }

            const deleted = await User.delete(id);

            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Usuario eliminado exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // GET /api/users/stats - Estadísticas de usuarios
    static async getUserStats(req, res) {
        try {
            const total = await User.count();
            res.status(200).json({
                success: true,
                data: {
                    totalUsers: total
                },
                message: 'Estadísticas obtenidas exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = UserController;
