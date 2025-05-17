class IUserRepository {
    /**
     * @param {import('../entities/user.entity').User} user
     * @returns {Promise<import('../entities/user.entity').User>}
     */
    async create(user) {
        throw new Error('Method not implemented');
    }

    /**
     * @param {number} id
     * @returns {Promise<import('../entities/user.entity').User | null>}
     */
    async findById(id) {
        throw new Error('Method not implemented');
    }

    /**
     * @returns {Promise<import('../entities/user.entity').User[]>}
     */
    async findAll() {
        throw new Error('Method not implemented');
    }

    /**
     * @param {number} id
     * @param {import('../entities/user.entity').User} userData
     * @returns {Promise<import('../entities/user.entity').User | null>}
     */
    async update(id, userData) {
        throw new Error('Method not implemented');
    }

    /**
     * @param {number} id
     * @returns {Promise<boolean>}
     */
    async delete(id) {
        throw new Error('Method not implemented');
    }
}

module.exports = IUserRepository;