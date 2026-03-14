import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { Dashboard } from './dashboard/dashboard';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
 
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'admin/dashboard', component: Dashboard, canActivate: [authGuard, adminGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }  // Mặc định vào login
];