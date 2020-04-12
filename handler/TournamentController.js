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
            res.send(result);
        });
    });

//Tournament API---------------------------------Tournament API------------------------------Tournament API
router.route('/tournament/:name/:season')
    .get((req, res) => {
        db.query(sql.getTournamentById, [req.params.name,req.params.season], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    })
    .put((req, res) => {
        console.log(req.body);
        db.query(sql.updateTournamentById, [req.body, req.params.name,req.params.season], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    })
    .delete((req, res) => {
        console.log(req.params.name);
        db.query(sql.deleteTournamentById, [req.params.name,req.params.season], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    });

router.route('/tournament/clubs')
    .post((req, res) => {
        db.query(sql.getTournamentClubs, [req.body.Season,req.body.Tournament_Name], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    });


module.exports = router;
