class GameEngine extends Phaser.Scene {

  constructor ()
  {
    super({ key: 'gameEngine' });
  }

  init(level){
    this.level = level;
    this.level.game = this;

    this.level.money = new MoneyStat(1000, this);
    this.level.time = new Time(this);
  }

  preload ()
  {
    this.level.money.create();
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
