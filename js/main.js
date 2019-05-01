var width = screen.width > 1200 ? 1200 : screen.width; //
var height = screen.width > 1200 ? 800 : screen.height; //

const engineConfig = {
    type: Phaser.AUTO,
    width: width, //1200
    height: height, //800
    parent: 'phaser-hf',
    dom: {
        createContainer: true
    },
    pixelArt: false, // true or false
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scale: {
        parent: 'phaser-hf',
        fullscreenTarget: 'phaser-hf',
        mode: Phaser.Scale.FIT
        //autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [ Boot, MainMenu, LoadLevel, GameUI, GameEngine ]
};
const game = new Phaser.Game(engineConfig);
