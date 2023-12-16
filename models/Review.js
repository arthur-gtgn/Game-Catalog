const db = require("../config/db");

class Review {
    constructor(description, grade, author, gameId) {
        this.description = description;
        this.grade = grade;
        this.author = author;
        this.gameId = gameId;
    }

    static saveReview(description, grade, author, gameId) {
        let sql = `
            INSERT INTO Review(description, grade, author, game_id)
            VALUES("?", ?, "?", ?);
        `;
        return db.execute(sql, [description, grade, author, gameId]);
    }
    // Static method to get all reviews for a specific game from the database
    static getGameReviews(gameId) {
        let sql = `SELECT * FROM Review WHERE game_id = ?`;
        return db.execute(sql, [gameId]);
    }
    // Static method to get a review by its ID from the database
    static getReview(reviewId) {
        let sql = `SELECT * FROM Review WHERE review_id = ?`;
        return db.execute(sql, [reviewId]);
    }
    static deleteReviewById(reviewId) {
        let sql = `DELETE FROM Review WHERE review_id = ?`;
        return db.execute(sql, [reviewId]);
    }
    static updateReview(description, grade, author, reviewId) {
        let sql = `
            UPDATE Review
            SET description = "?",
                grade = ?,
                author = "?"
            WHERE review_id = ?`;

        return db.execute(sql, [description, grade, author, reviewId]);
    }
}

module.exports = Review;
