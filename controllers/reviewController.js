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
  
exports.createReview = async (req, res, next) => {
    try {
        const { description, grade, author, gameId } = req.body;
        console.log('Request Body:', req.body);
        const review = new Review(description, grade, author, gameId);
        await review.save();

        res.status(201).json({ message: "Review created", review: review });
    } catch (error) {
        console.log(error);
        next(error);
    }
};