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

        if(this.level.selectedObject < 0){
          this.image = this.level.add.image(wP.x, wP.y, 'gray').setOrigin(0, 0).setAlpha(0.5);
        }
        else { // Si on a un objet

          var stats = this.objects[this.level.selectedType][this.level.selectedObject];
          var image = stats.upgrades[0].frames > 1 ? stats.upgrades[0].texture + '-1' : stats.upgrades[0].texture;

          if(this.level.level.objects[wP.y/32][wP.x/32] == null){
            // 13 = GROUND ID
            if(this.level.level.background[wP.y/32][wP.x/32].stats.name == 13 &&
              (this.level.selectedType == 'machines' || (this.level.selectedType == 'environment' && stats.isInside)))
            {

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
}
