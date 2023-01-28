var express = require('express');
var router = express.Router();
var app = express();
app.set('views', path.join(__dirname, '/frontend/src'));
app.listen(3000,() => console.log("Server listening at port 3000"));


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
