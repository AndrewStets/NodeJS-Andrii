const User = require('../dataBase/User');

module.exports = {
    findByParams: async (filter = {}) => {
        return User.find(filter);
    },

    findOneByParams: async (filter = {}) => {
        return User.findOne(filter);
    },

    findByIdWithCars: async (userId) => {
        const res = await User.aggregate([
            {
                $match: {
                    _id: userId
                }
            },
            {
                $lookup: {
                    from: 'cars',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'cars',
                }
            }
        ]);
        return res[0];
    },

    create: (userInfo) => {
        return User.create(userInfo);
    },

    updateOne: (userId, newInfo) => {
        return User.updateOne(userId, newInfo, { new: true });
    },

    deleteOne: (userId) => {
        return User.deleteOne(userId);
    },
};
