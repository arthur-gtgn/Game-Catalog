const dotenv = require("dotenv");
dotenv.config();

const serverStatic = require("serve-static");

const cors = require("cors");
const express = require("express");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const User = require("./models/User");

const app = express();

const initializePassport = require("./passport-config");
initializePassport(passport);

app.use(serverStatic(__dirname + "/dist"));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(cors());
app.use(
    session({
        name: "user_sid",
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.listen(process.env.WEB_PORT, "0.0.0.0", function () {
    console.log("Listenning on " + process.env.WEB_PORT);
});

app.use("/games", require("./routes/gamesRoute"));

app.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/games",
        failureRedirect: "/login",
        failureFlash: true,
    })
);

app.use("/register", require("./routes/registerRoute"));

module.exports = app;
