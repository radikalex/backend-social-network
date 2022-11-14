const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const { jwt_secret } = require("../config/keys")

const UserController = {
    async createUser(req, res) {
        try {
            const password = await bcrypt.hash(req.body.password, 10);
            const user = await User.create({ ...req.body, password })
            res.status(201).send(user)
        } catch (error) {
            console.error(error)
            res.status(500).send({ message: 'There was a problem creating the user', error })
        }
    },
    async login(req, res) {
        try {
            const user = await User.findOne({
                email: req.body.email,
            });
            if (!user) {
                return res.status(400).send({message: "Email or password incorrect"});
            }
            const isMatch = bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).send({message: "Email or password incorrect"});
            }
            const token = jwt.sign({ _id: user._id }, jwt_secret);
            if (user.tokens.length > 4) 
                user.tokens.shift();
            user.tokens.push(token);
            await user.save();
            res.send({ message: "Welcome " + user.username, token });
        } catch (error) {
          console.error(error);
          res.status(500).send({message: "There was an error during login", error});
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
                error
            });
        }
      },
    async getLoggeduser(req, res) {
        try {
            const user = await User.findById(req.user._id);
            res.send(user);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "There was a problem getting the logged user", error})
        }
    },
    async getUserById(req, res) {
        try {
            const user = await User.findById(req.params._id);
            if(!user) {
                return res.send({message: `No user with id ${req.params._id}`});
            };
            res.send({message: `User with id ${req.params._id}`, user});
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: `There was a problem getting the user with id ${req.params._id}`, error})
        }
    },
    async getUsersByUsername(req, res) {
        try {
            if (req.params.username.length > 20) {
                return res.status(400).send("Username too long");
            }
            const username = new RegExp(req.params.username, "i");
            const users = await User.find({ username });
            res.send({message: `Users with '${req.params.username}' in their username`, users});
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: `There was a problem getting the user with '${req.params.username}' in their username`, error})
        }
    },
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.send({message: `All users`, users});
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: `There was a problem getting all users`, error})
        }
    },
    async follow(req, res) {
        try {
            if(req.params._id === req.user._id) {
                return res.status(400).send({message: "Users cannot follow themselves"});
            }
            const followed_user = await User.findById(req.params._id);
            if(!followed_user) {
                return res.status(404).send({message: `No user with id ${req.params._id}`});
            }
            if(followed_user.followers.includes(req.user._id)) {
                return res.status(400).send({message: "You already follow this user"});
            }
            followed_user.followers.push(req.user._id);
            followed_user.save();
            const following_user = await User.findById(req.user._id);
            following_user.following.push(followed_user._id)
            following_user.save();
            res.send({ message: "Follow successful"})
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: `There was a problem following the user`, error})
        }
    },
    async unfollow(req, res) {
        try {
            if(req.params._id === req.user._id) {
                return res.status(400).send({message: "Users cannot unfollow themselves"});
            }
            const following_user = await User.findById(req.params._id);
            if(!following_user) {
                return res.status(404).send({message: `No user with id ${req.params._id}`});
            }
            if(!following_user.followers.includes(req.user._id)) {
                return res.status(400).send({message: "You dont follow this user"});
            }
            await User.findByIdAndUpdate(following_user._id, {
                $pull: { followers: req.user._id }
            });
            await User.findByIdAndUpdate(req.user._id, {
                $pull: { following: following_user._id }
            });
            res.send({ message: "Unfollow successful"})
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: `There was a problem unfollowing the user`, error})
        }
    }
}

module.exports = UserController;