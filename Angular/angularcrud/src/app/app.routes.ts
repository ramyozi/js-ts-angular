import { Routes } from '@angular/router';
import {ProductAddComponent} from "./product-add/product-add.component";
import {ProductEditComponent} from "./product-edit/product-edit.component";
import {ProductGetComponent} from "./product-get/product-get.component";
import {NotFoundComponent} from "./not-found/not-found.component";

export const routes: Routes = [
  { path: '', redirectTo: 'get', pathMatch: 'full' },
  { path: 'add', component: ProductAddComponent },
  { path: 'edit/:id', component: ProductEditComponent },
  { path: 'get', component: ProductGetComponent },
  { path: '**', component: NotFoundComponent }
];
