const db = require("../config/db");

class Game {
    constructor(game_id, game_name, category, release_date, age_rating) {
        this.game_id = game_id;
        this.game_name = game_name;
        this.category = category;
        this.release_date = release_date;
        this.age_rating = age_rating;
    }

    save() {
        let sql = `INSERT INTO Game VALUES(${this.game_id},"${this.game_name}","${this.category}","${this.release_date}",${this.age_rating});`;
        return db.execute(sql);
    }

    static findAll() {
        let sql = "SELECT * FROM Game";
        return db.execute(sql);
    }

    static findByID(game_id) {
        let sql = `SELECT * FROM Game WHERE game_id = ${game_id}`;

        return db.execute(sql);
    }
}

module.exports = Game;
