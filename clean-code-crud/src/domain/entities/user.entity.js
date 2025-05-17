class User {
    constructor({ id, name, email }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.createdAt = new Date();
        this.validate();
    }
  
    validate() {
        if (!this.email || !this.email.includes('@')) {
            throw new Error('Invalid email format');
        }
        if (!this.name || this.name.trim().length < 2) {
            throw new Error('Name must be at least 2 characters long');
        }
    }
}

module.exports = User;
