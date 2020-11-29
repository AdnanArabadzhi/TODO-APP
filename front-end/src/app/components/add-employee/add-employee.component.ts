import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  genders: any;
  positions: any;
  todos: any;
  chosenTodo: any;
  selected: any;

  constructor(private service: TaskService) { }

  ngOnInit(): void {
    this.service.getTodos().subscribe((response: any) => {
      this.todos = response;
      console.log(this.todos);
    })
  }

  createNewPerson(name, age, gender, position, todo) {
    // for (const[key, vallue] of Object.entries(todo)) {
    //   console.log(vallue);
    //   console.log(key);
    // }
    console.log(todo);

    console.log(name + ' - ' + age + ' - ' + gender + ' - ' + position + ' - ' + todo);
    this.service.createPerson(name, age, gender, position, todo).subscribe((response: any) => {
      console.log(response);
    })
  }

}
