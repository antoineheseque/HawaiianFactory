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
    /*var player = prompt("Entrez le nom du directeur :", "Gilbert Montagné");
    this.username = player;*/
    //var music = this.sound.add('theme');
    this.username = "Gilbert Montagné";
    this.clickButton = this.add.text(this.cameras.main.width/2, this.cameras.main.height/2 + 100, 'Play!', { fill: '#0f0' })
      .setInteractive()
      .on('pointerdown', () => this.scene.start('loadLevel'));
    //music.play();

  }

}
