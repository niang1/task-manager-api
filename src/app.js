const express = require('express');
const hbs = require('hbs');
const path = require('path');
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');
const webRouter = require('./routes/app');

const publirDir = path.join(__dirname, '../public');
const viewsDir = path.join(__dirname, '../templates/views');
const partialDir = path.join(__dirname, '../templates/partials');

const app = express();
app.set('view engine', 'hbs');
app.set('views', viewsDir);
hbs.registerPartials(partialDir);

app.use(express.static(publirDir));

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.use(webRouter);

module.exports = app;
