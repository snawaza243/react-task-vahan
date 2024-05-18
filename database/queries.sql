-- Active: 1694423108902@@127.0.0.1@3306@vahandata

-- Create the database
CREATE DATABASE IF NOT EXISTS vahandata;


-- Use the database
USE vahandata;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('master', 'user') NOT NULL DEFAULT 'user'
);


-- Create the entities table
CREATE TABLE IF NOT EXISTS entities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    dob DATE NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

DESC users;
DESC entities;

SELECT * FROM users;
SELECT * FROM entities;

