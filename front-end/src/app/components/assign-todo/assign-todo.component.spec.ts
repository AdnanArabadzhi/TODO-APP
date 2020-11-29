import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTodoComponent } from './assign-todo.component';

describe('AssignTodoComponent', () => {
  let component: AssignTodoComponent;
  let fixture: ComponentFixture<AssignTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignTodoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
