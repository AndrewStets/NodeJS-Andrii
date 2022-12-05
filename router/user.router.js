const router = require("express").Router();

const mdlwr = require("../middleware/user.middleware");
const userController = require("../controller/user.controller");

router.get('/', userController.getAllUsers);
router.post('/', mdlwr.isBodyValidCreate, userController.createUser);

router.get('/userId', mdlwr.isIdValid, mdlwr.checkIsUserExist, userController.getUserById);
router.put('/userId', mdlwr.isIdValid, mdlwr.isBodyValidUpdate, mdlwr.checkIsUserExist, mdlwr.userNormalizator, userController.updateUser);
router.delete('/userId', mdlwr.isIdValid, mdlwr.checkIsUserExist, userController.deleteUserById);

module.exports = router;