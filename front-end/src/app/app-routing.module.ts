import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';

import { TodoCreateComponent } from './components/todo-create/todo-create.component';
import { TodoImportanceComponent } from './components/search-by/todo-importance.component';
import { TodosListComponent } from './components/todos-list/todos-list.component';

const appRoutes: Route[] = [
  {path: '', pathMatch: 'full', redirectTo: 'todo'},
  { path: 'todo', component: TodoCreateComponent },
  { path: 'todo/details', component: TodoImportanceComponent },
  { path: 'list', component: EmployeeListComponent },
  { path: 'todo/list', component: TodosListComponent },
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
