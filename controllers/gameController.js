exports.getAllGames = async (req, res, next) => {
    res.send("Get all games");
};

exports.createGame = async (req, res, next) => {
    res.send("Create a game");
};

exports.getGameByID = async (req, res, next) => {
    res.send("Get game by ID");
};
