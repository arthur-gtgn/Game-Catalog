const Game = require("../models/Game");

// Fonction pour formater la date
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

exports.getAllGames = async (req, res, next) => {
    try {
        const [games, _] = await Game.findAll();

        // Formater la date pour chaque jeu dans la liste
        const formattedGames = games.map((game) => ({
            ...game,
            release_date: formatDate(game.release_date),
        }));

        res.status(200).json({ count: formattedGames.length, games: formattedGames });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

exports.createGame = async (req, res, next) => {
    try {
        let {
            game_name,
            category,
            release_date,
            age_rating,
            description,
        } = req.body;

        console.log("Données reçues du client :", req.body);

        let game = new Game(
            game_name,
            category,
            release_date,
            age_rating,
            description
        );

        await game.save();
        res.status(201).json({ message: "Game created", game: game[0] });
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
