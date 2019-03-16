class GameUI extends Phaser.Scene {

  constructor ()
  {
    super({ key: 'gameUI' });
    this.menuSize = 100;
  }

  init(level){
    this.level = level;
    this.level.UI = this;
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

    // Afficher le menu en bas
    this.loadMainMenu();
    console.log("UI loaded!");
  }

  loadMainMenu(){
    this.level.selectedType = 'none';
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

    // Vérifier si un menu d'info n'est pas ouvert
    if(this.level.selectedObject == -2){
      this.level.selectedObject = -1;
      this.level.UI.container.destroy();
    }

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

    // Vérifier si un menu d'info n'est pas ouvert
    if(this.level.selectedObject == -2){
      this.level.selectedObject = -1;
      this.level.UI.container.destroy();
    }

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

  getInformations(object){
    if(this.level.selectedObject < 0 && this.level.selectedType == 'none'){
      this.level.selectedObject = -2;
      if(this.container != null)
        this.container.destroy();
      this.container = this.showInformationsMenu();

      // Show name
      var name = this.make.text({
        x: this.width -100,
        y: 20,
        text: object.stats.name,
        style: {
          font: '14px monospace',
          fill: '#ffffff',
          wordWrap: { width: 180 }
        }
      });
      name.setOrigin(0.5, 0.5);
      this.container.add(name);

      // Show Level
      var level = this.make.text({
        x: this.width - 100,
        y: 40,
        text: 'Niveau ' + object.level,
        style: {
          font: '12px monospace',
          fill: '#ffffff',
          wordWrap: { width: 180 }
        }
      });
      level.setOrigin(0.5, 0.5);
      this.container.add(level);

      if(object.type = 'machine'){
        // Show Level
        var level = this.make.text({
          x: this.width - 200,
          y: 80,
          text: 'Gain: ' + (object.stats.upgrades[object.level-1].gain*30) + '€ / mois',
          style: {
            font: '12px monospace',
            fill: '#ffffff',
            wordWrap: { width: 200 }
          }
        });
        this.container.add(level);
      }

      // Show Button upgrade
      var cost = 'Augmenter au niveau 2 pour 0 $';
      if(object.stats.upgrades.length > object.level){
        var price = object.stats.upgrades[object.level].cost;
        cost = 'Augmenter au niveau ' + (object.level+1) + ' pour ' + price + ' €';
      }
      else{
        cost = "Niveau MAX atteint!";
      }
      var color = '#0f0';
      if(!this.level.money.checkPriceSelected(price) || cost == "Niveau MAX atteint!")
        color = '#e9431b';

      var upgrade = this.add.text(this.width - 190, 300, cost, { fill: color, wordWrap: { width: 180 } }).setFontSize(12).setInteractive().on('pointerdown', () =>
      {
        if(object.stats.upgrades.length > object.level){
          var price = object.stats.upgrades[object.level].cost;
          // Vérifier si on peut acheter et augmenter d'un niveau.
          if(this.level.money.buy(price)){
            object.upgrade();
            this.getInformations(object);
          }
        }
      });
      this.container.add(upgrade);

    }
  }

  showInformationsMenu(){
    var container = this.add.container(0, 0);

    // Add Background
    var background = this.add.graphics();
    background.fillStyle(0x222222, 0.6);
    background.fillRect(this.width - 200, 0, 200, this.height-100);
    container.add(background);
    var closeButton = this.add.text(this.width - 20, 10, 'X', { fill: '#0f0' }).setInteractive().on('pointerdown', () => { container.destroy(); this.level.selectedObject = -1;});
    container.add(closeButton);

    return container;
  }
}
