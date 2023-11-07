const dotenv = require("dotenv");
dotenv.config();

const mysql = require("mysql2/promise");
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
  debug: false,
})

conn.then(function (conn) {
  conn.execute("SELECT * FROM Game").then(function (result) {
    const [rows, fields] = result;
    console.log(rows);
  });
})

const path = require("path");
const serverStatic  = require("serve-static");

const express = require("express");
const app = express()

app.use(serverStatic(__dirname + "/dist"));

app.listen(process.env.WEB_PORT, "0.0.0.0", function () {
  console.log("Listenning on " + process.env.WEB_PORT);
})

app.get("/", (request, response) => {
  let clientIp = request.ip;
  response.send(`Hello, ${clientIp}. The nodejs server has started.`);
  response.end();
});




