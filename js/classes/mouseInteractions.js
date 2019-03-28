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

  update(x,y){
    // Si on est dans la zone de jeu et non dans le menu en bas
    // ET si les coordonnées ont été changées par rapport a la frame d'avant
    if(x < this.level.level.maxWidth && y < this.level.level.maxHeight){
      if((this.oldX != x || this.oldY != y)){
        // Si il y a déjà une image
        if(this.image != null){
          this.image.destroy();
        }
        if(this.image2 != null){
          this.image2.destroy();
        }

        if(this.level.selectedObject < 0){
          this.image = this.level.add.image(x*32, y*32, 'gray').setOrigin(0, 0).setAlpha(0.5);
        }
        else { // Si on a un objet

          var stats = this.objects[this.level.selectedType][this.level.selectedObject];
          var image = stats.upgrades[0].frames > 1 ? stats.upgrades[0].texture + '-1' : stats.upgrades[0].texture;

          if(this.level.level.objects[y][x] == null){
            // 13 = GROUND ID
            if(this.level.level.background[y][x].stats.name == 13 &&
              (this.level.selectedType == 'machines' || (this.level.selectedType == 'environment' && stats.isInside)))
            {

              this.image = this.level.add.image(x*32, y*32, 'gray').setOrigin(0, 0).setAlpha(0.5);
              this.image.setInteractive().on('pointerdown', () => {
                this.level.level.addObject(this.level.selectedType, stats, x, y);
              });
            }
            else if(this.level.level.background[y][x].stats.name == 1 && this.level.selectedType == 'environment'){
              this.image = this.level.add.image(x*32, y*32, 'gray').setOrigin(0, 0).setAlpha(0.5);
              this.image.setInteractive().on('pointerdown', () => {
                this.level.level.addObject(this.level.selectedType, stats, x, y);
              });
            }
            else {
              this.image = this.level.add.image(x*32, y*32, 'red').setOrigin(0, 0).setAlpha(0.5);
            }
          }
          else {
            this.image = this.level.add.image(x*32, y*32, 'red').setOrigin(0, 0).setAlpha(0.5);
          }
          this.image2 = this.level.add.image(x*32, y*32, image).setOrigin(0, 0);
        }

        this.oldX = x;
        this.oldY = y;
      }
    }
    else{
      if(this.image != null){
        this.image.destroy();
      }
      if(this.image2 != null){
        this.image2.destroy();
      }
    }
  }
}
