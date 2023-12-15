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
            VALUES("${description}", ${grade}, "${author}", ${gameId});
        `;
        return db.execute(sql);
    }
// Static method to get all reviews for a specific game from the database
    static getGameReviews(gameId) {
        let sql = `SELECT * FROM Review WHERE game_id = ${gameId}`;
        return db.execute(sql);
    }
    // Static method to get a review by its ID from the database
    static getReview(reviewId) {
        let sql = `SELECT * FROM Review WHERE review_id = ${reviewId}`;
        return db.execute(sql);
    }
    static deleteReviewById(reviewId) {
        let sql = `DELETE FROM Review WHERE review_id = ${reviewId}`;
        return db.execute(sql);
    }
    static updateReview(description, grade, author, reviewId){
        let sql = `
            UPDATE Review
            SET description = "${description}",
                grade = ${grade},
                author = "${author}"
            WHERE review_id = ${reviewId};`;
            
        return db.execute(sql);
    }


}

module.exports = Review;