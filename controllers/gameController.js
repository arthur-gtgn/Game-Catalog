const Game = require("../models/Game");

exports.getAllGames = async (req, res, next) => {
    try {
        const [games, _] = await Game.findAll();
        res.status(200).json({ count: games.length, games: games });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

exports.createGame = async (req, res, next) => {
    try {
        let {
            game_id,
            game_name,
            category,
            release_date,
            age_rating,
            description,
        } = req.body;

        console.log("Données reçues du client :", req.body);

        let game = new Game(
            game_id,
            game_name,
            category,
            release_date,
            age_rating,
            description
        );

        game = await game.save();

        res.status(201).json({ message: "Game created" });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.getGameByID = async (req, res, next) => {
    try {
        let gameID = req.params.id;

        let [game, _] = await Game.findByID(gameID);

        res.status(200).json({ game: game[0] });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

exports.updateGame = async (req, res, next) => {
    try {
        let gameID = req.params.id;
        let { game_name, category, release_date, age_rating } = req.body;
        let [game, _] = await Game.findByID(gameID);
        game.update(game_name, category, release_date, age_rating);
        res.status(200).json({ game: game[0] });
    } catch (err) {
        console.log(err);
        next(err);
    }
};
