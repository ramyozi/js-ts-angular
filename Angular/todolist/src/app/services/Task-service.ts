
import { Injectable } from '@angular/core';
import {TaskInterface} from "../interfaces/task-interface";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {
  }

  loadTasksFromServer(): Observable<TaskInterface[]> {
    const url = 'http://localhost:3000/tasks';
    const params = { status: 'PENDING' };
    console.log('Loading tasks from server:', url, params);

    return this.http.get<TaskInterface[]>(url, { params }).pipe(
      tap((tasksFromServer) => {
        console.log('Tasks loaded from server:', tasksFromServer);
      })
    );
  }

  loadTasksFromJson(): Observable<TaskInterface[]> {
    return this.http.get<TaskInterface[]>('assets/data.json').pipe(
      tap((data) => {
        console.log('Tasks loaded from JSON:', data);
      })
    );
  }

  patchTask(taskId: string, updates: Partial<TaskInterface>): Observable<TaskInterface> {
    const url = `http://localhost:3000/tasks/${taskId}`;
    return this.http.patch<TaskInterface>(url, updates).pipe(
      tap((updatedTask) => {
        console.log('Task updated:', updatedTask);
      })
    );
  }

  addTask(newTask: TaskInterface): Observable<TaskInterface> {
    const url = 'http://localhost:3000/tasks';
    return this.http.post<TaskInterface>(url, newTask).pipe(
      tap((addedTask) => {
        console.log('Nouvelle tâche ajoutée :', addedTask);
      })
    );
  }

  deleteTask(taskId: string): Observable<void> {
    const url = `http://localhost:3000/tasks/${taskId}`;
    return this.http.delete<void>(url).pipe(
      tap(() => {
        console.log('Task deleted:', taskId);
      })
    );
  }
}
