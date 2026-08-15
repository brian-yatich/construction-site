import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ADMIN_API_BASE } from './admin-api.config';

const TOKEN_KEY = 'admin_access_token';
const ADMIN_KEY = 'admin_user';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
}

export interface LoginResponse {
  accessToken: string;
  admin: AdminUser;
}

@Injectable({ providedIn: 'root' })
export class AdminAuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly _token = signal<string | null>(localStorage.getItem(TOKEN_KEY));
  private readonly _admin = signal<AdminUser | null>(this.readStoredAdmin());

  readonly isAuthenticated = computed(() => !!this._token());
  readonly admin = this._admin.asReadonly();

  private readStoredAdmin(): AdminUser | null {
    const raw = localStorage.getItem(ADMIN_KEY);
    return raw ? (JSON.parse(raw) as AdminUser) : null;
  }

  getToken(): string | null {
    return this._token();
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${ADMIN_API_BASE}/auth/login`, { email, password }).pipe(
      tap((res) => {
        this._token.set(res.accessToken);
        this._admin.set(res.admin);
        localStorage.setItem(TOKEN_KEY, res.accessToken);
        localStorage.setItem(ADMIN_KEY, JSON.stringify(res.admin));
      }),
    );
  }

  logout(): void {
    this._token.set(null);
    this._admin.set(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_KEY);
    this.router.navigate(['/admin/login']);
  }
}
