import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api/auth';
  private readonly TOKEN_NAME = 'access_token';
 private userSubject = new BehaviorSubject<any | null>(null);
  public user$ = this.userSubject.asObservable(); 

  constructor(private http: HttpClient, private router: Router) {
      this.loadInitialUser();
   }

   private loadInitialUser(): void {
    const user = this.getUser();
    if (user) {
      this.userSubject.next(user);
    }
  }
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        const user = (response as any).user;
        this.setToken((response as any).access_token);
        this.setUser(user);
        this.userSubject.next(user); // On met à jour le BehaviorSubject
      })
    );
  }


   register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }
  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe({
      next: () => this.handleLogout(),
      error: () => this.handleLogout()
       });
  }

   private handleLogout(): void {
    this.removeToken();
    localStorage.removeItem('user');
    this.userSubject.next(null); // On informe que l'utilisateur est déconnecté
    this.router.navigate(['/auth/login']); // On redirige vers la page de connexion

  }

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user-profile`).pipe(
        tap(user => {
            this.setUser(user);
            this.userSubject.next(user);
        })
    );
  }

    
  private setToken(token: string): void {
    if (token) {
      localStorage.setItem(this.TOKEN_NAME, token);
    }
  }

  private removeToken(): void {
    localStorage.removeItem(this.TOKEN_NAME);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_NAME);
  }


   private setUser(user: any): void {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }
  

   public getUser(): any | null {
    if(this.userSubject.value) {
        return this.userSubject.value;
    }
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  }

  public getUserRole(): string | null {
      const user = this.getUser();
       return user && user.role ? user.role.nom : null;
  }
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
