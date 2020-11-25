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

  constructor(private service: TaskService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        console.log(params);
      }
    )
    this.service.getTodos().subscribe((todos: any) => {
      this.todos = todos;
    })

  }

  createNewTask(description: string) {
    this.service.createList(description).subscribe((response: any) => {
      console.log(response);
    })
    this.service.getTodos().subscribe((todos: any) => {
      this.todos = todos;
    })
  }
  deleteTask(id: string) {
    this.service.deleteTodo(id).subscribe((response: any) => {
      console.log(response);
    });
    this.service.getTodos().subscribe((todos: any) => {
      this.todos = todos;
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
      this.service.updateTodo(description, id).subscribe((response: any) => {
        console.log(response);
        this.service.getTodos().subscribe((todos: any) => {
          this.todos = todos;
        })
        this.buttonClicked = false;
      })
  }
}
