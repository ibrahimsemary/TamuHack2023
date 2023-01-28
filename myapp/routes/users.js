var express = require('express');
var router = express.Router();
var app = express();
app.listen(3000,() => console.log("Server listening at port 3000"));
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
