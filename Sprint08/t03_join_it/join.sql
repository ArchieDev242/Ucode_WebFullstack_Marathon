USE ucode_web;

SELECT
    h.name AS hero_name,
    t.name AS team_name
FROM heroes AS h
LEFT JOIN heroes_teams AS ht ON h.id = ht.hero_id
LEFT JOIN teams AS t ON ht.team_id = t.id;

SELECT
    h.name AS hero_name,
    p.name AS power_name
FROM heroes AS h
LEFT JOIN heroes_powers AS hp ON h.id = hp.hero_id
LEFT JOIN powers AS p ON hp.power_id = p.id

UNION 

SELECT
    NULL AS hero_name,
    p.name AS power_name
FROM powers AS p
WHERE NOT EXISTS(
    SELECT 1
    FROM heroes_powers AS hp
    WHERE hp.power_id = p.id
);

SELECT
    h.name AS hero_name,
    p.name AS power_name,
    t.name AS team_name
FROM heroes AS h
INNER JOIN heroes_powers AS hp ON h.id = hp.hero_id
INNER JOIN powers AS p ON hp.power_id = p.id
INNER JOIN heroes_teams AS ht ON h.id = ht.hero_id
INNER JOIN teams AS t ON ht.team_id = t.id;