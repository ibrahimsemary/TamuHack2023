const express = require('express')
const pg = require('pg');
const router = express.Router()

var conString = "postgresql://postgres:BGSMnZeKu6JGykthxCsB@containers-us-west-188.railway.app:5471/railway"
var client = new pg.Client(conString);
client.connect();

router.post('/create-user', async(req, res) => {
    try {

    } catch (err) {
        res.send(err.message);
        console.log(err.message);
    }
});


module.exports = router