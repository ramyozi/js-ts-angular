import {Component, Input, OnInit} from '@angular/core';
import {TaskComponent} from "./task/task.component";
import {CommonModule} from "@angular/common";
import {TaskInterface} from "../../interfaces/task-interface";
import {TaskService} from "../../services/Task-service";
import {Observable} from "rxjs";
import {TaskCreateFormComponent} from "../../forms/create-task-form/create-task-form.component";

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [CommonModule, TaskComponent, TaskCreateFormComponent],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent implements OnInit{
  tasks$!: Observable<TaskInterface[]>;
  showCreateForm: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    // chargement des tâches depuis le fichier JSON
    /*this.taskService.loadTasksFromJson().subscribe(

    );*/

    // chargement des tâches depuis le serveur
    this.taskService.loadTasksFromServer();



    this.tasks$ = this.taskService.getTasks();

    // On s'abonne à l'observable 'tasks$' pour écouter les changements de tasks
    /*this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks; // màj
    });*/

  }

  onTaskStatusChange(taskId: string) {
    // On demande au service
    this.taskService.toggleTaskStatus(taskId);
  }

  toggleCreateForm() {
    this.showCreateForm = !this.showCreateForm;
  }

  onTaskCreated(newTask: TaskInterface) {
    this.taskService.addTask(newTask);
    this.showCreateForm = false;
  }
}
