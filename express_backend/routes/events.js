const express = require('express')
const pg = require('pg');
const router = express.Router()

var conString = "postgresql://postgres:BGSMnZeKu6JGykthxCsB@containers-us-west-188.railway.app:5471/railway"
var client = new pg.Client(conString);
client.connect();

/**
 * requires : creator, start_time, end_time, description
 * UNFINISHED
 */
router.get('/event/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const result = await client.query(`SELECT * FROM event_users NATURAL JOIN events WHERE username = '${username}'`)
        console.log(result)
        const events = []
        for (var i = 0; i < result.rows.length; ++i){
            events[i] = new Array(4)
            events[i][0] = result.rows[i].creator;
            events[i][1] = result.rows[i].start_time;
            events[i][2] = result.rows[i].end_time;
            events[i][3] = result.rows[i].description;
        }
        res.send(events)
    }
    catch (err) {
        console.log(err.message);
        res.send("User cannot be found");
    }
})
router.post('/add-event', async(req, res) => {
    try {
        const usernames = req.body.usernames
        var description = req.body.description
        if (description === "") {
            description = null;
        }
        await client.query(`INSERT INTO events (creator, start_time, end_time, description) 
                    VALUES ('${req.body.creator}', '${req.body.start_time}', '${req.body.end_time}', '${description}')`);
        const result = await client.query(`SELECT max(eventid) FROM events`)
        const id = result.rows[0].max
        await client.query(`INSERT INTO event_users (eventid, username) 
                                VALUES ('${id}','${req.body.creator}')`)
        for (let i = 0; i < usernames.length; ++i){
            await client.query(`INSERT INTO event_users (eventid, username) 
                                VALUES ('${id}','${usernames[i]}')`)
        }
        res.send((id).toString())
    } catch (err) {
        console.log(err.message);
        res.send("User cannot be found");
    }
})
router.post('/add-user-event', async(req, res) => {
    try {
        const myUser = req.body.username
        const eventid = req.body.eventid
        await client.query(`INSERT INTO event_users (eventid, username) 
                                VALUES ('${eventid}','${myUser}')`)
        const result = await client.query(`SELECT max(id) FROM event_users`)
        const id = result.rows[0].max
        res.send((id).toString())
    } catch (err) {
        console.log(err.message);
        res.send("User cannot be found");
    }
})


module.exports = router