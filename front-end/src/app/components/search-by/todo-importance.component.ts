import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-todo-importance',
  templateUrl: './todo-importance.component.html',
  styleUrls: ['./todo-importance.component.css']
})
export class TodoImportanceComponent implements OnInit {

  @ViewChild('form')
  htmlForm: NgForm;
  importance: any;
  clickedButton: any;
  clickedWithImportant: any;
  clickedWithName: any;
  todos:any;
  table: any;
  list: any;
  employees: any;
  id: any;
  weekDays: any;
  selected: any;
  selected2: any;
  selected3: any;
  newTodos: any;
  newNameTodos: any;
  newImporTodos: any;

  constructor(private service: TaskService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    this.table = this.route;
    console.log(this.table);
      

    this.service.getImportance().subscribe((id: any) => {
      this.list = id;
      console.log(this.list);

      this.service.getPerson().subscribe((response: any) => {
      this.employees = response;
      console.log(this.employees);
    })
    });


}
search(importance) {
      this.clickedButton = false;
      this.clickedWithImportant = false;
      this.clickedWithName = false;
  console.log(importance);
  if(importance.selected && importance.selected3){
    this.clickedButton = true;
  }else if(importance.selected3){
    this.clickedWithName = true;
  }else if(importance.selected) {
    this.clickedWithImportant = true;
  }
  this.service.getSearch(importance).subscribe((response: any) => {
    console.log(response);
    this.newTodos = response;
  })
};
}
