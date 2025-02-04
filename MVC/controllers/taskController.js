const taskModel = require('./../models/taskModel');

const createTask = (req, res) => {
  const task = taskModel.create(req.body);
  res.status(201).json(task);
};

const getAllTasks = (req, res) => {
  const tasks = taskModel.getAll();
  res.json(tasks);
};

const getTaskById = (req, res) => {
  const task = taskModel.getById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
};

const updateTask = (req, res) => {
  const task = taskModel.updateById(req.params.id, req.body);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
};

const deleteTask = (req, res) => {
  const deleted = taskModel.deleteById(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Task not found' });
  res.status(204).send();
};

module.exports = { createTask, getAllTasks, getTaskById, updateTask, deleteTask };