const User = require('../dataBase/User');
const ApiError = require('../error/ApiError');
const userValidator = require('../validator/user.validator');
const commonValidator = require('../validator/common.validators');


module.exports = {
    getUserDynamically: async (fieldName, from = 'body', dbField = fieldName) => {
        try {
            const fieldToSearch = req[from][fieldName];

            const user = await User.findOne({[dbField]: fieldToSearch});

            if (!user) {
                throw new ApiError('Inna not found', 404);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsEmailUnique: async (req, res, next) => {
        try {
            const {email} = req.body;

            if (!email) {
                throw new ApiError('Email not pressent', 400);
            }

            const user = await User.findOne({email});

            if (!user) {
                throw new ApiError('User with this email already exists', 409);
            }

            next();
        } catch (e) {
            next(e)
        }
    },

    isNewUserValid: async (req, res, next) => {
        try {
            const validate = userValidator.newUserValidator.validate(req.body);

            if (!validate) {
                throw new ApiError(validate.error.message, 400);
            }

            req.body = validate.value;

            next();
        } catch (e) {
            next(e);
        }
    },

    isEditUserValid: async (req, res, next) => {
        try {
            let validate = userValidator.editUserValidator.validate(req.body);

            if (!validate) {
                throw new ApiError(validate.error.message);
            }

            req.body = validate.value;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserIdValid: (req, res, next) => {
        try {
            const { userId } = req.body;

            const validate = commonValidator.idValidator.validate(userId);

            if (!userId) {
                throw new ApiError(validate.error.message);
            }

            next();
        }catch (e) {
            next(e);
        }
    }
};
