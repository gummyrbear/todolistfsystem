const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const filePath = 'todos.json';

const readTodos = () => {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

const writeTodos = (todos) => {
  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
};

app.get('/todos', (req, res) => {
  res.json(readTodos());
});

app.post('/todos', (req, res) => {
  const todos = readTodos();
  const todo = req.body;
  todos.push(todo);
  writeTodos(todos);
  res.status(201).json(todo);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
