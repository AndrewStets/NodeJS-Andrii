const { fileServices } = require('../service');

module.exports = {
    getAllUsers: async (reg, res, next) => {
        try {
            const users = await fileServices.reader();

            res.json(users);
        }catch (e) {
            next(e)
        }
    },

    create: async (reg, res, next) => {
        try {
            const userInfo = reg.body;
            const users = await fileServices.reader();

            const newUser = {
                name: userInfo.name,
                age: userInfo.age,
                id: users[users.length - 1].id + 1
            };
            users.push(newUser);

            await fileServices.writer(users);

            res.status(201).json(newUser);
        }catch (e) {
            next(e);
        }
    },

    getUserById: (reg, res, next) => {
        try {
            res.json(reg.user);

        }catch (e) {
            next(e)
        }
    },

    updateUser: async (reg, res, next) => {
        try {

        }catch (e) {
            next(e);
        }
    },

    deleteUser: async (reg, res, next) => {
        try {
            const { user, users } = reg;

            const index = users.findIndex((u) => u.id === user.id);
            users.slice(index, 1);

            await fileServices.writer(users);

            res.sendStatus(204);
        }catch (e) {
            next(e);
        }
    }
};