const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("./models/User");

function initialize(passport) {
    passport.use(
        new localStrategy(
            { usernameField: "email", passwordField: "password" },
            async (email, password, done) => {
                try {
                    const [user, _] = await User.getUserByEmail(email);

                    if (user.length === 0) {
                        return done(null, false, {
                            message: "No user with that email",
                        });
                    } else {
                        if (await bcrypt.compare(password, user[0].password)) {
                            console.log(user[0]);
                            return done(null, user[0]);
                        } else {
                            return done(null, false, {
                                message: "Password incorrect",
                            });
                        }
                    }
                } catch (err) {
                    return done(err);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user.user_id);
    });
    passport.deserializeUser(async (id, done) => {
        try {
            const [user, _] = await User.getUserById(id);
            return done(null, user[0]);
        } catch (err) {
            return done(err);
        }
    });

    passport.authenticate("session");
}

module.exports = initialize;
