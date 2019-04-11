class Environment extends Tile{

  constructor(type, stats, x, y, map){
    super();
    this.stats = stats;
    this.type = type;
    this.level = 1;
    this.map = map;

    this.x = x;
    this.y = y;
    this.createTile();
  }

  createTile(){
    if(this.stats.upgrades[this.level-1].frames > 1)
      this.image = this.map.level.add.sprite(this.x*32, this.y*32, this.stats.upgrades[this.level-1].texture + '-1').play(this.stats.upgrades[this.level-1].texture).setOrigin(0, 0).setInteractive().on('pointerdown', () => {
        this.map.level.UI.getInformations(this);
      }).on('pointerover', () => {
        this.map.level.mouseInteraction.update(this.x,this.y);
      });
    else
      this.image = this.map.level.add.image(this.x*32, this.y*32, this.stats.upgrades[this.level-1].texture).setOrigin(0, 0).setInteractive().on('pointerdown', () => {
        this.map.level.UI.getInformations(this);
      }).on('pointerover', () => {
        this.map.level.mouseInteraction.update(this.x,this.y);
      });
  }

  upgrade(){
    this.level++;
    this.image.destroy();
    this.createTile();
  }
}
