const User = require("../models/User");

const bcrypt = require("bcrypt");

exports.login = async (req, res, next) => {
    try {
        let { username, password } = req.body;

        let [user, _] = await User.getUser(username);

        if (user.password == password) {
            res.status(200).json({ message: "Login successful" });
        } else {
            res.status(401).json({ message: "Login failed" });
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
};
