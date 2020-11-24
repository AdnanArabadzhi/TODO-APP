import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { TodoCreateComponent } from './components/todo-create/todo-create.component';

const appRoutes: Route[] = [
  { path: '', component: TodoCreateComponent }
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