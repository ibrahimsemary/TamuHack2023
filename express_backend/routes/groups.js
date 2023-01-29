const express = require('express')
const pg = require('pg')
var conString = "postgresql://postgres:BGSMnZeKu6JGykthxCsB@containers-us-west-188.railway.app:5471/railway"
var client = new pg.Client(conString);
client.connect();

const router = express.Router()

/**
 * requires : none
 */
router.get('/getusers', async (req, res) => {
    try {
        const result = await client.query(`SELECT username FROM users`)
        const usernames = []
        for (var i = 0; i < result.rows.length; ++i){
            usernames[i] = result.rows[i].username;
        }
        res.send(usernames)
    }
    catch (err) {
        console.log(err.message);
        res.send("User cannot be found");
    }
})
router.post('/remove-group', async(req, res) => {
    try {
        const groupsid = req.body.groupsid
        client.query(`DELETE FROM groups WHERE id = '${groupsid}'`, function (err, result) {
            if (err) {
                res.send("Group is not made")
            }
        });
        await client.query(`DELETE FROM groups_users WHERE groupsid = '${groupsid}'`);
        res.send((groupsid).toString())
    } catch (err) {
        console.log(err.message);
        res.send("Event is not made");
    }
})
router.post('/add-group', async(req, res) => {
    try {
        const myUser = req.body.creator
        const title = req.body.title
        var description = req.body.description
        const usernames = req.body.usernames
        if (description === "") {
            description = null;
        }
        await client.query(`INSERT INTO groups (creator, title, description) 
                                VALUES ('${myUser}','${title}','${description}')`)
        const result = await client.query(`SELECT max(id) FROM groups`)
        const id = result.rows[0].max
        await client.query(`INSERT INTO groups_users (groupsid, username) 
                                VALUES ('${id}','${myUser}')`)
        for (let i = 1; i < usernames.length; ++i){
            await client.query(`INSERT INTO groups_users (groupsid, username) 
                                VALUES ('${id}','${usernames[i]}')`)
        }
        res.send((id).toString())
    } catch (err) {
        console.log(err.message);
        res.send("User cannot be found");
    }
})
router.post('/add-user-group', async(req, res) => {
    try {
        const myUser = req.body.username
        const groupsid = req.body.groupsid
        await client.query(`INSERT INTO groups_users (groupsid, username) 
                                VALUES ('${groupsid}','${myUser}')`)
        const result = await client.query(`SELECT max(id) FROM groups_users`)
        const id = result.rows[0].max
        res.send((id).toString())
    } catch (err) {
        console.log(err.message);
        res.send("User cannot be found");
    }
})


router.get('/get-groups/:username', async(req, res) => {
    try {
        const {username} = req.params;
        const result1 = await client.query(`SELECT groups.id, groups.title, groups.creator, groups.description FROM groups_users JOIN groups ON groups.id = groups_users.groupsid  WHERE username = '${username}' `);
        
        let result2;
        let data = result1.rows;
        for(var i=0; i<result1.rows.length; i++){
            result2 = await client.query(`SELECT username from groups_users where groupsid = ${result1.rows[i].id}`)
            data[i].usernames = []
            for(var j=0; j<result2.rows.length; j++){
                data[i].usernames.push(result2.rows[j].username)
            }
        }
        res.send(data)
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
});


router.get('/get-user-from-groupid/:groupid', async(req, res) => {
    try {
        const {groupid} = req.params
        result = await client.query(`SELECT username, img FROM groups_users NATURAL JOIN users WHERE groupsid = ${groupid}`)
        var data = {};
        for(var i=0; i<result.rows.length; i++){
            data[result.rows[i].username] =  result.rows[i].img
        }
        res.send(data)
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
})

module.exports = router