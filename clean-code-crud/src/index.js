// composition-root.js
const express = require('express');
const UserRepository = require('./infrastructure/database/user.repository');
const CreateUserUseCase = require('./domain/use-cases/user/create-user.use-cases');
const GetUserUseCase = require('./domain/use-cases/user/get-user.use-case');
const GetAllUsersUseCase = require('./domain/use-cases/user/get-all-users.use-case');
const UpdateUserUseCase = require('./domain/use-cases/user/update-user.use-case');
const DeleteUserUseCase = require('./domain/use-cases/user/delete-user.use-case');
const UserController = require('./infrastructure/web/express/user.controller');
const {
    UserPresenter,
    GetUserPresenter,
    ListUsersPresenter,
    UpdateUserPresenter,
    DeleteUserPresenter
} = require('./infrastructure/web/express/user.presenter');
const createUserRouter = require('./infrastructure/web/express/routes');

function configureContainer(database) {
  // Initialize infrastructure
  const userRepository = new UserRepository(database);
  
  // Initialize presenters
  const presenters = {
      create: new UserPresenter(),
      get: new GetUserPresenter(),
      list: new ListUsersPresenter(),
      update: new UpdateUserPresenter(),
      delete: new DeleteUserPresenter()
  };

  // Initialize use cases with repository and presenters
  const useCases = {
      create: new CreateUserUseCase(userRepository, presenters.create),
      get: new GetUserUseCase(userRepository, presenters.get),
      getAll: new GetAllUsersUseCase(userRepository, presenters.list),
      update: new UpdateUserUseCase(userRepository, presenters.update),
      delete: new DeleteUserUseCase(userRepository, presenters.delete)
  };

  // Initialize controller
  const userController = new UserController(useCases);

  // Create Express app
  const app = express();
  app.use(express.json());

  // Set up routes
  const userRouter = createUserRouter(userController);
  app.use('/api', userRouter);

  // Error handling middleware
  app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ error: 'Something went wrong!' });
  });

  return app;
}

// Start server
if (require.main === module) {
  const app = configureApp();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = { configureApp };
