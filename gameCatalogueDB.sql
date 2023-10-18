USE gameTelescope;

DROP TABLE IF EXISTS Company;
DROP TABLE IF EXISTS Game;
DROP TABLE IF EXISTS developed_by;
DROP TABLE IF EXISTS sold_at;
DROP TABLE IF EXISTS Platform;
DROP TABLE IF EXISTS played_on;
DROP TABLE IF EXISTS Review;
DROP TABLE IF EXISTS Reviewer;
DROP TABLE IF EXISTS review_by;
DROP TABLE IF EXISTS test_review;

CREATE TABLE Company (
    company_name VARCHAR(50),
    ceo VARCHAR(50),
    nb_employees INT,
    market_value DECIMAL(15,2),
    reseller BOOL,
    PRIMARY KEY(company_name)
);

CREATE TABLE Game(
    game_name VARCHAR(50),
    category VARCHAR(50),
    release_date DATE,
    age_rating SMALLINT,
    -- reseller VARCHAR(50) NOT NULL,
    -- developer VARCHAR(50) NOT NULL,
    PRIMARY KEY(game_name)
    -- FOREIGN KEY(reseller) REFERENCES sold_at(company_name),
    -- FOREIGN KEY (developer) REFERENCES developed_by(company_name)
);

CREATE TABLE developed_by (
    game_name VARCHAR(50),
    company_name VARCHAR(50),
    PRIMARY KEY (game_name, company_name),
    FOREIGN KEY (game_name) REFERENCES Game(game_name),
    FOREIGN KEY (company_name) REFERENCES Company(company_name)
);

CREATE TABLE sold_at (
    game_name VARCHAR(50),
    company_name VARCHAR(50),
    price DECIMAL(5,2),
    PRIMARY KEY(game_name, company_name),
    FOREIGN KEY(game_name) REFERENCES Game(game_name),
    FOREIGN KEY(company_name) REFERENCES Company(company_name)
);

CREATE TABLE Platform (
    platform_name VARCHAR(50),
    price INT,
    release_date DATE,
    current_gen BOOLEAN,
    company VARCHAR(50),
    PRIMARY KEY (platform_name)
);

CREATE TABLE played_on (
    platform_name VARCHAR(50),
    game_name VARCHAR(50),
    FOREIGN KEY (game_name) REFERENCES Game(game_name),
    FOREIGN KEY (platform_name) REFERENCES Platform(platform_name)
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

CREATE TABLE review_by (
    reviewer_id INT,
    review_id INT,
    PRIMARY KEY (reviewer_id, review_id),
    FOREIGN KEY (reviewer_id) REFERENCES Reviewer(reviewer_id),
    FOREIGN KEY (review_id) REFERENCES Review(review_id)
);

CREATE TABLE test_review (
    review_id INT,
    game_name VARCHAR(50),
    PRIMARY KEY (review_id, game_name),
    FOREIGN KEY (review_id) REFERENCES Review(review_id),
    FOREIGN KEY (game_name) REFERENCES Game(game_name)
);

DELIMITER //
CREATE TRIGGER trg_developed_by_reseller
BEFORE INSERT ON developed_by
FOR EACH ROW
BEGIN
    DECLARE reseller_val BOOLEAN;
    SELECT reseller INTO reseller_val FROM Company WHERE company_name = NEW.company_name;
    IF reseller_val = TRUE THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Reseller companies are not allowed.';
    END IF;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER trg_sold_by_developer
BEFORE INSERT ON sold_at
FOR EACH ROW
BEGIN
    DECLARE reseller_val BOOLEAN;
    SELECT reseller INTO reseller_val FROM Company WHERE company_name = NEW.company_name;
    IF reseller_val = FALSE THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Developer companies are not allowed.';
    END IF;
END //
DELIMITER ;

INSERT INTO Company (company_name, ceo, nb_employees, market_value, reseller)
VALUES
    ('Electronic Arts', 'Andrew Wilson', 9000, 12.45, TRUE),
    ('Nintendo', 'Shuntaro Furukawa', 6000, 85.20, FALSE),
    ('Activision Blizzard', 'Bobby Kotick', 8000, 45.70, TRUE),
    ('Sony Interactive Entertainment', 'Jim Ryan', 14000, 102.89, FALSE),
    ('Ubisoft', 'Yves Guillemot', 16000, 19.75, TRUE);

INSERT INTO Game (game_name, category, release_date, age_rating)
VALUES
    ('FIFA 23', 'Sports', '2023-09-15', 3),
    ('The Legend of Zelda: Breath of the Wild 2', 'Adventure', '2023-11-20', 10),
    ('Call of Duty: Warzone', 'Shooter', '2023-05-10', 18),
    ('Horizon Forbidden West', 'Action', '2023-02-18', 16),
    ('Assassins Creed: Valhalla', 'Role-Playing', '2022-11-10', 17);

INSERT INTO developed_by (game_name, company_name)
VALUES
    ('FIFA 23', 'Electronic Arts'),
    ('The Legend of Zelda: Breath of the Wild 2', 'Nintendo'),
    ('Call of Duty: Warzone', 'Activision Blizzard'),
    ('Horizon Forbidden West', 'Sony Interactive Entertainment'),
    ('Assassins Creed: Valhalla', 'Ubisoft');

INSERT INTO sold_at (game_name, company_name, price)
VALUES
    ('FIFA 23', 'Electronic Arts', 59.99),
    ('The Legend of Zelda: Breath of the Wild 2', 'Nintendo', 69.99),
    ('Call of Duty: Warzone', 'Activision Blizzard', 0.00),
    ('Horizon Forbidden West', 'Sony Interactive Entertainment', 69.99),
    ('Assassin''s Creed: Valhalla', 'Ubisoft', 49.99);

INSERT INTO Platform (platform_name, price, release_date, current_gen, company)
VALUES
    ('PlayStation 5', 499, '2020-11-12', TRUE, 'Sony Interactive Entertainment'),
    ('Xbox Series X', 499, '2020-11-10', TRUE, 'Microsoft'),
    ('Nintendo Switch', 299, '2017-03-03', TRUE, 'Nintendo'),
    ('PC', 0, 'N/A', TRUE, 'Various'),
    ('PlayStation 4', 299, '2013-11-15', FALSE, 'Sony Interactive Entertainment');
