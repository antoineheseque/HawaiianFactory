var express = require('express');
var app = express();

app.use(express.static('assets/'))
app.use(express.static('js/'))
app.use(express.static('js/classes/'))
app.use(express.static('js/stats/'))

app.use(express.static('public/'))

app.get('/', function (req, res) {
  res.sendFile('/index.html');
});

app.listen(1234, function () {
  console.log('HawaiianFactory Server on port 1234!');
});
