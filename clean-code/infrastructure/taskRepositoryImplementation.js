const TaskRepository = require('./../interfaces/repositories/taskRepository')
const Task = require('./../domain/task')

let tasksArray = [];
let nextId = 1;


class TaskRepositoryImplementation extends TaskRepository {
    createTaskRepo(task) {
        const newTask = new Task(nextId++, task.title, task.description);
        tasksArray.push(newTask);
        return newTask;
    }

    getAllTasksRepo() {
        return tasksArray;
    }

    getTaskByIdRepo(id) {
        return tasksArray.find((task) => task.id === Number(id));
    }

    updateTaskById(id, updatedTask) {
        const index = tasksArray.findIndex((task) => task.id === Number(id));
        if (index === -1) return null;
        tasksArray[index] = { ...tasksArray[index], ...updatedTask }
        return tasksArray[index];
    }

    deleteTaskById(id) {
        const index = tasksArray.findIndex((task) => task.id === Number(id));
        if (index === -1) return false;
        tasksArray.splice(index, 1)
        return true;
    }

}

module.exports = TaskRepositoryImplementation;