class Machine extends Tile{

  constructor(type, name, x, y, level){
    super();
    this.level = 1;
    this.phaser = level;

    level.phaser.add.sprite(x, y, name).play('activated').setOrigin(0, 0);
  }
}
