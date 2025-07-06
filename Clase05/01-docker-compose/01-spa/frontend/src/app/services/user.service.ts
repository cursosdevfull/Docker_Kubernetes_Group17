import { Injectable, signal, computed } from '@angular/core';
import { User, CreateUserRequest, UpdateUserRequest, ApiResponse, UserStats } from '../models/user.model';
import { endpoint } from '../environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    //private readonly API_URL = 'http://localhost:3000/api';
    private readonly API_URL = `${endpoint}/api`

    // Signals para el estado
    private _users = signal<User[]>([]);
    private _loading = signal<boolean>(false);
    private _error = signal<string | null>(null);
    private _stats = signal<UserStats | null>(null);

    // Computed signals públicos
    users = computed(() => this._users());
    loading = computed(() => this._loading());
    error = computed(() => this._error());
    stats = computed(() => this._stats());
    usersCount = computed(() => this._users().length);

    // Métodos para manejar el estado
    private setLoading(loading: boolean) {
        this._loading.set(loading);
    }

    private setError(error: string | null) {
        this._error.set(error);
    }

    private setUsers(users: User[]) {
        this._users.set(users);
    }

    private setStats(stats: UserStats | null) {
        this._stats.set(stats);
    }

    // Métodos del API
    async getAllUsers(): Promise<void> {
        try {
            this.setLoading(true);
            this.setError(null);

            console.log(`api url: ${this.API_URL}/users`)

            const response = await fetch(`${this.API_URL}/users`);
            const result: ApiResponse<User[]> = await response.json();

            if (result.success && result.data) {
                this.setUsers(result.data);
            } else {
                throw new Error(result.message || 'Error obteniendo usuarios');
            }
        } catch (error) {
            this.setError(error instanceof Error ? error.message : 'Error desconocido');
            this.setUsers([]);
        } finally {
            this.setLoading(false);
        }
    }

    async getUserById(id: number): Promise<User | null> {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await fetch(`${this.API_URL}/users/${id}`);
            const result: ApiResponse<User> = await response.json();

            if (result.success && result.data) {
                return result.data;
            } else {
                throw new Error(result.message || 'Usuario no encontrado');
            }
        } catch (error) {
            this.setError(error instanceof Error ? error.message : 'Error obteniendo usuario');
            return null;
        } finally {
            this.setLoading(false);
        }
    }

    async createUser(userData: CreateUserRequest): Promise<User | null> {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await fetch(`${this.API_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const result: ApiResponse<User> = await response.json();

            if (result.success && result.data) {
                // Actualizar la lista local
                this.setUsers([...this._users(), result.data]);
                return result.data;
            } else {
                throw new Error(result.message || 'Error creando usuario');
            }
        } catch (error) {
            this.setError(error instanceof Error ? error.message : 'Error creando usuario');
            return null;
        } finally {
            this.setLoading(false);
        }
    }

    async updateUser(id: number, userData: UpdateUserRequest): Promise<User | null> {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await fetch(`${this.API_URL}/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const result: ApiResponse<User> = await response.json();

            if (result.success && result.data) {
                // Actualizar la lista local
                const updatedUsers = this._users().map(user =>
                    user.id === id ? result.data! : user
                );
                this.setUsers(updatedUsers);
                return result.data;
            } else {
                throw new Error(result.message || 'Error actualizando usuario');
            }
        } catch (error) {
            this.setError(error instanceof Error ? error.message : 'Error actualizando usuario');
            return null;
        } finally {
            this.setLoading(false);
        }
    }

    async deleteUser(id: number): Promise<boolean> {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await fetch(`${this.API_URL}/users/${id}`, {
                method: 'DELETE',
            });

            const result: ApiResponse<any> = await response.json();

            if (result.success) {
                // Remover de la lista local
                const filteredUsers = this._users().filter(user => user.id !== id);
                this.setUsers(filteredUsers);
                return true;
            } else {
                throw new Error(result.message || 'Error eliminando usuario');
            }
        } catch (error) {
            this.setError(error instanceof Error ? error.message : 'Error eliminando usuario');
            return false;
        } finally {
            this.setLoading(false);
        }
    }

    async getUserStats(): Promise<void> {
        try {
            this.setLoading(true);
            this.setError(null);

            const response = await fetch(`${this.API_URL}/users/stats`);
            const result: ApiResponse<UserStats> = await response.json();

            if (result.success && result.data) {
                this.setStats(result.data);
            } else {
                throw new Error(result.message || 'Error obteniendo estadísticas');
            }
        } catch (error) {
            this.setError(error instanceof Error ? error.message : 'Error obteniendo estadísticas');
            this.setStats(null);
        } finally {
            this.setLoading(false);
        }
    }

    async healthCheck(): Promise<boolean> {
        try {
            const response = await fetch(`${this.API_URL}/health`);
            return response.ok;
        } catch (error) {
            return false;
        }
    }

    // Método para limpiar errores
    clearError(): void {
        this.setError(null);
    }
}
