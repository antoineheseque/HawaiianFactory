class Tile{
  constructor(type, name, x, y, level){
    this.type = type;
    this.name = name;
    if(this.type == 'ground')
      this.image = level.phaser.add.image(32*x, 32*y, 'tile' + name).setOrigin(0, 0);
    else if(this.type == 'environment')
      this.image = level.phaser.add.image(32*x, 32*y, name).setOrigin(0, 0);
  }
}
