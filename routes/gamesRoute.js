const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");

router.route("/").get(gameController.getAllGames);
    
    
router.route("/addGame").post(gameController.createGame);

router.route("/delete/:id").delete(gameController.deleteGame);

router.route("/:id").get(gameController.getGameByID);

router.route("/update/:id").put(gameController.updateGame);

module.exports = router;
