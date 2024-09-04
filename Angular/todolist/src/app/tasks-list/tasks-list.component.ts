import {Component, Input, OnInit} from '@angular/core';
import {TaskComponent} from "../task/task.component";
import {CommonModule} from "@angular/common";
import {TaskInterface} from "../interfaces/task-interface";
import {TaskService} from "../services/Task-service";

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [CommonModule, TaskComponent],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent implements OnInit{
  @Input() tasks: TaskInterface[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
  }

  getTasks(): TaskInterface[] {
    return this.taskService.getTasks();
  }
}
