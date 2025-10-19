const express = require('express');
const app = express();

app.use(express.json());


let todos = [];
let id = 1;

app.get('/', (req, res) => {
    res.json(todos);
});

app.post('/', (req, res) => {
    const { todo } = req.body;
    
    const newTodo = {
        id: id++,
        text: todo
    };
    
    todos.push(newTodo);
    res.json(newTodo);
});

app.delete('/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== todoId);
    res.json({ message: 'deleted' });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});