const User = require("../models/User");

const bcrypt = require("bcrypt");

exports.register = async (req, res, next) => {
    try {
        const { username, email, role, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 12);

        let user = new User(null, null, username, email, role, hashedPassword);

        const [result, _] = await user.register();

        if (result.affectedRows === 1) {
            res.status(201).json({
                message: "User successfully created!",
            });
            res.redirect("/login");
        } else {
            res.status(500).json({
                message: "An error has occurred while creating the user...",
            });
            res.redirect("/register");
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
};
