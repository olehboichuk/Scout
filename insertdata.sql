# INSERT  into  roles (name) values ('ADMIN'),('SCOUT'),('MEMBER');

INSERT  into tournament (Name_Tournament,Season, Number_Of_Teams, Area, Winner, Team_Up_League, Team_Down_League) VALUES ('Kiev Champion Legue','19-20', 36, 'Kiev', Null, Null, Null);
INSERT  into tournament (Name_Tournament,Season, Number_Of_Teams, Area, Winner, Team_Up_League, Team_Down_League) VALUES ('Lviv Champion Legue','19-20', 24, 'Lviv', Null, Null, Null);
INSERT  into tournament (Name_Tournament,Season, Number_Of_Teams, Area, Winner, Team_Up_League, Team_Down_League) VALUES ('Irpin Champion Legue','19-20', 16, 'Kiev', Null, Null, Null);
INSERT  into tournament (Name_Tournament,Season, Number_Of_Teams, Area, Winner, Team_Up_League, Team_Down_League) VALUES ('Kalush Champion Legue','19-20', 20, 'Ivano-Frankivsk', Null, Null, Null);
INSERT  into tournament (Name_Tournament,Season, Number_Of_Teams, Area, Winner, Team_Up_League, Team_Down_League) VALUES ('Kiev Pro Legue','19-20', 48, 'Kiev', Null, Null, Null);

INSERT  into club (Name_Club, City, Street, Build) VALUES ('Будучність','Ірпінь','Шевченка',5);
INSERT  into club (Name_Club, City, Street, Build) VALUES ('Київські леви','Київ','Теліги',5);
INSERT  into club (Name_Club, City, Street, Build) VALUES ('Сокіл','Бровари','Сковороди',5);



INSERT into player(Number_Licenses, First_Name, Surname, Patronymic, Citizenship, Birthday, Cost, Salary, Game_Experience, Height, Weight, Kicking_Leg, Agent_Name, Agent_Phone) VALUES ('000002','Далмат','Рябинин','Юрьевич','Українець','1999-03-29',1000,100,4,170,68,'Права','Тарас',23456);
INSERT into player(Number_Licenses, First_Name, Surname, Patronymic, Citizenship, Birthday, Cost, Salary, Game_Experience, Height, Weight, Kicking_Leg, Agent_Name, Agent_Phone) VALUES ('000005','Андрей'	,'Blade'	,'Городенский'	,'Українець',	'1999-03-28',	1000,	100,	4,	182	,70	,'Ліва','Тарас'	,123456);

INSERT INTO role(Position, Number_Licenses) VALUES ('Defender',000005);
INSERT INTO role(Position, Number_Licenses) VALUES ('Forward',000005);
INSERT INTO role(Position, Number_Licenses) VALUES ('Goalkeeper',000002);
INSERT INTO role(Position, Number_Licenses) VALUES ('Goalkeeper',000005);
INSERT INTO role(Position, Number_Licenses) VALUES ('Halfback',000002);
INSERT INTO role(Position, Number_Licenses) VALUES ('Halfback',000005);

INSERT  into player_contract(Name_Club, Number_Licenses, Contract_Start, Contract_End) VALUES ('Будучність','000005','2020-04-04','2024-04-04');
INSERT  into player_contract(Name_Club, Number_Licenses, Contract_Start, Contract_End) VALUES ('Київські леви','000005','2019-04-04','2020-04-04');
INSERT  into player_contract(Name_Club, Number_Licenses, Contract_Start, Contract_End) VALUES ('Будучність','000005','2018-04-04','2019-04-04');
INSERT  into player_contract(Name_Club, Number_Licenses, Contract_Start, Contract_End) VALUES ('Київські леви','000002','2018-04-04','2019-04-04');
INSERT  into player_contract(Name_Club, Number_Licenses, Contract_Start, Contract_End) VALUES ('Будучність','000002','2019-04-04','2023-04-04');
