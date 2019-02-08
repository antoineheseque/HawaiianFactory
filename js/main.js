const engineConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 450,
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
