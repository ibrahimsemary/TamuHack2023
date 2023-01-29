const express = require('express')
const pg = require('pg');
const router = express.Router()

var conString = "postgresql://postgres:BGSMnZeKu6JGykthxCsB@containers-us-west-188.railway.app:5471/railway"
var client = new pg.Client(conString);
client.connect();

/**
 * requires: username, password, first_name, last_name, email
 */
router.post('/create-user', async(req, res) => {
    try {
        const q1 = `INSERT INTO users VALUES ('${req.body.username}', '${req.body.password}', '${req.body.first_name}', '${req.body.last_name}', '${req.body.email}' );`
        //console.log(q1);
        await client.query(q1);
        res.send("success");
    } catch (err) {
        res.send(err.message);
        console.log(err.message);
    }
});

router.get('/get-user-data/:username', async(req, res) =>  {
    try {
        const {username} = req.params
        const result = await client.query(`SELECT * FROM users WHERE username = '${username}' `);
        res.send(result.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
});

router.post('/update-user', async(req, res) => {
    try {
        const userid = req.body.userid
        var email = req.body.creator
        if (creator != "") {
            client.query(`UPDATE users SET email = '${email}' WHERE userid = '${userid}'`, function (err, result) {
                if (err) {
                    res.send("Value entered is not a email")
                }
            });
        }
        var username = req.body.username
        if (username != "") {
            client.query(`UPDATE users SET username = '${username}' WHERE userid = '${userid}'`, function (err, result) {
                if (err) {
                    res.send("Value entered is not a username")
                }
            });
        }
        var first_name = req.body.first_name
        if (creator != "") {
            client.query(`UPDATE users SET first_name = '${first_name}' WHERE userid = '${userid}'`, function (err, result) {
                if (err) {
                    res.send("Value entered is not a first name")
                }
            });
        }
        var last_name = req.body.last_name
        if (username != "") {
            client.query(`UPDATE users SET last_name = '${last_name}' WHERE userid = '${userid}'`, function (err, result) {
                if (err) {
                    res.send("Value entered is not a last name")
                }
            });
        }
        var password= req.body.password
        if (username != "") {
            client.query(`UPDATE users SET password = '${password}' WHERE userid = '${userid}'`, function (err, result) {
                if (err) {
                    res.send("Value entered is not a password")
                }
            });
        }
        res.send((eventid).toString())
    } catch (err) {
        console.log(err.message);
        res.send("Error");
    }
})


module.exports = router