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
  completed: any;
  doneDeals: Array<string>;
  clickedButton: string;
  importance: any;

  constructor(private service: TaskService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    this.importance = ['very important', 'important', 'not important'];

    this.route.params.subscribe(
      (params: Params) => {
        console.log(params);
      }
    )
  }


  createNewTask(description: string, day: string, importance: string) {
    let importanceNumber = 0;
    switch(importance) {
      case "very important":
        importanceNumber = 1;
        break;
        case "important":
        importanceNumber = 2;
        break;
        case "not important":
        importanceNumber = 3;
        break;
    }
    console.log(description + ' - ' + day);
    this.service.createList(description, day, importanceNumber).subscribe((response: any) => {
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


  getList(currentDay: string) {
    this.service.getTodos().subscribe((todos: any) => {
      this.currentDay = currentDay; 
      this.clickedButton = currentDay;
      const newnew = [];
      for(let i = 0; i < todos.length; i++){
        if(this.currentDay === todos[i].weekday){
          newnew.push(todos[i])
          console.log(newnew);
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

  
  completeTodo(id: string, payload: any) {
    console.log(id);
    this.doneDeals = ['id'];
    console.log(this.doneDeals);
    this.service.completeTodo(id, payload).subscribe((response: any) => {
      this.completed = true;
      this.service.getTodos().subscribe((todos: any) => {
        const newnew = [];
    for(let i = 0; i < todos.length; i++){
      if(this.currentDay === todos[i].weekday){
        newnew.push(todos[i])
      }
    }
    this.todos = newnew;
    this.buttonClicked = false;
      })
    })
  }
}
