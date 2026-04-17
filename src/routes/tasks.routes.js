const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth.middleware');
const {
  getAllTasks, getTaskById, createTask, updateTask, deleteTask
} = require('../controllers/tasks.controller');

router.use(authenticateToken);

router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;