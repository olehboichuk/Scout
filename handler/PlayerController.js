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

router.route('/player/clubs/:id')
    .get((req, res) => {
        db.query(sql.getPlayerContracts, req.params.id, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    });

//Функція об'єднує таблицю Club з таблицею Telephone
function combinepLAYER(arr) {
    let combined = arr.reduce(function (result, item) {
        let telephones = [];
        let current = result[item['Number_Licenses']];
        if (current) {
            telephones.push(current['Position']);
            telephones.push(item['Position']);
        }
        result[item['Number_Licenses']] = !current ? item : {
            Number_Licenses: item['Number_Licenses'],
            First_Name: current['First_Name'],
            Surname: current['Surname'],
            Patronymic: current['Patronymic'],
            Citizenship: current['Citizenship'],
            Update_Date: current['Update_Date'],
            Birthday: current['Birthday'],
            Age: current['Age'],
            Cost: current['Cost'],
            Salary: current['Salary'],
            Game_Experience: current['Game_Experience'],
            Height: current['Height'],
            Weight: current['Weight'],
            Kicking_Leg: current['Kicking_Leg'],
            Agent: current['Agent'],
            Name_Club: current['Name_Club'],
            Position: telephones.flat(10)
        };
        return result;
    }, {});
    return Object.keys(combined).map(function (key) {
        return combined[key];
    });
}

//PLAYERS API------------------------------------PLAYERS API---------------------------PLAYERS API
router.route('/player')
    .get((req, res) => {
        db.query(sql.getAllPlayers, (err, result) => {
            if (err) throw err;
            res.send(combinepLAYER(result));
        });
    })
    .post((req, res) => {
        db.query(sql.createPlayer, req.body, (err, result) => {
            if (err) throw err;
            res.sendStatus(200);
        });
    })
    .put((req, res) => {
        db.query(sql.updatePlayerById, [req.body, req.body.Number_Licenses], (err, result) => {
            if (err) return res.status(500).send("There was a problem registering the user.");
            res.status(200).send({message: "Player success updated."});
        });
    });

//PLAYER API---------------------------------PLAYER API------------------------------PLAYER API
router.route('/player/:id')
    .get((req, res) => {
        db.query(sql.getPlayerById, req.params.id, (err, result) => {
            if (err) throw err;
            res.send(combinepLAYER(result));
        });
    })
    .delete((req, res) => {
        db.query(sql.deletePlayerById, req.params.id, (err, result) => {
            if (err) throw err;
            res.status(200).send({message: "Player success deleted."});
        });
    });

//get Player contracts by id
router.route('/contracts/player/:id')
    .get((req, res) => {
        db.query(sql.getPlayerContracts, req.params.id, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    });
//get Player SESONS by id from Halfback
router.route('/contracts/player/:id')
    .get((req, res) => {
        db.query(sql.getPlayerContracts, req.params.id, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    });


//get Player Stats by id
router.route('/stats/forward/player/:id')
    .get((req, res) => {
        db.query(sql.getForwardStatics, req.params.id, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    });
//get Player Stats by id
router.route('/stats/halfback/player/:id')
    .get((req, res) => {
        db.query(sql.getHalfbackStatics, req.params.id, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    });
//get Player Stats by id
router.route('/stats/defender/player/:id')
    .get((req, res) => {
        db.query(sql.getDefenderStatics, req.params.id, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    });
//get Player Stats by id
router.route('/stats/goalkeeper/player/:id')
    .get((req, res) => {
        db.query(sql.getGoalkeeperStatics, req.params.id, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    });


//get Player Stats by id
router.route('/seasons/forward/player/:id')
    .get((req, res) => {
        db.query(sql.getForwardSeasons, req.params.id, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    }).post((req, res) => {
    db.query(sql.getForwardStatsBySeason, [req.params.id, req.body.Season], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
//get Player Stats by id
router.route('/seasons/halfback/player/:id')
    .get((req, res) => {
        db.query(sql.getHalfbackSeasons, req.params.id, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    })
    .post((req, res) => {
        db.query(sql.getHalfbackStatsBySeason, [req.params.id, req.body.Season], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    });
//get Player Stats by id
router.route('/seasons/defender/player/:id')
    .get((req, res) => {
        db.query(sql.getDefenderSeasons, req.params.id, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    }).post((req, res) => {
    db.query(sql.getDefenderStatsBySeason, [req.params.id, req.body.Season], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
//get Player Stats by id
router.route('/seasons/goalkeeper/player/:id')
    .get((req, res) => {
        db.query(sql.getGoalkeeperSeasons, req.params.id, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    }).post((req, res) => {
    db.query(sql.getGoalkeeperStatsBySeason, [req.params.id, req.body.Season], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

router.route('/player/positions')
    .get((req, res) => {
        db.query(sql.getGoalkeeperSeasons, req.params.id, (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    }).post((req, res) => {
    db.query(sql.deletePlayerPositionsById, req.body.id, (err, result) => {
        if (err) throw err;
    });
    let index = 0;
    req.body.position.forEach(pos => {
        db.query(sql.updatePlayerPositionsById, [req.body.id, pos], (err, result) => {
            if (err) throw err;
            if (index === (req.body.position.length - 1)) {
                res.send(result);
            }
            index++;
        });
    });
});

module.exports = router;
