const engineConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 450,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: [ Boot, MainMenu, LoadLevel ]
};
const game = new Phaser.Game(engineConfig);
