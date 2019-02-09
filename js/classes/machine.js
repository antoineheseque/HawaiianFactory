class Machine{

  constructor(id, x, y, phaser){
    this.level = 1;
    this.phaser = phaser;

    phaser.phaser.add.sprite(x, y, id).play('activated').setOrigin(0, 0);;
  }
}
