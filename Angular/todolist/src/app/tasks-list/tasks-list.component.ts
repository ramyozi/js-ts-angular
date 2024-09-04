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
  @Input() tasks!: TaskInterface[];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    // chargement des tâches
    this.taskService.loadTasksFromJson().subscribe(() => {
      console.log('Tâches chargées avec succès');
    });

    // On s'abonne à l'observable 'tasks$' pour écouter les changements de tasks
    this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks; // màj
    });
  }

  onTaskStatusChange(taskId: string) {

    // On demande au service
    this.taskService.toggleTaskStatus(taskId);
  }
}
