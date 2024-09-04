
import { Injectable } from '@angular/core';
import {TaskInterface} from "../interfaces/task-interface";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public tasksSubject = new BehaviorSubject<TaskInterface[]>([]);
  tasks$: Observable<TaskInterface[]> = this.tasksSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  loadTasksFromServer(): void {
    const url = 'http://localhost:3000/tasks';
    const params = { status: 'PENDING' };
    console.log('Loading tasks from server:', url, params);

    this.http.get<TaskInterface[]>(url, { params }).pipe(
      tap((tasksFromServer) => {
        console.log('Tasks loaded from server:', tasksFromServer);
        this.tasksSubject.next(tasksFromServer); // Update the tasks state
      })
    ).subscribe({
      error: (error) => console.error('Error loading tasks from server:', error)
    });
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
    const taskIndex = currentTasks.findIndex((t) => t.id.toString() === taskId);

    if (taskIndex !== -1) {
      currentTasks[taskIndex].done = !currentTasks[taskIndex].done;
      this.tasksSubject.next([...currentTasks]);
      console.log('Tâche mise à jour:', currentTasks[taskIndex]);
    } else {
      console.error(`Tâche avec l'ID ${taskId} non trouvée`);
    }

  }

  getTasks(): Observable<TaskInterface[]> {
    return this.tasks$;
  }

  addTask(newTask: TaskInterface): void {
    const tasks = this.tasksSubject.value;
    tasks.push({ ...newTask, id: (tasks.length + 1).toString() });
    this.tasksSubject.next([...tasks]);
  }
}
