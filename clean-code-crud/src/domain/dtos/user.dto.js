class CreateUserDTO {
    constructor({ name, email }) {
        this.name = name;
        this.email = email;
    }
}

class UpdateUserDTO {
    constructor({ name, email }) {
        this.name = name;
        this.email = email;
    }
}

class UserResponseDTO {
    constructor({ id, name, email, createdAt }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = createdAt;
    }

    static fromEntity(user) {
        return new UserResponseDTO({
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        });
    }
}

module.exports = {
    CreateUserDTO,
    UpdateUserDTO,
    UserResponseDTO
};