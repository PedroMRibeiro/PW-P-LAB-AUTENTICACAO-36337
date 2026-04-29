const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({ origin: '*' }));

app.use(express.json());

const authRoutes = require('./routes/auth.routes');
const tasksRoutes = require('./routes/tasks.routes');

app.use('/auth', authRoutes);
app.use('/tasks', tasksRoutes);

module.exports = app;