import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
    selector: 'app-user-list',
    imports: [CommonModule, RouterModule],
    template: `
    <div class="user-list-container">
      <div class="header">
        <h2>Lista de Usuarios</h2>
        <div class="actions">
          <button 
            class="btn btn-primary" 
            routerLink="/users/create">
            <i class="icon-plus"></i>
            Nuevo Usuario
          </button>
          <button 
            class="btn btn-secondary" 
            (click)="refreshUsers()"
            [disabled]="userService.loading()">
            <i class="icon-refresh" [class.spinning]="userService.loading()"></i>
            Actualizar
          </button>
        </div>
      </div>

      <!-- Stats -->
      <div class="stats" *ngIf="userService.stats()">
        <div class="stat-card">
          <span class="stat-number">{{ userService.stats()?.totalUsers || 0 }}</span>
          <span class="stat-label">Total de usuarios</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">{{ userService.usersCount() }}</span>
          <span class="stat-label">Usuarios cargados</span>
        </div>
      </div>

      <!-- Loading -->
      <div class="loading" *ngIf="userService.loading()">
        <div class="spinner"></div>
        <p>Cargando usuarios...</p>
      </div>

      <!-- Error -->
      <div class="error" *ngIf="userService.error()">
        <div class="error-card">
          <h4>Error</h4>
          <p>{{ userService.error() }}</p>
          <button class="btn btn-outline" (click)="userService.clearError()">
            Cerrar
          </button>
        </div>
      </div>

      <!-- Users Table -->
      <div class="table-container" *ngIf="!userService.loading() && userService.users().length > 0">
        <table class="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Edad</th>
              <th>Fecha Creación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of userService.users(); trackBy: trackByUserId">
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.lastname }}</td>
              <td>{{ user.age }}</td>
              <td>{{ user.created_at | date:'dd/MM/yyyy HH:mm' }}</td>
              <td class="actions-cell">
                <button 
                  class="btn btn-sm btn-outline"
                  [routerLink]="['/users', user.id]"
                  title="Ver detalles">
                  <i class="icon-eye"></i>
                </button>
                <button 
                  class="btn btn-sm btn-primary"
                  [routerLink]="['/users', user.id, 'edit']"
                  title="Editar">
                  <i class="icon-edit"></i>
                </button>
                <button 
                  class="btn btn-sm btn-danger"
                  (click)="confirmDelete(user)"
                  [disabled]="deletingUserId() === user.id"
                  title="Eliminar">
                  <i class="icon-trash" *ngIf="deletingUserId() !== user.id"></i>
                  <div class="spinner-sm" *ngIf="deletingUserId() === user.id"></div>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div class="empty-state" *ngIf="!userService.loading() && userService.users().length === 0">
        <div class="empty-card">
          <i class="icon-users"></i>
          <h3>No hay usuarios</h3>
          <p>Comienza creando tu primer usuario</p>
          <button class="btn btn-primary" routerLink="/users/create">
            Crear Usuario
          </button>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div class="modal-overlay" *ngIf="userToDelete()" (click)="cancelDelete()">
        <div class="modal" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h3>Confirmar Eliminación</h3>
          </div>
          <div class="modal-body">
            <p>¿Estás seguro de que deseas eliminar al usuario:</p>
            <strong>{{ userToDelete()?.name }} {{ userToDelete()?.lastname }}</strong>
            <p class="warning">Esta acción no se puede deshacer.</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline" (click)="cancelDelete()">
              Cancelar
            </button>
            <button 
              class="btn btn-danger" 
              (click)="deleteUser()"
              [disabled]="deletingUserId() !== null">
              <span *ngIf="deletingUserId() === null">Eliminar</span>
              <span *ngIf="deletingUserId() !== null">Eliminando...</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
    styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
    // Signals para el estado local
    userToDelete = signal<User | null>(null);
    deletingUserId = signal<number | null>(null);

    constructor(protected userService: UserService) { }

    async ngOnInit() {
        await this.loadUsers();
        await this.loadStats();
    }

    async loadUsers() {
        await this.userService.getAllUsers();
    }

    async loadStats() {
        await this.userService.getUserStats();
    }

    async refreshUsers() {
        await Promise.all([
            this.loadUsers(),
            this.loadStats()
        ]);
    }

    trackByUserId(index: number, user: User): number {
        return user.id || index;
    }

    confirmDelete(user: User) {
        this.userToDelete.set(user);
    }

    cancelDelete() {
        this.userToDelete.set(null);
        this.deletingUserId.set(null);
    }

    async deleteUser() {
        const user = this.userToDelete();
        if (!user || !user.id) return;

        this.deletingUserId.set(user.id);

        try {
            const success = await this.userService.deleteUser(user.id);
            if (success) {
                this.userToDelete.set(null);
                // Actualizar estadísticas
                await this.loadStats();
            }
        } catch (error) {
            // Error ya manejado por el servicio
        } finally {
            this.deletingUserId.set(null);
        }
    }
}
