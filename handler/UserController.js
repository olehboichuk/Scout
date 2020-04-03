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


//Users API------------------------------------Users API---------------------------Users API
router.route('/user')
    .get((req, res) => {
        db.query(sql.getAllUsers, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    })
    .post((req, res) => {
        console.log(req.body);
        db.query(sql.createUser, req.body, (err, result) => {
            if (err) throw err;
            res.sendStatus(200);
        });
    });

//User API---------------------------------User API------------------------------User API
router.route('/user/:id')
    .get((req, res) => {
        db.query(sql.getUserById, req.params.id, (err, result) => {
            if (err) throw err;
            res.send(result);
            res.sendStatus(200);
        });
    })
    .put((req, res) => {
        console.log(req.body);
        db.query(sql.updateUserById, [req.body, req.params.id], (err, result) => {
            if (err) throw err;
            res.sendStatus(200);
        });
    })
    .delete((req, res) => {
        console.log(req.params.name);
        db.query(sql.deleteUserById, req.params.id, (err, result) => {
            if (err) throw err;
            res.sendStatus(200);
        });
    });


module.exports = router;
