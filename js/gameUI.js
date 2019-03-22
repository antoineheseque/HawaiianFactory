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

    // Background Menu
    var bgMenu = this.add.graphics();
    bgMenu.fillStyle(0x222222, 0.7);
    bgMenu.fillRect(300, this.height-this.menuSize, this.width-300, this.menuSize);

    // Background Factory
    var bgFactory = this.add.graphics();
    bgFactory.fillStyle(0x222222, 1);
    bgFactory.fillRect(0, this.height-this.menuSize, 300, this.menuSize);

    // Afficher le menu en bas
    this.loadMainMenu();
    this.loadFactoryMenu();
    console.log("UI loaded!");
  }

  loadFactoryMenu(){
    var container = this.add.container(0, this.height-this.menuSize);

    /*var progressBar1 = this.add.graphics();
    var progressBox1 = this.add.graphics();
    progressBox1.fillStyle(0xC5C5C5, 0.8);
    progressBox1.fillRect(55, 10, 20, 60);
    var percentText1 = this.make.text({
      x: 75,
      y: 65,
      text: '0%',
      style: {
        font: '8px monospace',
        fill: '#ffffff'
      }
    });
    percentText1.setOrigin(0.5, 0.5);
    container.add(progressBar1);
    container.add(progressBox1);
    container.add(percentText1);*/

    // Details Button
    var factoryButton = this.add.text(150, 90, 'Détails de l\'Usine', { fill: '#0f0' }).setInteractive().setOrigin(0.5, 0.5).on('pointerdown', () => {
      this.loadFactoryDetails();
    });
    container.add(factoryButton);

  }

  loadFactoryDetails(){
    if(this.level.selectedObject < 0 && this.level.selectedType == 'none'){
      this.level.selectedObject = -3;
      if(this.container != null)
        this.container.destroy();
      this.container = this.showInformationsMenu();

      // Show name
      var name = this.make.text({
        x: this.width -100,
        y: 20,
        text: 'Détails de l\'Usine',
        style: {
          font: '14px monospace',
          fill: '#ffffff',
          wordWrap: { width: 180 }
        }
      });
      name.setOrigin(0.5, 0.5);
      this.container.add(name);

      // Show Level
      var gain = this.make.text({
        x: this.width - 190,
        y: 65,
        text: 'Gain: ' + (this.level.money.addMoneyAmount*30) + '€ / mois',
        style: {
          font: '12px monospace',
          fill: '#ffffff',
          wordWrap: { width: 200 }
        }
      });
      this.container.add(gain);

      // Show Level
      var gain = this.make.text({
        x: this.width - 190,
        y: 40,
        text: 'Ile: ' + this.level.levels.start.world,
        style: {
          font: '16px monospace',
          fill: '#ffffff',
          wordWrap: { width: 200 }
        }
      });
      this.container.add(gain);
    }
  }

  loadMainMenu(){
    this.level.selectedType = 'none';
    var container = this.add.container(300, this.height-this.menuSize);
    container.width = 500;
    var machinesButton = this.add.text(200, 50, 'Machines', { fill: '#0f0' }).setInteractive().setOrigin(0.5, 0.5);;
    container.add(machinesButton);
    var environmentButton = this.add.text(300, 50, 'Environment', { fill: '#0f0' }).setInteractive().setOrigin(0.5, 0.5);;
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
    var container = this.add.container(300, this.height-100);
    container.width = 500;
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
        }).on('pointerover', () => {
          this.loadPreviewObjectStats(element, machine.x, machine.y);
        }).on('pointerout', () => {
          if(this.previewObjectStats != null){
              this.previewObjectStats.destroy();
          }
        });
      }
      else{
        var obj = this.add.image(x, y, element.upgrades[0].texture).setInteractive().on('pointerdown', () => {
          this.level.selectedObject = Object.keys(this.objects['machines'])[index];
        }).on('pointerover', () => {
          this.loadPreviewObjectStats(element, machine.x, machine.y);
        }).on('pointerout', () => {
          if(this.previewObjectStats != null){
              this.previewObjectStats.destroy();
          }
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
    var container = this.add.container(300, this.height-100);
    container.width = 500;
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
        }).on('pointerover', () => {
          this.loadPreviewObjectStats(element, obj.x, obj.y);
        }).on('pointerout', () => {
          if(this.previewObjectStats != null){
              this.previewObjectStats.destroy();
          }
        });
      }
      else{
        var obj = this.add.image(x, y, element.upgrades[0].texture).setInteractive().on('pointerdown', () => {
          this.level.selectedObject = Object.keys(this.objects['environment'])[index];
        }).on('pointerover', () => {
          this.loadPreviewObjectStats(element, obj.x, obj.y);
        }).on('pointerout', () => {
          if(this.previewObjectStats != null){
              this.previewObjectStats.destroy();
          }
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

  loadPreviewObjectStats(obj, x, y){
    if(this.previewObjectStats != null){
        this.previewObjectStats.destroy();
    }
    this.previewObjectStats = this.add.container(300+x-40, this.height-100+y-75);
    this.previewObjectStats.width = 80;
    this.previewObjectStats.height = 55;
    var bgMenu = this.add.graphics();
    bgMenu.fillStyle(0x222222, 1);
    bgMenu.fillRect(0, 0, 80, 55);
    this.previewObjectStats.add(bgMenu);

    // Show name
    var name = this.make.text({
      x: 40,
      y: 10,
      text: obj.name,
      style: {
        font: '10px monospace',
        fill: '#ffffff',
        wordWrap: { width: 75 }
      }
    });
    name.setOrigin(0.5, 0.5);
    this.previewObjectStats.add(name);

    // Show gain
    if(this.level.selectedType == 'machines'){
      // Show Level
      var level = this.make.text({
        x: 5,
        y: 25,
        text: (obj.upgrades[0].gain*30) + '€ / mois',
        style: {
          font: '10px monospace',
          fill: '#ffffff',
          wordWrap: { width: 75 }
        }
      });
      this.previewObjectStats.add(level);
    }

    // Show cost
    var color = '#0f0';
    if(!this.level.money.checkPriceSelected(obj.upgrades[0].cost))
      color = '#e9431b';
    var cost = this.make.text({
      x: 40,
      y: 45,
      text: obj.upgrades[0].cost + " $",
      style: {
        font: '12px monospace',
        fill: color,
        wordWrap: { width: 75 }
      }
    });

    cost.setOrigin(0.5, 0.5);
    this.previewObjectStats.add(cost);
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

      if(object.type == 'machines'){
        // Show Level
        var level = this.make.text({
          x: this.width - 190,
          y: 65,
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

      var upgrade = this.add.text(this.width - 190, 280, cost, { fill: color, wordWrap: { width: 180 } }).setFontSize(12).setInteractive().on('pointerdown', () =>
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

      var sell = this.add.text(this.width - 190, 320, 'Vendre pour ' + object.stats.upgrades[object.level-1].cost/2, { wordWrap: { width: 180 } }).setFontSize(12).setInteractive().on('pointerdown', () =>
      {
        this.level.level.removeObject(object);
        if(this.container != null)
          this.container.destroy();
      });
      this.container.add(sell);
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
