import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {TaskInterface} from "../interfaces/task-interface";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task!: TaskInterface;
  @Output() statusChange = new EventEmitter<string>();

  toggleTaskStatus() {
    console.log('Toggling status for task:', this.task.id); // Debug log

    this.statusChange.emit(this.task.id);
  }
}
