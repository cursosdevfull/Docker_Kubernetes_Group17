const { pool } = require('../config/database');

class User {
    constructor(name, lastname, age, id = null) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.age = age;
    }

    // Obtener todos los usuarios
    static async getAll() {
        try {
            const [rows] = await pool.execute('SELECT * FROM users ORDER BY id ASC');
            return rows;
        } catch (error) {
            throw new Error(`Error obteniendo usuarios: ${error.message}`);
        }
    }

    // Obtener usuario por ID
    static async getById(id) {
        try {
            const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
            return rows[0] || null;
        } catch (error) {
            throw new Error(`Error obteniendo usuario por ID: ${error.message}`);
        }
    }

    // Crear un nuevo usuario
    static async create(userData) {
        try {
            const { name, lastname, age } = userData;
            const [result] = await pool.execute(
                'INSERT INTO users (name, lastname, age) VALUES (?, ?, ?)',
                [name, lastname, age]
            );
            return {
                id: result.insertId,
                name,
                lastname,
                age
            };
        } catch (error) {
            throw new Error(`Error creando usuario: ${error.message}`);
        }
    }

    // Actualizar usuario
    static async update(id, userData) {
        try {
            const { name, lastname, age } = userData;
            const [result] = await pool.execute(
                'UPDATE users SET name = ?, lastname = ?, age = ? WHERE id = ?',
                [name, lastname, age, id]
            );

            if (result.affectedRows === 0) {
                return null;
            }

            return {
                id: parseInt(id),
                name,
                lastname,
                age
            };
        } catch (error) {
            throw new Error(`Error actualizando usuario: ${error.message}`);
        }
    }

    // Eliminar usuario
    static async delete(id) {
        try {
            const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error eliminando usuario: ${error.message}`);
        }
    }

    // Contar total de usuarios
    static async count() {
        try {
            const [rows] = await pool.execute('SELECT COUNT(*) as total FROM users');
            return rows[0].total;
        } catch (error) {
            throw new Error(`Error contando usuarios: ${error.message}`);
        }
    }
}

module.exports = User;
