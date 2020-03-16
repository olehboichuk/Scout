CREATE SCHEMA IF NOT EXISTS scout;

DROP TABLE IF EXISTS CLUB CASCADE;
DROP TABLE IF EXISTS PHONES CASCADE;
DROP TABLE IF EXISTS TEAM_TROPHY CASCADE;
DROP TABLE IF EXISTS CLUB_TOURNAMENT CASCADE;
DROP TABLE IF EXISTS TOURNAMENT CASCADE;
DROP TABLE IF EXISTS LEAGE_MEMBERS CASCADE;
DROP TABLE IF EXISTS PLAYER_CONTRACT CASCADE;
DROP TABLE IF EXISTS PLAYER CASCADE;
DROP TABLE IF EXISTS ROLE CASCADE;
DROP TABLE IF EXISTS INDIVIDUAL_TROPHY CASCADE;
DROP TABLE IF EXISTS STATISTICS_SEASON_GOALKEEPER CASCADE;
DROP TABLE IF EXISTS STATISTICS_SEASON_DEFENDERS CASCADE;
DROP TABLE IF EXISTS STATISTICS_SEASON_HALFBACKS CASCADE;
DROP TABLE IF EXISTS STATISTICS_SEASON_FORWARD CASCADE;
DROP TABLE IF EXISTS FOOTBALL_MATCH CASCADE;

CREATE TABLE CLUB
(
    Name_Club VARCHAR(25) NOT NULL,
    City      VARCHAR(25) NOT NULL,
    Street    VARCHAR(50) NOT NULL,
    Build     CHAR(7)     NOT NULL,
    PRIMARY KEY (Name_Club)
);

CREATE TABLE PHONES
(
    Telephone CHAR(13)    NOT NULL,
    Name_Club VARCHAR(25) NOT NULL,
    PRIMARY KEY (Telephone),
    FOREIGN KEY (Name_Club) REFERENCES CLUB (Name_Club) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE TEAM_TROPHY
(
    Name_Trophy CHAR(25)    NOT NULL,
    Date_Trophy DATE        NOT NULL,
    Name_Club   VARCHAR(25) NOT NULL,
    PRIMARY KEY (Name_Trophy, Date_Trophy),
    FOREIGN KEY (Name_Club) REFERENCES CLUB (Name_Club) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE TOURNAMENT
(
    Name_Tournament  VARCHAR(25) NOT NULL,
    Number_Of_Teams  SMALLINT(3) NOT NULL,
    Area             VARCHAR(20) NOT NULL,
    Winner           VARCHAR(25) NOT NULL,
    Team_Up_League   VARCHAR(25) NOT NULL,
    Team_Down_League VARCHAR(25) NOT NULL,
    PRIMARY KEY (Name_Tournament)
);

CREATE TABLE CLUB_TOURNAMENT
(
    Name_Club           VARCHAR(25) NOT NULL,
    Name_Tournament     VARCHAR(25) NOT NULL,
    Place_On_Tournament SMALLINT(3) NOT NULL,
    PRIMARY KEY (Name_Club, Name_Tournament),
    FOREIGN KEY (Name_Club) REFERENCES CLUB (Name_Club) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Name_Tournament) REFERENCES TOURNAMENT (Name_Tournament) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE LEAGUE_MEMBERS
(
    Name_League     VARCHAR(25) NOT NULL,
    Name_Tournament VARCHAR(25) NOT NULL,
    PRIMARY KEY (Name_League),
    FOREIGN KEY (Name_Tournament) REFERENCES TOURNAMENT (Name_Tournament) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE PLAYER
(
    Number_Licenses CHAR(17)    NOT NULL,
    First_Name      VARCHAR(20) NOT NULL,
    Surname         VARCHAR(30) NOT NULL,
    Patronymic      VARCHAR(25) NULL,
    Citizenship     VARCHAR(25) NOT NULL,
    Update_Date     DATE        NOT NULL,
    Birthday        DATE        NOT NULL,
    Age             SMALLINT    NOT NULL,
    Cost            DOUBLE      NOT NULL,
    Salary          DOUBLE      NOT NULL,
    Game_Experience SMALLINT    NOT NULL,
    Height          FLOAT       NOT NULL,
    Weight          FLOAT       NOT NULL,
    Kicking_Leg     VARCHAR(15) NOT NULL,
    Agent           VARCHAR(15)  NULL,
    PRIMARY KEY (Number_Licenses)
);

CREATE TABLE PLAYER_CONTRACT
(
    Name_Club       VARCHAR(25) NOT NULL,
    Number_Licenses CHAR(17)    NOT NULL,
    Contract_Start DATE  NOT NULL,
    Contract_End DATE  NOT NULL,
    PRIMARY KEY (Name_Club, Number_Licenses),
    FOREIGN KEY (Name_Club) REFERENCES CLUB (Name_Club) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Number_Licenses) REFERENCES PLAYER (Number_Licenses) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE ROLE
(
    Position        VARCHAR(25) NOT NULL,
    Number_Licenses CHAR(17)    NOT NULL,
    PRIMARY KEY (Position),
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

CREATE TABLE STATISTICS_SEASON_GOALKEEPER
(
    Season                    CHAR(17) NOT NULL,
    Number_Yellow_Cards       SMALLINT NOT NULL,
    Number_Play_Minutes       SMALLINT NOT NULL,
    Passes_Accuracy           SMALLINT NOT NULL,
    Number_Licenses           CHAR(17) NOT NULL,
    Saves_Match               FLOAT    NOT NULL,
    Missed_Goal_Match         FLOAT    NOT NULL,
    Percentage_Served_Penalty FLOAT    NOT NULL,
    PRIMARY KEY (Season),
    FOREIGN KEY (Number_Licenses) REFERENCES PLAYER (Number_Licenses) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE STATISTICS_SEASON_DEFENDERS
(
    Season                     CHAR(17) NOT NULL,
    Number_Yellow_Cards        SMALLINT NOT NULL,
    Number_Play_Minutes        SMALLINT NOT NULL,
    Passes_Accuracy            SMALLINT NOT NULL,
    Number_Licenses            CHAR(17) NOT NULL,
    Number_Selections_Match    FLOAT    NOT NULL,
    Number_Takeaways_Match     FLOAT    NOT NULL,
    Number_Interceptions_Match FLOAT    NOT NULL,
    PRIMARY KEY (Season),
    FOREIGN KEY (Number_Licenses) REFERENCES PLAYER (Number_Licenses) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE STATISTICS_SEASON_HALFBACKS
(
    Season                     CHAR(17) NOT NULL,
    Number_Yellow_Cards        SMALLINT NOT NULL,
    Number_Play_Minutes        SMALLINT NOT NULL,
    Passes_Accuracy            SMALLINT NOT NULL,
    Number_Licenses            CHAR(17) NOT NULL,
    Number_Interceptions_Match FLOAT    NOT NULL,
    Goals                      SMALLINT NOT NULL,
    Assists                    SMALLINT NOT NULL,
    Key_Pass                   SMALLINT NOT NULL,
    PRIMARY KEY (Season),
    FOREIGN KEY (Number_Licenses) REFERENCES PLAYER (Number_Licenses) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE STATISTICS_SEASON_FORWARD
(
    Season              CHAR(17) NOT NULL,
    Number_Yellow_Cards SMALLINT NOT NULL,
    Number_Play_Minutes SMALLINT NOT NULL,
    Passes_Accuracy     SMALLINT NOT NULL,
    Number_Licenses     CHAR(17) NOT NULL,
    Goals               SMALLINT NOT NULL,
    Assists             SMALLINT NOT NULL,
    Key_Pass            SMALLINT NOT NULL,
    Hit_Match           FLOAT    NOT NULL,
    PRIMARY KEY (Season),
    FOREIGN KEY (Number_Licenses) REFERENCES PLAYER (Number_Licenses) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE FOOTBALL_MATCH
(
    Season          CHAR(17)    NOT NULL,
    Name_Match      CHAR(50)    NOT NULL,
    Date_Match      DATE        NOT NULL,
    Number_Licenses CHAR(17)    NOT NULL,
    Score           VARCHAR(20) NOT NULL,
    Host_Team       VARCHAR(25) NOT NULL,
    Guest_Team      VARCHAR(25) NOT NULL,
    PRIMARY KEY (Name_Match, Date_Match),
    FOREIGN KEY (Number_Licenses) REFERENCES STATISTICS_SEASON_FORWARD (Number_Licenses) ON DELETE CASCADE ON UPDATE CASCADE
);
