class ICreateUserInputPort {
    async execute(createUserDTO) {
        throw new Error('Method not implemented');
    }
}

class ICreateUserOutputPort {
    async present(userResponseDTO) {
        throw new Error('Method not implemented');
    }
}

class IGetUserInputPort {
    async execute(id) {
        throw new Error('Method not implemented');
    }
}

class IGetUserOutputPort {
    async present(userResponseDTO) {
        throw new Error('Method not implemented');
    }
}

class IListUsersInputPort {
    async execute() {
        throw new Error('Method not implemented');
    }
}

class IListUsersOutputPort {
    async present(userResponseDTOs) {
        throw new Error('Method not implemented');
    }
}

class IUpdateUserInputPort {
    async execute(id, updateUserDTO) {
        throw new Error('Method not implemented');
    }
}

class IUpdateUserOutputPort {
    async present(userResponseDTO) {
        throw new Error('Method not implemented');
    }
}

class IDeleteUserInputPort {
    async execute(id) {
        throw new Error('Method not implemented');
    }
}

class IDeleteUserOutputPort {
    async present(success) {
        throw new Error('Method not implemented');
    }
}

module.exports = {
    ICreateUserInputPort,
    ICreateUserOutputPort,
    IGetUserInputPort,
    IGetUserOutputPort,
    IListUsersInputPort,
    IListUsersOutputPort,
    IUpdateUserInputPort,
    IUpdateUserOutputPort,
    IDeleteUserInputPort,
    IDeleteUserOutputPort
};