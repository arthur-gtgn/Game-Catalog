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

    static saveCompany(
        company_name,
        ceo,
        nb_employees,
        market_value,
        reseller
    ) {
        let sql = `
       INSERT INTO Company(company_name, ceo, nb_employees, market_value, reseller)
       VALUES("?", "?", ?, ?, ?);
    `;
        return db.execute(sql, [
            company_name,
            ceo,
            nb_employees,
            market_value,
            reseller,
        ]);
    }
    // Static method to save a new company associated with a price from sold_at to the database
    static async saveCompanyWithGame(
        company_name,
        ceo,
        nb_employees,
        market_value,
        reseller,
        gameId,
        price
    ) {
        try {
            const result = await this.saveCompany(
                company_name,
                ceo,
                nb_employees,
                market_value,
                reseller
            );
            const companyId = result[0].insertId;
            const sql = `
      INSERT INTO sold_at(game_id, company_id, price)
      VALUES(?, ?, ?);
    `;
            await db.execute(sql, [gameId, companyId, price]);
            return companyId;
        } catch (error) {
            console.error("Erreur lors de l'ajout de la société au jeu", error);
            throw error;
        }
    }
    // Static method to find a company by its ID with associated price
    static findCompany(company_id) {
        let sql = `
    SELECT C.*, S.price
    FROM Company C
    JOIN sold_at S ON C.company_id = S.company_id
    WHERE S.company_id = ?;`;

        return db.execute(sql, [company_id]);
    }
    // Static method to find a company by its associated game ID with price
    static findByGameID(game_id) {
        let sql = `
    SELECT C.*, S.price
    FROM Company C
    JOIN sold_at S ON C.company_id = S.company_id
    WHERE S.game_id = ?;`;

        return db.execute(sql, [game_id]);
    }

    static deleteCompanyById(companyId) {
        let sql = `DELETE sold_at, Company
    FROM sold_at
    INNER JOIN Company ON sold_at.company_id = Company.company_id
    WHERE Company.company_id = ?;`;
        return db.execute(sql, [companyId]);
    }

    static async updateComp(
        company_name,
        ceo,
        nb_employees,
        market_value,
        reseller,
        price,
        companyId
    ) {
        let sqlprice = `
      UPDATE sold_at
      SET price = ?
      WHERE company_id = ?;
      `;
        const [updated_sold_at, _] = await db.execute(sqlprice, [
            price,
            companyId,
        ]);
        let sql = `
      UPDATE Company
      SET company_name = "?",
          ceo = "?",
          nb_employees = ?,
          market_value = ?,
          reseller = ?
      WHERE company_id = ?;`;
        const [updated_company, __] = await db.execute(sql, [
            company_name,
            ceo,
            nb_employees,
            market_value,
            reseller,
            companyId,
        ]);
        return [updated_sold_at, updated_company];
    }
}

module.exports = Company;
