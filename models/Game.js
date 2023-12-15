const db = require("../config/db");
// Game class representing the model for game-related operations
class Game {
     // Constructor to initialize game properties
    constructor(game_name, category, release_date, age_rating, description) {
        this.game_name = game_name;
        this.category = category;
        this.release_date = release_date;
        this.age_rating = age_rating;
        this.description = description;
    }
 // Method to save a new game to the database
    save() {
        let sql = `
        INSERT INTO Game(game_name, category, release_date, age_rating, description)
        VALUES(
            "${this.game_name}",
            "${this.category}",
            "${this.release_date}",
            ${this.age_rating},
            "${this.description}");`;
        return db.execute(sql);
    }
 // Static method to retrieve all games from the database
    static findAll() {
        let sql = "SELECT * FROM Game";
        return db.execute(sql);
    }
 // Static method to find a game by its ID in the database
    static findByID(game_id) {
        let sql = `SELECT * FROM Game WHERE game_id = ${game_id}`;

        return db.execute(sql);
    }

// Static method to update a game's details in the database
    static update(
        game_name,
        category,
        release_date,
        age_rating,
        description,
        game_id
    ) {
        let sql = `
            UPDATE Game 
            SET game_name = "${game_name}",
                category = "${category}",
                release_date = "${release_date}",
                age_rating = ${age_rating},
                description = "${description}"
            WHERE game_id = ${game_id};`;

        return db.execute(sql);
    }

    static deleteGameById(gameId) {
        let sql = `DELETE FROM Game WHERE game_id = ${gameId}`;
        return db.execute(sql);
    }
}
// Exporting the Game class to make it accessible in other modules
module.exports = Game;
