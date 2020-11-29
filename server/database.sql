CREATE DATABASE peantodo;

CREATE TABLE todo(
    weekday TEXT,
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

CREATE TABLE person(
    id SERIAL PRIMARY KEY,
    name VARCHAR(250),
    age int,
    gender VARCHAR(7) CHECK (gender IN ('MALE', 'FEMALE')),
    position VARCHAR(30) CHECK (position IN ('Duner', 'Junior', 'Senior', 'Menager', 'Boss')),
    todosID int REFERENCES todo(todo_id)
);

CREATE TABLE employeeTodoRelation(
    EmployeeId INT NOT NULL,
    TodoID INT NOT NULL,

    FOREIGN KEY (EmployeeId) REFERENCES person(id),
    FOREIGN KEY (TodoID) REFERENCES todo(todo_id)
);