const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { authentication } = require("../middlewares/authentication");
const validateBodyParams = require("../middlewares/validateBodyParams");
const { check } = require("express-validator");
const { uploadUserImages } = require("../middlewares/upload");

router.get("/", UserController.getAllUsers);
router.get("/getLoggedUser", authentication, UserController.getLoggeduser);
router.get("/id/:_id", UserController.getUserById);
router.get("/getUserByUsername/:username", UserController.getUserByUsername);
router.get("/getUsersQuery", UserController.getUsersQuery);
router.get("/confirm/:email", UserController.confirm);

router.post(
    "/",
    uploadUserImages.single("user_img"),
    [
        check("firstName", "The first name cant be empty").notEmpty(),
        check("username", "The username cant be empty").notEmpty(),
        check("email", "The email format is not valid").isEmail(),
        check("password", "The password cant be empty").notEmpty(),
        check("password2", "Please, repeat the password").notEmpty(),
        validateBodyParams,
    ],
    UserController.createUser
);
router.post("/login", UserController.login);
router.post("/logout", authentication, UserController.logout);

router.put(
    "/updateLoggedUser",
    authentication,
    uploadUserImages.single("user_img"),
    [
        check("firstName", "The first name cant be empty").notEmpty(),
        check("username", "The username cant be empty").notEmpty(),
        validateBodyParams,
    ],
    UserController.updateLoggedUser
);
router.put("/follow/:_id", authentication, UserController.follow);
router.put("/unfollow/:_id", authentication, UserController.unfollow);

router.delete("/:_id", UserController.deleteUser);

module.exports = router;
