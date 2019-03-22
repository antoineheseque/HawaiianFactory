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

    /*var player = prompt("Entrez le nom du directeur :", "Gilbert Montagné");
    this.username = player;*/

    var music = this.sound.add('theme');
    music.play();

    this.username = "Gilbert Montagné";

    var background = this.add.image(0,0,'background').setOrigin(0,0).setDisplaySize(width, height);

    var logo = this.add.image(width/2, height/2-100, 'logo').setDisplaySize(400, 100);

    var play = this.add.image(width/2, height/2+100, 'play').setDisplaySize(140, 100).setInteractive()
    .on('pointerdown', () => this.scene.start('loadLevel'));
  }

}
