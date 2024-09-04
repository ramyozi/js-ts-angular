
import { Injectable } from '@angular/core';
import {TaskInterface} from "../interfaces/task-interface";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: TaskInterface[] = [];

  constructor(private http: HttpClient) {
    this.loadTasksFromJson();
  }

  private loadTasksFromJson(): void {
    this.http.get<TaskInterface[]>('assets/data.json').subscribe(
      (data) => {
        this.tasks = data;
        console.log('Tasks loaded from JSON:', this.tasks);
      },
      (error) => {
        console.error('Error loading tasks from JSON:', error);
      }
    );
  }

  subscribeTasks(tasks: TaskInterface[]) {
    this.tasks = tasks;
  }

  toggleTaskStatus(taskId: string) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      task.done = !task.done;
    }
  }

  getTasks(): TaskInterface[] {
    return this.tasks;
  }

}
