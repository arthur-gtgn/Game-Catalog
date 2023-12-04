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
DROP TABLE IF EXISTS Users;

CREATE TABLE Users(
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_created DATETIME,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(50) UNIQUE,
    role VARCHAR(50),
    password VARCHAR(100)
);

CREATE TABLE Company (
    company_id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(50),
    ceo VARCHAR(50),
    nb_employees INT,
    market_value DECIMAL(15,2),
    reseller BOOL
	-- PRIMARY KEY(company_id)
);

CREATE TABLE Game(
    game_id INT AUTO_INCREMENT PRIMARY KEY,
    game_name VARCHAR(100),
    category VARCHAR(50),
    release_date DATE,
    age_rating SMALLINT,
    description VARCHAR(500)
    -- reseller VARCHAR(50) NOT NULL,
    -- developer VARCHAR(50) NOT NULL,
    -- PRIMARY KEY(game_id)
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
    platform_id INT AUTO_INCREMENT PRIMARY KEY,
    platform_name VARCHAR(50),
    price INT,
    release_date DATE,
    current_gen BOOLEAN,
    company VARCHAR(50)
    -- PRIMARY KEY (platform_id)
);

CREATE TABLE played_on (
    platform_id INT,
    game_id INT,
    FOREIGN KEY (game_id) REFERENCES Game(game_id),
    FOREIGN KEY (platform_id) REFERENCES Platform(platform_id)
);

CREATE TABLE Reviewer (
    reviewer_id INT AUTO_INCREMENT PRIMARY KEY,
    reviewer_name VARCHAR(50),
    nb_journalists INT,
    has_gamers_interaction BOOLEAN,
    website VARCHAR(50)
    -- PRIMARY KEY (reviewer_id)
);

CREATE TABLE Review (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(500) NOT NULL,
    grade SMALLINT,
    author VARCHAR(50) NOT NULL,
    reference VARCHAR(50)
    -- reviewer SMALLINT NOT NULL,
    -- FOREIGN KEY (reviewer) REFERENCES Reviewer(reviewer_id),
    -- PRIMARY KEY (review_id)
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



INSERT INTO Company ( company_name, ceo, nb_employees, market_value, reseller)
VALUES
    ( 'Electronic Arts', 'Andrew Wilson', 9000, 12.45, TRUE),
    ('Nintendo', 'Shuntaro Furukawa', 6000, 85.20, FALSE),
    ('Activision Blizzard', 'Bobby Kotick', 8000, 45.70, TRUE),
    ('Sony Interactive Entertainment', 'Jim Ryan', 14000, 102.89, FALSE),
    ('Ubisoft', 'Yves Guillemot', 16000, 19.75, TRUE);

INSERT INTO Game (game_name, category, release_date, age_rating, description)
VALUES ( 'FIFA 23', 'Sports', '2023-09-15', 3,
        'The latest in the FIFA series, offering enhanced football simulation with improved graphics and gameplay mechanics for a more immersive experience.'),
       ( 'The Legend of Zelda: Tears of the Kingdom', 'Adventure', '2023-11-20', 10,
        'Breath of the Wild 2" (Adventure, 2023-11-20, Age 10+): A sequel to the acclaimed open-world adventure game, expanding the story and world of Hyrule with new puzzles and challenges.'),
       ('Call of Duty: Warzone', 'Shooter', '2023-05-10', 18,
        'A high-octane shooter game set in a dynamic warzone, featuring intense, fast-paced combat and strategic gameplay elements.'),
       ('Horizon Forbidden West', 'Action', '2023-02-18', 16,
        'An action-packed game set in a beautifully detailed post-apocalyptic world, combining exploration, combat, and a compelling narrative.'),
       ('Assassins Creed: Valhalla', 'Role-Playing', '2022-11-10', 17,
        'A historical role-playing game where players explore the Viking era, engaging in epic battles and strategic gameplay while unraveling a deep storyline.');


INSERT INTO Platform ( platform_name, price, release_date, current_gen, company)
VALUES
    ( 'PlayStation 5', 499, '2020-11-12', TRUE, 'Sony Interactive Entertainment'),
    ( 'Xbox Series X', 499, '2020-11-10', TRUE, 'Microsoft'),
    ('Nintendo Switch', 299, '2017-03-03', TRUE, 'Nintendo'),
    ('PC', 0, NULL, TRUE, 'Various'),
    ('PlayStation 4', 299, '2013-11-15', FALSE, 'Sony Interactive Entertainment');

INSERT INTO Reviewer (reviewer_name, nb_journalists, has_gamers_interaction, website)
VALUES
    ('GameSpot', 50, TRUE, 'www.gamespot.com'),
    ('IGN', 45, TRUE, 'www.ign.com'),
    ('Kotaku', 30, TRUE, 'www.kotaku.com'),
    ('Polygon', 20, TRUE, 'www.polygon.com'),
    ('Metacritic', 15, FALSE, 'www.metacritic.com');

INSERT INTO Review ( description, grade, author, reference)
VALUES
    ('An exciting sports game.', 90, 'John Doe', 'www.gamespot.com/review/fifa23'),
    ('A fantastic adventure game.', 95, 'Jane Smith', 'www.ign.com/review/zelda-breath-wild-2'),
    ('Action-packed shooter.', 85, 'Mike Johnson', 'www.kotaku.com/review/call-of-duty-warzone'),
    ('A great action game.', 88, 'Sarah Brown', 'www.polygon.com/review/horizon-forbidden-west'),
    ('Immersive RPG experience.', 89, 'Chris Lee', 'www.metacritic.com/review/assassins-creed-valhalla');

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
    
select * from game;
delete from game where game_id = 7;



INSERT INTO Users VALUES (NULL, now(), 'Arthur', 'arthur.gatignol@efrei.net', 'ADMIN', SHA2(CONCAT(NOW(), 'administrator'), 224));
INSERT INTO Users VALUES (NULL, now(), 'Romain', 'romain.samson@efrei.net', 'ADMIN', SHA2(CONCAT(NOW(), 'administrator2'), 224));