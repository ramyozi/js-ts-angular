import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {TasksListComponent} from "./tasks-list/tasks-list.component";
import {HttpClientModule} from "@angular/common/http";
import {TaskService} from "./services/Task-service";
import {TaskInterface} from "./interfaces/task-interface";

@Component({
  selector: 'digi-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, TasksListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TaskService]
})
export class AppComponent {
  title: string = 'TODOLIST';
  tasks: TaskInterface[] = [];

  constructor(private taskService: TaskService) {
  }
}
