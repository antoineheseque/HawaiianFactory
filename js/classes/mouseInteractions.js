class MouseInteraction{

  constructor(level){
    this.level = level;
    this.menuSize = 100;
    this.height = level.cameras.main.height;
    this.width = level.cameras.main.width;

    this.pointerX = 0;
    this.pointerY = 0;
  }

  preload(){
    // Get level file
    loadJSON('../objects.json', function(response, mI) {
      mI.objects = JSON.parse(response);
    }, this);
  }

  refresh(){
    this.update(this.pointerX, this.pointerY);
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
          this.image = this.level.add.sprite(x*32, y*32, 'gray-1').play('gray').setOrigin(0, 0).setAlpha(0.5);
        }
        else { // Si on a un objet

          var stats = this.objects[this.level.selectedType][this.level.selectedObject];
          var image = stats.upgrades[0].frames > 1 ? stats.upgrades[0].texture + '-1' : stats.upgrades[0].texture;

          if(this.level.level.objects[y][x] == null && this.checkConditions(this.level.selectedType, stats, x, y)){
              this.image = this.level.add.sprite(x*32, y*32, 'gray-1').play('gray').setOrigin(0, 0).setAlpha(0.5);
              this.image.setInteractive().on('pointerdown', () => {
                this.level.level.addObject(this.level.selectedType, stats, x, y);
              });
          }
          else {
            this.image = this.level.add.sprite(x*32, y*32, 'red-1').play('red').setOrigin(0, 0).setAlpha(0.5);
          }
          this.image2 = this.level.add.image(x*32, y*32, image).setOrigin(0, 0);
        }

        this.pointerX = x;
        this.pointerY = y;
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

  checkConditions(type, stats, x, y){
    if(type == 'machines'){
      if (this.level.level.background[y][x].stats.name == 14 && stats.special == 'sea') // Si dans la mer
        return true;
      else if(this.level.level.background[y][x].stats.name == 1 && stats.special == 'dirt') // Si sur terre
        return true;
      else if (this.level.level.background[y][x].stats.name == 13 && !stats.special)
        return true;
    }
    else if(type == 'environment'){
      if (this.level.level.background[y][x].stats.name == 13 && stats.special == 'inside') // Si dans la mer
        return true;
      else if (this.level.level.background[y][x].stats.name == 1 && !stats.special)
        return true;
    }
    return false;
  }
}
