import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-assign-todo',
  templateUrl: './assign-todo.component.html',
  styleUrls: ['./assign-todo.component.css']
})
export class AssignTodoComponent implements OnInit {
  selected:any;
  selected2:any;
  employees: any;
  todos: any;
  idfromHTML: any;


  constructor(private service: TaskService) { }

  ngOnInit(): void {

    this.service.getPerson().subscribe((response: any) => {
      this.employees = response;
      console.log(this.employees);
  })
  this.service.getTodos().subscribe((response: any) => {
    this.todos = response;
    console.log(this.todos);
  })

}

assign(formData) {
console.log(formData);
const todo = formData.selected2;
const name = formData.selected;
const splited = todo.split('_', 2);
const todoId = Number(splited[1]); 
console.log(todoId + '  ++  ' + name);
console.log(splited);
const found = false;
// for(let i = 0; i < this.todos.length; i++) {
//   console.log(this.todos[i].description);
//   console.log(this.idfromHTML);
//   if(this.todos[i].description == todo){
//     const todoId = this.todos[i].todo_id;
//     console.log(todoId);
//     break;
//   }
// }
  return this.service.assignTodo(name, todoId).subscribe((response: any) => {
    console.log(response);
  })
}
}
