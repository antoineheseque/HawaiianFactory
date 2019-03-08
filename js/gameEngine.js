class GameEngine extends Phaser.Scene {

  constructor ()
  {
    super({ key: 'gameEngine' });
  }

  init(level){
    this.level = level;
  }

  preload ()
  {
    this.level.money = new MoneyStat(1000, this);
    this.level.time = new Time(this);
  }

  create ()
  {
    console.log("ENGINE loaded!");
  }

  update (time, delta)
  {
    this.level.money.update(time);
    this.level.time.update(time);
  }
}
