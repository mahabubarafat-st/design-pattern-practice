const TaskRepository = require('./../infrastructure/taskRepository')

class TaskService {
    constructor() {
        this.taskRepo = new TaskRepository();
    }

    createTask(task) {
        return this.taskRepo.create(task);
    }

    getAllTasks() {
        return this.taskRepo.getAll();
    }

    getTaskById(id) {
        return this.taskRepo.getById(id);
    }

    updateTaskById(id, updatedTask) {
        return this.taskRepo.updateById(id, updatedTask);
    }

    deleteTaskById(id) {
        return this.taskRepo.deleteById(id);
    }


}

module.exports = TaskService;