class GameUI extends Phaser.Scene {

  constructor ()
  {
    super({ key: 'gameUI' });
    this.menuSize = 100;
  }

  init(level){
    this.level = level;
  }

  create ()
  {
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;
    // Background
    var mBackground = this.add.graphics();
    mBackground.fillStyle(0x222222, 0.8);
    mBackground.fillRect(0, this.height-this.menuSize, this.width, this.menuSize);
    //

    // Afficher le menu en bas
    this.loadMainMenu();
    console.log("UI loaded!");
  }

  loadMainMenu(){
    var container = this.add.container(0, this.height-this.menuSize);

    var clickButton = this.add.text(this.width/2, 40, 'Machines', { fill: '#0f0' }).setInteractive();
    container.add(clickButton);
    clickButton.on('pointerdown', () => {
      this.loadConstructionMenu();
      container.destroy();
    });
  }

  loadConstructionMenu(){
    var container = this.add.container(0, this.height-100);

    var clickButton = this.add.text(10, 40, 'Retour', { fill: '#0f0' }).setInteractive();
    container.add(clickButton);

    var machine1 = this.add.sprite(100, 20, 'machine1-1').play('activated').setInteractive().on('pointerdown', () => {
      this.level.selectedObject = 'machine1-1';
    });
    container.add(machine1);

    clickButton.on('pointerdown', () => {
      this.level.selectedObject = -1;
      this.loadMainMenu();
      container.destroy();
    });
  }
}
