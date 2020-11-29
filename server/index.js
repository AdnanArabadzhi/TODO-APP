const { request } = require("express");
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());




app.post("/todos", async(req, res) => {
    try {
       const description = req.body.description;
       const weekDay = req.body.day;
       const importance = req.body.importance;
       console.log(description + '   asdasd   ' + weekDay + '     assas    ' + importance);
       const newTodo = await pool.query("INSERT INTO todo (description, weekday, importance) VALUES($1, $2, $3) RETURNING *", [description, weekDay, importance]);
       const id = newTodo.rows[0].todo_id;

       res.json(newTodo.rows[0] + newCategory);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/person", async(req, res) => {
    try {
        console.log(req);
        const name = req.body.name;
        const age = req.body.age;
        const gender = req.body.gender;
        const position = req.body.position;
        const todosID = req.body.todo;
        console.log(typeof parseInt(todosID));   
        console.log(name + '   T   ' + age + '     T    ' + gender + '     T    ' + position + '     T    ' + todosID);
       const newTodo = await pool.query("INSERT INTO person (name, age, gender, position, todosID) VALUES($1, $2, $3, $4, $5) RETURNING *", [name, age, gender, position, todosID]);
       res.json(newTodo);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/person", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM person");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message)
    }
});

app.post("/assign", async(req, res) => {
    let assignedAlready = false;
    try {
        const currentAssignments1 = await pool.query("SELECT * FROM employeeTodoRelation");
        const currentAssignments = currentAssignments1.rows;
        console.log(currentAssignments);

        const name = req.body.name;
        const todoDesc = req.body.todo;
        const employeeResult = await pool.query("SELECT id FROM person WHERE name = $1", [name]);
        const employeeid = employeeResult.rows[0].id;
        console.log(employeeid);
        console.log(todoDesc);

        const todoIdResult = await pool.query("SELECT * FROM todo WHERE todo_id IN ($1)", [todoDesc]);
        console.log(todoIdResult);
        const todoId = todoIdResult.rows[0].todo_id;
        console.log(todoId);


        const allAssignments = [];
        for(i = 0; i < currentAssignments.length;i++){
            console.log(currentAssignments[i]);
            if(employeeid === currentAssignments[i].employeeid && todoId === currentAssignments[i].todoid){
                assignedAlready = true;
            }
        }
        if(assignedAlready){
            // console.log(`Todo ${todoDesc} is already assigned to ${name}`);
            res.json(`Todo ${todoDesc} is already assigned to ${name}`);
        }else{
            const newTodo = await pool.query("INSERT INTO employeeTodoRelation (employeeid, todoid) VALUES($1, $2) RETURNING *", [employeeid, todoId]);
            res.json(newTodo);
        }

    } catch (err) {
        console.error(err.message);
    }
});

app.post("/search", async(req, res) => {
    try {
        let importance = req.body.selected;
        let name = req.body.selected3;
        let imporExist = false;
        let nameExist = false;
        let assignments = [];
        let importOUT = [];
        nameOUT = [];

        if(importance) {

            const impId = await pool.query("SELECT id FROM category WHERE importance IN ($1)", [importance]);
            importance = impId.rows[0];
            console.log(importance.id);
            imporExist = true;

        }
        // console.log(imporExist);
let imeto = 0;
        if(name) {

            let person1 = await pool.query("SELECT * FROM person WHERE name IN ($1)", [name]);
            const person = person1.rows[0].id;
            console.log(person);
            const todos = await pool.query("SELECT * FROM employeeTodoRelation WHERE employeeid IN ($1)", [person]);
            // console.log(todos.rows);
            nameExist = true;
            assignments = todos.rows;
            imeto = person;
        }
        
        console.log(imeto);
        console.log(nameExist);
        console.log(imporExist);
        const foundTodo = [];

        if(imporExist && nameExist) {
            
            for(let i = 0; i < assignments.length; i++) {
                const id_todo = assignments[i].todoid;
                
                const difficulty = await pool.query("SELECT * FROM todo WHERE todo_id IN ($1)", [id_todo]);
                if(difficulty.rows[0].importance === importance.id){
                    foundTodo.push(difficulty.rows[0])
                }
                
            }
            res.json(foundTodo);

        }else if(imporExist){
            const importOutput = await pool.query("SELECT * FROM todo WHERE importance IN ($1)", [importance.id])
            console.log(importOutput.rows);
            importOUT = importOutput.rows;
            console.log(importOUT)
            res.json(importOUT);

            
        }else if(nameExist){
            console.log('TUKAS SME');
            const nameOutput = await pool.query("SELECT * FROM  employeeTodoRelation WHERE employeeid IN ($1)", [imeto])
            console.log(nameOutput.rows);
            nameOUT = nameOutput.rows;
            console.log(nameOUT);
            res.json(nameOUT);

            
        }
        



        // const newTodo = await pool.query("SELECT * FROM todo WHERE importance = ($1) AND weekday = ($2)", [importance, weekDay]);
        // console.log('THIS IS NEWTODO' + newTodo);
        res.json(foundTodo);
    } catch (err) {
        console.log(err.message)
    }
})

// app.post("/todos", async(req, res) => {
//     try {
//        const description = req.body.description;
//     const importance = req.body.importance;
//     console.log(description + '   asdasd   ' + importance);
//        const newTodo = await pool.query("INSERT INTO todo (description, importance) VALUES($1, $2) RETURNING *", [description, importance]);
//        res.json(newTodo.rows[0].importance);
//     } catch (err) {
//         console.error(err.message);
//     }
// });



// app.post("/todos", async(req, res) => {
//     try {
//        const description = req.body.description;
//        const weekDay = req.body.day;
//        const newTodo = await pool.query("INSERT INTO todo (description, weekday) VALUES($1, $2) RETURNING *", [description, weekDay]);
//        res.json(newTodo.rows[0])
//     } catch (err) {
//         console.error(err.message);
//     }
// });

app.get("/todos", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message)
    }
});

app.get("/todos/importance/:id", async(req, res) => {
    try {
        const importance = req.params.id;
        console.log(req.params.id);
        const allTodos = await pool.query("SELECT * FROM todo WHERE importance = $1", [importance]);
        console.log(allTodos);
        res.json(allTodos.rows.id);
    } catch (err) {
        console.error(err.message)
    }
});

app.get("/todos/importance", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM category");
        console.log(allTodos);
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message)
    }
});

// app.get("/todos/importance/:id", async(req, res) => {
//     try {
//         const { id } = req.params;
//         console.log(id);
//         const allTodos = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
//         res.json(allTodos.rows);
//     } catch (err) {
//         console.error(err.message)
//     }
// });

app.get("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.put("/todos/complete/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const updateTodo = await pool.query(
            "UPDATE todo SET date_of_completion = now() WHERE todo_id = $1", 
            [id]
            );
            res.json("Todo was updated" );
    } catch (err) {
        console.error(err.message);
    }
});

app.put("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        console.log(id + '  -  ' + description);
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2", 
            [description, id]
            );
            res.json("Todo was updated" );
    } catch (err) {
        console.error(err.message);
    }
});

app.delete("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Todo was deleted");
    } catch (err) {
        console.error(err.message);
    }
})

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
}); 

