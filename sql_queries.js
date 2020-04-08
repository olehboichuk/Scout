let deletePlayerPositionsById = 'DELETE FROM role WHERE Number_Licenses=?';
let updatePlayerPositionsById = 'INSERT INTO role SET Number_Licenses=?, Position=?';

let getGoalkeeperStatsBySeason = 'SELECT * FROM statistics_season_goalkeeper WHERE Number_Licenses = ? AND Season = ?';
let getDefenderStatsBySeason = 'SELECT * FROM statistics_season_defenders WHERE Number_Licenses = ? AND Season = ?';
let getHalfbackStatsBySeason = 'SELECT * FROM statistics_season_halfbacks WHERE Number_Licenses = ? AND Season = ?';
let getForwardStatsBySeason = 'SELECT * FROM statistics_season_forward WHERE Number_Licenses = ? AND Season = ?';
let getGoalkeeperSeasons = 'SELECT Season FROM statistics_season_goalkeeper WHERE Number_Licenses = ?';
let getDefenderSeasons = 'SELECT Season FROM statistics_season_defenders WHERE Number_Licenses = ?';
let getHalfbackSeasons = 'SELECT Season FROM statistics_season_halfbacks WHERE Number_Licenses = ?';
let getForwardSeasons = 'SELECT Season FROM statistics_season_forward WHERE Number_Licenses = ?';
//CRUD Player
let createPlayer = 'INSERT INTO player SET ?';
let getAllPlayers = 'SELECT p.Number_Licenses, p.First_Name, p.Surname, p.Patronymic, p.Citizenship, p.Update_Date, p.Birthday, p.Age, p.Cost, p.Salary, p.Game_Experience, p.Height, p.Weight, p.Kicking_Leg, p.Agent, pc.Name_Club, r.Position FROM player p LEFT JOIN player_contract pc on p.Number_Licenses = pc.Number_Licenses LEFT JOIN role r on p.Number_Licenses = r.Number_Licenses WHERE pc.Active=1 OR pc.Active IS NULL';
let getPlayerById = 'SELECT p.Number_Licenses, p.First_Name, p.Surname, p.Patronymic, p.Citizenship, p.Update_Date, p.Birthday, p.Age, p.Cost, p.Salary, p.Game_Experience, p.Height, p.Weight, p.Kicking_Leg, p.Agent, pc.Name_Club, r.Position FROM player p LEFT JOIN player_contract pc on p.Number_Licenses = pc.Number_Licenses LEFT JOIN role r on p.Number_Licenses = r.Number_Licenses WHERE (pc.Active=1 OR pc.Active IS NULL) AND p.Number_Licenses=?';
let updatePlayerById = 'UPDATE player SET ? WHERE Number_Licenses=?';
let deletePlayerById = 'DELETE FROM player WHERE Number_Licenses=?';
//CRUD Club
let createClub = 'INSERT INTO club SET ?';
let getAllClubs = 'SELECT c.Name_Club, c.Build, c.City, c.Street, c.Street, p.Telephone FROM CLUB c LEFT JOIN phones p on c.Name_Club = p.Name_Club';
let getClubByName = 'SELECT c.Name_Club, c.Build, c.City, c.Street, c.Street, p.Telephone FROM CLUB c LEFT JOIN phones p on c.Name_Club = p.Name_Club WHERE c.Name_Club = ?';
let updateClubById = 'UPDATE club SET ? WHERE Name_Club = ?';
let deleteClubById = 'DELETE FROM club WHERE Name_Club=?';
//CRUD Tournament
let createTournament = 'INSERT INTO tournament SET ?';
let getAllTournaments = 'SELECT * FROM tournament';
let getTournamentById = 'SELECT * FROM tournament WHERE Name_Tournament=?';
let updateTournamentById = 'UPDATE tournament SET ? WHERE Name_Tournament=?';
let deleteTournamentById = 'DELETE FROM tournament WHERE Name_Tournament=?';
//CRUD User
let createUser = 'INSERT INTO users SET Login=?,Email=?,Password=?,First_name=?,Last_name=?';
let getAllUsers = 'SELECT * FROM users';
let getUserById = 'SELECT * FROM users WHERE id=?';
let updateUserById = 'UPDATE users SET ? WHERE id=?';
let deleteUserById = 'DELETE FROM users WHERE id=?';
let getUserByLogin = 'SELECT * FROM users WHERE Login = ?';

//two tables
let getPlayerContracts = 'SELECT pc.Name_Club, pc.Contract_Start, pc.Contract_End, pc.Active FROM player p LEFT JOIN player_contract pc on p.Number_Licenses = pc.Number_Licenses WHERE p.Number_Licenses=? ORDER BY pc.Contract_End desc';
let getPlayerPositions = 'SELECT Number_Licenses, Position FROM role WHERE Number_Licenses=?';
let getDefenderStatics = 'SELECT * FROM statistics_season_defenders WHERE Number_Licenses =?';
let getForwardStatics = 'SELECT * FROM statistics_season_forward WHERE Number_Licenses =?';
let getHalfbackStatics = 'SELECT * FROM statistics_season_halfbacks WHERE Number_Licenses =?';
let getGoalkeeperStatics = 'SELECT * FROM statistics_season_goalkeeper WHERE Number_Licenses =?';

module.exports = {deletePlayerPositionsById,updatePlayerPositionsById,
    getForwardStatsBySeason, getHalfbackStatsBySeason, getDefenderStatsBySeason, getGoalkeeperStatsBySeason,
    getGoalkeeperSeasons, getForwardSeasons, getHalfbackSeasons, getDefenderSeasons,
    getPlayerPositions,
    getDefenderStatics,
    getForwardStatics,
    getHalfbackStatics,
    getGoalkeeperStatics,
    getPlayerContracts,
    getUserByLogin,
    createPlayer,
    getAllPlayers,
    getPlayerById,
    updatePlayerById,
    deletePlayerById,
    createClub,
    getClubByName,
    getAllClubs,
    updateClubById,
    deleteClubById,
    createTournament,
    getAllTournaments,
    getTournamentById,
    updateTournamentById,
    deleteTournamentById,
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
};
