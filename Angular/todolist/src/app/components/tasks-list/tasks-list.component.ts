import {Component, Input, OnInit} from '@angular/core';
import {TaskComponent} from "./task/task.component";
import {CommonModule} from "@angular/common";
import {TaskInterface} from "../../interfaces/task-interface";
import {TaskService} from "../../services/Task-service";
import {BehaviorSubject, Observable} from "rxjs";
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
  private tasksSubject = new BehaviorSubject<TaskInterface[]>([]);
  showCreateForm: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    // chargement des tâches depuis le fichier JSON
    /*this.taskService.loadTasksFromJson().subscribe(

    );*/

    // chargement des tâches depuis le serveur
    this.taskService.loadTasksFromServer().subscribe({
      next: (tasksFromServer) => {
        this.tasksSubject.next(tasksFromServer);
      },
      error: (error) => console.error('Error loading tasks from server:', error)
    });



    this.tasks$ = this.tasksSubject.asObservable();

    // On s'abonne à l'observable 'tasks$' pour écouter les changements de tasks
    /*this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks; // màj
    });*/

  }

  onTaskStatusChange(taskId: string) {
    const currentTasks = this.tasksSubject.value;

    // je trouve l'index de la tâche à modifier
    const taskIndex = currentTasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
      const updatedTask = { ...currentTasks[taskIndex], done: !currentTasks[taskIndex].done };

      // le patch de la tâche
      this.taskService.patchTask(taskId, { done: updatedTask.done }).subscribe({
        next: () => {
          currentTasks[taskIndex] = updatedTask;
          this.tasksSubject.next([...currentTasks]);
        },
        error: (error) => console.error('Error updating task status:', error)
      });
    }
  }

  toggleCreateForm() {
    this.showCreateForm = !this.showCreateForm;
  }

  onTaskCreated(newTask: TaskInterface) {
    this.taskService.addTask(newTask).subscribe({
      next: (addedTask) => {
        // màj de la liste des tâches
        const tasks = this.tasksSubject.value;
        tasks.push(addedTask);
        this.tasksSubject.next([...tasks]); // faire une copie du tableau
        console.log('Task successfully added:', addedTask);
        this.showCreateForm = false;
      },
      error: (error) => console.error('Erreur lors de l\'ajout de la tâche :', error)
    });
  }
}
