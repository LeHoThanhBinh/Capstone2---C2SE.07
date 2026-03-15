import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/auth/login';

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(this.apiUrl, credentials);
  }

  saveToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  saveUserData(token: string, role: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_role', role);
    }
  }

  saveRole(role: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_role', role);
    }
  }

  getRole(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('user_role');
    }
    return null;
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_role');
    }
  }

  register(userData: any): Observable<any> {
    return this.http.post('http://localhost:8000/api/auth/register', userData);
  }
}