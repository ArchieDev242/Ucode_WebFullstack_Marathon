CREATE DATABASE IF NOT EXISTS sword;

USE sword;

ALTER TABLE users
    ADD COLUMN status ENUM('user', 'admin') NOT NULL DEFAULT 'user';