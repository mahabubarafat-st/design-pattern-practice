## Key concepts
### Design pattern:
Types:
- Creational Patterns (How objects are created) : Singleton, Factory Method etc
- Structural Patterns (How objects are composed): Adapter, Decorator etc
- Behavioral Patterns (How objects interact): Observer, Strategy, State etc

Design patterns are reusable solutions to common problems in software design. They provide a template for how to structure code to solve specific issues. Examples include:
- Singleton: Ensures a class has only one instance.
- Factory: Creates objects without specifying the exact class.
- Observer: Allows objects to notify other objects of changes.

##  App Functionality

We'll create a simple Task Management App with the following functionality:

[learn-desgin-pattern.postman_collection.json](./resources/learn-desgin-pattern.postman_collection.json)



    Create a task.

    Get all tasks.

    Get a task by ID.

    Update a task.

    Delete a task.

---
## MVC
MVC (Model-View-Controller)

MVC is a design pattern that separates an application into three components:

    Model: Manages data and business logic.

    View: Handles presentation and user interface.

    Controller: Mediates between the Model and View.
Structure:
```BASH
mvc-app/
├── controllers/
│   └── taskController.js
├── models/
│   └── taskModel.js
├── routes/
│   └── taskRoutes.js
├── views/ (optional, for rendering HTML)
└── app.js
```
- App.js:
```JS
const express = require('express');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(express.json());

app.use('/tasks', taskRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```
- routes/taskRoutes.js
```JS
const express = require('express');
const taskController = require('./../controllers/taskController');

const router = express.Router();

router.post('/', taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
```
- controllers/taskControllers.js
```JS
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
```
- models/taskModel.js
```JS
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
```

---


---
## DDD : Domain Driven Design
DDD is an approach to software development that focuses on the core domain and domain logic. It emphasizes:

    Bounded Contexts: Clear boundaries around a specific domain.

    Entities: Objects with a unique identity.

    Value Objects: Objects without identity, defined by their attributes.

    Aggregates: Clusters of related objects treated as a single unit.

    Repositories: Manages the storage and retrieval of domain objects.

File Structure: 
```BASH
ddd-app/
├── domain/
│   └── task.js
├── infrastructure/
│   └── taskRepository.js
├── application/
│   └── taskService.js
├── controllers/
│   └── taskController.js
├── routes/
│   └── taskRoutes.js
└── app.js
```

- app.js
```js
const express = require('express');
const taskRouter = require('./routes/taskRoutes');

const app = express();
app.use(express.json());

app.use('/tasks', taskRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
```

- Task Router
```JS
const express = require('express');
const taskCtrl = require('./../controllers/taskController')

const router = express.Router();

router.post('/', taskCtrl.createTask);
router.get('/', taskCtrl.getAllTasks);
router.get('/:id', taskCtrl.getTaskById);
router.put('/:id', taskCtrl.updateTask);
router.delete('/:id', taskCtrl.deleteTask);


module.exports = router;
```

- Controller
```JS
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
```

- Service AKA application
```JS
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
```

- Repository AKA infrastructure
```JS
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
```

- BaseClass or DTO or the class or entity AKA Domain
```JS
class Task {
    constructor(id, title, description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }
}

module.exports = Task;
```

---
## Clean Code Architecture

```BASH
clean-architecture-app/
├── src/
│   ├── domain/
│   │   └── task.js
│   ├── useCases/
│   │   └── taskUseCases.js
│   ├── interfaces/
│   │   ├── controllers/
│   │   │   └── taskController.js
│   │   └── repositories/
│   │       └── taskRepository.js
│   ├── infrastructure/
│   │   └── taskRepositoryImpl.js
│   ├── routes/
│   │   └── taskRoutes.js
│   └── app.js
└── config/
    └── constants.js
	
```
