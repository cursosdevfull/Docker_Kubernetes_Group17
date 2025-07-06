import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/users',
        pathMatch: 'full'
    },
    {
        path: 'users',
        loadComponent: () => import('./components/user-list/user-list.component').then(m => m.UserListComponent)
    },
    {
        path: 'users/create',
        loadComponent: () => import('./components/user-form/user-form.component').then(m => m.UserFormComponent)
    },
    {
        path: 'users/:id',
        loadComponent: () => import('./components/user-detail/user-detail.component').then(m => m.UserDetailComponent)
    },
    {
        path: 'users/:id/edit',
        loadComponent: () => import('./components/user-form/user-form.component').then(m => m.UserFormComponent)
    },
    {
        path: '**',
        redirectTo: '/users'
    }
];
