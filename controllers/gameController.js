const Game = require("../models/Game");

exports.getAllGames = async (req, res, next) => {
    try {
        const games = await Game.findAll();
        res.status(200).json({ games });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

exports.createGame = async (req, res, next) => {
    let { game_id, game_name, category, release_date, age_rating } = req.body;

    let game = new Game(game_id, game_name, category, release_date, age_rating);
    game = await game.save();

    console.log(game);
};

exports.getGameByID = async (req, res, next) => {
    try {
        let [game, _] = await Game.findByID(1);
        res.status(200).json({ game });
    } catch (err) {
        console.log(err);
        next(err);
    }
};
