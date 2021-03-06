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
  }

  create ()
  {
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;

    var music = this.sound.add('theme');
    music.play();

    var background = this.add.image(0,0,'background').setOrigin(0,0).setDisplaySize(width, height);

    var logo = this.add.image(width/2, height/2-100, 'logo').setDisplaySize(450, 100);

    var play = this.add.image(width/2, height/2+100, 'play').setDisplaySize(160, 80).setInteractive()
    .on('pointerdown', () => {


      if(!this.scale.isFullscreen){
        this.scale.startFullscreen();
      }

      // FULLSCREEN (PROBLEM)

      /*var canvas = this.sys.game.canvas;
      var fullscreen = this.sys.game.device.fullscreen;

      if (!fullscreen.available)
      {
          return;
      }

      canvas[fullscreen.request]();*/

      this.scene.start('loadLevel');
    });
  }
}
