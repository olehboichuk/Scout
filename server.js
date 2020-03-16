let mysql = require('mysql');
const express = require('express');
const sql = require('./sql_queries');

const app = express();

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

app.get('/api/clubs', (req, res) => {
    db.query(sql.getAllClub, (err, result) => {
        if (err) throw err;
        res.send(combineClub(result));
    });
});

app.get('/api/club/:name', (req, res) => {
    db.query(sql.getClubByName, req.params.name, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.get('/api/players', (req, res) => {
   db.query(sql.getAllClub, (err,result) => {
       if (err) throw err;
       res.send(result);
   });
});

app.get('/api/player/:id', (req, res) => {
    db.query(sql.getAllClub, req.params.id, (err,result) => {
        if (err) throw err;
        res.send(result);
    });
});


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

app.listen('3000', () => {
    console.log('Server started on port 3000');
});
