import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard) },
  {
    path: 'admin',
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./admin/admin-dashboard.component/admin-dashboard.component').then(m => m.AdminDashboardComponent)
      },
      {
        path: 'analytics',
        loadComponent: () => import('./admin/analytics.component/analytics.component').then(m => m.AnalyticsComponent)
      },
      {
        path: 'user-management',
        loadComponent: () => import('./admin/user-management/user-management.component').then(m => m.UserManagementComponent)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];