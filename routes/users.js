const express = require('express');
const router = express.Router()
const UserController = require('../controllers/UserController');
const { authentication } = require('../middlewares/authentication');
const validateBodyParams = require("../middlewares/validateBodyParams");
const { check } = require("express-validator");


router.get('/', UserController.getAllUsers);
router.get('/getLoggedUser', authentication, UserController.getLoggeduser);
router.get('/id/:_id', UserController.getUserById);
router.get('/getUsersByUsername/:username', UserController.getUsersByUsername);

router.post('/', [
    check("username", "The userame cant be empty").notEmpty(),
    check("email", "The email format is not valid").isEmail(),
    check("password", "The password cant be empty").notEmpty(),
    validateBodyParams
], UserController.createUser);
router.post('/login', UserController.login);
router.post('/logout', authentication, UserController.logout);

router.put('/follow/:_id', authentication, UserController.follow);
router.put('/unfollow/:_id', authentication, UserController.unfollow);

module.exports = router;