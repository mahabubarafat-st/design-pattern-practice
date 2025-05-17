const express = require('express');

function createUserRouter(userController) {
    const router = express.Router();

    router.post('/users', userController.createUser);
    router.get('/users', userController.getAllUsers);
    router.get('/users/:id', userController.getUser);
    router.put('/users/:id', userController.updateUser);
    router.delete('/users/:id', userController.deleteUser);

    return router;
}

module.exports = createUserRouter;