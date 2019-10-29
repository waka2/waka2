INSERT INTO users (username, email, highscore)
VALUES (${username}, ${email}, ${highscore})
RETURNING user_id;