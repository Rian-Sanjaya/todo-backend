const express = require('express');
const bodyParser = require('body-parser');
const uuidv1 = require('uuid/v1');
const todoModel = require('./model/todo');
const app = express();

// This will allow all requests from all origins to access your API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// set json function as global middleware
app.use(bodyParser.json())

//POST route to add a new item
app.post('/todo', (req, res, next) => {
    const todo = {
        id : uuidv1(),
        todo: req.body.todo,
        description: req.body.description
    };

    todoModel.push(todo);

    res.status(201).json({
         message: 'Post saved successfully!'
    });
})

// GET route to return a specific item
app.get('/todo/:id', (req, res, next) => {
    const todo = todoModel.filter( el => {
        return el.id === req.params.id;
    });

    res.status(200).json(todo);
});

// PUT route to edit a specific item
app.put('/todo/:id', (req, res, next) => {
    for (let i=0; i<todoModel.length; i++) {
        if (todoModel[i].id === req.params.id) {
            todoModel[i].todo = req.body.todo;
            todoModel[i].description = req.body.description;

            res.status(201).json({
                message: 'Todo updated successfully!'
            });

            break;
        }
    }
});

// DELETE route to delete a specific item
app.delete('/todo/:id', (req, res, next) => {
    for (let i=0; i<todoModel.length; i++) {
        if (todoModel[i].id === req.params.id) {
            todoModel.splice(i, 1);

            res.status(200).json({
                message: 'Deleted todo successfully!'
            });

            break;
        }
    }
});

// GET route to return all todos
app.get('/todo', (req, res, next) => {
    res.status(200).json(todoModel);
});

module.exports = app
