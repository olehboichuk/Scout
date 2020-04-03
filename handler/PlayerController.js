let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
let mysql = require('mysql');
const sql = require('../sql_queries');
let db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Qwerty123_",
    database: 'scout'
});

//PLAYERS API------------------------------------PLAYERS API---------------------------PLAYERS API
router.route('/player')
    .get((req, res) => {
        db.query(sql.getAllPlayers, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    })
    .post((req, res) => {
        console.log(req.body);
        db.query(sql.createPlayer, req.body, (err, result) => {
            if (err) throw err;
            res.sendStatus(200);
        });
    });

//PLAYER API---------------------------------PLAYER API------------------------------PLAYER API
router.route('/player/:id')
    .get((req, res) => {
        db.query(sql.getPlayerById, req.params.id, (err, result) => {
            if (err) throw err;
            res.send(result);
            // res.sendStatus(200);
        });
    })
    .put((req, res) => {
        console.log(req.body);
        db.query(sql.updatePlayerById, [req.body, req.params.id], (err, result) => {
            if (err) throw err;
            res.sendStatus(200);
        });
    })
    .delete((req, res) => {
        console.log(req.params.id);
        db.query(sql.deletePlayerById, req.params.id, (err, result) => {
            if (err) throw err;
            res.sendStatus(200);
        });
    });
router.route('/contracts/player/:id')
    .get((req, res) => {
        db.query(sql.getPlayerContracts, req.params.id, (err, result) => {
            if (err) throw err;
            res.send(result);
            // res.sendStatus(200);
        });
    });

module.exports = router;
