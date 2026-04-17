const prisma = require('../prisma');

async function getAllTasks(req, res) {
  const tasks = await prisma.task.findMany({
    where: { userId: req.user.id },
  });
  return res.json(tasks);
}

async function getTaskById(req, res) {
  const task = await prisma.task.findFirst({
    where: { id: Number(req.params.id), userId: req.user.id },
  });
  if (!task) return res.status(404).json({ error: 'Tarefa não encontrada.' });
  return res.json(task);
}

async function createTask(req, res) {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: 'O título é obrigatório.' });

  const task = await prisma.task.create({
    data: { title, description, userId: req.user.id },
  });
  return res.status(201).json(task);
}

async function updateTask(req, res) {
  const { title, description, done } = req.body;
  const task = await prisma.task.findFirst({
    where: { id: Number(req.params.id), userId: req.user.id },
  });
  if (!task) return res.status(404).json({ error: 'Tarefa não encontrada.' });

  const updated = await prisma.task.update({
    where: { id: Number(req.params.id) },
    data: { title, description, done },
  });
  return res.json(updated);
}

async function deleteTask(req, res) {
  const task = await prisma.task.findFirst({
    where: { id: Number(req.params.id), userId: req.user.id },
  });
  if (!task) return res.status(404).json({ error: 'Tarefa não encontrada.' });

  await prisma.task.delete({ where: { id: Number(req.params.id) } });
  return res.status(204).send();
}

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };