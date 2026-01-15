import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


export interface Task { //word
_id?: string; //el ? significa que el campo es opcional
title: string;
completed: boolean;
}

//cualquier página de tu app puede llamar a este servicio sin tener que crear una copia nueva cada vez.
@Injectable({
  providedIn: 'root',
})

//aqui se usa el HttpClient para hablar con el servidor
export class TaskService {
  private apiUrl = environment.apiUrl + '/tasks';
  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  addTask(title: string): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, { title });
  }

  toggleTask(id: string): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, {});
  }

  deleteTask(id: string): Observable<any> { //any porque no te va a devolver nada
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}