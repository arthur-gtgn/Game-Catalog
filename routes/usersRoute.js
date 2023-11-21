const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");

router
    .route("/games")
    .get(gameController.getAllGames)
    .post(gameController.createGame);

router.route("/:id").get(gameController.getGameByID);

module.exports = router;
