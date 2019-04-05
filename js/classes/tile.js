class Tile{
  constructor(type, stats, x, y, level){
    this.type = type;
    this.stats = stats;
    this.x = x;
    this.y = y;
    if(this.type == 'ground'){
      this.image = level.phaser.add.image(32*x, 32*y, 'tile' + stats.name).setOrigin(0, 0).setInteractive().on('pointerover', () => {
        level.phaser.mouseInteraction.update(x,y);
      }).on('pointerdown', () => {
        level.phaser.mouseInteraction.update(x,y);
        if(level.phaser.selectedObject < -1){
          level.phaser.UI.container.destroy();
          level.phaser.selectedObject = -1;
        }
      });
    }
  }
}
