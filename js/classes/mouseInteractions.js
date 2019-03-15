class MouseInteraction{

  constructor(level){
    this.level = level;
    this.menuSize = 100;
    this.oldX = 0;
    this.oldY = 0;
    this.height = level.cameras.main.height;
    this.width = level.cameras.main.width;
  }

  preload(){
    // Get level file
    loadJSON('../objects.json', function(response, mI) {
      mI.objects = JSON.parse(response);
    }, this);
  }

  update(){
    // Afficher en jeu la case survolée
    var sP = this.level.input.activePointer;
    var wP = this.level.cameras.main.getWorldPoint(sP.x, sP.y);
    wP.x = Phaser.Math.FloorTo(wP.x, 1, 32);
    wP.y = Phaser.Math.FloorTo(wP.y, 1, 32);

    // Si on est dans la zone de jeu et non dans le menu en bas
    // ET si les coordonnées ont été changées par rapport a la frame d'avant
    if(wP.x/32 < this.level.level.maxWidth && wP.y/32 < this.level.level.maxHeight){
      if((this.oldX != wP.x || this.oldY != wP.y) && sP.y < (this.height-this.menuSize)){
        // Si il y a déjà une image
        if(this.image != null){
          this.image.destroy();
        }
        if(this.image2 != null){
          this.image2.destroy();
        }

        if(this.level.selectedObject < 0)
          this.image = this.level.add.image(wP.x, wP.y, 'gray').setOrigin(0, 0).setAlpha(0.5);
        else { // Si on a un objet

          var stats = this.objects[this.level.selectedType][this.level.selectedObject];
          var image = stats.upgrades[0].frames > 1 ? stats.upgrades[0].texture + '-1' : stats.upgrades[0].texture;

          if(this.level.level.objects[wP.y/32][wP.x/32] == null){
            // 13 = GROUND ID
            if(this.level.level.background[wP.y/32][wP.x/32].stats.name == 13 && this.level.selectedType == 'machines'){
              this.image = this.level.add.image(wP.x, wP.y, 'gray').setOrigin(0, 0).setAlpha(0.5);
              this.image.setInteractive().on('pointerdown', () => {
                this.level.level.addObject(this.level.selectedType, stats, wP.x/32, wP.y/32);
              });
            }
            else if(this.level.level.background[wP.y/32][wP.x/32].stats.name == 1 && this.level.selectedType == 'environment'){
              this.image = this.level.add.image(wP.x, wP.y, 'gray').setOrigin(0, 0).setAlpha(0.5);
              this.image.setInteractive().on('pointerdown', () => {
                this.level.level.addObject(this.level.selectedType, stats, wP.x/32, wP.y/32);
              });
            }
            else {
              this.image = this.level.add.image(wP.x, wP.y, 'red').setOrigin(0, 0).setAlpha(0.5);
            }
          }
          else {
            this.image = this.level.add.image(wP.x, wP.y, 'red').setOrigin(0, 0).setAlpha(0.5);
          }
          this.image2 = this.level.add.image(wP.x, wP.y, image).setOrigin(0, 0);
        }

        this.oldX = wP.x;
        this.oldY = wP.y;
      }
    }
  }

  getInformations(object){
    if(this.level.selectedObject < 0){
      this.level.selectedObject = -2;
      if(this.container != null)
        this.container.destroy();
      this.container = this.showInformationsMenu();

      var name = this.level.make.text({
        x: this.width -100,
        y: 15,
        text: object.stats.name,
        style: {
          font: '14px monospace',
          fill: '#ffffff'
        }
      });
      name.setOrigin(0.5, 0.5);
      this.container.add(name);

      var cost = 'Augmenter au niveau 2 pour 0 $';
      if(object.stats.upgrades.length > object.level){
        var price = object.stats.upgrades[object.level].cost;
        cost = 'Augmenter au niveau ' + (object.level+1) + ' pour ' + price + ' $';
      }
      else{
        cost = "Niveau MAX atteint!";
      }
      var color = '#0f0';
      if(!this.level.money.checkPriceSelected(price) || cost == "Niveau MAX atteint!")
        color = '#e9431b';
      var upgrade = this.level.add.text(this.width - 200, 50, cost, { fill: color }).setInteractive().on('pointerdown', () =>
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
    var container = this.level.add.container(0, 0);

    // Add Background
    var background = this.level.add.graphics();
    background.fillStyle(0x222222, 0.6);
    background.fillRect(this.width - 200, 0, 200, this.height-100);
    container.add(background);
    var closeButton = this.level.add.text(this.width - 20, 10, 'X', { fill: '#0f0' }).setInteractive().on('pointerdown', () => { container.destroy(); this.level.selectedObject = -1;});
    container.add(closeButton);

    return container;
  }
}
