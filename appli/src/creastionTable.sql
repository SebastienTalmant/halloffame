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
  room_id VARCHAR(36) REFERENCES room(id),
  FOREIGN KEY (room_id) REFERENCES room(id)
);

-- Table des cases
CREATE TABLE case_table (
  id VARCHAR(36) PRIMARY KEY,
  face_id VARCHAR(36) REFERENCES face(id),
  size INT NOT NULL,
  FOREIGN KEY (face_id) REFERENCES face(id)
);

-- Table des données
CREATE TABLE data_table (
  id VARCHAR(36) PRIMARY KEY,
  case_id VARCHAR(36) REFERENCES case_table(id),
  name VARCHAR(50) NOT NULL,
  surname VARCHAR(50) NOT NULL,
  URL VARCHAR(255),
  statut VARCHAR(255),
  offert_by_name VARCHAR(50),
  offert_by_surname VARCHAR(50),
  text TEXT CHECK (LENGTH(text) <= 3000),
  FOREIGN KEY (case_id) REFERENCES case_table(id)
);

-- Ajout compteur poru bloquer compte
ALTER TABLE users
ADD COLUMN login_attempts INT DEFAULT 0;


ALTER TABLE users ADD COLUMN account_locked TINYINT DEFAULT 0;
