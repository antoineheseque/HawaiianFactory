/*import preload from './preloadScene.js';
import create from './createScene.js';*/
const engineConfig = {
    type: Phaser.AUTO,
    width: 500,
    height: 300,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: [ Boot, MainMenu, LoadLevel ]
};
const game = new Phaser.Game(engineConfig);
