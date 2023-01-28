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
        // add to events table
        const result = await client.query(`INSERT INTO events (creator, start_time, end_time, description) 
                      VALUES ('${req.body.creator}', '${req.body.start_time}', '${req.body.end_time}', '${req.body.description}')`);
        console.log(result.rows);
        //let eventid = 5
        // add to event-users table
        // for(var i=0; i<req.body.usernames.size(); i++){
        //     await client.query(`INSERT INTO event-users (eventid, username) VALUES (${eventid}, '${req.body.usernames[i]}')`);
        // }
        res.send("success")
        
    } catch(err) {
        res.send(err.message);
        console.log(err.message);
    }
});



module.exports = router