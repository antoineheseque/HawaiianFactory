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
    bgMenu.fillRect(500, this.height-this.menuSize, this.width-500, this.menuSize);

    // Background Factory
    var bgFactory = this.add.graphics();
    bgFactory.fillStyle(0x222222, 1);
    bgFactory.fillRect(0, this.height-this.menuSize, 500, this.menuSize);

    // Afficher le menu en bas
    this.loadMainMenu();
    this.loadFactoryMenu();
    console.log("UI loaded!");
  }

  loadFactoryMenu(){
    var container = this.add.container(0, this.height-this.menuSize);

    // Details Button
    var factoryButton = this.add.text(250, 90, 'Détails de l\'Usine', { fill: '#0f0' }).setFontSize(20).setFontStyle('bold').setInteractive().setOrigin(0.5, 0.5).on('pointerdown', () => {
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
        x: this.width - 130,
        y: 20,
        text: 'Détails de l\'Usine',
        style: {
          font: '16px monospace',
          fill: '#ffffff',
          wordWrap: { width: 240 }
        }
      });
      name.setOrigin(0.5, 0.5);
      this.container.add(name);

      var ile = this.make.text({
        x: this.width - 250,
        y: 40,
        text: 'L\'Usine est située à ' + this.level.worlds[this.level.worldIndex].name,
        style: {
          font: '15px monospace',
          fill: '#ffffff',
          wordWrap: { width: 240 }
        }
      });
      this.container.add(ile);

      var info = this.make.text({
        x: this.width - 250,
        y: 70,
        text: 'Pour chaque mois:',
        style: {
          font: '15px monospace',
          fill: '#ffffff',
          wordWrap: { width: 240 }
        }
      });
      this.container.add(info);

      // Show gain
      var gain = this.make.text({
        x: this.width - 250,
        y: 95,
        text: '+     Production:',
        style: {
          font: '15px monospace',
          fill: '#ffffff',
          wordWrap: { width: 220 }
        }
      });
      this.container.add(gain);

      var gain = this.make.text({
        x: this.width,
        y: 95,
        text: this.level.money.addMoneyAmount*30 + '€ ',
        style: {
          font: '20px monospace',
          fill: '#ffffff',
          wordWrap: { width: 50 }
        }
      });
      gain.setOrigin(1, 0.2);
      this.container.add(gain);

      var productivity = this.make.text({
        x: this.width - 250,
        y: 115,
        text: 'x Multiplicateur:',
        style: {
          font: '15px monospace',
          fill: '#ffffff',
          wordWrap: { width: 240 }
        }
      });
      this.container.add(productivity);

      var productivity2 = this.make.text({
        x: this.width,
        y: 115,
        text: this.level.game.productivity + 'x ',
        style: {
          font: '20px monospace',
          fill: '#ffffff',
          wordWrap: { width: 50 }
        }
      });
      productivity2.setOrigin(1, 0.2);
      this.container.add(productivity2);

      // Show gain
      var taxes = this.make.text({
        x: this.width - 250,
        y: 135,
        text: '-         Taxes :',
        style: {
          font: '15px monospace',
          fill: '#ffffff',
          wordWrap: { width: 240 }
        }
      });
      this.container.add(taxes);

      var taxes2 = this.make.text({
        x: this.width,
        y: 135,
        text: this.level.game.taxes + '€ ',
        style: {
          font: '20px monospace',
          fill: '#ffffff',
          wordWrap: { width: 50 }
        }
      });
      taxes2.setOrigin(1, 0.2);
      this.container.add(taxes2);

      var loyer = this.make.text({
        x: this.width - 250,
        y: 155,
        text: '-         Loyer : ',
        style: {
          font: '15px monospace',
          fill: '#ffffff',
          wordWrap: { width: 240 }
        }
      });
      this.container.add(loyer);

      var loyer2 = this.make.text({
        x: this.width,
        y: 155,
        text: this.level.game.loyer + '€ ',
        style: {
          font: '20px monospace',
          fill: '#ffffff',
          wordWrap: { width: 50 }
        }
      });
      loyer2.setOrigin(1, 0.2);
      this.container.add(loyer2);

      var space = this.make.text({
        x: this.width-125,
        y: 175,
        text: '---------------------------',
        style: {
          font: '16px monospace',
          fill: '#ffffff',
          wordWrap: { width: 240 }
        }
      });
      space.setOrigin(0.5, 0.5);
      this.container.add(space);

      var total = this.make.text({
        x: this.width - 250,
        y: 185,
        text: '= Total par mois :',
        style: {
          font: '15px monospace',
          fill: '#ffffff',
          wordWrap: { width: 240 }
        }
      });
      this.container.add(total);

      var eq = this.level.money.addMoneyAmount*30*this.level.game.productivity - this.level.game.taxes - this.level.game.loyer;

      var total2 = this.make.text({
        x: this.width - 10,
        y: 185,
        text: eq + '€',
        style: {
          font: '20px monospace',
          fill: '#ffffff',
          wordWrap: { width: 150 }
        }
      });
      total2.setOrigin(1, 0.2);
      this.container.add(total2);

      var upgrade = this.add.text(this.width - 130, this.height - 130, 'Changer d\'Usine', { fill: '#0f0' }).setFontStyle('bold').setFontSize(20).setOrigin(0.5, 0.5).setInteractive().on('pointerdown', () =>
      {
        this.loadFactoryRent();
      });
      this.container.add(upgrade);
    }
  }

  loadFactoryRent(){
    if(this.level.selectedObject < 0 && this.level.selectedType == 'none'){
      this.level.selectedObject = -3;
      if(this.container != null)
        this.container.destroy();
      this.container = this.showInformationsMenu();

      var name = this.make.text({
        x: this.width -130,
        y: 20,
        text: 'Changer d\'Usine',
        style: {
          font: '16px monospace',
          fill: '#ffffff',
          wordWrap: { width: 240 }
        }
      });
      name.setOrigin(0.5, 0.5);
      this.container.add(name);

      var ile = this.make.text({
        x: this.width - 250,
        y: 50,
        text: 'L\'Usine est située à ' + this.level.worlds[this.level.worldIndex].name,
        style: {
          font: '16px monospace',
          fill: '#ffffff',
          wordWrap: { width: 240 }
        }
      });
      this.container.add(ile);

      var unlock = this.add.text(this.width - 130, this.height - 200, 'Passer au niveau suivant', { fill: '#0f0' , wordWrap: { width: 250 }}).setFontStyle('bold').setFontSize(20).setOrigin(0.5, 0.5).setInteractive().on('pointerdown', () =>
      {
        this.level.loadLevel(this.level.worldIndex+1);
      });
      this.container.add(unlock);

      var back = this.add.text(this.width - 130, this.height - 130, 'Retour', { fill: '#0f0' }).setFontSize(20).setOrigin(0.5, 0.5).setInteractive().on('pointerdown', () =>
      {
        this.loadFactoryDetails();
      });
      this.container.add(back);

      // Afficher texte avant de changer d'Usine assurez vous d'avoir de
      // l'argent pour payer le prochain loyer et les 25% de frais de changement d'usin
      if(!this.event_changerUsine){
        this.event_changerUsine = "loaded";
        this.level.chat.open('changeUsine');
      }
    }
  }

  loadMainMenu(){
    this.level.selectedType = 'none';
    var container = this.add.container(500, this.height-this.menuSize);
    container.width = 500;
    var machinesButton = this.add.text(250, 50, 'Machines', { fill: '#0f0' }).setInteractive().setFontStyle('bold').setFontSize(20).setOrigin(0.5, 0.5);
    container.add(machinesButton);
    var environmentButton = this.add.text(450, 50, 'Environment', { fill: '#0f0' }).setInteractive().setFontStyle('bold').setFontSize(20).setOrigin(0.5, 0.5);
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
    var container = this.add.container(500, this.height-100);
    container.width = 500;
    this.level.selectedType = 'machines';

    var clickButton = this.add.text(10, 40, 'Retour', { fill: '#0f0' }).setFontSize(20).setFontStyle('bold').setInteractive();
    container.add(clickButton);

    // Vérifier si un menu d'info n'est pas ouvert
    if(this.level.selectedObject == -2){
      this.level.selectedObject = -1;
      this.level.UI.container.destroy();
    }

    var x = 115;
    var y = 25;
    Object.values(this.objects['machines']).forEach(function(element, index) {
      //var el = gameUI.objects['environment'][element];

      // Si il y a une animation
      if(element.upgrades[0].frames > 1){
        var name = element.upgrades[0].texture;
        var machine = this.add.sprite(x, y, element.upgrades[0].texture + '-1').play(element.upgrades[0].texture).setScale(1.5).setInteractive().on('pointerdown', () => {
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
        var obj = this.add.image(x, y, element.upgrades[0].texture).setScale(1.5).setInteractive().on('pointerdown', () => {
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
      x += 60;
      if(x > 700){
        x = 115;
        y += 55;
      }
    }, this);

    clickButton.on('pointerdown', () => {
      this.level.selectedObject = -1;
      this.loadMainMenu();
      container.destroy();
    });

    if(!this.event_createMachine){
      this.event_createMachine = "loaded";
      this.level.chat.open('machine1');
    }
  }

  loadEnvironmentMenu(){
    var container = this.add.container(500, this.height-100);
    container.width = 500;
    this.level.selectedType = 'environment';

    var clickButton = this.add.text(10, 40, 'Retour', { fill: '#0f0' }).setFontSize(20).setFontStyle('bold').setInteractive();
    container.add(clickButton);

    // Vérifier si un menu d'info n'est pas ouvert
    if(this.level.selectedObject == -2){
      this.level.selectedObject = -1;
      this.level.UI.container.destroy();
    }

    var x = 115;
    var y = 25;

    Object.values(this.objects['environment']).forEach(function(element, index) {

      // Si il y a une animation
      if(element.upgrades[0].frames > 1){
        var name = element.upgrades[0].texture;
        var obj = this.add.sprite(x, y, element.upgrades[0].texture + '-1').setScale(1.5).play(element.upgrades[0].texture).setInteractive().on('pointerdown', () => {
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
        var obj = this.add.image(x, y, element.upgrades[0].texture).setScale(1.5).setInteractive().on('pointerdown', () => {
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
      x += 60;
      if(x > 700){
        x = 115;
        y += 50;
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
    this.previewObjectStats = this.add.container(500+x-80, this.height-100+y-150);
    this.previewObjectStats.width = 160;
    this.previewObjectStats.height = 125;
    var bgMenu = this.add.graphics();
    bgMenu.fillStyle(0x222222, 1);
    bgMenu.fillRect(0, 0, 160, 125);
    this.previewObjectStats.add(bgMenu);

    // Show name
    var name = this.make.text({
      x: 80,
      y: 20,
      text: obj.name,
      style: {
        font: '16px monospace',
        fill: '#ffffff',
        wordWrap: { width: 150 }
      }
    });
    name.setOrigin(0.5);
    this.previewObjectStats.add(name);

    // Show gain
    if(this.level.selectedType == 'machines'){
      // Show Level
      var level = this.make.text({
        x: 5,
        y: 40,
        text: (obj.upgrades[0].gain*30) + '€ / mois',
        style: {
          font: '14px monospace',
          fill: '#ffffff',
          wordWrap: { width: 150 }
        }
      });
      this.previewObjectStats.add(level);
    }

    // Show cost
    var color = '#0f0';
    if(!this.level.money.checkPriceSelected(obj.upgrades[0].cost))
      color = '#e9431b';
    var cost = this.make.text({
      x: 80,
      y: 110,
      text: obj.upgrades[0].cost + " $",
      style: {
        font: '16px monospace',
        fill: color,
        wordWrap: { width: 150 }
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
        x: this.width - 130,
        y: 20,
        text: object.stats.name,
        style: {
          font: '16px monospace',
          fill: '#ffffff',
          wordWrap: { width: 240 }
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
      var cost = '';
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
    background.fillRect(this.width - 260, 0, 260, this.height-100);
    container.add(background);
    var closeButton = this.add.text(this.width - 20, 10, 'X', { fill: '#0f0' }).setFontSize(20).setInteractive().on('pointerdown', () => { container.destroy(); this.level.selectedObject = -1;});
    container.add(closeButton);

    return container;
  }
}
