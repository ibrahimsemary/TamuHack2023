const express = require('express')
const pg = require('pg');
const router = express.Router()


router.get('/test-route', async(req, res) => {
    try{
        res.send("howdy");
    } catch(err) {
        console.log(err.message);
    }
});

router.get('/test-route2/:name', async(req, res) => {
    try{
        const {name} = req.params
        res.send("howdy" + name);
    } catch(err) {
        console.log(err.message);
    }
});




module.exports = router