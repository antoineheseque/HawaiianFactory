class Machine extends Tile{

  constructor(type, stats, x, y, level){
    super();
    this.stats = stats;
    this.type = type;
    this.level = 1;
    this.phaser = level;

    this.x = x;
    this.y = y;
    level.phaser.add.sprite(x*32, y*32, stats.upgrades[0].texture).play('activated').setOrigin(0, 0);
  }
}
