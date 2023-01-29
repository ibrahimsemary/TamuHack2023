const express = require('express')
const pg = require('pg')
var conString = "postgresql://postgres:BGSMnZeKu6JGykthxCsB@containers-us-west-188.railway.app:5471/railway"
var client = new pg.Client(conString);
client.connect();

const router = express.Router()

/**
 * requires : creator and title
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
        for (let i = 0; i < usernames.length; ++i){
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
        const result = client.query(`SELECT * FROM groups_users JOIN ON groups.id = groups_users.groupsid groups WHERE username = '${username}' `)
        console.log(result.rows);
        res.send("");

    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
});


module.exports = router