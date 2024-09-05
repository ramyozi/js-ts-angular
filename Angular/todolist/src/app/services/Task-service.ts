
import { Injectable } from '@angular/core';
import {TaskInterface} from "../interfaces/task-interface";
import {HttpClient} from "@angular/common/http";
import {Observable, of, tap, throwError} from "rxjs";

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

  toggleTaskStatus(taskId: string, currentTasks: TaskInterface[]): Observable<TaskInterface[]> {
    const taskIndex = currentTasks.findIndex((t) => t.id.toString() === taskId);

    if (taskIndex === -1) {
      console.error(`Tâche avec l'ID ${taskId} non trouvée`);
      return throwError(() => new Error(`Tâche avec l'ID ${taskId} non trouvée`));
    }

    currentTasks[taskIndex].done = !currentTasks[taskIndex].done; // je change le statut de la tâche
    console.log('Tâche mise à jour:', currentTasks[taskIndex]);

    /*
        On utilise `of` ici pour créer un observable qui balance direct la
      liste mise à jour des tâches.

      ressources: 
      https://stackoverflow.com/questions/47889210/why-we-should-use-rxjs-of-function
      https://rxjs.dev/api/index/function/of
      */
    return of([...currentTasks]);
  }
  addTask(newTask: TaskInterface): Observable<TaskInterface> {
    const url = 'http://localhost:3000/tasks';
    return this.http.post<TaskInterface>(url, newTask).pipe(
      tap((addedTask) => {
        console.log('Nouvelle tâche ajoutée :', addedTask);
      })
    );
  }
}
