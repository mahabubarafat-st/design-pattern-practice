const { IGetUserInputPort } = require('../../ports/user.ports');
const { UserResponseDTO } = require('../../dtos/user.dto');

class GetUserUseCase extends IGetUserInputPort {
    constructor(userRepository, presenter) {
        super();
        this.userRepository = userRepository;
        this.presenter = presenter;
    }
  
    async execute(id) {
        const user = await this.userRepository.findById(id);
        if (!user) return null;
        const responseDTO = UserResponseDTO.fromEntity(user);
        return this.presenter.present(responseDTO);
    }
}

module.exports = GetUserUseCase;