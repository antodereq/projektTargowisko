CREATE DATABASE IF NOT EXISTS sigmaDB;
USE sigmaDB;

CREATE TABLE IF NOT EXISTS sigmaStoiska (
    id INT AUTO_INCREMENT PRIMARY KEY,
    plac TINYINT NOT NULL DEFAULT 1, -- Ustawienie domyślnej wartości plac na 1
    sektor VARCHAR(10) CHECK (sektor REGEXP '^[A-Za-z0-9IVXLCDM]+$'), -- Pole sektor jako tekstowe, dopuszczające litery i liczby rzymskie
    kod INT NOT NULL,
    guid VARCHAR(36) DEFAULT NULL
);

INSERT INTO sigmaStoiska (plac, sektor, kod) VALUES
-- Sektor 1 (8 rekordów)
(1, 'I', 1), 
(1, 'I', 2), 
(1, 'I', 3), 
(1, 'I', 4), 
(1, 'I', 5), 
(1, 'I', 6), 
(1, 'I', 7), 
(1, 'I', 8),
-- Sektor 2 (12 rekordów)
(1, 'II', 1), 
(1, 'II', 2), 
(1, 'II', 3), 
(1, 'II', 4), 
(1, 'II', 5), 
(1, 'II', 6), 
(1, 'II', 7), 
(1, 'II', 8),
(1, 'II', 9), 
(1, 'II', 10), 
(1, 'II', 11), 
(1, 'II', 12),
-- Sektor 3 (10 rekordów)
(1, 'III', 1), 
(1, 'III', 2), 
(1, 'III', 3), 
(1, 'III', 4), 
(1, 'III', 5), 
(1, 'III', 6), 
(1, 'III', 7), 
(1, 'III', 8),
(1, 'III', 9), 
(1, 'III', 10),
-- Sektor 4 (13 rekordów)
(1, 'IV', 1), 
(1, 'IV', 2), 
(1, 'IV', 3), 
(1, 'IV', 4), 
(1, 'IV', 5), 
(1, 'IV', 6), 
(1, 'IV', 7), 
(1, 'IV', 8),
(1, 'IV', 9), 
(1, 'IV', 10), 
(1, 'IV', 11), 
(1, 'IV', 12), 
(1, 'IV', 13),
-- Sektor 5 (6 rekordów)
(1, 'V', 1), 
(1, 'V', 2), 
(1, 'V', 3), 
(1, 'V', 4), 
(1, 'V', 5), 
(1, 'V', 6);
