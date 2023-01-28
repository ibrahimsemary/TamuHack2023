const express = require('express')
const pg = require('pg')
var conString = "postgresql://postgres:BGSMnZeKu6JGykthxCsB@containers-us-west-188.railway.app:5471/railway"
var client = new pg.Client(conString);
client.connect();

const router = express.Router()

router.post('/add-group', async(req, res) => {
    try {
        console.log(req.body)
        const myUser = req.body.username
        const title = req.body.title
        var description = req.body.description
        if (description === "") {
            description = null;
        }
        await client.query(`INSERT INTO groups (creator, title, description) 
                                VALUES ('${myUser}','${title}','${description}')`)
        const result = await client.query(`SELECT max(id) FROM groups`)
        const id = result.rows[0].max
        await client.query(`INSERT INTO groups_users (groupsid, username) 
                                VALUES ('${id}','${myUser}')`)
        console.log(result)
        res.send((id).toString())
    } catch (err) {
        console.log(err.message);
        res.send("User cannot be found");
    }
})


module.exports = router