
var express = require('express');
var app = express();

app.use(express.static('game'));

var server = app.listen(8000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Server started at http://%s:%s', host, port)

});