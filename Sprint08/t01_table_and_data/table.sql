USE ucode_web;

DROP TABLE IF EXISTS heroes;

CREATE TABLE heroes(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    class_role ENUM('tankman', 'healer', 'dps') NOT NULL
);