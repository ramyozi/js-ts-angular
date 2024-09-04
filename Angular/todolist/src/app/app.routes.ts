import { Routes } from '@angular/router';
import {TasksListComponent} from "./components/tasks-list/tasks-list.component";
import {AboutComponent} from "./components/about/about.component";

export const routes: Routes = [
  { path: '', component: TasksListComponent },
  { path: 'about', component: AboutComponent },
];
