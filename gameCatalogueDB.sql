USE gameTelescope;

DROP TABLE IF EXISTS developed_by;
DROP TABLE IF EXISTS sold_at;
DROP TABLE IF EXISTS played_on;
DROP TABLE IF EXISTS review_by;
DROP TABLE IF EXISTS test_review;
DROP TABLE IF EXISTS Company;
DROP TABLE IF EXISTS Game;
DROP TABLE IF EXISTS Platform;
DROP TABLE IF EXISTS Review;
DROP TABLE IF EXISTS Reviewer;
CREATE TABLE Company (
    company_id INT,
    company_name VARCHAR(50),
    ceo VARCHAR(50),
    nb_employees INT,
    market_value DECIMAL(15,2),
    reseller BOOL,
    PRIMARY KEY(company_id)
);

CREATE TABLE Game(
    game_id INT,
    game_name VARCHAR(50),
    category VARCHAR(50),
    release_date DATE,
    age_rating SMALLINT,
    -- reseller VARCHAR(50) NOT NULL,
    -- developer VARCHAR(50) NOT NULL,
    PRIMARY KEY(game_id)
    -- FOREIGN KEY(reseller) REFERENCES sold_at(company_name),
    -- FOREIGN KEY (developer) REFERENCES developed_by(company_name)
);

CREATE TABLE developed_by (

    game_id INT,
    company_id INT,
    PRIMARY KEY (game_id, company_id),
    FOREIGN KEY (game_id) REFERENCES Game(game_id),
    FOREIGN KEY (company_id) REFERENCES Company(company_id)
);

CREATE TABLE sold_at (
    game_id INT,
    company_id INT,
    price DECIMAL(5,2),
    PRIMARY KEY(game_id, company_id),
    FOREIGN KEY(game_id) REFERENCES Game(game_id),
    FOREIGN KEY(company_id) REFERENCES Company(company_id)
);

CREATE TABLE Platform (
    platform_id INT,
    platform_name VARCHAR(50),
    price INT,
    release_date DATE,
    current_gen BOOLEAN,
    company VARCHAR(50),
    PRIMARY KEY (platform_id)
);

CREATE TABLE played_on (
    platform_id INT,
    game_id INT,
    FOREIGN KEY (game_id) REFERENCES Game(game_id),
    FOREIGN KEY (platform_id) REFERENCES Platform(platform_id)
);

CREATE TABLE Reviewer (
    reviewer_id INT,
    reviewer_name VARCHAR(50),
    nb_journalists INT,
    has_gamers_interaction BOOLEAN,
    website VARCHAR(50),
    PRIMARY KEY (reviewer_id)
);

CREATE TABLE Review (
    review_id INT,
    description VARCHAR(500) NOT NULL,
    grade SMALLINT,
    author VARCHAR(50) NOT NULL,
    reference VARCHAR(50),
    -- reviewer SMALLINT NOT NULL,
    -- FOREIGN KEY (reviewer) REFERENCES Reviewer(reviewer_id),
    PRIMARY KEY (review_id)
);


DELIMITER //
CREATE TRIGGER trg_developed_by_reseller
BEFORE INSERT ON developed_by
FOR EACH ROW
BEGIN
    DECLARE reseller_val BOOLEAN;
    SELECT reseller INTO reseller_val FROM Company WHERE company_id = NEW.company_id;
    /*IF reseller_val = TRUE THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Reseller companies are not allowed.';
    END IF;*/
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER trg_sold_by_developer
BEFORE INSERT ON sold_at
FOR EACH ROW
BEGIN
    DECLARE reseller_val BOOLEAN;
    SELECT reseller INTO reseller_val FROM Company WHERE company_id = NEW.company_id;
    /*IF reseller_val = FALSE THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Developer companies are not allowed.';
    END IF;*/
END //
DELIMITER ;



INSERT INTO Company (company_id, company_name, ceo, nb_employees, market_value, reseller)
VALUES
    (1, 'Electronic Arts', 'Andrew Wilson', 9000, 12.45, TRUE),
    (2, 'Nintendo', 'Shuntaro Furukawa', 6000, 85.20, FALSE),
    (3, 'Activision Blizzard', 'Bobby Kotick', 8000, 45.70, TRUE),
    (4, 'Sony Interactive Entertainment', 'Jim Ryan', 14000, 102.89, FALSE),
    (5, 'Ubisoft', 'Yves Guillemot', 16000, 19.75, TRUE);

INSERT INTO Game (game_id, game_name, category, release_date, age_rating)
VALUES
    (1, 'FIFA 23', 'Sports', '2023-09-15', 3),
    (2, 'The Legend of Zelda: Breath of the Wild 2', 'Adventure', '2023-11-20', 10),
    (3, 'Call of Duty: Warzone', 'Shooter', '2023-05-10', 18),
    (4, 'Horizon Forbidden West', 'Action', '2023-02-18', 16),
    (5, 'Assassins Creed: Valhalla', 'Role-Playing', '2022-11-10', 17);

INSERT INTO Platform (platform_id, platform_name, price, release_date, current_gen, company)
VALUES
    (1, 'PlayStation 5', 499, '2020-11-12', TRUE, 'Sony Interactive Entertainment'),
    (2, 'Xbox Series X', 499, '2020-11-10', TRUE, 'Microsoft'),
    (3, 'Nintendo Switch', 299, '2017-03-03', TRUE, 'Nintendo'),
    (4, 'PC', 0, NULL, TRUE, 'Various'),
    (5, 'PlayStation 4', 299, '2013-11-15', FALSE, 'Sony Interactive Entertainment');

INSERT INTO Reviewer (reviewer_id, reviewer_name, nb_journalists, has_gamers_interaction, website)
VALUES
    (1, 'GameSpot', 50, TRUE, 'www.gamespot.com'),
    (2, 'IGN', 45, TRUE, 'www.ign.com'),
    (3, 'Kotaku', 30, TRUE, 'www.kotaku.com'),
    (4, 'Polygon', 20, TRUE, 'www.polygon.com'),
    (5, 'Metacritic', 15, FALSE, 'www.metacritic.com');

INSERT INTO Review (review_id, description, grade, author, reference)
VALUES
    (1, 'An exciting sports game.', 90, 'John Doe', 'www.gamespot.com/review/fifa23'),
    (2, 'A fantastic adventure game.', 95, 'Jane Smith', 'www.ign.com/review/zelda-breath-wild-2'),
    (3, 'Action-packed shooter.', 85, 'Mike Johnson', 'www.kotaku.com/review/call-of-duty-warzone'),
    (4, 'A great action game.', 88, 'Sarah Brown', 'www.polygon.com/review/horizon-forbidden-west'),
    (5, 'Immersive RPG experience.', 89, 'Chris Lee', 'www.metacritic.com/review/assassins-creed-valhalla');

INSERT INTO sold_at (game_id, company_id, price)
VALUES
    (1, 1, 59.99), -- Remplacez les valeurs par les véritables ID de jeu et d'entreprise
    (2, 2, 69.99),
    (3, 3, 0.00),
    (4, 4, 69.99),
    (5, 5, 49.99);

INSERT INTO developed_by (game_id, company_id)
VALUES
    (1, 1), -- Remplacez les valeurs par les véritables ID de jeu et d'entreprise
    (2, 2),
    (3, 3),
    (4, 4),
    (5, 5);

INSERT INTO played_on (game_id, platform_id)
VALUES
    (1, 1), -- Remplacez les valeurs par les véritables ID de jeu et de plateforme
    (2, 3),
    (3, 1),
    (4, 5),
    (5, 4);

