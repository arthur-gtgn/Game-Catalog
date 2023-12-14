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

    static getGameReviews(gameId) {
        let sql = `SELECT * FROM Review WHERE game_id = ${gameId}`;
        return db.execute(sql);
    }
    static deleteReviewById(reviewId) {
        let sql = `DELETE FROM Review WHERE review_id = ${reviewId}`;
        return db.execute(sql);
    }
    static updateReview(description, grade, author, gameId){
        let sql = `
            UPDATE Review
            SET description = "${description}",
                grade = ${grade},
                author = "${author}"
            WHERE game_id = ${gameId};`;
            
        return db.execute(sql);
    }

}

module.exports = Review;