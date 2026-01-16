import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importación limpia
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Task {
  _id?: string;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = environment.apiUrl + '/tasks';

  constructor(private http: HttpClient) {}

  // 1. FUNCIÓN AUXILIAR: Crea la llave de acceso (headers) automáticamente
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // 2. AHORA TODAS LAS FUNCIONES USAN { headers }
  getTasks(): Observable<Task[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Task[]>(this.apiUrl, { headers });
  }

  addTask(title: string): Observable<Task> {
    const headers = this.getAuthHeaders(); // <-- Importante
    return this.http.post<Task>(this.apiUrl, { title }, { headers });
  }

  toggleTask(id: string): Observable<Task> {
    const headers = this.getAuthHeaders();
    // En el PUT, los headers van como tercer argumento
    return this.http.put<Task>(`${this.apiUrl}/${id}`, {}, { headers });
  }

  deleteTask(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}
