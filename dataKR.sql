CREATE SCHEMA IF NOT EXISTS kr;

DROP TABLE IF EXISTS CLUB CASCADE;
DROP TABLE IF EXISTS PLAYER_CONTRACT CASCADE;
DROP TABLE IF EXISTS PLAYER CASCADE;
DROP TABLE IF EXISTS ROLE CASCADE;
DROP TABLE IF EXISTS INDIVIDUAL_TROPHY CASCADE;
DROP TABLE IF EXISTS STATISTICS_SEASON_FORWARD CASCADE;


CREATE TABLE CLUB
(
    Name_Club VARCHAR(25) NOT NULL,
    City      VARCHAR(25) NOT NULL,
    Street    VARCHAR(50) NOT NULL,
    Build     CHAR(7)     NOT NULL,
    Phone     CHAR(13)    NOT NULL,
    Trophy    VARCHAR(25) NOT NULL,
    PRIMARY KEY (Name_Club)
);


CREATE TABLE PLAYER
(
    Number_Licenses CHAR(17)    NOT NULL,
    First_Name      VARCHAR(20) NOT NULL,
    Surname         VARCHAR(30) NOT NULL,
    Patronymic      VARCHAR(25) NULL,
    Citizenship     VARCHAR(25) NOT NULL,
    Update_Date     DATE AS (CURDATE()),
    Birthday        DATE        NOT NULL,
    Age             INT AS (YEAR(CURDATE()) -
                            YEAR(Birthday) -
                            IF(STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-', MONTH(Birthday), '-', DAY(Birthday)),
                                           '%Y-%c-%e') > CURDATE(), 1, 0)),
    Cost            DOUBLE      NOT NULL,
    Salary          DOUBLE      NOT NULL,
    Game_Experience SMALLINT    NOT NULL,
    Height          FLOAT       NOT NULL,
    Weight          FLOAT       NOT NULL,
    Kicking_Leg     VARCHAR(15) NOT NULL,
    Agent_Name      VARCHAR(15) NULL,
    Agent_Phone     CHAR(13)    NULL,
    PRIMARY KEY (Number_Licenses)
);

CREATE TABLE PLAYER_CONTRACT
(
    Name_Club       VARCHAR(25) NOT NULL,
    Number_Licenses CHAR(17)    NOT NULL,
    Contract_Start  DATE        NOT NULL,
    Contract_End    DATE        NOT NULL,
    Active          BOOLEAN AS (IF(STR_TO_DATE(CONCAT(YEAR(CURDATE()), '-', MONTH(CURDATE()), '-', DAY(CURDATE())),
                                               '%Y-%c-%e') < STR_TO_DATE(
                                           CONCAT(YEAR(Contract_End), '-', MONTH(Contract_End), '-', DAY(Contract_End)),
                                           '%Y-%c-%e'), 1, 0)),
    PRIMARY KEY (Name_Club, Number_Licenses, Contract_Start),
    FOREIGN KEY (Name_Club) REFERENCES CLUB (Name_Club) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Number_Licenses) REFERENCES PLAYER (Number_Licenses) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE ROLE
(
    Position        VARCHAR(25) NOT NULL,
    Number_Licenses CHAR(17)    NOT NULL,
    PRIMARY KEY (Position, Number_Licenses),
    FOREIGN KEY (Number_Licenses) REFERENCES PLAYER (Number_Licenses) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE INDIVIDUAL_TROPHY
(
    Name_Trophy     CHAR(25) NOT NULL,
    Date_Trophy     DATE     NOT NULL,
    Number_Licenses CHAR(17) NOT NULL,
    PRIMARY KEY (Name_Trophy, Date_Trophy),
    FOREIGN KEY (Number_Licenses) REFERENCES PLAYER (Number_Licenses) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE TABLE STATISTICS_SEASON_FORWARD
(
    Season              CHAR(17) NOT NULL,
    Number_Yellow_Cards SMALLINT NOT NULL,
    Number_Red_Cards    SMALLINT NOT NULL,
    Number_Of_Matches   SMALLINT NOT NULL,
    Number_Play_Minutes SMALLINT NOT NULL,
    Passes_Accuracy     SMALLINT NOT NULL,
    Number_Licenses     CHAR(17) NOT NULL,
    Goals               SMALLINT NOT NULL,
    Assists             SMALLINT NOT NULL,
    Key_Pass            SMALLINT NOT NULL,
    Hit_Match           FLOAT    NOT NULL,
    Goal_Match          FLOAT    NOT NULL,
    Hit_Goal            FLOAT    NOT NULL,
    PRIMARY KEY (Season, Number_Licenses),
    FOREIGN KEY (Number_Licenses) REFERENCES PLAYER (Number_Licenses) ON DELETE CASCADE ON UPDATE CASCADE
);
