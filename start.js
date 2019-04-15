var express = require('express');
var app = express();
const server = require('http').Server(app);

const path = require('path');
const jsdom = require('jsdom');
const io = require('socket.io').listen(server);
const { JSDOM } = jsdom;

var port = process.env.PORT || 1234;

function setupAuthoritativePhaser() {
  JSDOM.fromFile(path.join(__dirname, 'js/server/index.html'), {
    // To run the scripts in the html file
    runScripts: "dangerously",
    // Also load supported external resources
    resources: "usable",
    // So requestAnimatinFrame events fire
    pretendToBeVisual: true
  }).then((dom) => {
    dom.window.gameLoaded = () => {
      server.listen(port, function () {
        console.log('HawaiianFactory Server on port ' + port + '!');
      });
    };
    dom.window.io = io;
  }).catch((error) => {
    console.log(error.message);
  });
}

app.use(express.static('assets/'))
app.use(express.static('js/'))
app.use(express.static('js/classes/'))
app.use(express.static('js/stats/'))

app.use(express.static('public/'))

app.get('/', function (req, res) {
  res.sendFile('/index.html');
});

setupAuthoritativePhaser();
