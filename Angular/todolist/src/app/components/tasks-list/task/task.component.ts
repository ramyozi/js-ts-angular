import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {TaskInterface} from "../../../interfaces/task-interface";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TaskService} from "../../../services/Task-service";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{
  @Input() task!: TaskInterface;
  @Output() statusChange = new EventEmitter<string>();
  @Output() deleteTask = new EventEmitter<string>();
  updateForm!: FormGroup;
  isUpdating: boolean = false;

  constructor(private fb: FormBuilder, private taskService: TaskService) {}

  ngOnInit() {
    this.updateForm = this.fb.group({
      name: [this.task.name, Validators.required],
      done: [this.task.done],
      comment: [this.task.comment],
      cost: [this.task.cost],
    });
  }

  toggleTaskStatus() {
    this.statusChange.emit(this.task.id);
  }

  toggleUpdateForm() {
    this.isUpdating = !this.isUpdating;
  }

  onSubmitUpdate() {
    if (this.updateForm.valid) {
      const updatedTaskData: Partial<TaskInterface> = this.updateForm.value;
      this.taskService.patchTask(this.task.id, updatedTaskData).subscribe({
        next: (updatedTask) => {
          Object.assign(this.task, updatedTask);
          this.isUpdating = false;
        },
        error: (error) => console.error('Erreur lors de la mise à jour de la tâche :', error)
      });
    }
  }

  onDeleteTask() {
    if (confirm('Etes-vous sûr de vouloir supprimer cette tâche ?')) {
      this.taskService.deleteTask(this.task.id).subscribe({
        next: () => {
          this.deleteTask.emit(this.task.id);  // Emit the delete event to the parent
        },
        error: (error) => console.error('Erreur lors de la suppression de la tâche :', error)
      });
    }
  }
}
