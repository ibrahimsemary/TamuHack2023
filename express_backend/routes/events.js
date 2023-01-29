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
            events[i][1] = result.rows[i].date;
            events[i][2] = result.rows[i].start_time;
            events[i][3] = result.rows[i].end_time;
            events[i][4] = result.rows[i].description;
            events[i][5] = result.rows[i].title;
            events[i][6] = result.rows[i].eventid;
        }
        res.send(events)
    }
    catch (err) {
        console.log(err.message);
        res.send("User cannot be found");
    }
})
router.get('/event/id/:eventid', async (req, res) => {
    try {
        const { eventid } = req.params;
        const result = await client.query(`SELECT * FROM event_users NATURAL JOIN events WHERE eventid = '${eventid}'`)
        console.log(result)
        const events = []
        events[0] = new Array(6)
        events[0][0] = result.rows[0].creator;
        events[0][1] = result.rows[0].date;
        events[0][2] = result.rows[0].start_time;
        events[0][3] = result.rows[0].end_time;
        events[0][4] = result.rows[0].description;
        events[0][5] = result.rows[0].title;
        events[1] = new Array(result.rows.length)
        for (var i = 0; i < result.rows.length; ++i){
            events[1][i] = result.rows[i].username;
        }
        res.send(events)
    }
    catch (err) {
        console.log(err.message);
        res.send("User cannot be found");
    }
})

router.get('/event/groupsid/:groupsid', async (req, res) => {
    try {
        const { groupsid } = req.params;
        const result = await client.query(`SELECT * FROM event_users NATURAL JOIN events WHERE groupsid = '${groupsid}'`)
        console.log(result)
        const events = []
        var currentEvent = -1;
        var count = -1;
        var usernameCount = 0;
        for (var i = 0; i < result.rows.length; ++i){
            if (currentEvent == result.rows[i].eventid) {
                events[count][7][i] = result.rows[i].username;
                usernameCount += 1
            }
            else {
                count += 1;
                events[count] = new Array(6)
                events[count][0] = result.rows[i].creator;
                events[count][1] = result.rows[i].date;
                events[count][2] = result.rows[i].start_time;
                events[count][3] = result.rows[i].end_time;
                events[count][4] = result.rows[i].description;
                events[count][5] = result.rows[i].title;
                events[count][6] = result.rows[i].eventid;
                usernameCount = 1
                events[count][7] = new Array()
                events[count][7][0] = result.rows[i].username
                currentEvent = result.rows[i].eventid
            }
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
        var date = req.body.date
        if (date != "") {
            client.query(`UPDATE events SET date = '${date}' WHERE eventid = '${eventid}'`, function (err, result) {
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
        const groupsid = req.body.groupsid
        var description = req.body.description
        var start_time =req.body.start_time
        var end_time = req.body.end_time;
        var Q = ""
        if (description === "") {
            description = null;
        }
        if(groupsid === 0){
            Q = `INSERT INTO events (creator, start_time, end_time, description, title, date) VALUES ('${req.body.creator}', '${start_time}', '${end_time}', '${description}', '${req.body.title}', '${req.body.date}')`;
        }
        else {
            Q = `INSERT INTO events (creator, start_time, end_time, description, title, date, groupsid) VALUES ('${req.body.creator}', '${start_time}', '${end_time}', '${description}', '${req.body.title}', '${req.body.date}','${req.body.groupsid}')`;
        }
        console.log(Q);
        client.query(Q);
        const result = await client.query(`SELECT max(eventid) FROM events`)
        const id = result.rows[0].max
        await client.query(`INSERT INTO event_users (eventid, username) 
                                VALUES ('${id}','${req.body.creator}')`)
        if (groupsid != 0) {
            const usernames = await client.query(`SELECT username FROM groups_users WHERE groupsid = '${req.body.groupsid}'`)
            console.log(usernames)
            for (let i = 1; i < usernames.rows.length; ++i) {
                console.log(usernames.rows[i].username)
                await client.query(`INSERT INTO event_users (eventid, username) 
                                VALUES ('${id}','${usernames.rows[i].username}')`)
            }
        }
        res.send((id).toString())
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
})
router.post('/add-user-event', async(req, res) => {
    try {
        const myUser = req.body.username
        const eventid = req.body.eventid
        const groupsid = req.body.groupsid        
        client.query(`INSERT INTO event_users (eventid, username) 
                                VALUES ('${eventid}','${myUser}')`, function (err, result) {
                                    if (err) {
                                        res.send("No such event or user")
                                    }
        });
        const groupResult = await client.query(`SELECT groupsid FROM events WHERE eventid = '${eventid}'`)
        if (groupResult.rows[0].groupsid == null) {
            client.query(`UPDATE events SET groupsid = '${groupsid}' WHERE eventid = '${eventid}'`, function (err, result) {
                if (err) {
                    res.send("Value entered is not a group")
                }
            });
        }
        const result = await client.query(`SELECT max(id) FROM event_users`)
        const id = result.rows[0].max
        res.send((id).toString())
    } catch (err) {
        console.log(err.message);
        res.send("User cannot be found");
    }
})

router.post('/remove-user-event', async(req, res) => {
    try {
        const myUser = req.body.username
        const eventid = req.body.eventid
        client.query(`DELETE FROM event_users WHERE eventid = '${eventid}' AND username = '${myUser}'`, function (err, result) {
                                    if (err) {
                                        res.send("No such event or user")
                                    }
                                });
        res.send((eventid))
    } catch (err) {
        console.log(err.message);
        res.send("User cannot be found");
    }
})


module.exports = router