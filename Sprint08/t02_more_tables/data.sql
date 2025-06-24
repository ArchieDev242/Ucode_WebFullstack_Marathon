USE ucode_web;

INSERT INTO powers(name, type) VALUES
('bloody fist', 'attack'),
('iron shield', 'defense'),
('energy blast', 'attack'),
('force field', 'defense');

INSERT INTO races(name) VALUES
('Human'),
('Kree'),
('Asgardian');

INSERT INTO teams(name) VALUES
('Avengers'),
('Hydra'),
('Guardians of the Galaxy');

UPDATE heroes SET race_id = (SELECT id FROM races WHERE name = 'Human')
WHERE name IN ('Hulk', 'Captain America', 'Doctor Strange', 'Iron Man', 'Black Widow');

UPDATE heroes SET race_id = (SELECT id FROM races WHERE name = 'Asgardian') 
WHERE name = 'Thor';

UPDATE heroes SET race_id = (SELECT id FROM races WHERE name = 'Kree')
WHERE name IN ('Groot', 'Nebula', 'Rocket', 'Vision');

INSERT INTO heroes_powers(hero_id, power_id, power_points) VALUES
((SELECT id FROM heroes WHERE name = 'Hulk' LIMIT 1), 2, 200),
((SELECT id FROM heroes WHERE name = 'Thor' LIMIT 1), 1, 110),
((SELECT id FROM heroes WHERE name = 'Groot' LIMIT 1), 1, 150),
((SELECT id FROM heroes WHERE name = 'Iron Man' LIMIT 1), 1, 110),
((SELECT id FROM heroes WHERE name = 'Captain America' LIMIT 1), 2, 200),
((SELECT id FROM heroes WHERE name = 'Groot' LIMIT 1), 2, 200),
((SELECT id FROM heroes WHERE name = 'Doctor Strange' LIMIT 1), 3, 150),
((SELECT id FROM heroes WHERE name = 'Thor' LIMIT 1), 4, 300);

INSERT INTO heroes_teams(hero_id, team_id) VALUES
((SELECT id FROM heroes WHERE name = 'Hulk' LIMIT 1), (SELECT id FROM teams WHERE name = 'Avengers' LIMIT 1)),
((SELECT id FROM heroes WHERE name = 'Thor' LIMIT 1), (SELECT id FROM teams WHERE name = 'Avengers' LIMIT 1)),
((SELECT id FROM heroes WHERE name = 'Iron Man' LIMIT 1), (SELECT id FROM teams WHERE name = 'Avengers' LIMIT 1)),
((SELECT id FROM heroes WHERE name = 'Iron Man' LIMIT 1), (SELECT id FROM teams WHERE name = 'Hydra' LIMIT 1)),
((SELECT id FROM heroes WHERE name = 'Captain America' LIMIT 1), (SELECT id FROM teams WHERE name = 'Avengers' LIMIT 1)),
((SELECT id FROM heroes WHERE name = 'Groot' LIMIT 1), (SELECT id FROM teams WHERE name = 'Guardians of the Galaxy' LIMIT 1)),
((SELECT id FROM heroes WHERE name = 'Doctor Strange' LIMIT 1), (SELECT id FROM teams WHERE name = 'Avengers' LIMIT 1));