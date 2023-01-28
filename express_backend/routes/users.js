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
        client.query(`INSERT INTO users VALUES ('${req.body.username}', '${req.body.password}', '${req.body.first_name}, '${req.body.last_name}', '${req.body.email}' );`)
    } catch (err) {
        res.send(err.message);
        console.log(err.message);
    }
});


module.exports = router