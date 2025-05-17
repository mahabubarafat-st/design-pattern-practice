const { IDeleteUserInputPort } = require('../../ports/user.ports');

class DeleteUserUseCase extends IDeleteUserInputPort {
    constructor(userRepository, presenter) {
        super();
        this.userRepository = userRepository;
        this.presenter = presenter;
    }
  
    async execute(id) {
        const success = await this.userRepository.delete(id);
        return this.presenter.present(success);
    }
}

module.exports = DeleteUserUseCase;