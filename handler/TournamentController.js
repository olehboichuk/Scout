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

//TournamentS API------------------------------------TournamentS API---------------------------TournamentS API
router.route('/tournament')
    .get((req, res) => {
        db.query(sql.getAllTournaments, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    })
    .post((req, res) => {
        console.log(req.body);
        db.query(sql.createTournament, req.body, (err, result) => {
            if (err) throw err;
            res.sendStatus(200);
        });
    });

//Tournament API---------------------------------Tournament API------------------------------Tournament API
router.route('/tournament/:name')
    .get((req, res) => {
        db.query(sql.getTournamentById, req.params.name, (err, result) => {
            if (err) throw err;
            res.send(result);
            res.sendStatus(200);
        });
    })
    .put((req, res) => {
        console.log(req.body);
        db.query(sql.updateTournamentById, [req.body, req.params.name], (err, result) => {
            if (err) throw err;
            res.sendStatus(200);
        });
    })
    .delete((req, res) => {
        console.log(req.params.name);
        db.query(sql.deleteTournamentById, req.params.name, (err, result) => {
            if (err) throw err;
            res.sendStatus(200);
        });
    });


module.exports = router;
