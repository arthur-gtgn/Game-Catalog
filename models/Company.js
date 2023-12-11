const db = require("../config/db");

class Company {
  constructor(company_name, ceo, nb_employees, market_value, reseller) {
    this.company_name = company_name;
    this.ceo = ceo;
    this.nb_employees = nb_employees;
    this.market_value = market_value;
    this.reseller = reseller;
    this.price = price;
  }

  static saveCompany(company_name, ceo, nb_employees, market_value, reseller) {
    let sql = `
       INSERT INTO Company(company_name, ceo, nb_employees, market_value, reseller)
       VALUES("${company_name}", "${ceo}", ${nb_employees}, ${market_value}, ${reseller ? 1 : 0});
    `;
    return db.execute(sql);
 }
 static async saveCompanyWithGame(company_name, ceo, nb_employees, market_value, reseller, gameId, price) {
  try {
    const result = await this.saveCompany(company_name, ceo, nb_employees, market_value, reseller);
    const companyId = result[0].insertId;
    const sql = `
      INSERT INTO sold_at(game_id, company_id, price)
      VALUES(${gameId}, ${companyId}, ${price});
    `;
    await db.execute(sql);
    return companyId;
  } catch (error) {
    console.error("Erreur lors de l'ajout de la société au jeu", error);
    throw error;
  }
}

static findByGameID(game_id) {
  let sql = `
    SELECT C.*, S.price
    FROM Company C
    JOIN sold_at S ON C.company_id = S.company_id
    WHERE S.game_id = ${game_id};`;

  return db.execute(sql);
}

static deleteCompanyById(companyId) {
    let sql = `DELETE sold_at, Company
    FROM sold_at
    INNER JOIN Company ON sold_at.company_id = Company.company_id
    WHERE Company.company_id = ${companyId};`;
    return db.execute(sql);
}



}

module.exports = Company;
