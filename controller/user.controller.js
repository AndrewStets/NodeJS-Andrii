const { userService } = require('../service');

module.exports = {
    getAllUsers: async (reg, res, next) => {
        try {
            const users = await userService.findByParams();

            res.json(users);
        }catch (e) {
            next(e)
        }
    },

    createUser: async (reg, res, next) => {
        try {
            const user = await userService.create(reg.body);

            res.status(201).json(user);
        }catch (e) {
            next(e);
        }
    },

    getUserById: async (reg, res, next) => {
        try {
            const user = await userService.findByIdWithCars(reg.user._id);

            res.json(user)
        }catch (e) {
            next(e)
        }
    },

    updateUser: async (reg, res, next) => {
        try {
            const newUserInfo = reg.body;
            const userId = reg.params.userId;

            const user = await userService.updateOne(userId, newUserInfo);

            res.status(201).json(user);
        }catch (e) {
            next(e);
        }
    },

    deleteUserById: async (reg, res, next) => {
        try {
            await userService.deleteOne(reg.params.userId)

            res.status(204).send('Ok');
        }catch (e) {
            next(e);
        }
    }
};