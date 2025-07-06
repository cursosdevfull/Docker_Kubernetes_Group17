import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
    selector: 'app-user-detail',
    imports: [CommonModule, RouterModule],
    template: `
    <div class="user-detail-container">
      <div class="header">
        <button class="btn btn-outline back-btn" (click)="goBack()">
          <i class="icon-arrow-left"></i>
          Volver
        </button>
        <h2>Detalles del Usuario</h2>
      </div>

      <!-- Loading -->
      <div class="loading" *ngIf="userService.loading()">
        <div class="spinner"></div>
        <p>Cargando usuario...</p>
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

      <!-- User Details -->
      <div class="user-card" *ngIf="!userService.loading() && user()">
        <div class="user-header">
          <div class="user-avatar">
            <i class="icon-user"></i>
          </div>
          <div class="user-title">
            <h3>{{ user()?.name }} {{ user()?.lastname }}</h3>
            <span class="user-id">ID: {{ user()?.id }}</span>
          </div>
        </div>

        <div class="user-info">
          <div class="info-section">
            <h4>Información Personal</h4>
            <div class="info-grid">
              <div class="info-item">
                <span class="label">Nombre</span>
                <span class="value">{{ user()?.name }}</span>
              </div>
              <div class="info-item">
                <span class="label">Apellido</span>
                <span class="value">{{ user()?.lastname }}</span>
              </div>
              <div class="info-item">
                <span class="label">Edad</span>
                <span class="value">{{ user()?.age }} años</span>
              </div>
            </div>
          </div>

          <div class="info-section">
            <h4>Información del Sistema</h4>
            <div class="info-grid">
              <div class="info-item">
                <span class="label">Fecha de Creación</span>
                <span class="value">{{ user()?.created_at | date:'dd/MM/yyyy HH:mm:ss' }}</span>
              </div>
              <div class="info-item">
                <span class="label">Última Actualización</span>
                <span class="value">{{ user()?.updated_at | date:'dd/MM/yyyy HH:mm:ss' }}</span>
              </div>
              <div class="info-item">
                <span class="label">Estado</span>
                <span class="value status active">Activo</span>
              </div>
            </div>
          </div>
        </div>

        <div class="actions">
          <button 
            class="btn btn-primary"
            [routerLink]="['/users', user()?.id, 'edit']">
            <i class="icon-edit"></i>
            Editar Usuario
          </button>
          <button 
            class="btn btn-danger"
            (click)="confirmDelete()"
            [disabled]="deleting()">
            <i class="icon-trash" *ngIf="!deleting()"></i>
            <div class="spinner-sm" *ngIf="deleting()"></div>
            {{ deleting() ? 'Eliminando...' : 'Eliminar Usuario' }}
          </button>
        </div>
      </div>

      <!-- User Not Found -->
      <div class="not-found" *ngIf="!userService.loading() && !user() && !userService.error()">
        <div class="not-found-card">
          <i class="icon-search"></i>
          <h3>Usuario no encontrado</h3>
          <p>El usuario que buscas no existe o ha sido eliminado.</p>
          <button class="btn btn-primary" routerLink="/users">
            Ver Todos los Usuarios
          </button>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div class="modal-overlay" *ngIf="showDeleteModal()" (click)="cancelDelete()">
        <div class="modal" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h3>Confirmar Eliminación</h3>
          </div>
          <div class="modal-body">
            <p>¿Estás seguro de que deseas eliminar al usuario:</p>
            <strong>{{ user()?.name }} {{ user()?.lastname }}</strong>
            <p class="warning">Esta acción no se puede deshacer y serás redirigido a la lista de usuarios.</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-outline" (click)="cancelDelete()">
              Cancelar
            </button>
            <button 
              class="btn btn-danger" 
              (click)="deleteUser()"
              [disabled]="deleting()">
              <span *ngIf="!deleting()">Eliminar</span>
              <span *ngIf="deleting()">Eliminando...</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
    styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {
    // Signals para el estado
    user = signal<User | null>(null);
    deleting = signal<boolean>(false);
    showDeleteModal = signal<boolean>(false);

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        protected userService: UserService
    ) { }

    async ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            await this.loadUser(parseInt(id, 10));
        } else {
            this.router.navigate(['/users']);
        }
    }

    private async loadUser(id: number) {
        const user = await this.userService.getUserById(id);
        this.user.set(user);
    }

    confirmDelete() {
        this.showDeleteModal.set(true);
    }

    cancelDelete() {
        this.showDeleteModal.set(false);
        this.deleting.set(false);
    }

    async deleteUser() {
        const currentUser = this.user();
        if (!currentUser || !currentUser.id) return;

        this.deleting.set(true);

        try {
            const success = await this.userService.deleteUser(currentUser.id);
            if (success) {
                // Redirigir a la lista de usuarios
                this.router.navigate(['/users']);
            }
        } catch (error) {
            // Error ya manejado por el servicio
        } finally {
            this.deleting.set(false);
            this.showDeleteModal.set(false);
        }
    }

    goBack() {
        this.router.navigate(['/users']);
    }
}
