class GameUI extends Phaser.Scene {

  constructor ()
  {
    super({ key: 'gameUI' });
    this.menuSize = 100;
  }

  init(level){
    this.level = level;
    this.level.UI = this;

    this.showTutorial = this.level.showTutorial;
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
    bgMenu.fillRect(500/(800/this.height), this.height-this.menuSize, this.width-500/(800/this.height), this.menuSize);

    // Background Factory
    var bgFactory = this.add.graphics();
    bgFactory.fillStyle(0x222222, 1);
    bgFactory.fillRect(0, this.height-this.menuSize, 500/(800/this.height), this.menuSize);

    // Afficher le menu en bas
    this.loadMainMenu();
    this.loadFactoryMenu();
    console.log("UI loaded!");
  }

  loadFactoryMenu(){
    var container = this.add.container(0, this.height-this.menuSize);

    // Details Button
    var factoryButton = this.add.text(250/(800/this.height), 90, 'Détails de l\'Usine', { fill: '#0f0' }).setFontSize(20).setFontStyle('bold').setInteractive().setOrigin(0.5, 0.5).on('pointerdown', () => {
      // Si un menu machines ou environment est ouvert alors on le ferme
      if(this.level.selectedObject > 0)
        this.loadMainMenu();

      this.loadFactoryDetails();
      this.level.mouseInteraction.refresh();
    });
    container.add(factoryButton);
  }

  loadFactoryDetails(){
    //if(this.level.selectedObject < 0){
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
        text: this.level.game.money.addMoneyAmount*30 + '$ ',
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
        text: this.level.game.productivity.toFixed(2) + 'x ',
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
        text: this.level.game.taxes + '$ ',
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
        text: this.level.game.loyer + '$ ',
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

      var eq = this.level.game.money.addMoneyAmount*30*this.level.game.productivity - this.level.game.taxes - this.level.game.loyer;

      var total2 = this.make.text({
        x: this.width - 10,
        y: 185,
        text: eq.toFixed(2) + '$',
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
    //}
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
          font: '15px monospace',
          fill: '#ffffff'
        }
      });
      this.container.add(ile);

      var loyer = this.make.text({
        x: this.width - 250,
        y: 75,
        text: 'Loyer Actuel: ',
        style: {
          font: '18px monospace',
          fill: '#ffffff',
          wordWrap: { width: 240 }
        }
      });
      this.container.add(loyer);

      var loyer2 = this.make.text({
        x: this.width,
        y: 75,
        text: this.level.worlds[this.level.worldIndex].rent + '$ ',
        style: {
          font: '20px monospace',
          fill: '#ffffff',
          wordWrap: { width: 50 }
        }
      });
      loyer2.setOrigin(1, 0.1);
      this.container.add(loyer2);

      if(this.level.worldIndex+1 < this.level.worlds.length){
        var loyer = this.make.text({
          x: this.width - 250,
          y: 100,
          text: 'Prochain loyer : ',
          style: {
            font: '18px monospace',
            fill: '#ffffff',
            wordWrap: { width: 240 }
          }
        });
        this.container.add(loyer);

        var loyer2 = this.make.text({
          x: this.width,
          y: 100,
          text: this.level.worlds[this.level.worldIndex+1].rent + '$ ',
          style: {
            font: '20px monospace',
            fill: '#ffffff',
            wordWrap: { width: 50 }
          }
        });
        loyer2.setOrigin(1, 0.1);
        this.container.add(loyer2);

        var unlock = this.add.text(this.width - 130, this.height - 200, 'Passer au niveau suivant', { fill: '#0f0' , wordWrap: { width: 250 }}).setFontStyle('bold').setFontSize(20).setOrigin(0.5, 0.5).setInteractive().on('pointerdown', () =>
        {
          this.level.loadLevel(this.level.worldIndex+1);
          this.level.selectedObject = -1;
          if(this.container != null)
            this.container.destroy();
        });
        this.container.add(unlock);
      }
      else{
        var unlock = this.add.text(this.width - 130, this.height - 200, 'Dernier niveau atteint', { fill: '#ffffff' , wordWrap: { width: 250 }}).setFontStyle('bold').setFontSize(20).setOrigin(0.5, 0.5)
        this.container.add(unlock);
      }

      var back = this.add.text(this.width - 130, this.height - 130, 'Retour', { fill: '#0f0' }).setFontSize(20).setOrigin(0.5, 0.5).setInteractive().on('pointerdown', () =>
      {
        this.loadFactoryDetails();
      });
      this.container.add(back);

      // Afficher texte avant de changer d'Usine assurez vous d'avoir de
      // l'argent pour payer le prochain loyer et les 25% de frais de changement d'usin
      if(this.showTutorial && !this.event_changerUsine){
        this.event_changerUsine = "loaded";
        this.level.game.chat.open('changeUsine');
      }
    }
  }

  loadMainMenu(){
    if(this.previewObjectStats != null){
        this.previewObjectStats.destroy();
    }
    this.level.selectedType = 'none';
    this.level.mouseInteraction.refresh();
    var container = this.add.container(500/(800/this.height), this.height-this.menuSize);
    container.width = this.width-500/(800/this.height);
    var machinesButton = this.add.text(container.width/3.5, 50, 'Machines', { fill: '#0f0' }).setInteractive().setFontStyle('bold').setFontSize(20).setOrigin(0.5, 0.5);
    container.add(machinesButton);
    var environmentButton = this.add.text(container.width*2/3, 50, 'Environnement & Social', { fill: '#0f0' }).setInteractive().setFontStyle('bold').setFontSize(20).setOrigin(0.5, 0.5);
    container.add(environmentButton);

    if(this.selected != null){
      this.selected.destroy();
    }

    machinesButton.on('pointerdown', () => {
      container.destroy();
      this.loadMachinesMenu();
    });
    environmentButton.on('pointerdown', () => {
      container.destroy();
      this.loadEnvironmentMenu();
    });
  }

  loadMachinesMenu(){
    var container = this.add.container(500/(800/this.height), this.height-100);
    container.width = 500/(800/this.height);
    this.level.selectedType = 'machines';

    var clickButton = this.add.text(10, 40, 'Retour', { fill: '#0f0' }).setFontSize(20).setFontStyle('bold').setInteractive();
    container.add(clickButton);

    // Vérifier si un menu d'info n'est pas ouvert
    if(this.level.selectedObject < -1){
      this.level.selectedObject = -1;
      this.level.game.chat.show_small();
      this.level.UI.container.destroy();
    }

    var x = 115;
    var y = 25;
    Object.values(this.objects['machines']).forEach(function(element, index) {
      // Si il y a une animation
      if(element.upgrades[0].frames > 1){
        var name = element.upgrades[0].texture;
        var machine = this.add.sprite(x, y, element.upgrades[0].texture + '-1').play(element.upgrades[0].texture).setScale(1.5).setInteractive().on('pointerdown', () => {
          this.level.selectedObject = Object.keys(this.objects['machines'])[index];
          if(this.selected != null)
            this.selected.destroy();
          this.loadPreviewObjectStats(element, machine.x, machine.y);
          this.selected = this.add.image(500/(800/this.height)+machine.x,this.height-100+machine.y,'gray-1').setScale(1.5);
        }).on('pointerover', () => {
          this.loadPreviewObjectStats(element, machine.x, machine.y);
        }).on('pointerout', () => {
          if(this.previewObjectStats != null){
              this.previewObjectStats.destroy();
          }
        });
      }
      else{
        var machine = this.add.image(x, y, element.upgrades[0].texture).setScale(1.5).setInteractive().on('pointerdown', () => {
          this.level.selectedObject = Object.keys(this.objects['machines'])[index];
          if(this.selected != null)
            this.selected.destroy();
          this.loadPreviewObjectStats(element, machine.x, machine.y);
          this.selected = this.add.image(500/(800/this.height)+machine.x,this.height-100+machine.y,'gray-1').setScale(1.5);
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
      if(x > this.width-500/(800/this.height)){
        x = 115;
        y += 55;
      }
    }, this);

    clickButton.on('pointerdown', () => {
      this.level.selectedObject = -1;
      this.loadMainMenu();
      container.destroy();

      if(this.showTutorial && !this.event_leaveMachine){
        this.event_leaveMachine = "loaded";
        this.level.game.chat.open('leave1');
      }
    });

    if(this.showTutorial && !this.event_createMachine){
      this.event_createMachine = "loaded";
      this.level.game.chat.open('machine1');
    }
  }

  loadEnvironmentMenu(){
    var container = this.add.container(500/(800/this.height), this.height-100);
    container.width = 500/(800/this.height);
    this.level.selectedType = 'environment';

    var clickButton = this.add.text(10, 40, 'Retour', { fill: '#0f0' }).setFontSize(20).setFontStyle('bold').setInteractive();
    container.add(clickButton);

    // Vérifier si un menu d'info n'est pas ouvert
    if(this.level.selectedObject < -1){
      this.level.selectedObject = -1;
      this.level.game.chat.show_small();
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
          if(this.selected != null)
            this.selected.destroy();
          this.loadPreviewObjectStats(element, obj.x, obj.y);
          this.selected = this.add.image(500/(800/this.height)+obj.x,this.height-100+obj.y,'gray-1').setScale(1.5);
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
          if(this.selected != null)
            this.selected.destroy();
          this.loadPreviewObjectStats(element, obj.x, obj.y);
          this.selected = this.add.image(500/(800/this.height)+obj.x,this.height-100+obj.y,'gray-1').setScale(1.5);
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
      if(x > this.width-500/(800/this.height)){
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
    if(500/(800/this.height)+x+80 > this.level.width)
      x-=40;
    this.previewObjectStats = this.add.container(500/(800/this.height)+x-90, this.height-100+y-150);
    this.previewObjectStats.width = 180;
    this.previewObjectStats.height = 125;
    var bgMenu = this.add.graphics();
    bgMenu.fillStyle(0x222222, 1);
    bgMenu.fillRect(0, 0, 180, 125);
    this.previewObjectStats.add(bgMenu);

    // Show name
    var font = '16px monospace';
    if(obj.name.length > 23)
      font = '14px monospace';
    var name = this.make.text({
      x: 90,
      y: 20,
      text: obj.name,
      style: {
        font: font,
        fill: '#ffffff',
        wordWrap: { width: 176 }
      }
    });
    name.setOrigin(0.5);
    this.previewObjectStats.add(name);

    // Show Emplacement
    var empl = this.level.selectedType == 'machines' ? 'Usine' : 'Extérieur';
    if(obj.special){
      if(obj.special == 'sea')
        empl = 'Mer';
      if(obj.special == 'inside')
        empl = 'Usine';
        if(obj.special == 'dirt')
          empl = 'Extérieur';
    }

    var emplacement = this.make.text({
      x: 5,
      y: 40,
      text: 'Emplacement: ' + empl,
      style: {
        font: '14px monospace',
        fill: '#ffffff',
        wordWrap: { width: 180 }
      }
    });
    this.previewObjectStats.add(emplacement);

    if(this.level.selectedType == 'machines'){
      // Show Level
      var level = this.make.text({
        x: 5,
        y: 60,
        text: (obj.upgrades[0].gain*30) + '$ / mois',
        style: {
          font: '14px monospace',
          fill: '#ffffff',
          wordWrap: { width: 150 }
        }
      });
      this.previewObjectStats.add(level);
    }

    var stat1 = this.make.text({
      x: 10,
      y: 80,
      text: (obj.stats.environment > 0 ? '+' : '') + obj.stats.environment,
      style: {
        font: '18px monospace',
        fill: '#0FDD43',
        wordWrap: { width: 60 }
      }
    });
    this.previewObjectStats.add(stat1);

    var stat2 = this.make.text({
      x: 65,
      y: 80,
      text: (obj.stats.tech > 0 ? '+' : '') + obj.stats.tech,
      style: {
        font: '18px monospace',
        fill: '#0F73DD',
        wordWrap: { width: 60 }
      }
    });
    this.previewObjectStats.add(stat2);

    var stat3 = this.make.text({
      x: 120,
      y: 80,
      text: (obj.stats.social > 0 ? '+' : '') + obj.stats.social,
      style: {
        font: '18px monospace',
        fill: '#E5FF50',
        wordWrap: { width: 60 }
      }
    });
    this.previewObjectStats.add(stat3);

    // Show cost
    var color = '#0f0';
    if(!this.level.game.money.checkPriceSelected(obj.upgrades[0].cost))
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
        x: this.width - 130,
        y: 40,
        text: 'Niveau ' + object.level,
        style: {
          font: '16px monospace',
          fill: '#ffffff',
          wordWrap: { width: 250 }
        }
      });
      level.setOrigin(0.5, 0.5);
      this.container.add(level);

      var rotate = this.add.text(this.width - 250, 65, 'Tourner l\'objet de 90°', { fill: '#0f0', wordWrap: { width: 240 } }).setFontSize(18).setInteractive().on('pointerdown', () =>
      {
         object.image.setAngle(object.image.angle + 90);
      });
      this.container.add(rotate);
      //////////////////////////////////////////////////////////////////////////////////////////////////

      if(object.type == 'machines'){
        // Show Level
        var level = this.make.text({
          x: this.width - 250,
          y: 100,
          text: 'Gain: ' + (object.stats.upgrades[object.level-1].gain*30) + '$ / mois',
          style: {
            font: '16px monospace',
            fill: '#ffffff',
            wordWrap: { width: 240 }
          }
        });
        this.container.add(level);
      }

      // Show Button upgrade
      var cost = '';
      if(object.stats.upgrades.length > object.level){
        var price = object.stats.upgrades[object.level].cost;
        cost = 'Augmenter au niveau ' + (object.level+1) + ' pour ' + price + ' $';
      }
      else{
        cost = "Niveau MAX atteint!";
      }
      var color = '#0f0';
      if(!this.level.game.money.checkPriceSelected(price) || cost == "Niveau MAX atteint!")
        color = '#e9431b';

      var upgrade = this.add.text(this.width - 250, this.height - 190, cost, { fill: color, wordWrap: { width: 240 } }).setFontSize(18).setInteractive().on('pointerdown', () =>
      {
        if(object.stats.upgrades.length > object.level){
          var price = object.stats.upgrades[object.level].cost;
          // Vérifier si on peut acheter et augmenter d'un niveau.
          if(this.level.game.money.buy(price)){
            object.upgrade();
            this.getInformations(object);
          }
        }
      });
      this.container.add(upgrade);

      var sell = this.add.text(this.width - 250, this.height-140, 'Vendre pour ' + object.stats.upgrades[object.level-1].cost/2, { wordWrap: { width: 240 } }).setFontSize(18).setInteractive().on('pointerdown', () =>
      {
        this.level.level.removeObject(object);
        if(this.container != null)
          this.container.destroy();
      });
      this.container.add(sell);
    }

    if(this.showTutorial && !this.event_stats){
      this.event_stats = "loaded";
      this.level.game.chat.open('stats1');
    }
  }

  showInformationsMenu(){
    var container = this.add.container(0, 0);

    // Cacher la petite console
    this.level.game.chat.hide_small();

    // Add Background
    var background = this.add.graphics();
    background.fillStyle(0x222222, 0.6);
    background.fillRect(this.width - 260, 0, 260, this.height-100);
    container.add(background);
    var closeButton = this.add.text(this.width - 20, 10, 'X', { fill: '#0f0' }).setFontSize(20).setInteractive().on('pointerdown', () => {
      container.destroy();
      this.level.selectedObject = -1;
      this.level.game.chat.show_small();
    });
    container.add(closeButton);

    return container;
  }
}
