const { ICreateUserInputPort } = require('../../ports/user.ports');
const User = require('../../entities/user.entity');
const { UserResponseDTO } = require('../../dtos/user.dto');

// create-user.use-case.js
class CreateUserUseCase extends ICreateUserInputPort {
    constructor(userRepository, presenter) {
        super();
        this.userRepository = userRepository;
        this.presenter = presenter;
    }
  
    async execute(createUserDTO) {
        const user = new User(createUserDTO);
        const createdUser = await this.userRepository.create(user);
        const responseDTO = UserResponseDTO.fromEntity(createdUser);
        return this.presenter.present(responseDTO);
    }
}

module.exports = CreateUserUseCase;
