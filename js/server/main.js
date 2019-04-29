const config = {
  type: Phaser.HEADLESS,
  autoFocus: false,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

function preload() { this.time = 0; }

function create() {}

var date = new Date();
var time = 0;
function update(t) {
  if(t - time > 300){
    date.setDate(date.getDate()+1);
    time = t;
  }
}

const game = new Phaser.Game(config);
window.gameLoaded();

// SERVER part
const players = {}; // Faire une liste de toute les connexions (tout les joueurs)
const self = this;

io.on('connection', function (socket) {
  console.log('A user connected');

  if(Object.keys(players).length < 1){ // Si c'est le premier joueur alors reset le temps au premier jour.
    date = new Date();
    console.log('Time reset');
  }

  // Create a players
  players[socket.id] = {
    name:socket.handshake.query.name,
    initialDay:date
  };

  socket.emit('playerConnected', players[socket.id]);
  socket.broadcast.emit('playerConnected', players[socket.id]);

  socket.on('disconnect', function () {
    console.log('A user disconnected');
    socket.emit('playerConnected', players[socket.id]);
    socket.broadcast.emit('playerDisconnected', players[socket.id]);
    delete players[socket.id];
  });

  socket.on('receiveMessage', function(msg) {
    if(msg == null)
      return;

    var message = msg.split(' ');
    if(message[0] == '/w'){
      var username = 'unknown';
      Object.keys(players).forEach(function(key) {
          if(players[key].name == message[1]){
              io.to(key).emit('receiveMessage', msg.replace("/w " + players[key].name, '[Privé] ' + players[socket.id].name + ':'));
              socket.emit('receiveMessage', '[Privé] Message envoyé à ' + players[key].name + '.');
          }
      });

    }
    else if(message[0] == '/online'){
      var str = '';
      str += '(' + Object.keys(players).length + ' Joueur(s)): ';
      Object.keys(players).forEach(function(key) {
          str += players[key].name + ' ';
      });
      str += '.';
      socket.emit('receiveMessage', str);
    }
    else{
      socket.emit('receiveMessage', players[socket.id].name + ': ' + msg);
      socket.broadcast.emit('receiveMessage', players[socket.id].name + ': ' + msg);
    }
  });

});
