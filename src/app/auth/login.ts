import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['../magic.css'],
  imports: [RouterModule, CommonModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login(event: Event) {
    event.preventDefault();

    if (this.loginForm.invalid) {
      this.errorMessage = 'Please enter valid email and password';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const credentials = this.loginForm.value;

    // Call backend login API
    this.http.post<any>('http://localhost:8000/api/auth/login', credentials)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.successMessage = 'Login successful!';

          // Store token and user info
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));

          // Role-based redirect
          const role = response.user.role;
          switch(role) {
            case 'STUDENT':
              this.router.navigate(['/student']);
              break;
            case 'OFFICER':
              this.router.navigate(['/officer']);
              break;
            case 'REGISTRAR':
              this.router.navigate(['/registrar']);
              break;
            case 'ADMIN':
              this.router.navigate(['/admin']);
              break;
            default:
              this.router.navigate(['/login']);
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Login failed. Please try again.';
        }
      });
  }
}
