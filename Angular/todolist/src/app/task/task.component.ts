import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {TaskInterface} from "../interfaces/task-interface";
import {TaskService} from "../services/Task-service";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input() task: TaskInterface = {} as TaskInterface;

  constructor(private taskService: TaskService) {}

  toggleTaskStatus() {
    this.taskService.toggleTaskStatus(this.task.id);
  }
}
