CREATE TABLE IF NOT EXISTS users (
	id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    password_hash VARCHAR(255)
);