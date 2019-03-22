class Boot extends Phaser.Scene{

  constructor ()
  {
    super({ key: 'boot' });
    // Load music
  }

  preload ()
  {
    this.load.audio('theme', ['../musics/StompDance.mp3']);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;

    // Change background color
    this.cameras.main.setBackgroundColor('#03396C');

    // Progress bar ///////////////
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width/4-10, height/2-10, width/2, 50);

    // PercentText ///////////////
    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 + 15,
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
      progressBar.fillRect(width/4, height/2, (width/2-20) * value, 30);
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

    // Load JSON file into a dictionnary
    loadJSON('../objects.json', function(response, phaser) {
      var assets = JSON.parse(response);

      // Load machines objects
      Object.values(assets['machines']).forEach(function(element){ // Parcourir toute les images
        element.upgrades.forEach(function(element2){ // Parcourir toute les upgrades
          if(element2.frames > 1){ // Quand il n'y a qu'une frame pour l'upgrade
            for(var i = 1; i <= element2.frames; i++){
              phaser.load.image(element2.texture + '-' + i, 'images/objects/machines/' + element2.texture + '-' + i + '.png');
            }
          }
          else{
            phaser.load.image(element2.texture, 'images/objects/machines/' + element2.texture + '.png');
          }
        }, this);
      }, this);

      // Load environment objects
      Object.values(assets['environment']).forEach(function(element){ // Parcourir toute les images
        element.upgrades.forEach(function(element2){ // Parcourir toute les upgrades
          if(element2.frames > 1){ // Quand il n'y a qu'une frame pour l'upgrade
            for(var i = 1; i <= element2.frames; i++){
              phaser.load.image(element2.texture + '-' + i, 'images/objects/environment/' + element2.texture + '-' + i + '.png');
            }
          }
          else{
            phaser.load.image(element2.texture, 'images/objects/environment/' + element2.texture + '.png');
          }
        }, element);
      }, this);
    }, this);

    // Load other images
    this.load.image('gray', 'images/ui/gray.png');
    this.load.image('red', 'images/ui/red.png');
    this.load.image('play', 'images/ui/play.png');
    this.load.image('logo', 'images/ui/logo.png');
    this.load.image('gold', 'images/ui/gold.png');
    this.load.image('background', 'images/ui/hawaii.jpg');


    /*this.load.image('machine1-1', 'images/objects/machine1-1.png');
    this.load.image('machine1-2', 'images/objects/machine1-2.png');
    this.load.image('turbine1-1', 'images/objects/turbine1.png');
    this.load.image('turbine1-2', 'images/objects/turbine2.png');*/
  }

  create ()
  {
    // Load main menu
    //this.scene.scale.startFullscreen();
    this.scene.start('mainMenu');
  }
}
