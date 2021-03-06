DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS users_login;
DROP TABLE IF EXISTS multiplayer;

CREATE TABLE users (
user_id SERIAL PRIMARY KEY,
username VARCHAR(24),
email VARCHAR(100),
highscore int
);

CREATE TABLE users_login (
password_id SERIAL PRIMARY KEY,
user_id INT REFERENCES users (user_id),
hash TEXT
);

CREATE TABLE multiplayer (
    player_id SERIAL PRIMARY KEY,
    userA text,
    userB text,
    inUse BOOLEAN
)