import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {TaskInterface} from "../../interfaces/task-interface";

@Component({
  selector: 'digi-create-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-task-form.component.html',
  styleUrl: './create-task-form.component.css'
})
export class TaskCreateFormComponent implements OnInit {
  @Output() taskCreated = new EventEmitter<TaskInterface>();
  createForm!: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      done: [false],
      comment: [''],
      cost: [''],
    });
  }

  onSubmit() {
    if (this.createForm.valid) {
      console.log('Tâche créée:', this.createForm.value);
      this.taskCreated.emit(this.createForm.value);
      this.createForm.reset();
    }

  }
}
