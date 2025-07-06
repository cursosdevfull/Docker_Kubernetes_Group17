export interface User {
    id?: number;
    name: string;
    lastname: string;
    age: number;
    created_at?: string;
    updated_at?: string;
}

export interface CreateUserRequest {
    name: string;
    lastname: string;
    age: number;
}

export interface UpdateUserRequest {
    name: string;
    lastname: string;
    age: number;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message: string;
}

export interface UserStats {
    totalUsers: number;
}
