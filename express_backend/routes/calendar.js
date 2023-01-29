const express = require('express')
const pg = require('pg');
const router = express.Router()

var conString = "postgresql://postgres:BGSMnZeKu6JGykthxCsB@containers-us-west-188.railway.app:5471/railway"
var client = new pg.Client(conString);
client.connect();

/**
 * 
 */
router.get('/get-schedule/:username/:date', async(req, res) =>  {
    try {
        const { username } = req.params
        const {date} = req.params
        const result = await client.query(`SELECT * FROM users WHERE username = '${username}' AND date = '${date}' `);
        res.send(result.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
});


module.exports = router