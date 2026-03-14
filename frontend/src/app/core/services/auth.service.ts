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

  // Lấy User Role từ JWT Token
  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      // Decode phần payload của JWT (nằm ở giữa 2 dấu chấm)
      const payload = token.split('.')[1];
      const decodedJson = atob(payload);
      const decoded = JSON.parse(decodedJson);
      // Django rest_framework_simplejwt không chứa role ngay lập tức trừ khi custom claim
      // Chờ đã: Token cần có Role, nếu không thì mình phải lấy role từ Local Storage.
      // Vì backend trả về: "user": { "role": "..." }, nên ta lưu luôn info vào localStorage thay vì chỉ token.
      return localStorage.getItem('user_role');
    } catch (e) {
      return null;
    }
  }

  // Hàm kiểm tra quyền Admin
  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  // Cập nhật hàm login để lấy thông tin role từ backend
  saveUserData(token: string, role: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_role', role);
    }
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