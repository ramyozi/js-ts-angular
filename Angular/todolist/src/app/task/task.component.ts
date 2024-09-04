import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {TaskInterface} from "../interfaces/task-interface";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input() task!: TaskInterface;
  @Output() statusChange = new EventEmitter<string>();

  toggleTaskStatus() {
    this.statusChange.emit(this.task.id);
  }
}
