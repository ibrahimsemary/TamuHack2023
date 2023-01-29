const express = require('express')
const pg = require('pg');
const router = express.Router()

var conString = "postgresql://postgres:BGSMnZeKu6JGykthxCsB@containers-us-west-188.railway.app:5471/railway"
var client = new pg.Client(conString);
client.connect();

/**
 * requires : creator, start_time, end_time, description, usernames
 */
router.post('/add-event', async(req, res) => {
    try {
        await client.query(`INSERT INTO events (creator, start_time, end_time, description) 
                    VALUES ('${req.body.creator}', '${req.body.start_time}', '${req.body.end_time}', '${req.body.description}')`);
        const result = await client.query(`SELECT max(id) FROM events`)
        const id = result.rows[0].max
        await client.query(`INSERT INTO events_users (eventid, username) 
                                VALUES ('${id}','${req.body.creator}')`)
        res.send((id).toString())
    } catch (err) {
        console.log(err.message);
        res.send("User cannot be found");
    }
})
router.post('/add-user-group', async(req, res) => {
    try {
        const myUser = req.body.username
        const groupid = req.body.groupid
        await client.query(`INSERT INTO groups_users (groupsid, username) 
                                VALUES ('${groupid}','${myUser}')`)
        res.send((id).toString())
    } catch (err) {
        console.log(err.message);
        res.send("User cannot be found");
    }
})


module.exports = router