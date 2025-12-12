import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUser.asObservable();

  private isLoggedIn = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor(private apiService: ApiService) {
    this.checkAuthStatus();
  }

  checkAuthStatus(): void {
    if (this.apiService.isAuthenticated()) {
      this.apiService.getCurrentUser().subscribe({
        next: (response) => {
          this.currentUser.next(response.user || response.data);
          this.isLoggedIn.next(true);
        },
        error: () => {
          this.logout();
        }
      });
    }
  }

  register(data: any): Observable<any> {
    return this.apiService.register(data);
  }

  login(credentials: any): Observable<any> {
    return this.apiService.login(credentials).pipe(
      // Handle login response
    );
  }

  logout(): void {
    this.apiService.logout().subscribe(
      () => {
        this.apiService.clearAuthToken();
        this.currentUser.next(null);
        this.isLoggedIn.next(false);
      },
      () => {
        this.apiService.clearAuthToken();
        this.currentUser.next(null);
        this.isLoggedIn.next(false);
      }
    );
  }

  setCurrentUser(user: any, token: string): void {
    this.currentUser.next(user);
    this.apiService.setAuthToken(token);
    this.isLoggedIn.next(true);
  }

  getCurrentUser(): any {
    return this.currentUser.value;
  }

  isStudent(): boolean {
    return this.currentUser.value?.role === 'STUDENT';
  }

  isOfficer(): boolean {
    return this.currentUser.value?.role === 'OFFICER';
  }

  isRegistrar(): boolean {
    return this.currentUser.value?.role === 'REGISTRAR';
  }

  isAdmin(): boolean {
    return this.currentUser.value?.role === 'ADMIN';
  }
}
