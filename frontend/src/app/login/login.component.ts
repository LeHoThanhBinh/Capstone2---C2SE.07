import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isPasswordVisible: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Đăng nhập thành công:', response);
          this.isLoading = false;

          // Lưu token và role
          this.authService.saveToken(response.access_token);
          this.authService.saveRole(response.role);

          // Phân quyền redirect
          if (response.role === 'admin') {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        },
        error: (error) => {
          console.error('Lỗi từ Server:', error);
          this.isLoading = false;
          this.errorMessage = error.error?.error || 'Tài khoản hoặc mật khẩu không chính xác. Vui lòng thử lại!';
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  loginWithGoogle(): void {
    console.log('Xử lý đăng nhập bằng Google...');
  }
}