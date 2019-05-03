class Machine extends Tile{

  constructor(type, stats, x, y, map){
    super();
    this.stats = stats;
    this.type = type;
    this.level = 1;
    this.productivity = 1;
    this.map = map;

    this.x = x;
    this.y = y;
    this.createTile();

  }

  createTile(){
    this.map.level.game.money.addMoneyEachDay(this.stats.upgrades[this.level-1].gain);
    if(this.stats.upgrades[this.level-1].frames > 1)
      this.image = this.map.level.add.sprite(this.x*32+16, this.y*32+16, this.stats.upgrades[this.level-1].texture + '-1').play(this.stats.upgrades[this.level-1].texture).setOrigin(0.5, 0.5).setInteractive().on('pointerdown', () => {
        this.map.level.UI.getInformations(this);
        this.map.level.mouseInteraction.update(this.x,this.y);
      }).on('pointerover', () => {
        this.map.level.mouseInteraction.update(this.x,this.y);
      });
    else
      this.image = this.map.level.add.image(this.x*32+16, this.y*32+16, this.stats.upgrades[this.level-1].texture).setOrigin(0.5, 0.5).setInteractive().on('pointerdown', () => {
        this.map.level.UI.getInformations(this);
        this.map.level.mouseInteraction.update(this.x,this.y);
      }).on('pointerover', () => {
        this.map.level.mouseInteraction.update(this.x,this.y);
      });
  }

  addProductivity(pdt){
    this.productivity += pdt;
  }

  removeProductivity(pdt){
    this.productivity -= pdt;
  }

  upgrade(){
    this.map.level.game.money.removeMoneyEachDay(this.stats.upgrades[this.level-1].gain);
    this.level++;
    this.image.destroy();
    this.createTile();
  }
}
