const db = require("../config/db");

class User {
    constructor(user_id, user_created, username, email, role, password) {
        this.id = user_id;
        this.created = user_created;
        this.username = username;
        this.email = email;
        this.role = role;
        this.password = password;
    }

    static getUser(email, password) {
        let sql = `SELECT username FROM Users WHERE email = ? AND password = SHA2(CONCAT((SELECT user_created FROM Users WHERE email = ?), ?), 224);`;
        return db.execute(sql, [email, email, password]);
    }

    static getUsers() {
        let sql = `SELECT * FROM Users;`;
        return db.execute(sql);
    }
}

module.exports = User;
