class Tile{
  constructor(id, x, y, level){
    this.id = id;
    this.position = [x, y];
    this.image = level.phaser.add.image(32*x, 32*y, 'tile' + id).setOrigin(0, 0);
  }
}
