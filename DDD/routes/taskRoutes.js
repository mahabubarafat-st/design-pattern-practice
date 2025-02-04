const express = require('express');
const taskCtrl = require('./../controllers/taskController')

const router = express.Router();

router.post('/', taskCtrl.createTask);
router.get('/', taskCtrl.getAllTasks);
router.get('/:id', taskCtrl.getTaskById);
router.put('/:id', taskCtrl.updateTask);
router.delete('/:id', taskCtrl.deleteTask);


module.exports = router;