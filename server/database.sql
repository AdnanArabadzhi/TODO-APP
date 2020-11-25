CREATE DATABASE peantodo;

CREATE TABLE todo(
    weekday TEXT,
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);