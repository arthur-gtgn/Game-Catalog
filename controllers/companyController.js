const Company = require("../models/Company");

exports.getCompanyByGameID = async (req, res, next) => {
  try {
    const gameId = req.params.id; // Suppose que le paramètre contient l'ID du jeu

    const [companyDetails, _] = await Company.findByGameID(gameId);

    if (!companyDetails || companyDetails.length === 0) {
      return res.status(404).json({ message: "Company not found for the specified game ID" });
    }

    res.status(200).json({ company: companyDetails[0] });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
