const db = require("../config/db");

class Review {
    constructor(description, grade, author, gameId) {
        this.description = description;
        this.grade = grade;
        this.author = author;
        this.gameId = gameId;
    }

    save() {
        let sql = `
        INSERT INTO Review(description, grade, author, game_id)
        VALUES(
            "${this.description}",
            ${this.grade},
            "${this.author}",
            ${this.gameId});`;
        return db.execute(sql);
    }

    static getGameReviews(gameId) {
        let sql = `SELECT * FROM Review WHERE game_id = ${gameId}`;
        return db.execute(sql);
    }
}

module.exports = Review;