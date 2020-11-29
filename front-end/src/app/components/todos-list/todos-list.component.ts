import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})
export class TodosListComponent implements OnInit {

  todos: any;
  currentDay: any;
  description: any;
  buttonClicked: any;
  id: any;
  doneDeals: any;
  completed: any;


  constructor(private service: TaskService) { }

  ngOnInit(): void {
    this.service.getTodos().subscribe((response: any) => {
      this.todos = response;
      console.log(this.todos);
    })
  }
  

  
  // getList(currentDay: string) {
  //   this.service.getTodos().subscribe((todos: any) => {
  //     this.currentDay = currentDay; 
  //     this.clickedButton = currentDay;
  //     const newnew = [];
  //     for(let i = 0; i < todos.length; i++){
  //       if(this.currentDay === todos[i].weekday){
  //         newnew.push(todos[i])
  //         console.log(newnew);
  //       }
  //     }
  //     this.todos = newnew;
  //   })
  // }
  
  deleteTask(id: string) {
    this.service.deleteTodo(id).subscribe((response: any) => {
      console.log(response);
    });
    this.service.getTodos().subscribe((todos: any) => {
       const newnew = [];
    for(let i = 0; i < todos.length; i++){
        newnew.push(todos[i])
    }
    this.todos = newnew;
    this.buttonClicked = false;
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
        newnew.push(todos[i])
    }
    this.todos = newnew;
    this.buttonClicked = false;
      })
    })
  }
  // completeTodo(id: string, payload: any) {
  //   console.log(id);
  //   this.doneDeals = ['id'];
  //   console.log(this.doneDeals);
  //   this.service.completeTodo(id, payload).subscribe((response: any) => {
  //     this.completed = true;
  //     this.service.getTodos().subscribe((todos: any) => {
  //       const newnew = [];
  //       console.log(this.todos);
  //   for(let i = 0; i < todos.length; i++){
  //     if(this.currentDay === todos[i].weekday){
  //       newnew.push(todos[i])
  //       console.log(newnew);
  //     }
  //   }
  //   this.todos = newnew;
  //   console.log(this.todos);
  //   this.buttonClicked = false;
  //     })
  //   })
  // }
  }
