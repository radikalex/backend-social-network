const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { unlink } = require("fs/promises");
const path = require("path");
const transporter = require("../config/nodemailer");

const UserController = {
    async createUser(req, res, next) {
        try {
            if (req.body.password !== req.body.password2) {
                return res.status(400).send({
                    ok: false,
                    errors: [
                        {
                            msg: "Passwords didnt match",
                            param: "password2",
                            location: "body",
                        },
                    ],
                });
            }
            req.body.confirmed = true;
            req.body.user_img = "users_images/default/user-icon.png";
            req.body.darkMode = false;
            req.body.bio = "";
            req.body.role = "user";
            req.body.followers = [];
            req.body.following = [];
            req.body.tokens = [];
            req.body.postIds = [];
            const password = await bcrypt.hash(req.body.password, 10);
            const user = await User.create({ ...req.body, password });
            // const url = "http://localhost:8080/users/confirm/" + req.body.email;
            // await transporter.sendMail({
            //     to: req.body.email,
            //     subject: "Confirm your email",
            //     html: `<h3>Welcome ${user.username}! Please, confirm your email to be able to log in </h3>
            //     <a href="${url}"> Click to confirm your email</a>
            //     `,
            // });
            res.status(201).send({
                message:
                    "User created. An email has been sent to confirm your email",
                user,
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    },
    async confirm(req, res) {
        try {
            await User.findOneAndUpdate(
                { email: req.params.email },
                { confirmed: true }
            );
            res.status(201).send("User confirmed successfully");
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },
    async deleteUser(req, res, next) {
        try {
            const user = await User.findByIdAndDelete(req.params._id);
            if (user.user_img) {
                const dir = path.resolve("./");
                await unlink(path.join(dir, user.user_img));
            }
            res.send({ message: "User deleted", user });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "There was a problem deleting the user",
                error,
            });
        }
    },
    async login(req, res) {
        try {
            const user = await User.findOne({
                email: req.body.email,
            });
            if (!user) {
                return res
                    .status(400)
                    .send({ error: "Email or password incorrect" });
            }
            const isMatch = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!isMatch) {
                return res
                    .status(400)
                    .send({ error: "Email or password incorrect" });
            }
            if (!user.confirmed) {
                return res
                    .status(400)
                    .send({ error: "Please, confirm your email first" });
            }
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
            if (user.tokens.length > 4) user.tokens.shift();
            user.tokens.push(token);
            await user.save();
            res.send({ message: "Welcome " + user.username, token });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "There was an error during login",
                error,
            });
        }
    },
    async logout(req, res) {
        try {
            await User.findByIdAndUpdate(req.user._id, {
                $pull: { tokens: req.headers.authorization },
            });
            res.send({ message: "Disconnected successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "There was an error during logout",
                error,
            });
        }
    },

    async getLoggeduser(req, res) {
        try {
            const user = await User.findById(req.user._id)
                .populate("postIds")
                .populate("followers", ["username"]);
            res.send({
                ...user.toJSON(),
                num_followers: user.followers.length,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: "There was a problem getting the logged user",
                error,
            });
        }
    },

    async updateLoggedUser(req, res, next) {
        try {
            const old_user = await User.findById(req.user._id);
            if (!old_user) {
                return res
                    .status(404)
                    .send({ message: `No user with id ${req.user._id}` });
            }
            const user = await User.findByIdAndUpdate(
                req.user._id,
                { ...req.body },
                {
                    new: true,
                }
            )
                .populate("followers")
                .populate("postIds")
                .populate("following");
            if (
                old_user.user_img &&
                user.user_img !== old_user.user_img &&
                !/default\/.*/gm.test(old_user.user_img)
            ) {
                const dir = path.resolve("./images");
                await unlink(path.join(dir, old_user.user_img));
            }
            res.status(201).send({ message: "User updated", user });
        } catch (error) {
            if (req.body.user_img) {
                const dir = path.resolve("./images");
                await unlink(path.join(dir, req.body.user_img));
            }
            console.error(error);
            next(error);
        }
    },
    async getUserById(req, res) {
        try {
            const user = await User.findById(req.params._id);
            if (!user) {
                return res.send({
                    message: `No user with id ${req.params._id}`,
                });
            }
            res.send({ message: `User with id ${req.params._id}`, user });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: `There was a problem getting the user with id ${req.params._id}`,
                error,
            });
        }
    },

    async getUserByUsername(req, res) {
        try {
            if (req.params.username.length > 20) {
                return res.status(400).send("Username too long");
            }
            const username = new RegExp(req.params.username, "i");
            const user = await User.findOne({ username })
                .populate("followers")
                .populate("postIds")
                .populate("following");
            res.send({
                message: `User with @${req.params.username} username'`,
                user,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: `There was a problem getting the user with '${req.params.username}' in their username`,
                error,
            });
        }
    },

    async getUsersQuery(req, res) {
        try {
            const users = await User.find({
                $or: [
                    { username: { $regex: req.query.search, $options: "i" } },
                    { firstName: { $regex: req.query.search, $options: "i" } },
                    { lastName: { $regex: req.query.search, $options: "i" } },
                ],
            })
                .populate("followers")
                .populate("following");
            res.send({
                message: `Users found with query'`,
                users,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: `There was a problem getting the user with '${req.params.username}' in their username`,
                error,
            });
        }
    },

    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.send({ message: `All users`, users });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: `There was a problem getting all users`,
                error,
            });
        }
    },
    async follow(req, res) {
        try {
            if (req.params._id === req.user._id.toString()) {
                return res
                    .status(400)
                    .send({ message: "Users cannot follow themselves" });
            }
            const followed_user = await User.findById(req.params._id);
            if (!followed_user) {
                return res
                    .status(404)
                    .send({ message: `No user with id ${req.params._id}` });
            }
            if (followed_user.followers.includes(req.user._id)) {
                return res
                    .status(400)
                    .send({ message: "You already follow this user" });
            }
            followed_user.followers.push(req.user._id);
            followed_user.save();
            const following_user = await User.findById(req.user._id);
            following_user.following.push(followed_user._id);
            following_user.save();
            res.send({
                message: "Follow successful",
                followedUser: followed_user,
                newFollower: req.user,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: `There was a problem following the user`,
                error,
            });
        }
    },
    async unfollow(req, res) {
        try {
            if (req.params._id === req.user._id.toString()) {
                return res
                    .status(400)
                    .send({ message: "Users cannot unfollow themselves" });
            }
            const following_user = await User.findById(req.params._id);
            if (!following_user) {
                return res
                    .status(404)
                    .send({ message: `No user with id ${req.params._id}` });
            }
            if (!following_user.followers.includes(req.user._id)) {
                return res
                    .status(400)
                    .send({ message: "You dont follow this user" });
            }
            const unfollowedUser = await User.findByIdAndUpdate(
                following_user._id,
                {
                    $pull: { followers: req.user._id },
                },
                { new: true }
            );
            await User.findByIdAndUpdate(req.user._id, {
                $pull: { following: following_user._id },
            });
            res.send({
                message: "Unfollow successful",
                unfollowedUser,
                oldFollower: req.user,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: `There was a problem unfollowing the user`,
                error,
            });
        }
    },
};

module.exports = UserController;
