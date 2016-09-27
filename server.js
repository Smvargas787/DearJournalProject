var express = require('express');
var morgan = require('morgan');

var app = express();

app.use(express.static('static'));
app.use(morgan('dev'));

app.get('*', function(req, res, next){
  res.sendFile(__dirname + '/static/index.html');
});

var server = app.listen(process.env.PORT || 3000, function(){
  console.log('~=~=~=~=Server Started on PORT: ' + server.address().port);
});
