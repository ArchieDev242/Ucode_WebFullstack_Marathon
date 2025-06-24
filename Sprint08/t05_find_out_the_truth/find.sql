USE ucode_web;

SELECT 
    h.id,
    h.name,
    r.name AS race,
    GROUP_CONCAT(DISTINCT t.name SEPARATOR ', ') AS teams,
    SUM(hp.power_points) AS total_power
FROM heroes h
JOIN races r ON h.race_id = r.id AND r.name != 'Human'
JOIN heroes_teams ht ON h.id = ht.hero_id
JOIN teams t ON ht.team_id = t.id
JOIN heroes_powers hp ON h.id = hp.hero_id
JOIN powers p ON hp.power_id = p.id AND (p.type = 'defense' OR p.name = 'healer')
WHERE h.name LIKE '%a%'
GROUP BY h.id
HAVING COUNT(DISTINCT t.id) >= 2
ORDER BY h.id
LIMIT 1;