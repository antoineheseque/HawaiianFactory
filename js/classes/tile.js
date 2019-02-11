class Tile{
  constructor(type, stats, x, y, level){
    this.type = type;
    this.stats = stats;
    if(this.type == 'ground')
      this.image = level.phaser.add.image(32*x, 32*y, 'tile' + stats.name).setOrigin(0, 0);
    else if(this.type == 'environment')
      this.image = level.phaser.add.image(32*x, 32*y, stats.upgrades[0].texture).setOrigin(0, 0);
  }
}
