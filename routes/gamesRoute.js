const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");
const reviewController = require("../controllers/reviewController");

router.route("/").get(gameController.getAllGames);   
    
router.route("/addGame").post(gameController.createGame);

router.route("/delete/:id").delete(gameController.deleteGame);

router.route("/:id").get(gameController.getGameByID);

router.route("/update/:id").put(gameController.updateGame);

router.route("/review/:id")
  .get(reviewController.getGameWithReviews)
  .post(reviewController.addReview);
router.route("/review/:gameId/:reviewId").delete(reviewController.deleteReview);
module.exports = router;
