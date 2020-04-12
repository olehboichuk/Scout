CREATE SCHEMA IF NOT EXISTS scout;

DROP TABLE IF EXISTS TOUR CASCADE;

CREATE TABLE TOUR
(
    Name_Tournament  VARCHAR(25) NOT NULL,
    Season           CHAR(17)    NOT NULL,
    Number_Of_Teams  SMALLINT(3) NOT NULL,
    Area             VARCHAR(20) NOT NULL,
    Winner           VARCHAR(25) NULL,
    Team_Up_League   VARCHAR(25) NULL,
    Team_Down_League VARCHAR(25) NULL,
    PRIMARY KEY (Name_Tournament,Season)
);
