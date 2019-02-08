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
<<<<<<< HEAD
    scene: [ Boot, MainMenu, LoadLevel, GameUI, GameEngine ]
=======
    //audio: {
        //disableWebAudio: true
    //}
    scene: [ Boot, MainMenu, LoadLevel ]
>>>>>>> 29a74ef9ee97793f0a0a520d6769a6dd37f1adef
};
const game = new Phaser.Game(engineConfig);
