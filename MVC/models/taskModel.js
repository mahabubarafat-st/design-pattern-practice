let tasks = [];
let nextId = 1;

const create = (task) => {
    const newTask = { id: nextId++, ...task };
    tasks.push(newTask);
    return newTask;
};

const getAll = () => tasks;

const getById = (id) => tasks.find((task) => task.id === Number(id));

const updateById = (id, updatedTask) => {
    const index = tasks.findIndex((task) => task.id === Number(id));
    if (index === -1) return null;
    tasks[index] = { ...tasks[index], ...updatedTask };
    return tasks[index];
};

const deleteById = (id) => {
    const index = tasks.findIndex((task) => task.id === Number(id));
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
};

module.exports = { create, getAll, getById, updateById, deleteById };