const TaskRepository = require('./../interfaces/repositories/taskRepository')

//This line is actually doing this  class TaskUseCases implements TaskRepository
class TaskUseCases {
    constructor(taskRepository) {
        this.taskRepo = taskRepository;
    }

    createTask(task) {
        return this.taskRepo.create(task); //todo should get an error
    }

    getAllTasks() {
        return this.taskRepo.getAll();
    }

    getTaskById(id) {
        return this.taskRepo.getById(id);
    }

    updateTaskById(id, updatedTask) {
        return this.taskRepo.updateTaskById(id, updatedTask);
    }

    deleteTaskById(id) {
        return this.taskRepo.deleteTaskById(id);
    }
}

module.exports = TaskUseCases;