const Review = require("../models/Review");
const Game = require("../models/Game");
exports.getGameWithReviews = async (req, res, next) => {
    try {
      const gameId = req.params.id;
  
      const [gameDetails, _] = await Game.findByID(gameId);
      const [gameReviews, __] = await Review.getGameReviews(gameId);
  
      res.status(200).json({ game: gameDetails[0], reviews: gameReviews });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
  exports.getReviews = async (req, res, next) => {
    try {
      const reviewId = req.params.reviewId;
      const [gameReviews, _] = await Review.getReview(reviewId);
      res.status(200).json({ reviews: gameReviews });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
  exports.addReview = async (req, res, next) => {
    try {
        const { description, grade, author } = req.body;
        const gameId = req.params.id;

        await Review.saveReview(description, grade, author, gameId);

        res.status(201).json({ message: "Revue ajoutée avec succès" });
    } catch (err) {
        console.log(err);
        next(err);
    }
};
exports.deleteReview = async (req, res, next) => {
  try {
      const { gameId, reviewId } = req.params;
      await Review.deleteReviewById(reviewId);

      res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
      console.log(err);
      next(err);
  }
};

exports.updateReviewGame = async (req, res, next) => {
  try {
    const gameID = req.params.id;
    const { description, grade, author} =
        req.body;
    const [updatedReview, _] = await Review.updateReview(
      description,
      grade,
      author,
      gameID
    );
    if (updatedReview.affectedRows > 0) {
      res.status(200).json({ message: "Review updated successfully" });
    } else {
      res.status(400).json({ message: "Review not found or not updated" });
    }  
  } catch (err) {
      console.error(err);
      next(err);
  }
}