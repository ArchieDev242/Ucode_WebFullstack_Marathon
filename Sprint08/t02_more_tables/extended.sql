USE ucode_web;

DROP TABLE IF EXISTS heroes_teams;
DROP TABLE IF EXISTS heroes_powers;
DROP TABLE IF EXISTS powers;
DROP TABLE IF EXISTS teams;
DROP TABLE IF EXISTS races;

CREATE TABLE powers(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    type ENUM('attack', 'defense') NOT NULL
);

CREATE TABLE heroes_powers(
    hero_id INT,
    power_id INT,
    power_points INT NOT NULL,
    PRIMARY KEY (hero_id, power_id),
    FOREIGN KEY (hero_id) REFERENCES heroes(id) ON DELETE CASCADE,
    FOREIGN KEY (power_id) REFERENCES powers(id) ON DELETE CASCADE
);

CREATE TABLE races(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

ALTER TABLE heroes
ADD COLUMN race_id INT,
ADD FOREIGN KEY (race_id) REFERENCES races(id) ON DELETE SET NULL;

CREATE TABLE teams(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE heroes_teams(
    hero_id INT,
    team_id INT,
    PRIMARY KEY (hero_id, team_id),
    FOREIGN KEY (hero_id) REFERENCES heroes(id) ON DELETE CASCADE,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);