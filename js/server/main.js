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

function preload() {}

function create() {}

function update() {}

const game = new Phaser.Game(config);
window.gameLoaded();

// SERVER part
const players = {}; // Faire une liste de toute les connexions (tout les joueurs)
const self = this;


io.on('connection', function (socket) {
  console.log('a user connected');

  // Create a players
  players[socket.id] = {
    name:socket.handshake.query.name
  };

  socket.emit('playerConnected', players[socket.id]);
  socket.broadcast.emit('playerConnected', players[socket.id]);

  socket.on('disconnect', function () {
    socket.emit('playerConnected', players[socket.id]);
    socket.broadcast.emit('playerDisconnected', players[socket.id]);
  });
});
