class Environment extends Tile{

  constructor(type, stats, x, y, level){
    super();
    this.stats = stats;
    this.type = type;
    this.level = 1;
    this.phaser = level;

    this.x = x;
    this.y = y;
    if(stats.upgrades[0].frames > 1)
      level.phaser.add.sprite(x*32, y*32, stats.upgrades[0].texture + '-1').play(stats.upgrades[0].texture).setOrigin(0, 0);
    else
      level.phaser.add.image(x*32, y*32, stats.upgrades[0].texture).setOrigin(0, 0);
  }
}
