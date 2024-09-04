import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { CommonModule } from '@angular/common';
import {TasksListComponent} from "./components/tasks-list/tasks-list.component";
import {HttpClientModule} from "@angular/common/http";
import {TaskService} from "./services/Task-service";
import {TaskInterface} from "./interfaces/task-interface";

@Component({
  selector: 'digi-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, TasksListComponent, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TaskService]
})
export class AppComponent {
  title: string = 'TODOLIST';
  tasks: TaskInterface[] = [];

  constructor() {}
}
