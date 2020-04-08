let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
let mysql = require('mysql');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
const sql = require('../sql_queries');
let config = require('../config');
let db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Qwerty123_",
    database: 'scout'
});

router.post('/register', function(req, res) {
    let hashedPassword = bcrypt.hashSync(req.body.Password, 8);
    console.log(req.body);
    db.query(sql.createUser, [req.body.Login,req.body.Email,hashedPassword,req.body.First_name,req.body.Last_name], (err, result) => {
        if (err) return res.status(500).send("There was a problem registering the user.");
        // create a token
        // let token = jwt.sign({ id: result.Id }, config.secret, {
        //     expiresIn: 86400 // expires in 24 hours
        // });
        res.status(200).send({ message: "User success added." });
    });
});

router.get('/me', function(req, res) {
    db.query(sql.getUserByLogin, req.body.login, (err, result) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!result[0]) return res.status(404).send('No user found.');

        res.status(200).send(result[0]);
    });

});

router.post('/login', function(req, res) {
    db.query(sql.getUserByLogin, req.body.login, (err, result) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!result[0]) return res.status(404).send('No user found.');
        let passwordIsValid = bcrypt.compareSync(req.body.password, result[0].Password);
        if (!passwordIsValid) return res.status(401).send('Невірний логін або пароль.');
        let token = jwt.sign({ id: result[0].Id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token, role: result[0].Role });
    });
});

router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
});

module.exports = router;
