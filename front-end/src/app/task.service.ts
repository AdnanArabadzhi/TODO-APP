import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebrequestService } from './webrequest.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private service: WebrequestService) {
   }

  createList(description: string, day: string, importance: number) {
    console.log(description + ' T ' + day + ' T ' + importance);
    return this.service.post('todos', { description, day, importance })
  }
  createPerson(name: string, age: number, gender: string, position: any, todo: number) {
    console.log(name + ' T ' + age + ' T ' + gender + ' T ' + position + ' T ' + todo);
    return this.service.post('person', { name, age, gender, position, todo })
  }
  getPerson() {
    return this.service.get('person')
  }
  getSearch(searched: any) {
    return this.service.post(`search`, searched);
  }
  getImportance() {
    return this.service.get('todos/importance');
  }

  getTodos() {
    return this.service.get('todos');
  }

  assignTodo(name, todo) {

    return this.service.post('assign', {name, todo});
  }

  getTodosbyImp(id: any) {
    return this.service.get(`todos/importance/${id}`);
  }

  getTodosImp() {
    return this.service.get('todos/importance');
  }
  deleteTodo(id: string) {
    console.log(id);
    return this.service.delete(`todos/${id}`);
  }
  updateTodo(description: string, id: string) {
    console.log(description + '  ' + id);
    return this.service.put(`todos/${id}`,  { description:description } );
    this.getTodos();
  }
  completeTodo(id: string, payload: any) {
    return this.service.complete(`todos/complete/${id}`, payload);

  }

}
