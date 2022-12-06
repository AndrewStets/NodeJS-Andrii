const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ApiError = require('../error/ApiError');
const { ACCESS_SECRET, REFRESH_SECRET } = require('../config/config');
const { tokenTypeEnum } = require('../enum');

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),

    comparePasswords: async (hashPassword, password) => {
        const isPasswordsSame = await bcrypt.compare(password, hashPassword);

        if (!isPasswordsSame) {
            throw new ApiError('Wrong email or password', 400);
        }
    },




};
