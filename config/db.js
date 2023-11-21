require("dotenv").config();
const mysql = require("mysql2");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
});

let sql = "SELECT * FROM Game";

pool.execute(sql, function (err, results) {
    if (err) throw err;

    results.forEach((result) => {
        console.log(result.game_name);
    });
});

module.exports = pool.promise();
