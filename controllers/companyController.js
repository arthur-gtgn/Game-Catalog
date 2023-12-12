const Company = require("../models/Company");
const Game = require("../models/Game");

exports.getCompanyByGameID = async (req, res, next) => {
    try {
        const gameId = req.params.id; // Suppose que le paramètre contient l'ID du jeu
        const [gameDetails, _] = await Game.findByID(gameId);

        const [companyDetails, __] = await Company.findByGameID(gameId);

        res.status(200).json({ game: gameDetails[0], company: companyDetails });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

exports.addCompanyToGame = async (req, res, next) => {
    try {
        const {
            company_name,
            ceo,
            nb_employees,
            market_value,
            reseller,
            price,
        } = req.body;
        const gameId = req.params.gameId;

        await Company.saveCompanyWithGame(
            company_name,
            ceo,
            nb_employees,
            market_value,
            reseller,
            gameId,
            price
        );

        res.status(201).json({
            message: "Company added successfully to the game",
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
};
exports.deleteCompany = async (req, res, next) => {
    try {
        const { gameId, companyId } = req.params;
        await Company.deleteCompanyById(companyId);

        res.status(200).json({
            message:
                "Company and associated sold_at entries deleted successfully",
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};
