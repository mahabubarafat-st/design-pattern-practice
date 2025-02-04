const Task = require('./../domain/task')

let tasks = [];
let nextId = 1;

class TaskRepository {
    create(task) {
        const newTask = new Task(nextId++, task.title, task.description);
        tasks.push(newTask);
        return newTask;
    }

    getAll() {
        return tasks;
    }

    getById(id) {
        return tasks.find((task) => task.id === Number(id));
    }

    updateById(id, updatedTask) {
        const index = tasks.findIndex((task) => task.id === Number(id));
        if (index === -1) return null;
        tasks[index] = { ...tasks[index], ...updatedTask };
        return tasks[index];
    }

    deleteById(id) {
        const index = tasks.findIndex((task) => task.id === Number(id));
        if (index === -1) return false;
        tasks.splice(index, 1)
        return true;
    }
}

module.exports = TaskRepository;