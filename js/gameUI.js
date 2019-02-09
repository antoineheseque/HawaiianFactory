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

    var machinesButton = this.add.text(this.width/2-50, 40, 'Machines', { fill: '#0f0' }).setInteractive();
    container.add(machinesButton);
    var environmentButton = this.add.text(this.width/2+50, 40, 'Environment', { fill: '#0f0' }).setInteractive();
    container.add(environmentButton);

    machinesButton.on('pointerdown', () => {
      this.loadMachinesMenu();
      container.destroy();
    });
    environmentButton.on('pointerdown', () => {
      this.loadEnvironmentMenu();
      container.destroy();
    });
  }

  loadMachinesMenu(){
    var container = this.add.container(0, this.height-100);

    var clickButton = this.add.text(10, 40, 'Retour', { fill: '#0f0' }).setInteractive();
    container.add(clickButton);

    var machine1 = this.add.sprite(100, 20, 'machine1-1').play('activated').setInteractive().on('pointerdown', () => {
      this.level.selectedObject = 'machine1-1';
      this.level.selectedType = 'machines';
    });
    container.add(machine1);

    clickButton.on('pointerdown', () => {
      this.level.selectedObject = -1;
      this.loadMainMenu();
      container.destroy();
    });
  }

  loadEnvironmentMenu(){
    var container = this.add.container(0, this.height-100);

    var clickButton = this.add.text(10, 40, 'Retour', { fill: '#0f0' }).setInteractive();
    container.add(clickButton);

    var turbine1 = this.add.image(100, 20, 'turbine1-1').setInteractive().on('pointerdown', () => {
      this.level.selectedObject = 'turbine1-1';
      this.level.selectedType = 'environment';
    });
    container.add(turbine1);

    var turbine2 = this.add.image(150, 20, 'turbine1-2').setInteractive().on('pointerdown', () => {
      this.level.selectedObject = 'turbine1-2';
      this.level.selectedType = 'environment';
    });
    container.add(turbine2);

    clickButton.on('pointerdown', () => {
      this.level.selectedObject = -1;
      this.level.selectedType = 'unknown';
      this.loadMainMenu();
      container.destroy();
    });
  }
}
