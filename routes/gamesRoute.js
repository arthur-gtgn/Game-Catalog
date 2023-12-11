const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");
const reviewController = require("../controllers/reviewController");
const companyController = require("../controllers/companyController");
router.route("/").get(gameController.getAllGames);   
    
router.route("/addGame").post(gameController.createGame);

router.route("/delete/:id").delete(gameController.deleteGame);

router.route("/:id").get(gameController.getGameByID);

router.route("/update/:id").put(gameController.updateGame);

router.route("/review/:id")
  .get(reviewController.getGameWithReviews)
  .post(reviewController.addReview)
  
  
router.route("/review/:gameId/:reviewId").delete(reviewController.deleteReview);

router.route("/company/:id").get(companyController.getCompanyByGameID);

router.route("/AddCompany/:gameId").post(companyController.addCompanyToGame);

router.route("/company/:gameId/:companyId").delete(companyController.deleteCompany);

router.route("/company/update/:id/:companyId").put(companyController.updateCompany);
module.exports = router;
