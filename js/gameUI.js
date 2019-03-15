class GameUI extends Phaser.Scene {

  constructor ()
  {
    super({ key: 'gameUI' });
    this.menuSize = 100;
  }

  init(level){
    this.level = level;
  }

  preload(){
    // Get level file
    loadJSON('../objects.json', function(response, mI) {
      mI.objects = JSON.parse(response);
    }, this);
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

    //var mBackground = this.add.graphics();
    //mBackground.fillStyle(0x222222, 0.6);
    //mBackground.fillRect(this.width-2*this.menuSize, 0, 2*this.menuSize, this.height-this.menuSize);

    // Afficher le menu en bas
    this.loadMainMenu();
    console.log("UI loaded!");
  }

  loadMainMenu(){
    var container = this.add.container(0, this.height-this.menuSize);

    var machinesButton = this.add.text(this.width/2-50, 40, 'Machines', { fill: '#0f0' }).setInteractive().setOrigin(0.5, 0.5);;
    container.add(machinesButton);
    var environmentButton = this.add.text(this.width/2+50, 40, 'Environment', { fill: '#0f0' }).setInteractive().setOrigin(0.5, 0.5);;
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
    this.level.selectedType = 'machines';

    var clickButton = this.add.text(10, 40, 'Retour', { fill: '#0f0' }).setInteractive();
    container.add(clickButton);

    var x = 100;
    var y = 20;
    Object.values(this.objects['machines']).forEach(function(element, index) {
      //var el = gameUI.objects['environment'][element];

      // Si il y a une animation
      if(element.upgrades[0].frames > 1){
        var name = element.upgrades[0].texture;
        var machine = this.add.sprite(x, y, element.upgrades[0].texture + '-1').play(element.upgrades[0].texture).setInteractive().on('pointerdown', () => {
          this.level.selectedObject = Object.keys(this.objects['machines'])[index];
        });
      }
      else{
        var obj = this.add.image(x, y, element.upgrades[0].texture).setInteractive().on('pointerdown', () => {
          this.level.selectedObject = Object.keys(this.objects['machines'])[index];
        });
      }
      container.add(machine);
      x += 40;
      if(x > 600){
        x = 100;
        y += 40;
      }
    }, this);

    clickButton.on('pointerdown', () => {
      this.level.selectedObject = -1;
      this.loadMainMenu();
      container.destroy();
    });
  }

  loadEnvironmentMenu(){
    var container = this.add.container(0, this.height-100);
    this.level.selectedType = 'environment';

    var clickButton = this.add.text(10, 40, 'Retour', { fill: '#0f0' }).setInteractive();
    container.add(clickButton);

    var x = 100;
    var y = 20;

    Object.values(this.objects['environment']).forEach(function(element, index) {

      // Si il y a une animation
      if(element.upgrades[0].frames > 1){
        var name = element.upgrades[0].texture;
        var obj = this.add.sprite(x, y, element.upgrades[0].texture + '-1').play(element.upgrades[0].texture).setInteractive().on('pointerdown', () => {
          this.level.selectedObject = Object.keys(this.objects['environment'])[index];
        });
      }
      else{
        var obj = this.add.image(x, y, element.upgrades[0].texture).setInteractive().on('pointerdown', () => {
          this.level.selectedObject = Object.keys(this.objects['environment'])[index];
        });
      }
      container.add(obj);
      x += 40;
      if(x > 600){
        x = 100;
        y += 40;
      }
    }, this);

    clickButton.on('pointerdown', () => {
      this.level.selectedObject = -1;
      this.level.selectedType = 'unknown';
      this.loadMainMenu();
      container.destroy();
    });
  }
}
