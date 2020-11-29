import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  list: any;

  constructor(private service: TaskService) { }

  ngOnInit(): void {
    this.service.getPerson().subscribe((response: any) => {
      this.list = response;
      console.log(this.list);
    })
  }

}
