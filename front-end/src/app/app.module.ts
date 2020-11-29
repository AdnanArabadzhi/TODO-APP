import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TodoCreateComponent } from './components/todo-create/todo-create.component';
import { TodoImportanceComponent } from './components/search-by/todo-importance.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { TodosListComponent } from './components/todos-list/todos-list.component';
import { AssignTodoComponent } from './components/assign-todo/assign-todo.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoCreateComponent,
    TodoImportanceComponent,
    NavbarComponent,
    AddEmployeeComponent,
    EmployeeListComponent,
    TodosListComponent,
    AssignTodoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
