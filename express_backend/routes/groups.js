const express = require('express')
const pg = require('pg')
app.use(express.json())
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
        const result = await client.query(`INSERT INTO group (creator, title, description) VALUES ('${myUser}','${title}','${description}')`)
        console.log(result)
        res.send(result.rows[0].id)
    } catch (err) {
        console.log(err.message);
        res.send("User cannot be found");
    }
})