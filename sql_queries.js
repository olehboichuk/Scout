let getClubByName = 'SELECT * FROM CLUB WHERE Name_Club = ?';
let getAllClub = 'SELECT c.Name_Club, c.Build, c.City, c.Street, c.Street, p.Telephone FROM CLUB c INNER JOIN phones p on c.Name_Club = p.Name_Club';


module.exports = {getClubByName, getAllClub};
