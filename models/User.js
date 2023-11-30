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

    static getUser(username, password) {
        let sql = `SELECT * FROM Users WHERE username = "${username}" AND password = "${password}";`;
        return db.execute(sql);
    }
}

module.exports = User;
