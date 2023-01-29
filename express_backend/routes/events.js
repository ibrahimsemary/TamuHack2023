const express = require('express')
const pg = require('pg');
const router = express.Router()

var conString = "postgresql://postgres:BGSMnZeKu6JGykthxCsB@containers-us-west-188.railway.app:5471/railway"
var client = new pg.Client(conString);
client.connect();

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
/**
 * requires : creator, start_time, end_time, description
 *
 */
router.post('/remove-event', async(req, res) => {
    try {
        const eventid = req.body.eventid
        client.query(`DELETE FROM events WHERE eventid = '${eventid}'`, function (err, result) {
            if (err) {
                res.send("Event is not made")
            }
        });
        await client.query(`DELETE FROM event_users WHERE eventid = '${eventid}'`);
        res.send((eventid).toString())
    } catch (err) {
        console.log(err.message);
        res.send("Event is not made");
    }
})


router.post('/update-event', async(req, res) => {
    try {
        const eventid = req.body.eventid
        var creator = req.body.creator
        if (creator != "") {
            client.query(`UPDATE events SET creator = '${creator}' WHERE eventid = '${eventid}'`, function (err, result) {
                if (err) {
                    res.send("Value entered is not a username")
                }
            });
        }
        var start_time = req.body.start_time
        if (start_time != "") {
            client.query(`UPDATE events SET start_time = '${start_time}' WHERE eventid = '${eventid}'`, function (err, result) {
                if (err) {
                    res.send("Value entered is not a time stamp")
                }
            });
        }
        var end_time = req.body.end_time
        if (end_time != "") {
            client.query(`UPDATE events SET end_time = '${end_time}' WHERE eventid = '${eventid}'`, function (err, result) {
                if (err) {
                    res.send("Value entered is not a time stamp")
                }
            });
        }
        var description = req.body.description
        if (description != "") {
            client.query(`UPDATE events SET description = '${description}' WHERE eventid = '${eventid}'`, function (err, result) {
                if (err) {
                    res.send("Value entered is not a time stamp")
                }
            });
        }
        var title = req.body.title
        if (title != "") {
            client.query(`UPDATE events SET title = '${title}' WHERE eventid = '${eventid}'`, function (err, result) {
                if (err) {
                    res.send("Value entered is not a time stamp")
                }
            });
        }
        res.send((eventid).toString())
    } catch (err) {
        console.log(err.message);
        res.send("Error");
    }
})


router.post('/add-event', async(req, res) => {
    try {
        const usernames = req.body.usernames
        var description = req.body.description
        var start_time = req.body.start_time
        var end_time = req.body.end_time
        start_time = await client.query(`SELECT timestamp '${start_time}' + interval '0 hours'`)
        var name = start_time.fields
        console.log(start_time)
        if (description === "") {
            description = null;
        }
        client.query(`INSERT INTO events (creator, start_time, end_time, description, title) 
                    VALUES ('${req.body.creator}', '${start_time}', '${end_time}', '${description}', '${req.body.title}')`);
        const result = await client.query(`SELECT max(eventid) FROM events`)
        const id = result.rows[0].max
        client.query(`SELECT timestamp '${end_time}' + interval '6 hours' FROM events WHERE eventid = '${id}'`)
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
        client.query(`INSERT INTO event_users (eventid, username) 
                                VALUES ('${eventid}','${myUser}')`, function (err, result) {
                                    if (err) {
                                        res.send("No such event or user")
                                    }
                                });
        const result = await client.query(`SELECT max(id) FROM event_users`)
        const id = result.rows[0].max
        res.send((id).toString())
    } catch (err) {
        console.log(err.message);
        res.send("User cannot be found");
    }
})


module.exports = router