SELECT * FROM multiplayer
WHERE inuse = false
ORDER BY RANDOM()
LIMIT 1;
