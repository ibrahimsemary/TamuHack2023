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
        const result = await client.query(`SELECT * FROM event_users NATURAL JOIN events WHERE username = '${username}' AND date = '${date}' `);
        const events = []
        for (var i = 0; i < result.rows.length; ++i){
            events[i] = new Array(4)
            events[i][0] = result.rows[i].creator;
            events[i][1] = result.rows[i].date;
            events[i][2] = result.rows[i].start_time;
            events[i][3] = result.rows[i].end_time;
            events[i][4] = result.rows[i].description;
            events[i][5] = result.rows[i].title;
        }
        res.send(events)
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
});


module.exports = router