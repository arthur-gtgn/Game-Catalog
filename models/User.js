const db = require("../config/db");

const bcrypt = require("bcrypt");

class User {
    constructor(user_id, user_created, username, email, role, password) {
        this.id = user_id;
        this.created = user_created;
        this.username = username;
        this.email = email;
        this.role = role;
        this.password = password;
    }

    register() {
        let sql = `INSERT INTO Users (user_created, username, email, role, password) VALUES (now(), ?, ?, ?, ?);`;
        return db.execute(sql, [
            this.username,
            this.email,
            this.role,
            this.password,
        ]);
    }

    static getUserByEmail(email) {
        let sql = `SELECT * FROM Users WHERE email = ?;`;
        return db.execute(sql, [email]);
    }

    static getUserById(id) {
        let sql = `SELECT * FROM Users WHERE user_id = ?;`;
        return db.execute(sql, [id]);
    }

    static getUser() {
        let sql = `SELECT * FROM Users;`;
        return db.execute(sql);
    }

}

module.exports = User;
