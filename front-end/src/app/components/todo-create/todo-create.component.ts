import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css']
})
export class TodoCreateComponent implements OnInit {

  buttonClicked: any;
  todos: any;
  description: string;
  id: string;
  weekDays: any;
  day: string;
  currentDay: string;

  constructor(private service: TaskService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    console.log(this.weekDays);
    this.route.params.subscribe(
      (params: Params) => {
        console.log(params);
      }
    )
  }

  getList(currentDay: string) {
    this.service.getTodos().subscribe((todos: any) => {
      this.currentDay = currentDay; 
      const newnew = [];
      for(let i = 0; i < todos.length; i++){
        if(this.currentDay === todos[i].weekday){
          newnew.push(todos[i])
        }
      }
      this.todos = newnew;
    })
  }

  createNewTask(description: string, day: string) {
    console.log(description + ' - ' + day);
    this.service.createList(description, day).subscribe((response: any) => {
      console.log(response);
    })
    this.service.getTodos().subscribe((todos: any) => {
      const newnew = [];
      for(let i = 0; i < todos.length; i++){
        if(this.currentDay === todos[i].weekday){
          newnew.push(todos[i])
        }
      }
      this.todos = newnew;
    })
  }
  deleteTask(id: string) {
    this.service.deleteTodo(id).subscribe((response: any) => {
      console.log(response);
    });
    this.service.getTodos().subscribe((todos: any) => {
       const newnew = [];
      for(let i = 0; i < todos.length; i++){
        if(this.currentDay === todos[i].weekday){
          newnew.push(todos[i])
        }
      }
      this.todos = newnew;
    })
  }
  editTask(description: string, id: string) {
    if(description){
    this.buttonClicked = true;
    this.description = description;
    this.id = id;
    console.log(this.description);
    console.log(this.id);
    }
  }
    editTodo(description: string, id: string) {
      console.log(this.currentDay + '    tva e');
      this.service.updateTodo(description, id).subscribe((response: any) => {
        console.log(response);
        this.service.getTodos().subscribe((todos: any) => {
          const newnew = [];
      for(let i = 0; i < todos.length; i++){
        if(this.currentDay === todos[i].weekday){
          newnew.push(todos[i])
        }
      }
      this.todos = newnew;
        })
        this.buttonClicked = false;
      })
  }
}
