var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 8000;

//Middleware
app.use(express.static('public'));
app.use(bodyParser.json());


//Connected Server
app.listen(port, function() {
  console.log("frontend running on port:", port);
});
