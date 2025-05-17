const { IUpdateUserInputPort } = require('../../ports/user.ports');
const User = require('../../entities/user.entity');
const { UserResponseDTO } = require('../../dtos/user.dto');

class UpdateUserUseCase extends IUpdateUserInputPort {
    constructor(userRepository, presenter) {
        super();
        this.userRepository = userRepository;
        this.presenter = presenter;
    }
  
    async execute(id, updateUserDTO) {
        // Create a new User entity to validate the update data
        const validData = new User({ id, ...updateUserDTO });
        const updatedUser = await this.userRepository.update(id, validData);
        if (!updatedUser) return null;
        
        const responseDTO = UserResponseDTO.fromEntity(updatedUser);
        return this.presenter.present(responseDTO);
    }
}

module.exports = UpdateUserUseCase;