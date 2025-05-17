const { IListUsersInputPort } = require('../../ports/user.ports');
const { UserResponseDTO } = require('../../dtos/user.dto');

class GetAllUsersUseCase extends IListUsersInputPort {
    constructor(userRepository, presenter) {
        super();
        this.userRepository = userRepository;
        this.presenter = presenter;
    }
  
    async execute() {
        const users = await this.userRepository.findAll();
        const responseDTOs = users.map(user => UserResponseDTO.fromEntity(user));
        return this.presenter.present(responseDTOs);
    }
}

module.exports = GetAllUsersUseCase;