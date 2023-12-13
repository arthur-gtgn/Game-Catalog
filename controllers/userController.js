const User = require("../models/User");

exports.getAllUsers = async (req, res, next) => {
    try {
        let [users, _] = await User.getAllUsers();
        res.status(200).json({ users });
    } catch (err) {
        console.log(err);
        next(err);
    }
};
