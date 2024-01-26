CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL
);

-- Table des salles
CREATE TABLE room (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT
);

-- Table des faces
CREATE TABLE face (
  id VARCHAR(36) PRIMARY KEY,
  room_id VARCHAR(36) REFERENCES room(id) ON DELETE CASCADE,
  FOREIGN KEY (room_id) REFERENCES room(id) ON DELETE CASCADE
);

-- Table des cases
CREATE TABLE case_table (
  id VARCHAR(36) PRIMARY KEY,
  face_id VARCHAR(36) REFERENCES face(id) ON DELETE CASCADE,
  size INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  surname VARCHAR(50) NOT NULL,
  URL VARCHAR(255),
  statut VARCHAR(255),
  offert_by_name VARCHAR(50),
  offert_by_surname VARCHAR(50),
  text TEXT CHECK (LENGTH(text) <= 3000),
  FOREIGN KEY (face_id) REFERENCES face(id) ON DELETE CASCADE
);




-- Ajout compteur poru bloquer compte
ALTER TABLE users
ADD COLUMN login_attempts INT DEFAULT 0;


ALTER TABLE users ADD COLUMN account_locked TINYINT DEFAULT 0;


CREATE TABLE pricing (
    id INT AUTO_INCREMENT PRIMARY KEY,
    price DECIMAL(10, 2) NOT NULL,
    size INT NOT NULL
);


INSERT INTO pricing (price, size) VALUES (39.00, 60);
INSERT INTO pricing (price, size) VALUES (59.00, 90);
INSERT INTO pricing (price, size) VALUES (79.00, 120);
INSERT INTO pricing (price, size) VALUES (99.00, 150);
