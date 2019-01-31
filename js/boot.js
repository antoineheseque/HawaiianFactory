/*
var assets = [
  'images/tiles/grass.png',
  'images/tiles/dirt.png',
  'images/tiles/sea.png',
  'images/tiles/wall.png',
  'images/tiles/ground.png'
];
*/

class Boot extends Phaser.Scene{

  constructor ()
  {
    super({ key: 'boot' });
  }

  preload ()
  {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;

    // Change background color
    this.cameras.main.setBackgroundColor('#03396C');

    // Progress bar ///////////////
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(85, 130, 320, 50);

    // PercentText ///////////////
    var percentText = this.make.text({
      x: width / 2,
      y: height / 2,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    this.load.on('progress', function (value) {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(95, 140, 300 * value, 30);
      percentText.setText(parseInt(value * 100) + '%');
    });

    // Loading text ///////////////
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 40,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    // Loading ASSETS ///////////////
    // Load JSON file into a dictionnary
    loadJSON('../images/assets.json', function(response, phaser) {
      var assets = JSON.parse(response);
      assets.tiles.forEach(function(element){
        phaser.load.image('tile' + element.id, 'images/' + element.image);
      }, this);
    }, this);
  }

  create ()
  {
    // Load main menu
    this.scene.start('mainMenu');
  }
}
