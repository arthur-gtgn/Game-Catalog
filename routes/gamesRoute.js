const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");

router
    .route("/")
    .get(gameController.getAllGames)
    .post(gameController.createGame);

router.route("/:id").get(gameController.getGameByID);
router.route("/:id/update").put(gameController.updateGame);

module.exports = router;
