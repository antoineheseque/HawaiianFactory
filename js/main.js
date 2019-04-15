var width = screen.width; // screen.width > 1200 ? 1200 :
var height = screen.height; // screen.width > 1200 ? 800 : 

const engineConfig = {
    type: Phaser.AUTO,
    width: width, //1200
    height: height, //800
    pixelArt: false, // true or false
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: [ Boot, MainMenu, LoadLevel, GameUI, GameEngine ]
};
const game = new Phaser.Game(engineConfig);
