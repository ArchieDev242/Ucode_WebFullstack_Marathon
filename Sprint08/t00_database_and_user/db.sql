CREATE DATABASE IF NOT EXISTS ucode_web;
CREATE USER 'mkopychko'@'localhost' IDENTIFIED BY 'securepass';
GRANT ALL PRIVILEGES ON ucode_web.* TO 'mkopychko'@'localhost';
FLUSH PRIVILEGES;