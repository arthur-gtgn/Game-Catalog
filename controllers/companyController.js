const Company = require("../models/Company");

exports.getCompanyByGameID = async (req, res, next) => {
  try {
    const gameId = req.params.id; // Suppose que le paramètre contient l'ID du jeu

    const [companyDetails, _] = await Company.findByGameID(gameId);

    if (!companyDetails || companyDetails.length === 0) {
      return res.status(404).json({ message: "Company not found for the specified game ID" });
    }

    res.status(200).json({ company: companyDetails });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.addCompanyToGame = async (req, res, next) => {
  try {
     const { company_name, ceo, nb_employees, market_value, reseller, price} = req.body;
     const gameId = req.params.gameId; 

     await Company.saveCompanyWithGame(company_name, ceo, nb_employees, market_value, reseller, gameId, price);
    
     res.status(201).json({ message: "Company added successfully to the game" });
  } catch (err) {
     console.log(err);
     next(err);
  }
};
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

