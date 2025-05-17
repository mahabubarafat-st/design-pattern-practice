const {
    ICreateUserOutputPort,
    IGetUserOutputPort,
    IListUsersOutputPort,
    IUpdateUserOutputPort,
    IDeleteUserOutputPort
} = require('../../../domain/ports/user.ports');

class UserPresenter extends ICreateUserOutputPort {
    async present(userResponseDTO) {
        return userResponseDTO;
    }
}

class GetUserPresenter extends IGetUserOutputPort {
    async present(userResponseDTO) {
        return userResponseDTO;
    }
}

class ListUsersPresenter extends IListUsersOutputPort {
    async present(userResponseDTOs) {
        return userResponseDTOs;
    }
}

class UpdateUserPresenter extends IUpdateUserOutputPort {
    async present(userResponseDTO) {
        return userResponseDTO;
    }
}

class DeleteUserPresenter extends IDeleteUserOutputPort {
    async present(success) {
        return success;
    }
}

module.exports = {
    UserPresenter,
    GetUserPresenter,
    ListUsersPresenter,
    UpdateUserPresenter,
    DeleteUserPresenter
};