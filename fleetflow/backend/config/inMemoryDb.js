// In-memory database for demo (replace with actual DB in production)
const users = [];

const db = {
  users: {
    findByEmail: (email) => users.find(u => u.email === email),
    findById: (id) => users.find(u => u.id === id),
    create: (userData) => {
      const user = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date()
      };
      users.push(user);
      return user;
    },
    getAll: () => users
  }
};

module.exports = db;
