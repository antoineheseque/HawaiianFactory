class Tile{
  constructor(type, stats, x, y, map){
    this.type = type;
    this.stats = stats;
    this.x = x;
    this.y = y;
    if(this.type == 'ground'){
      this.image = map.level.add.image(32*x, 32*y, 'tile' + stats.name).setOrigin(0, 0).setInteractive().on('pointerover', () => {
        map.level.mouseInteraction.update(x,y);
      }).on('pointerdown', () => {
        map.level.mouseInteraction.update(x,y);
        if(map.level.selectedObject < -1){
          map.level.UI.container.destroy();
          map.level.selectedObject = -1;
          map.level.game.chat.show_small();
        }
      });
    }
  }
}
