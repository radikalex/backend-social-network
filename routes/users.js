const express = require('express');
const router = express.Router()
const UserController = require('../controllers/UserController');
const { authentication } = require('../middlewares/authentication');
const validateBodyParams = require("../middlewares/validateBodyParams");
const { check } = require("express-validator");


router.get('/getLoggedUser', authentication, UserController.getLoggeduser);
router.get('/id/:_id', UserController.getUserById);

router.post('/', [
    check("username", "The userame cant be empty").notEmpty(),
    check("email", "The email format is not valid").isEmail(),
    check("password", "The password cant be empty").notEmpty(),
    validateBodyParams
], UserController.createUser);
router.post('/login', UserController.login);
router.post('/logout', authentication, UserController.logout);

module.exports = router;