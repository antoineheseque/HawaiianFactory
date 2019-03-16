class Machine extends Tile{

  constructor(type, stats, x, y, level){
    super();
    this.stats = stats;
    this.type = type;
    this.level = 1;
    this.phaser = level;

    this.x = x;
    this.y = y;
    this.createTile();
  }

  createTile(){
    if(this.stats.upgrades[this.level-1].frames > 1)
      this.image = this.phaser.phaser.add.sprite(this.x*32, this.y*32, this.stats.upgrades[this.level-1].texture + '-1').play(this.stats.upgrades[this.level-1].texture).setOrigin(0, 0).setInteractive().on('pointerdown', () => {
        this.phaser.phaser.UI.getInformations(this);
      });
    else
      this.image = this.phaser.phaser.add.image(this.x*32, this.y*32, this.stats.upgrades[this.level-1].texture).setOrigin(0, 0).setInteractive().on('pointerdown', () => {
        this.phaser.phaser.UI.getInformations(this);
      });
  }

  upgrade(){
    this.level++;
    this.image.destroy();
    this.createTile();
  }
}
