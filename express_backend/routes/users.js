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


module.exports = router