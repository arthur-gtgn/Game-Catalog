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
