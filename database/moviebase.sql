-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Schema 'moviebase'
-- 
-- ---

DROP SCHEMA IF EXISTS `moviebase`;

CREATE SCHEMA `moviebase` ;

-- ---
-- Table 'User'
-- 
-- ---

DROP TABLE IF EXISTS moviebase.User;
		
CREATE TABLE moviebase.User (
  `UserId` INT NOT NULL AUTO_INCREMENT,
  `FirstName` VARCHAR(40) NOT NULL,
  `LastName` VARCHAR(40) NOT NULL,
  `Email` VARCHAR(60) NOT NULL,
  `Password` VARCHAR(100) NOT NULL,
  `Salt` VARCHAR(4) NOT NULL,
  PRIMARY KEY (`UserId`)
);

-- ---
-- Table 'Media'
-- 
-- ---

DROP TABLE IF EXISTS moviebase.Media;
		
CREATE TABLE moviebase.Media (
  `MediaId` INT NOT NULL AUTO_INCREMENT,
  `Title` VARCHAR(100) NOT NULL,
  `Description` BLOB NOT NULL,
  `ReleaseDate` DATE NOT NULL,
  `RunTime` INT NOT NULL DEFAULT 0,
  `Poster` BLOB NOT NULL,
  `MediaTypeId` INT NOT NULL,
  `PublisherId` INT NOT NULL,
  `LanguageId` INT NOT NULL,
  `AgeRatingId` INT NOT NULL,
  PRIMARY KEY (`MediaId`)
);

-- ---
-- Table 'MediaType'
-- 
-- ---

DROP TABLE IF EXISTS moviebase.MediaType;
		
CREATE TABLE moviebase.MediaType (
  `MediaTypeId` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`MediaTypeId`)
);

-- ---
-- Table 'Publisher'
-- 
-- ---

DROP TABLE IF EXISTS moviebase.Publisher;
		
CREATE TABLE moviebase.Publisher (
  `PublisherId` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`PublisherId`)
);

-- ---
-- Table 'StreamingService'
-- 
-- ---

DROP TABLE IF EXISTS moviebase.StreamingService;
		
CREATE TABLE moviebase.StreamingService (
  `StreamingServiceId` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`StreamingServiceId`)
);

-- ---
-- Table 'Genre'
-- 
-- ---

DROP TABLE IF EXISTS moviebase.Genre;
		
CREATE TABLE moviebase.Genre (
  `GenreId` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`GenreId`)
);

-- ---
-- Table 'AgeRating'
-- 
-- ---

DROP TABLE IF EXISTS moviebase.AgeRating;
		
CREATE TABLE moviebase.AgeRating (
  `AgeRatingId` INT NOT NULL AUTO_INCREMENT,
  `Description` BLOB NOT NULL,
  `AgeRatingTypeId` INT NOT NULL,
  PRIMARY KEY (`AgeRatingId`)
);

-- ---
-- Table 'UserRating'
-- 
-- ---

DROP TABLE IF EXISTS moviebase.UserRating;
		
CREATE TABLE moviebase.UserRating (
  `UserRatingId` INT NOT NULL AUTO_INCREMENT,
  `Rating` DECIMAL NOT NULL,
  `MediaId` INT NOT NULL,
  `UserId` INT NOT NULL,
  PRIMARY KEY (`UserRatingId`)
);

-- ---
-- Table 'Language'
-- 
-- ---

DROP TABLE IF EXISTS moviebase.Language;
		
CREATE TABLE moviebase.Language (
  `LanguageId` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`LanguageId`)
);

-- ---
-- Table 'List'
-- 
-- ---

DROP TABLE IF EXISTS moviebase.List;
		
CREATE TABLE moviebase.List (
  `ListId` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(40) NOT NULL,
  `Description` BLOB NOT NULL,
  `UserId` INT NOT NULL,
  PRIMARY KEY (`ListId`)
);

-- ---
-- Table 'CastCrew'
-- 
-- ---

DROP TABLE IF EXISTS moviebase.CastCrew;
		
CREATE TABLE moviebase.CastCrew (
  `CastCrewId` INT NOT NULL AUTO_INCREMENT,
  `FirstName` VARCHAR(70) NOT NULL,
  `LastName` VARCHAR(70) NOT NULL,
  `CastCrewTypeId` INT NOT NULL,
  PRIMARY KEY (`CastCrewId`)
);

-- ---
-- Table 'Review'
-- 
-- ---

DROP TABLE IF EXISTS moviebase.Review;
		
CREATE TABLE moviebase.Review (
  `ReviewId` INT NOT NULL AUTO_INCREMENT,
  `PublicPrivate` TINYINT NOT NULL,
  `Description` BLOB NOT NULL,
  `UserRatingId` INT NOT NULL,
  PRIMARY KEY (`ReviewId`)
);

-- ---
-- Table 'MediaStreamingService'
-- 
-- ---

DROP TABLE IF EXISTS moviebase.MediaStreamingService;
		
CREATE TABLE moviebase.MediaStreamingService (
  `MediaId` INT NOT NULL,
  `StreamingServiceId` INT NOT NULL,
  PRIMARY KEY (`MediaId`, `StreamingServiceId`)
);

-- ---
-- Table 'MediaGenre'
-- 
-- ---

DROP TABLE IF EXISTS moviebase.MediaGenre;
		
CREATE TABLE moviebase.MediaGenre (
  `MediaId` INT NOT NULL AUTO_INCREMENT,
  `GenreId` INT NOT NULL,
  PRIMARY KEY (`MediaId`, `GenreId`)
);

-- ---
-- Table 'CastCrewType'
-- 
-- ---

DROP TABLE IF EXISTS moviebase.CastCrewType;
		
CREATE TABLE moviebase.CastCrewType (
  `CastCrewTypeId` INT NOT NULL AUTO_INCREMENT,
  `Type` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`CastCrewTypeId`)
);

-- ---
-- Table 'MediaCastCrew'
-- 
-- ---

DROP TABLE IF EXISTS moviebase.MediaCastCrew;
		
CREATE TABLE moviebase.MediaCastCrew (
  `MediaId` INT NOT NULL AUTO_INCREMENT,
  `CastCrewId` INT NOT NULL,
  PRIMARY KEY (`MediaId`, `CastCrewId`)
);

-- ---
-- Table 'MediaList'
-- 
-- ---

DROP TABLE IF EXISTS moviebase.MediaList;
		
CREATE TABLE moviebase.MediaList (
  `MediaId` INT NOT NULL,
  `ListId` INT NOT NULL,
  PRIMARY KEY (`MediaId`, `ListId`)
);

-- ---
-- Table 'AgeRatingType'
-- 
-- ---

DROP TABLE IF EXISTS moviebase.AgeRatingType;
		
CREATE TABLE moviebase.AgeRatingType (
  `AgeRatingTypeId` INT NOT NULL AUTO_INCREMENT,
  `Type` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`AgeRatingTypeId`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE moviebase.Media ADD FOREIGN KEY (MediaTypeId) REFERENCES moviebase.MediaType (`MediaTypeId`);
ALTER TABLE moviebase.Media ADD FOREIGN KEY (PublisherId) REFERENCES moviebase.Publisher (`PublisherId`);
ALTER TABLE moviebase.Media ADD FOREIGN KEY (LanguageId) REFERENCES moviebase.Language (`LanguageId`);
ALTER TABLE moviebase.Media ADD FOREIGN KEY (AgeRatingId) REFERENCES moviebase.AgeRating (`AgeRatingId`);
ALTER TABLE moviebase.AgeRating ADD FOREIGN KEY (AgeRatingTypeId) REFERENCES moviebase.AgeRatingType (`AgeRatingTypeId`);
ALTER TABLE moviebase.UserRating ADD FOREIGN KEY (MediaId) REFERENCES moviebase.Media (`MediaId`);
ALTER TABLE moviebase.UserRating ADD FOREIGN KEY (UserId) REFERENCES moviebase.User (`UserId`);
ALTER TABLE moviebase.List ADD FOREIGN KEY (UserId) REFERENCES moviebase.User (`UserId`);
ALTER TABLE moviebase.CastCrew ADD FOREIGN KEY (CastCrewTypeId) REFERENCES moviebase.CastCrewType (`CastCrewTypeId`);
ALTER TABLE moviebase.Review ADD FOREIGN KEY (UserRatingId) REFERENCES moviebase.UserRating (`UserRatingId`);
ALTER TABLE moviebase.MediaStreamingService ADD FOREIGN KEY (MediaId) REFERENCES moviebase.Media (`MediaId`);
ALTER TABLE moviebase.MediaStreamingService ADD FOREIGN KEY (StreamingServiceId) REFERENCES moviebase.StreamingService (`StreamingServiceId`);
ALTER TABLE moviebase.MediaGenre ADD FOREIGN KEY (MediaId) REFERENCES moviebase.Media (`MediaId`);
ALTER TABLE moviebase.MediaGenre ADD FOREIGN KEY (GenreId) REFERENCES moviebase.Genre (`GenreId`);
ALTER TABLE moviebase.MediaCastCrew ADD FOREIGN KEY (MediaId) REFERENCES moviebase.Media (`MediaId`);
ALTER TABLE moviebase.MediaCastCrew ADD FOREIGN KEY (CastCrewId) REFERENCES moviebase.CastCrew (`CastCrewId`);
ALTER TABLE moviebase.MediaList ADD FOREIGN KEY (MediaId) REFERENCES moviebase.Media (`MediaId`);
ALTER TABLE moviebase.MediaList ADD FOREIGN KEY (ListId) REFERENCES moviebase.List (`ListId`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `User` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Media` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `MediaType` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Publisher` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `StreamingService` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Genre` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `AgeRating` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `UserRating` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Language` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `List` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `CastCrew` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Review` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `MediaStreamingService` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `MediaGenre` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `CastCrewType` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `MediaCastCrew` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `MediaList` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `AgeRatingType` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

INSERT INTO moviebase.CastCrewType (CastCrewTypeId, Type) VALUES
(1, 'Actor'),
(2, 'Director'),
(3, 'Writer'),
(4, 'Producer'),
(5, 'Cinematographer');

INSERT INTO moviebase.Genre (GenreId, Name) VALUES
(1, 'Action'),
(2, 'Science Fiction'),
(3, 'Romance'),
(4, 'Comedy'),
(5, 'Fantasy');

INSERT INTO moviebase.StreamingService (StreamingServiceId, Name) VALUES
(1, 'StreamFlix'),
(2, 'GalacticStream'),
(3, 'RomanceStream'),
(4, 'ComedyHub'),
(5, 'FantasyVision');

INSERT INTO moviebase.MediaType (MediaTypeId, Name) VALUES
(1, 'Movie'),
(2, 'Series');

INSERT INTO moviebase.Publisher (PublisherId, Name) VALUES
(1, 'DreamWave Studios'),
(2, 'Galactic Media Group'),
(3, 'Eternal Romance Productions'),
(4, 'LaughCraft Entertainment'),
(5, 'FantasyRealms Studios');

INSERT INTO moviebase.Language (LanguageId, Name) VALUES
(1, 'English'),
(2, 'Spanish'),
(3, 'French'),
(4, 'Mandarin'),
(5, 'German');

INSERT INTO moviebase.AgeRatingType (AgeRatingTypeId, Type) VALUES
(1, 'G'),
(2, 'PG'),
(3, 'PG-13'),
(4, 'R');

INSERT INTO moviebase.CastCrew (CastCrewId, FirstName, LastName, CastCrewTypeId) VALUES
(1, 'John', 'Smith', 1),
(2, 'Emma', 'Johnson', 1),
(3, 'Michael', 'Williams', 1),
(4, 'Sophia', 'Jones', 1),
(5, 'Daniel', 'Brown', 1),
(6, 'Olivia', 'Davis', 1),
(7, 'Matthew', 'Miller', 1),
(8, 'Ava', 'Anderson', 1),
(9, 'Christopher', 'Taylor', 1),
(10, 'Emily', 'Moore', 1),
(11, 'Nicholas', 'Harris', 1),
(12, 'Grace', 'Martin', 1),
(13, 'Ethan', 'Thompson', 1),
(14, 'Chloe', 'White', 1),
(15, 'Ryan', 'Walker', 1),
(16, 'Mia', 'Evans', 1),
(17, 'David', 'Turner', 1),
(18, 'Isabella', 'Baker', 1),
(19, 'Andrew', 'Garcia', 1),
(20, 'Amelia', 'Lee', 1),
(21, 'Logan', 'Lopez', 1),
(22, 'Sofia', 'Clark', 1),
(23, 'Joseph', 'King', 1),
(24, 'Lily', 'Green', 1),
(25, 'James', 'Ward', 1),
(26, 'Avery', 'Hill', 1),
(27, 'Benjamin', 'Cooper', 1),
(28, 'Aria', 'Perez', 1),
(29, 'Jackson', 'Taylor', 1),
(30, 'Ella', 'Wilson', 1),
(31, 'Christopher', 'Anderson', 2),
(32, 'Sophie', 'Hill', 2),
(33, 'David', 'Bennett', 2),
(34, 'Emma', 'Carter', 2),
(35, 'Benjamin', 'Fisher', 2),
(36, 'Grace', 'Barnes', 3),
(37, 'Alexander', 'Mitchell', 3),
(38, 'Ava', 'Robinson', 3),
(39, 'Lucas', 'Turner', 3),
(40, 'Chloe', 'Foster', 3),
(41, 'Daniel', 'Adams', 4),
(42, 'Mia', 'Wright', 4),
(43, 'Matthew', 'Harrison', 4),
(44, 'Lily', 'Diaz', 4),
(45, 'Ryan', 'Russell', 4),
(46, 'Ethan', 'Murray', 5),
(47, 'Aria', 'Simmons', 5),
(48, 'Logan', 'Stewart', 5),
(49, 'Isabella', 'Wood', 5),
(50, 'Jackson', 'Griffin', 5);

INSERT INTO moviebase.AgeRating (AgeRatingId, Description, AgeRatingTypeId) VALUES
(1, 'Mild Violence, Some Tense Scenes', 2),
(2, 'Explicit Violence, Strong Language, Drug Use', 4),
(3, 'Some Adult Themes, Brief Nudity', 3),
(4, 'Minor Language, Some Tense Scenes', 2),
(5, 'Mild Violence, Minor Language', 2),
(6, 'Moderate Violence, Infrequent Strong Language', 3),
(7, 'Educational Themes, No Intense Action', 1),
(8, 'Infrequent Strong Language, Mature Humor', 3),
(9, 'No Inappropriate Content, No Intense Action', 1),
(10, 'Moderate Violence, Infrequent Strong Language', 3),
(11, 'Positive Role Models, No Intense Action', 1),
(12, 'Infrequent Strong Language, Mature Humor', 3),
(13, 'Explicit Violence, Intense Adult Themes', 4),
(14, 'Explicit Violence, Strong Language', 4),
(15, 'Infrequent Strong Language, Mature Humor', 3),
(16, 'Moderate Violence, Brief Nudity', 3),
(17, 'Educational Themes, No Intense Action', 1),
(18, 'Mild Violence, Some Tense Scenes', 2),
(19, 'Some Humor Risks, Innocent Romance', 2),
(20, 'Strong Language, Intense Adult Themes', 4);

INSERT INTO moviebase.Media (MediaId, Title, Description, ReleaseDate, RunTime, Poster, MediaTypeId, PublisherId, LanguageId, AgeRatingId) VALUES
(1, 'The Lost City', 'A thrilling adventure in a mysterious city', '2023-02-10', 120000, 'https://i.imgur.com/kLhG8In.jpg', 1, 5, 1, 2),
(2, 'Galactic Odyssey', 'Space epic with intergalactic battles', '2023-05-15', 180000, 'https://i.imgur.com/ptndfHJ.jpg', 1, 2, 1, 4),
(3, 'Timeless Love', 'A romantic tale transcending time and space', '2022-08-22', 150000, 'https://i.imgur.com/2o1z3NS.jpg', 1, 3, 1, 3),
(4, 'Quantum Conundrum', 'Mind-bending sci-fi exploration', '2023-04-05', 135000, 'https://i.imgur.com/jzMETUO.jpg', 1, 2, 2, 2),
(5, 'Hidden Realms', 'Discover the secrets of hidden realms', '2022-11-30', 160000, 'https://i.imgur.com/T7HR2Di.jpg', 1, 5, 3, 2),
(6, 'Eternal Enigma', 'Mystery and suspense in a timeless setting', '2023-07-18', 145000, 'https://i.imgur.com/p1K9wC6.jpg', 2, 5, 5, 3),
(7, 'Beyond the Horizon', 'Exploration and adventure beyond known boundaries', '2022-03-08', 170000, 'https://i.imgur.com/1PopNpO.jpg', 1, 2, 1, 1),
(8, 'Code Breakers', 'Thrilling espionage and code-breaking', '2023-01-12', 130000, 'https://i.imgur.com/pcPHXC7.jpg', 1, 1, 2, 3),
(9, 'Dreamscape Chronicles', 'Journey through fantastical dreamscapes', '2022-06-25', 155000, 'https://i.imgur.com/7t32mNk.jpg', 2, 1, 3, 1),
(10, 'Chronicles of Destiny', 'Epic saga of heroes and villains', '2023-09-20', 200000, 'https://i.imgur.com/jIRsQaX.jpg', 1, 5, 1, 3),
(11, 'Lost in Translation', 'Hilarious comedy of linguistic misunderstandings', '2022-04-14', 110000, 'https://i.imgur.com/5SbCvbY.jpg', 1, 4, 1, 1),
(12, 'Infinite Loop', 'Sci-fi adventure with time loops and paradoxes', '2023-11-08', 140000, 'https://i.imgur.com/qXp7oRC.jpg', 2, 2, 2, 3),
(13, 'Whispers in the Dark', 'Suspenseful thriller set in a haunted mansion', '2022-09-17', 125000, 'https://i.imgur.com/XAX2Zzb.jpg', 1, 1, 4, 4),
(14, 'Crimson Skies', 'Action-packed aerial battles in a dystopian future', '2023-03-27', 165000, 'https://i.imgur.com/1liMxwG.jpg', 1, 1, 2, 4),
(15, 'Renaissance Riddles', 'Puzzle-solving adventure in the Renaissance era', '2022-12-03', 148000, 'https://i.imgur.com/YNZKwdL.jpg', 2, 5, 3, 3),
(16, 'Neon Nights', 'Cyberpunk noir with neon-soaked cityscapes', '2023-06-10', 155000, 'https://i.imgur.com/rcIxz10.jpg', 1, 1, 1, 3),
(17, 'The Enchanted Forest', 'Fantasy adventure through a magical forest', '2022-10-28', 175000, 'https://i.imgur.com/PeJbf5J.jpg', 1, 5, 5, 1),
(18, 'Digital Mirage', 'Virtual reality thriller in a digital world', '2023-02-28', 130000, 'https://i.imgur.com/lpOxsg2.jpg', 2, 1, 2, 2),
(19, 'Lost and Found', 'Heartwarming drama of self-discovery and friendship', '2022-07-11', 120000, 'https://i.imgur.com/rY4Qhck.jpg', 1, 3, 3, 2),
(20, 'Spectral Shadows', 'Comical mystery with ghostly apparitions', '2023-10-15', 145000, 'https://i.imgur.com/YknH26F.jpg', 2, 4, 4, 4);

INSERT INTO moviebase.MediaGenre (MediaId, GenreId) VALUES
(1, 1), (1, 5),
(2, 1), (2, 2),
(3, 2), (3, 3),
(4, 2), (4, 5),
(5, 2), (5, 5),
(6, 1), (6, 5),
(7, 1), (7, 5),
(8, 1), 
(9, 5), 
(10, 1), (10, 5),
(11, 4), 
(12, 2), 
(13, 1), (13, 5),
(14, 1), (14, 2),
(15, 5), 
(16, 2), 
(17, 5), 
(18, 1), (18, 2),
(19, 3), 
(20, 2), (20, 4);

INSERT INTO moviebase.MediaStreamingService (MediaId, StreamingServiceId) VALUES
(1, 1), (1, 5),
(2, 1), (2, 2),
(3, 2), (3, 3),
(4, 2), (4, 5),
(5, 2), (5, 5),
(6, 1), (6, 5),
(7, 1), (7, 5),
(8, 1), 
(9, 5), 
(10, 1), (10, 5),
(11, 4), 
(12, 2), 
(13, 1), (13, 5),
(14, 1), (14, 2),
(15, 5), 
(16, 2), 
(17, 5), 
(18, 1), (18, 2),
(19, 3), 
(20, 2), (20, 4);

INSERT INTO moviebase.MediaCastCrew (MediaId, CastCrewId) VALUES
(1, 1), (1, 2), (1, 3), (1, 31), (1, 36), (1, 41), (1, 46),
(2, 1), (2, 11), (2, 21), (2, 32), (2, 37), (2, 42), (2, 47),
(3, 4), (3, 5), (3, 6), (3, 33), (3, 38), (3, 43), (3, 48),
(4, 2), (4, 12), (4, 22), (4, 34), (4, 39), (4, 44), (4, 49),
(5, 7), (5, 8), (5, 9), (5, 35), (5, 40), (5, 45), (5, 50),
(6, 3), (6, 13), (6, 23), (6, 31), (6, 40), (6, 45), (6, 50),
(7, 10), (7, 11), (7, 12), (7, 32), (7, 39), (7, 44), (7, 49),
(8, 4), (8, 14), (8, 24), (8, 33), (8, 38), (8, 43), (8, 48),
(9, 13), (9, 14), (9, 15), (9, 34), (9, 37), (9, 42), (9, 47),
(10, 5), (10, 15), (10, 25), (10, 35), (10, 36), (10, 41), (10, 46),
(11, 16), (11, 17), (11, 18), (11, 31), (11, 38), (11, 43), (11, 48),
(12, 6), (12, 16), (12, 26), (12, 32), (12, 37), (12, 42), (12, 47),
(13, 19), (13, 20), (13, 21), (13, 33), (13, 39), (13, 44), (13, 49),
(14, 7), (14, 17), (14, 27), (14, 34), (14, 36), (14, 41), (14, 46),
(15, 22), (15, 23), (15, 24), (15, 35), (15, 40), (15, 45), (15, 50),
(16, 8), (16, 18), (16, 28), (16, 31), (16, 37), (16, 42), (16, 47),
(17, 25), (17, 26), (17, 27), (17, 32), (17, 39), (17, 44), (17, 49),
(18, 9), (18, 19), (18, 29), (18, 33), (18, 40), (18, 45), (18, 50),
(19, 28), (19, 29), (19, 30), (19, 34), (19, 36), (19, 41), (19, 46),
(20, 10), (20, 20), (20, 30), (20, 35), (20, 38), (20, 43), (20, 48);