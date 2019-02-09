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
    this.money = new MoneyStat(1000, this);
    this.time = new Time(this);
  }

  create ()
  {

    console.log("ENGINE loaded!");
  }

  update (time, delta)
  {
    this.money.update(time);
    this.time.update(time);
  }
}
