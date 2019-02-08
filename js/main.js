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
    //audio: {
        //disableWebAudio: true
    //}
    scene: [ Boot, MainMenu, LoadLevel ]
};
const game = new Phaser.Game(engineConfig);
