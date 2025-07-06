import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
    selector: 'app-user-form',
    imports: [CommonModule, ReactiveFormsModule],
    template: `
    <div class="user-form-container">
      <div class="header">
        <button class="btn btn-outline back-btn" (click)="goBack()">
          <i class="icon-arrow-left"></i>
          Volver
        </button>
        <h2>{{ isEditMode() ? 'Editar Usuario' : 'Crear Usuario' }}</h2>
      </div>

      <!-- Loading -->
      <div class="loading" *ngIf="userService.loading()">
        <div class="spinner"></div>
        <p>{{ isEditMode() ? 'Cargando usuario...' : 'Guardando...' }}</p>
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

      <!-- Form -->
      <div class="form-container" *ngIf="!userService.loading()">
        <form [formGroup]="userForm" (ngSubmit)="onSubmit()" class="user-form">
          <div class="form-group">
            <label for="name">Nombre *</label>
            <input
              id="name"
              type="text"
              formControlName="name"
              class="form-control"
              [class.error]="isFieldInvalid('name')"
              placeholder="Ingresa el nombre"
            />
            <div class="field-error" *ngIf="isFieldInvalid('name')">
              <span *ngIf="userForm.get('name')?.errors?.['required']">
                El nombre es requerido
              </span>
              <span *ngIf="userForm.get('name')?.errors?.['minlength']">
                El nombre debe tener al menos 2 caracteres
              </span>
              <span *ngIf="userForm.get('name')?.errors?.['maxlength']">
                El nombre no puede exceder 50 caracteres
              </span>
            </div>
          </div>

          <div class="form-group">
            <label for="lastname">Apellido *</label>
            <input
              id="lastname"
              type="text"
              formControlName="lastname"
              class="form-control"
              [class.error]="isFieldInvalid('lastname')"
              placeholder="Ingresa el apellido"
            />
            <div class="field-error" *ngIf="isFieldInvalid('lastname')">
              <span *ngIf="userForm.get('lastname')?.errors?.['required']">
                El apellido es requerido
              </span>
              <span *ngIf="userForm.get('lastname')?.errors?.['minlength']">
                El apellido debe tener al menos 2 caracteres
              </span>
              <span *ngIf="userForm.get('lastname')?.errors?.['maxlength']">
                El apellido no puede exceder 50 caracteres
              </span>
            </div>
          </div>

          <div class="form-group">
            <label for="age">Edad *</label>
            <input
              id="age"
              type="number"
              formControlName="age"
              class="form-control"
              [class.error]="isFieldInvalid('age')"
              placeholder="Ingresa la edad"
              min="0"
              max="150"
            />
            <div class="field-error" *ngIf="isFieldInvalid('age')">
              <span *ngIf="userForm.get('age')?.errors?.['required']">
                La edad es requerida
              </span>
              <span *ngIf="userForm.get('age')?.errors?.['min']">
                La edad debe ser mayor a 0
              </span>
              <span *ngIf="userForm.get('age')?.errors?.['max']">
                La edad no puede ser mayor a 150
              </span>
            </div>
          </div>

          <!-- User Info Preview (only in edit mode) -->
          <div class="user-info" *ngIf="isEditMode() && currentUser()">
            <h4>Información actual</h4>
            <div class="info-grid">
              <div class="info-item">
                <span class="label">ID:</span>
                <span class="value">{{ currentUser()?.id }}</span>
              </div>
              <div class="info-item">
                <span class="label">Creado:</span>
                <span class="value">{{ currentUser()?.created_at | date:'dd/MM/yyyy HH:mm' }}</span>
              </div>
              <div class="info-item">
                <span class="label">Actualizado:</span>
                <span class="value">{{ currentUser()?.updated_at | date:'dd/MM/yyyy HH:mm' }}</span>
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button 
              type="button" 
              class="btn btn-outline"
              (click)="goBack()"
              [disabled]="saving()">
              Cancelar
            </button>
            <button 
              type="submit" 
              class="btn btn-primary"
              [disabled]="userForm.invalid || saving()">
              <span *ngIf="!saving()">
                {{ isEditMode() ? 'Actualizar' : 'Crear' }} Usuario
              </span>
              <span *ngIf="saving()">
                <div class="spinner-sm"></div>
                {{ isEditMode() ? 'Actualizando...' : 'Creando...' }}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
    styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
    userForm: FormGroup;

    // Signals para el estado
    currentUser = signal<User | null>(null);
    saving = signal<boolean>(false);
    userId = signal<number | null>(null);

    // Computed
    isEditMode = computed(() => this.userId() !== null);

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        protected userService: UserService
    ) {
        this.userForm = this.createForm();
    }

    async ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.userId.set(parseInt(id, 10));
            await this.loadUser();
        }
    }

    private createForm(): FormGroup {
        return this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            age: ['', [Validators.required, Validators.min(0), Validators.max(150)]]
        });
    }

    private async loadUser() {
        const id = this.userId();
        if (!id) return;

        const user = await this.userService.getUserById(id);
        if (user) {
            this.currentUser.set(user);
            this.userForm.patchValue({
                name: user.name,
                lastname: user.lastname,
                age: user.age
            });
        } else {
            // Usuario no encontrado, redirigir
            this.router.navigate(['/users']);
        }
    }

    isFieldInvalid(fieldName: string): boolean {
        const field = this.userForm.get(fieldName);
        return !!(field && field.invalid && (field.dirty || field.touched));
    }

    async onSubmit() {
        if (this.userForm.invalid) {
            this.markFormGroupTouched();
            return;
        }

        this.saving.set(true);

        try {
            const formData = this.userForm.value;
            let success = false;

            if (this.isEditMode()) {
                const id = this.userId()!;
                const result = await this.userService.updateUser(id, formData);
                success = !!result;
            } else {
                const result = await this.userService.createUser(formData);
                success = !!result;
            }

            if (success) {
                this.router.navigate(['/users']);
            }
        } catch (error) {
            // Error ya manejado por el servicio
        } finally {
            this.saving.set(false);
        }
    }

    private markFormGroupTouched() {
        Object.keys(this.userForm.controls).forEach(key => {
            const control = this.userForm.get(key);
            control?.markAsTouched();
        });
    }

    goBack() {
        this.router.navigate(['/users']);
    }
}
