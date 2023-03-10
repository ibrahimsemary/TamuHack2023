const express = require('express')
const app = express()
const dotenv = require('dotenv').config();
const cors = require('cors');
const pg = require('pg')

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

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

app.post('/authenticate', async(req, res) => {
    try {
        console.log(req.body)
        const myUser = req.body.username
        const result = await client.query(`SELECT * FROM users WHERE username = '${myUser}'`)
        if(result.rows[0].password === req.body.password){
            res.send(myUser);
        } else {
            res.send("Cannot Authenticate");
        }
    } catch (err) {
        console.log(err.message);
        res.send("User cannot be found");
    }
})

const exampleRoute = require('./routes/exRoute.js');
app.use('/ex/', exampleRoute);

const events = require('./routes/events.js');
app.use('/', events);

const groups = require('./routes/groups.js');
app.use('/', groups);

const users = require('./routes/users.js');
app.use('/', users);

const calendar = require('./routes/calendar.js');
app.use('/', calendar);


app.listen(PORT, function () {
    console.log('Server is running on port ' + PORT);
});