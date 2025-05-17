const IUserRepository = require('../../domain/repositories/user.repository.interface');

// user.repository.js (Database adapter)
class UserRepository extends IUserRepository {
    constructor() {
        super();
        this.users = new Map();
        this.nextId = 1;
    }
  
    async create(user) {
        const id = this.nextId++;
        const userWithId = { ...user, id };
        this.users.set(id, userWithId);
        return userWithId;
    }

    async findById(id) {
        return this.users.get(id) || null;
    }

    async findAll() {
        return Array.from(this.users.values());
    }

    async update(id, userData) {
        if (!this.users.has(id)) {
            return null;
        }
        const updated = { ...this.users.get(id), ...userData };
        this.users.set(id, updated);
        return updated;
    }

    async delete(id) {
        return this.users.delete(id);
    }
}

module.exports = UserRepository;
