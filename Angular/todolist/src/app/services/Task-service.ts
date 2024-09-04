
import { Injectable } from '@angular/core';
import {TaskInterface} from "../interfaces/task-interface";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<TaskInterface[]>([]);

  // j'expose la liste des tâches comme un observable
  tasks$: Observable<TaskInterface[]> = this.tasksSubject.asObservable();

  constructor(private http: HttpClient) {
  }


  loadTasksFromJson(): Observable<TaskInterface[]> {
    return this.http.get<TaskInterface[]>('assets/data.json').pipe(
      tap((data) => {
          this.tasksSubject.next(data); // Met à jour le BehaviorSubject
        },
        (error) => {
          console.error('Erreur lors du chargement des tâches depuis JSON:', error);
        })
    );
  }


  toggleTaskStatus(taskId: string) {
    const currentTasks = this.tasksSubject.value;
    const task = currentTasks.find((t) => t.id === taskId);
    if (task) {
      task.done = !task.done;

      // on émet la nouvelle liste de tâches pour que tout le monde soit à jour
      this.tasksSubject.next([...currentTasks]);
    }
  }

  getTasks(): TaskInterface[] {
    return this.tasksSubject.value;
  }

}
