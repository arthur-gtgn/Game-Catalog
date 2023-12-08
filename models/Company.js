const db = require("../config/db");

class Company {
  constructor(company_name, ceo, nb_employees, market_value, reseller) {
    this.company_name = company_name;
    this.ceo = ceo;
    this.nb_employees = nb_employees;
    this.market_value = market_value;
    this.reseller = reseller;
  }

  save() {
    let sql = `
        INSERT INTO Company(company_name, ceo, nb_employees, market_value, reseller)
        VALUES(
            "${this.company_name}",
            "${this.ceo}",
            ${this.nb_employees},
            ${this.market_value},
            ${this.reseller ? 1 : 0}
        );`;
    return db.execute(sql);
  }

  static findByID(company_id) {
    let sql = `SELECT * FROM Company WHERE company_id = ${company_id}`;
    return db.execute(sql);
  }

  static findByGameID(game_id) {
    let sql = `
        SELECT C.*
        FROM Company C
        JOIN developed_by D ON C.company_id = D.company_id
        WHERE D.game_id = ${game_id};`;

    return db.execute(sql);
  }
}

module.exports = Company;
