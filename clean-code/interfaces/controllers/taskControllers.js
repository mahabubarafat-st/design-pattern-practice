const TaskUseCases = require('./../../useCases/taskUseCases')
const TaskRepositoryImplementation = require('./../../infrastructure/taskRepositoryImplementation');

const taskRepository = new TaskRepositoryImplementation();
const taskUseCases = new TaskUseCases(taskRepository);

const createTaskController = (req, res) => {
    const task = taskUseCases.createTask(req.body);
    res.status(201).json(task)
}

const getAllTasksController = (req, res) => {
    const tasks = taskUseCases.getAllTasks();
    res.json(tasks)
}

const getTaskByIdController = (req, res) => {
    const task = taskUseCases.getTaskById(req.params.id);
    if (!task) {
        return res.status(404).json({ 'message': 'Task does not exists' })
    }
}

const updateTaskByIdController = (req, res) => {
    const task = taskUseCases.updateTaskById(req.params.id, req.body);
    if (!task) {
        return res.status(404).json({ 'message': 'Task not found to update' })
    }
    res.json(task);

}

const deleteTaskByIdController = (req, res) => {
    const deletedTask = taskUseCases.deleteTaskById(req.params.id);
    if (!deletedTask) {
        return res.status(404).json({ 'message': 'task was not found to delete' })
    }
    res.status(204).send();

}

module.exports = { createTaskController, getAllTasksController, getTaskByIdController, updateTaskByIdController, deleteTaskByIdController }