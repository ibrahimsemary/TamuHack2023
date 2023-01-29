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
        const result = await client.query(`SELECT * FROM event_users NATURAL JOIN events WHERE username = '${username}' AND date = '${date}' ORDER BY start_time`);
        const events = []
        for (var i = 0; i < result.rows.length; ++i){
            events[i] = new Array(4)
            events[i][0] = result.rows[i].creator;
            events[i][1] = result.rows[i].date;
            events[i][2] = result.rows[i].start_time;
            events[i][3] = result.rows[i].end_time;
            events[i][4] = result.rows[i].description;
            events[i][5] = result.rows[i].title;
            events[i][6] = result.rows[i].eventid;
        }
        res.send(events)
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
});

router.get('/get-group-schedule/:groupsid/:date', async(req, res) =>  {
    try {
        const {groupsid, date} = req.params
        await client.query(`CREATE OR REPLACE VIEW view11 AS SELECT event_users.username, eventid FROM groups_users JOIN event_users ON groups_users.username = event_users.username WHERE groupsid='${groupsid}'`)
        const result = await client.query(`SELECT username, start_time, end_time FROM view11 JOIN events ON view11.eventid = events.eventid ORDER BY start_time`)
        res.send(result.rows);
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
});

router.get('/find-best-time/:groupsid/:date/:duration', async(req, res) => {
    try {
        const {groupsid, date, duration} = req.params
        await client.query(`CREATE OR REPLACE VIEW view11 AS SELECT event_users.username, eventid FROM groups_users JOIN event_users ON groups_users.username = event_users.username WHERE groupsid='${groupsid}'`)
        const result = await client.query(`SELECT username, start_time, end_time FROM view11 JOIN events ON view11.eventid = events.eventid WHERE date='${date}' ORDER BY start_time`)
        //res.send(result.rows);
        //Parse data for times
        var data = []
        for(var i=0; i<result.rows.length; i++){
            data.push([])
            data[i].push(result.rows[i].username)
            let start_vals = result.rows[i].start_time.split(":")
            let end_vals = result.rows[i].end_time.split(":")
            data[i].push( (start_vals[0]*60 +start_vals[1]) *60 + start_vals[2])
            data[i].push( (end_vals[0]*60 +end_vals[1]) *60 + end_vals[2])
        }
        let whos_busy = {}
        for(var potential_start = 8*60*60; potential_start<24*60*60; potential_start += 30*60){
            whos_busy[potential_start] = []
            for(var i=0; i<data.length; i++){
                let potential_end = potential_start + duration;
                if(potential_start < data[i][1] && data[i][1] < potential_end ){
                    whos_busy[potential_start].push(data[i][0]);
                } else if(potential_start < data[i][2] && data[i][2] < potential_end){
                    whos_busy[potential_start].push(data[i][0]);
                }
            }
        }
        //res.send(whos_busy)
        let minLength = whos_busy[8*60*60].length
        let minTimes = []
        for(var key in whos_busy){
            if(whos_busy[key].length == minLength){
                minTimes.push(key)
            }
            if(whos_busy[key].length < minLength){
                minLength = whos_busy[key].length;
                minTimes = [key]
            }
        }

        res.send({minLength, minTimes})

    } catch (err) {
        console.log(err)
        res.send(err.message)
    }
})

router.get('/whos-busy/:groupsid/:date/:duration', async(req, res) => {
    try {
        const {groupsid, date, duration} = req.params
        await client.query(`CREATE OR REPLACE VIEW view11 AS SELECT event_users.username, eventid FROM groups_users JOIN event_users ON groups_users.username = event_users.username WHERE groupsid='${groupsid}'`)
        const result = await client.query(`SELECT username, start_time, end_time FROM view11 JOIN events ON view11.eventid = events.eventid WHERE date='${date}' ORDER BY start_time`)
        //res.send(result.rows);
        //Parse data for times
        var data = []
        for(var i=0; i<result.rows.length; i++){
            data.push([])
            data[i].push(result.rows[i].username)
            let start_vals = result.rows[i].start_time.split(":")
            let end_vals = result.rows[i].end_time.split(":")
            data[i].push( (start_vals[0]*60 +start_vals[1]) *60 + start_vals[2])
            data[i].push( (end_vals[0]*60 +end_vals[1]) *60 + end_vals[2])
        }
        let whos_busy = {}
        for(var potential_start = 8*60*60; potential_start<24*60*60; potential_start += 30*60){
            whos_busy[potential_start] = []
            for(var i=0; i<data.length; i++){
                let potential_end = potential_start + duration;
                if(potential_start < data[i][1] && data[i][1] < potential_end ){
                    whos_busy[potential_start].push(data[i][0]);
                } else if(potential_start < data[i][2] && data[i][2] < potential_end){
                    whos_busy[potential_start].push(data[i][0]);
                }
            }
        }
        res.send(whos_busy)

        //res.send({minLength, minTimes})

    } catch (err) {
        console.log(err)
        res.send(err.message)
    }
})


module.exports = router