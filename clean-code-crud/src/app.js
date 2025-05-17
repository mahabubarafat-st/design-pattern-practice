const express = require('express');
const UserRepository = require('./infrastructure/database/user.repository');
const CreateUserUseCase = require('./domain/use-cases/user/create-user.use-cases');
const GetUserUseCase = require('./domain/use-cases/user/get-user.use-case');
const GetAllUsersUseCase = require('./domain/use-cases/user/get-all-users.use-case');
const UpdateUserUseCase = require('./domain/use-cases/user/update-user.use-case');
const DeleteUserUseCase = require('./domain/use-cases/user/delete-user.use-case');
const UserController = require('./infrastructure/web/express/user.controller');
const createUserRouter = require('./infrastructure/web/express/routes');

// Create Express app
const app = express();
app.use(express.json());

// Initialize dependencies
const userRepository = new UserRepository();

// Initialize use cases
const userUseCases = {
    create: new CreateUserUseCase(userRepository),
    get: new GetUserUseCase(userRepository),
    getAll: new GetAllUsersUseCase(userRepository),
    update: new UpdateUserUseCase(userRepository),
    delete: new DeleteUserUseCase(userRepository)
};

// Initialize controller with all use cases
const userController = new UserController(userUseCases);

// Set up routes
const userRouter = createUserRouter(userController);
app.use('/api', userRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;