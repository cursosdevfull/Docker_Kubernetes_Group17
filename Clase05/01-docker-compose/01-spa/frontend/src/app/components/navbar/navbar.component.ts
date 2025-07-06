import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-navbar',
    imports: [CommonModule, RouterModule],
    template: `
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-brand">
          <a routerLink="/" class="brand-link">
            <i class="icon-users"></i>
            <span>User Manager</span>
          </a>
        </div>

        <div class="nav-links">
          <a routerLink="/users" routerLinkActive="active" class="nav-link">
            <i class="icon-list"></i>
            <span>Usuarios</span>
          </a>
          <a routerLink="/users/create" routerLinkActive="active" class="nav-link">
            <i class="icon-plus"></i>
            <span>Crear Usuario</span>
          </a>
        </div>

        <div class="nav-status">
          <div class="status-indicator" [class.online]="apiStatus()" [class.offline]="!apiStatus()">
            <div class="status-dot"></div>
            <span>{{ apiStatus() ? 'API Online' : 'API Offline' }}</span>
          </div>
        </div>
      </div>
    </nav>
  `,
    styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
    apiStatus = signal<boolean>(false);

    constructor(private userService: UserService) { }

    async ngOnInit() {
        await this.checkApiStatus();
        // Verificar cada 30 segundos
        setInterval(() => this.checkApiStatus(), 30000);
    }

    private async checkApiStatus() {
        const isOnline = await this.userService.healthCheck();
        this.apiStatus.set(isOnline);
    }
}
