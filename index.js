const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let tasks = [];

app.get('/', (req, res) => {
  res.send(`
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Список задач</title>
        </head>
        <body>
            <h1>Список задач</h1>
            <form action="/add" method="POST">
                <input type="text" name="task" required placeholder="Введите новую задачу">
                <button type="submit">Добавить задачу</button>
            </form>
            <ul>
                ${tasks
                  .map(
                    (task, index) => `
                    <li>
                        ${task}
                        <form action="/delete" method="POST" style="display:inline;">
                            <input type="hidden" name="index" value="${index}">
                            <button type="submit">Удалить</button>
                        </form>
                    </li>
                `
                  )
                  .join('')}
            </ul>
        </body>
        </html>
    `);
});

app.post('/add', (req, res) => {
  const task = req.body.task;
  tasks.push(task);
  res.redirect('/');
});

app.post('/delete', (req, res) => {
  const index = req.body.index;
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
  }
  res.redirect('/');
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
