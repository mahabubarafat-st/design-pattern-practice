const TaskService = require('./../application/taskService')
const taskSrvc = new TaskService();


const createTask = (req, res) => {
    const task = taskSrvc.createTask(req.body);
    res.status(201).json(task);
}

const getAllTasks = (req, res) => {
    const tasks = taskSrvc.getAllTasks();
    res.json(tasks)
}

const getTaskById = (req, res) => {
    const task = taskSrvc.getTaskById(req.params.id);
    if (!task) {
        return res.status(404).json({ 'message': 'Task was not found' })
    }
    res.json(task)
}

const updateTask = (req, res) => {
    const task = taskSrvc.updateTaskById(req.params.id, req.body);
    if (!task) {
        return res.status(404).json({ 'message': 'Task was not found for update' })

    }
    res.json(task)
}

const deleteTask = (req, res) => {
    const deletedTask = taskSrvc.deleteTaskById(req.params.id);
    if (!deletedTask) {
        return res.status(404).json({ 'message': 'did not found any task to delete' })
    }
    res.status(204).json({'message': 'Task was deleted successfully'});
}

module.exports = { createTask, getAllTasks, getTaskById, updateTask, deleteTask }