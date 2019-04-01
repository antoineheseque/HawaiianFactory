class Machine extends Tile{

  constructor(type, stats, x, y, level){
    super();
    this.stats = stats;
    this.type = type;
    this.level = 1;
    this.productivity = 1;
    this.phaser = level;

    this.x = x;
    this.y = y;
    this.createTile();
    
  }

  createTile(){
    this.phaser.phaser.money.addMoneyEachDay(this.stats.upgrades[this.level-1].gain);
    if(this.stats.upgrades[this.level-1].frames > 1)
      this.image = this.phaser.phaser.add.sprite(this.x*32, this.y*32, this.stats.upgrades[this.level-1].texture + '-1').play(this.stats.upgrades[this.level-1].texture).setOrigin(0, 0).setInteractive().on('pointerdown', () => {
        this.phaser.phaser.UI.getInformations(this);
      }).on('pointerover', () => {
        this.phaser.phaser.mouseInteraction.update(this.x,this.y);
      });
    else
      this.image = this.phaser.phaser.add.image(this.x*32, this.y*32, this.stats.upgrades[this.level-1].texture).setOrigin(0, 0).setInteractive().on('pointerdown', () => {
        this.phaser.phaser.UI.getInformations(this);
      }).on('pointerover', () => {
        this.phaser.phaser.mouseInteraction.update(this.x,this.y);
      });
  }

  addProductivity(pdt){
    this.productivity += pdt;
  }

  removeProductivity(pdt){
    this.productivity -= pdt;
  }

  upgrade(){
    this.phaser.phaser.money.removeMoneyEachDay(this.stats.upgrades[this.level-1].gain);
    this.level++;
    this.image.destroy();
    this.createTile();
  }
}
