import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/auth/login';

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(this.apiUrl, credentials);
  }

  // Thêm hàm lưu token vào localStorage
  saveToken(token: string): void {
    if (typeof window !== 'undefined') { // Kiểm tra để tránh lỗi SSR
      localStorage.setItem('auth_token', token);
    }
  }

  // Thêm hàm lấy token ra
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  // Hàm kiểm tra xem đã đăng nhập chưa (có token không)
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  // Hàm gọi API đăng ký
  register(userData: any): Observable<any> {
    return this.http.post('http://localhost:8000/api/auth/register', userData);
  }
}