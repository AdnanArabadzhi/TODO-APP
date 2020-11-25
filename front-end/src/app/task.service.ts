import { Injectable } from '@angular/core';
import { WebrequestService } from './webrequest.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private service: WebrequestService) { }

  createList(description: string) {
    return this.service.post('todos', { description })
  }

  getTodos() {
    return this.service.get('todos');
  }
  deleteTodo(id: string) {
    console.log(id);
    return this.service.delete(`todos/${id}`);
  }
  updateTodo(description: string, id: string) {
    console.log(description + '  ' + id);
    return this.service.put(`todos/${id}`, { description });
  }
}
