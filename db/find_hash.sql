SELECT u.user_id, u.username, hash FROM users u
JOIN users_login ul ON u.user_id = ul.user_id
WHERE username = $1