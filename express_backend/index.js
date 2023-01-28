const express = require('express')
const app = express()
const pg = require('pg')

const PORT = 4000

var conString = "postgresql://postgres:BGSMnZeKu6JGykthxCsB@containers-us-west-188.railway.app:5471/railway"
var client = new pg.Client(conString);
client.connect();

app.get('/test-connection', (req, res, next) => { 
    res.send("hi");
});

app.get('/test-db', async (req, res, next) => { 
    try {
        const result = await client.query("SELECT * FROM users");
        res.send(result.rows)
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
});

const exampleRoute = require('./routes/exRoute');
app.use('/ex/', exampleRoute);


app.listen(PORT, function () {
    console.log('Server is running on port ' + PORT);
});