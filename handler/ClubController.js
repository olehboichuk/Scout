let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
let mysql = require('mysql');
const sql = require('../sql_queries');
let db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Qwerty123_",
    database: 'scout'
});


//CLUBS API------------------------------------CLUBS API---------------------------CLUBS API
router.route('/club')
    .get((req, res) => {
        db.query(sql.getAllClubs, (err, result) => {
            if (err) throw err;
            res.send(combineClub(result));
        });
    })
    .post((req, res) => {
        console.log(req.body);
        db.query(sql.createClub, req.body, (err, result) => {
            if (err) throw err;
            res.sendStatus(200);
        });
    });

//Функція об'єднує таблицю Club з таблицею Telephone
function combineClub(arr) {
    let combined = arr.reduce(function (result, item) {
        let telephones = [];
        let current = result[item['Name_Club']];
        if (current) {
            telephones.push(current['Telephone']);
            telephones.push(item['Telephone']);
        }
        result[item['Name_Club']] = !current ? item : {
            Name_Club: item['Name_Club'],
            City: current['City'],
            Street: current['Street'],
            Build: current['Build'],
            Telephone: telephones.flat(10)
        };
        return result;
    }, {});
    return Object.keys(combined).map(function (key) {
        return combined[key];
    });
}

//CLUB API---------------------------------CLUB API------------------------------CLUB API
router.route('/club/:name')
    .get((req, res) => {
        db.query(sql.getClubByName, req.params.name, (err, result) => {
            if (err) throw err;
            res.send(result);
            res.sendStatus(200);
        });
    })
    .put((req, res) => {
        console.log(req.body);
        db.query(sql.updateClubById, [req.body, req.params.name], (err, result) => {
            if (err) throw err;
            res.sendStatus(200);
        });
    })
    .delete((req, res) => {
        console.log(req.params.name);
        db.query(sql.deleteClubById, req.params.name, (err, result) => {
            if (err) throw err;
            res.sendStatus(200);
        });
    });

module.exports = router;
