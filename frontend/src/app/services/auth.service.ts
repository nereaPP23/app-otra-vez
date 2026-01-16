import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth'; //url del servidor
  //BehaviorSubject, siempre recuerda el último estado (true si el usuario está dentro, false si fuera)
  private authState = new BehaviorSubject<boolean>(this.hasToken());
  constructor(private http: HttpClient, private router: Router) {}
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
  register(username: string, password: string) { //envia usuario y contraseña al servidor
    return this.http.post(`${this.apiUrl}/register`, {
      username,
      password,
    });
  }
  login(username: string, password: string) {
    return (
      this.http
        //llama a la ruta de login del servidor
        .post<{ token: string }>(`${this.apiUrl}/login`, { username, password })
        .pipe(
          tap((response) => {
            //guarda el token en localStorage
            localStorage.setItem('token', response.token);
            this.authState.next(true); //la app sabe que el usuario está dentro
          })
        )
    );
  }
  logout() {
    localStorage.removeItem('token');
    this.authState.next(false);
    this.router.navigate(['/login']);
  }
  isAuthenticated() {
    return this.authState.asObservable();
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}