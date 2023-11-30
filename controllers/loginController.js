const User = require("../models/User");

const bcrypt = require("bcrypt");

exports.login = async (req, res, next) => {
    try {
        let { email, password } = req.body;

        const [user, _] = await User.getUser(email, password);

        if (user.length === 0) {
            res.status(401).json({
                message: "Your email or password is incorrect",
            });
        } else {
            res.status(200).json({ username: user });
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const [users, _] = await User.getUsers();

        res.status(200).json({ users: users });
    } catch (err) {
        console.log(err);
        next(err);
    }
};
