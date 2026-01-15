import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../services/task.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true, // Esto confirma que es independiente
  imports: [
    IonicModule, // <--- Esto soluciona el error de 'ion-header', 'ion-content', etc.
    CommonModule, // <--- Esto permite usar *ngFor y *ngIf
    FormsModule, // <--- Esto permite usar [(ngModel)]
  ],
})
export class HomePage implements OnInit {
  tasks: Task[] = []; //donde guardamos la lista de tareas que vienen de la base de datos
  newTaskTitle: string = ''; //donde se guarda lo que el usuario escribe en el input

  constructor(private taskService: TaskService) {} //aquí se inyecta el servicio TaskService de task.service.ts
  ngOnInit() {
    //Es un evento automático. En cuanto la pantalla se termina de cargar, ejecuta loadTasks()
    this.loadTasks();
  }
  loadTasks() {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }
  addTask() {
    if (!this.newTaskTitle.trim()) return; //No añade si está vacío
    this.taskService.addTask(this.newTaskTitle).subscribe((task) => {
      //enviar petición a la api
      this.tasks.push(task); //agregar tarea a la lista
      this.newTaskTitle = ''; // Limpia el input
    });
  }
  toggleTask(task: Task) {
    this.taskService.toggleTask(task._id!).subscribe((updatedTask) => {
      task.completed = updatedTask.completed;
    });
  }
  deleteTask(task: Task) {
    this.taskService.deleteTask(task._id!).subscribe(() => {
      this.tasks = this.tasks.filter((t) => t._id !== task._id);
    });
  }
}
