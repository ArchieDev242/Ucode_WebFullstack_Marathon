USE ucode_web;

SELECT
    h.id,
    h.name,
    SUM(hp.power_points) AS total_power_points
FROM heroes AS h
JOIN heroes_powers AS hp ON h.id = hp.hero_id
GROUP BY h.id
ORDER BY
    total_power_points DESC,
    h.id ASC
LIMIT 1;


SELECT
    h.id,
    h.name,
    SUM(hp.power_points) AS total_defense_points
FROM heroes AS h
JOIN heroes_powers AS hp ON h.id = hp.hero_id
JOIN powers AS p ON hp.power_id = p.id
WHERE p.type = 'defense'
GROUP BY h.id
ORDER BY
    total_defense_points DESC,
    h.id ASC
LIMIT 1;


SELECT
    h.id,
    h.name,
    SUM(hp.power_points) AS total_power_points
FROM heroes AS h
JOIN heroes_teams AS ht ON h.id = ht.hero_id
JOIN teams AS t ON ht.team_id = t.id AND t.name = 'Avengers'
JOIN heroes_powers AS hp ON h.id = hp.hero_id
WHERE h.id NOT IN(
    SELECT hero_id
    FROM heroes_teams
    JOIN teams ON teams.id = heroes_teams.team_id
    WHERE teams.name = 'Hydra'
)
GROUP BY h.id
ORDER BY total_power_points DESC;


SELECT
    t.name AS team_name,
    SUM(hp.power_points) AS total_power_points
FROM teams AS t
JOIN heroes_teams ht ON t.id = ht.team_id
JOIN heroes_powers hp ON ht.hero_id = hp.hero_id
WHERE t.name IN ('Avengers', 'Hydra')
GROUP BY t.name
ORDER BY total_power_points ASC;