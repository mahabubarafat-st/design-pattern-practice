const { CreateUserDTO, UpdateUserDTO } = require('../../../domain/dtos/user.dto');
const {
    UserPresenter,
    GetUserPresenter,
    ListUsersPresenter,
    UpdateUserPresenter,
    DeleteUserPresenter
} = require('./user.presenter');

// user.controller.js
class UserController {
    constructor(useCases) {
        this.useCases = useCases;
        this.presenters = {
            create: new UserPresenter(),
            get: new GetUserPresenter(),
            list: new ListUsersPresenter(),
            update: new UpdateUserPresenter(),
            delete: new DeleteUserPresenter()
        };
    }

    createUser = async (req, res) => {
        try {
            const createUserDTO = new CreateUserDTO(req.body);
            const result = await this.useCases.create.execute(createUserDTO);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    getUser = async (req, res) => {
        try {
            const result = await this.useCases.get.execute(Number(req.params.id));
            if (!result) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    getAllUsers = async (req, res) => {
        try {
            const result = await this.useCases.getAll.execute();
            res.json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    updateUser = async (req, res) => {
        try {
            const updateUserDTO = new UpdateUserDTO(req.body);
            const result = await this.useCases.update.execute(
                Number(req.params.id),
                updateUserDTO
            );
            if (!result) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    deleteUser = async (req, res) => {
        try {
            const success = await this.useCases.delete.execute(Number(req.params.id));
            if (!success) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}

module.exports = UserController;
