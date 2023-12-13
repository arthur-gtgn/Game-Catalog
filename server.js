const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");

const serverStatic = require("serve-static");

const express = require("express");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const User = require("./models/User");

const app = express();

app.use(serverStatic(__dirname + "/dist"));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(
    session({
        name: "user_sid",
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60, httpOnly: false },
    })
);

app.use(passport.session());
app.use(passport.initialize());
const initializePassport = require("./passport-config");
initializePassport(passport);
passport.authenticate("session");

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    next();
}

app.listen(process.env.WEB_PORT, "0.0.0.0", function () {
    console.log("Listenning on " + process.env.WEB_PORT);
});

app.use("/games", require("./routes/gamesRoute"));

app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return res
                .status(500)
                .json({ message: "Error while authenticating" });
        }
        if (!user) {
            return res.status(401).json({ message: "Authentication failed" });
        }
        req.logIn(user, function (err) {
            if (err) {
                return res
                    .status(500)
                    .json({ message: "Error while logging in" });
            }
            return res.status(200).json({ message: "Login successful" });
        });
    })(req, res, next);
});

app.get("/api/user", (req, res) => {
    try {
        const { user_id, username } = req.user;
        res.status(200).json({ data: { user_id, username } });
    } catch (e) {
        res.json({ error: e });
    }
});

app.use("/register", require("./routes/registerRoute"));

module.exports = app;
