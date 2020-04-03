//CRUD Player
let createPlayer = 'INSERT INTO player SET ?';
let getAllPlayers = 'SELECT * FROM player';
let getPlayerById = 'SELECT * FROM player WHERE Number_Licenses=?';
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
let createUser = 'INSERT INTO users SET Login=?,Email=?,Password=?,First_name=?,Last_name=?,Role=?';
let getAllUsers = 'SELECT * FROM users';
let getUserById = 'SELECT * FROM users WHERE id=?';
let updateUserById = 'UPDATE users SET ? WHERE id=?';
let deleteUserById = 'DELETE FROM users WHERE id=?';
let getUserByLogin = 'SELECT * FROM users WHERE Login = ?';


//two tables
let getPlayerContracts = 'SELECT pc.Name_Club, pc.Contract_Start, pc.Contract_End, pc.Active FROM player p LEFT JOIN player_contract pc on p.Number_Licenses = pc.Number_Licenses LEFT JOIN club c on pc.Name_Club = c.Name_Club WHERE p.Number_Licenses=? ORDER BY pc.Active desc ';


module.exports = {
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
