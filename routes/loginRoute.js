const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");

router.route("/").get(loginController.getAllUsers).post(loginController.login);

module.exports = router;
