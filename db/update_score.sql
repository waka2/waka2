UPDATE users
SET highscore = $2
WHERE user_id = $1
RETURNING username, highscore