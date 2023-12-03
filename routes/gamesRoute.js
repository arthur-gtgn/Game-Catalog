const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");

router.route("/").get(gameController.getAllGames);
    
    
router.route("/addGame").post(gameController.createGame);

//router.route("/:id").get(gameController.getGameByID);
//router.route("/:id/update").put(gameController.updateGame);
router.route("/delete/:id").delete(gameController.deleteGame);
module.exports = router;
