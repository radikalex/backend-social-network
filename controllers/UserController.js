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
                return res.status(400).send("Email or password incorrect");
            }
            const isMatch = bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).send("Email or password incorrect");
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
      }
}

module.exports = UserController;