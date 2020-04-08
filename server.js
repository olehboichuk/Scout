let mysql = require('mysql');
let AuthController = require('./auth/AuthController');
let PlayerController = require('./handler/PlayerController');
let ClubController = require('./handler/ClubController');
let UserController = require('./handler/UserController');
let TournamentController = require('./handler/TournamentController');
const express = require('express'),
    app = express(),
    port = parseInt(process.env.PORT, 10) || 3000;
const sql = require('./sql_queries');
app.use(express.json());
app.use(express.urlencoded());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/api/auth', AuthController);
app.use('/api', PlayerController);
app.use('/api', ClubController);
app.use('/api', UserController);
app.use('/api', TournamentController);
app.listen(port, () => {
    console.log('Server started on port 3000');
});

let db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Qwerty123_",
    database: 'scout'
});

db.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});



