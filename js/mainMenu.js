var assets = [
  'images/tiles/grass.png',
  'images/tiles/dirt.png',
  'images/tiles/sea.png',
  'images/tiles/wall.png',
  'images/tiles/ground.png'
];

class MainMenu extends Phaser.Scene {

  constructor ()
  {
    super({ key: 'mainMenu' });
  }

  preload ()
  {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;

    // Change background color
    this.cameras.main.setBackgroundColor('#03396C');
    console.log("MENU SHOWN");

    // Name text ///////////////
    var name = this.make.text({
      x: width / 2,
      y: height / 2 - 40,
      text: 'Hawaiian Factory',
      style: {
        font: '36px monospace',
        fill: '#ffffff'
      }
    });
    name.setOrigin(0.5, 0.5);
  }

  create ()
  {
    this.input.on('pointerdown', function () {
      this.scene.start('loadLevel');
    }, this);
  }
}
