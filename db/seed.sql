DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS users_login;

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