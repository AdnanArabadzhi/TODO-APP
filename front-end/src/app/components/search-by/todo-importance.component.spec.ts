import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoImportanceComponent } from './todo-importance.component';

describe('TodoImportanceComponent', () => {
  let component: TodoImportanceComponent;
  let fixture: ComponentFixture<TodoImportanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoImportanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoImportanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
