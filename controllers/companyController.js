const Company = require("../models/Company");
const Game = require("../models/Game");
// Controller function to get company details by game ID
exports.getCompanyByGameID = async (req, res, next) => {
  try {
    // Retrieving game and company details using model functions
        const gameId = req.params.id; 
        const [gameDetails, _] = await Game.findByID(gameId);
        const [companyDetails, __] = await Company.findByGameID(gameId);

        res.status(200).json({ game: gameDetails[0], company: companyDetails });
    } catch (err) {
        console.log(err);
        next(err);
    }
};
// Controller function to get company details by company ID
exports.getCompany = async (req, res, next) => {
    try {
        const companyId = req.params.companyId;

        const [companyDetails, _] = await Company.findCompany(companyId);

        res.status(200).json({ company: companyDetails });
    } catch (err) {
        console.log(err);
        next(err);
    }
};
// Controller function to add a company to a game
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
 // Calling the model function to save the company with the associated game
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
// Controller function to delete a company and its associated entries by game and company ID
exports.deleteCompany = async (req, res, next) => {
    try {
        const { gameId, companyId } = req.params;
        await Company.deleteCompanyById(companyId);

    res.status(200).json({ message: "Company and associated sold_at entries deleted successfully" });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
// Controller function to update a company by ID
exports.updateCompany =  async (req, res, next) => {
  try{
    const companyId  = req.params.companyId;
    const {company_name, ceo, nb_employees, market_value, reseller, price} = req.body;
    const [updated_sold_at, updated_company] = await Company.updateComp(company_name, ceo, nb_employees, market_value, reseller, price, companyId);
    if (updated_company.affectedRows > 0 && updated_sold_at.affectedRows>0) {
      res.status(200).json({ message: "Company updated successfully" });
    } else {

      res.status(400).json({ message: "Company not found or not updated" });
    }  
  } catch (err) {
      console.error(err);
      next(err);
    }
};
